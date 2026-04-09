import {floodFill} from "./floodFill";
import {traceContour} from "./contourTrace";
import {simplifyPolygon} from "./simplify";

export type DetectionResult =
  | { shapeType: 'rect', data: { x:number; y: number; width: number; height: number } }
  | { shapeType: 'polygon', data: { points: [number, number][] } }
  | null;

type ComputedBoundingBoxResult = { minX: number; minY: number; maxX: number; maxY: number; filledPixelCount: number } | null;

/**
 * Full detection pipeline: click on image → shape result.
 *
 * 1. Renders image to offscreen canvas for pixel access
 * 2. Flood-fills from click point to find connected region
 * 3. Analyzes if region is rectangular (→ rect shape)
 * 4. Otherwise: traces contour → simplifies → polygon shape
 *
 * @param imageElement            - The <img> DOM element (must be loaded, same-origin)
 * @param clickXInImageCoords     - X click position in image-native pixels
 * @param clickYInImageCoords     - Y click position in image-native pixels
 * @param colorToleranceThreshold - Max RGB distance for flood fill (default 32)
 * @param polygonSimplificationEpsilon - RDP deviation tolerance (default: auto)
 * @param rectangularityThreshold - Min ratio of filled pixels to bounding box area
 *                                   to classify as rectangle (default 0.88)
 */
export function detectRegion(
  imageElement: HTMLImageElement,
  clickXInImageCoords: number,
  clickYInImageCoords: number,
  colorToleranceThreshold: number = 32,
  polygonSimplificationEpsilon?: number,
  rectangularityThreshold: number = 0.88
): DetectionResult {
  const naturalImageWidth = imageElement.naturalWidth;
  const naturalImageHeight = imageElement.naturalHeight;

  // step 1: render image to offscreen canvas and get pixel data
  const offscreenCanvas = document.createElement('canvas');
  offscreenCanvas.width = naturalImageWidth;
  offscreenCanvas.height = naturalImageHeight;

  const canvasRenderingContext = offscreenCanvas.getContext('2d', {willReadFrequently: true});
  if (!canvasRenderingContext) {
    return null;
  }

  canvasRenderingContext.drawImage(imageElement, 0, 0, naturalImageWidth, naturalImageHeight);
  const imageData = canvasRenderingContext.getImageData(0, 0, naturalImageWidth, naturalImageHeight);
  const rawPixelBuffer = imageData.data;

  // step 2 : flood fill to find connected region
  const roundedClickX = Math.round(clickXInImageCoords);
  const roundedClickY = Math.round(clickYInImageCoords);

  const filledRegionMask = floodFill(
    rawPixelBuffer,
    naturalImageWidth,
    naturalImageHeight,
    roundedClickX,
    roundedClickY,
    colorToleranceThreshold
  );

  const processedRegionMask = dilateRegionMask(filledRegionMask, naturalImageWidth, naturalImageHeight, 2, rawPixelBuffer);

  // step 3: analyze bounding box + rectangularity
  const boundingBox = computeBoundingBoxFromMask(processedRegionMask, naturalImageWidth, naturalImageHeight);
  offscreenCanvas.width = 0;
  offscreenCanvas.height = 0;

  if (!boundingBox) {
    return  null;
  }

  const { minX, minY, maxX, maxY, filledPixelCount } = boundingBox;
  const boundingBoxWidth = maxX - minX + 1;
  const boundingBoxHeight = maxY - minY + 1;
  const boundingBoxArea = boundingBoxWidth * boundingBoxHeight;

  // Ignore regions smaller than 100 pixels — these are typically
  // single-pixel noise or JPEG artifacts, not intentional click targets.
  const minimumRegionPixelCount = 100;
  if (filledPixelCount < minimumRegionPixelCount) {
    return null;
  }

  // rectangularity = how much of the bounding box is filled
  // 1.0 = perfect rectangle 0.5 = triangle-ish, etc.
  const rectangularityRatio = filledPixelCount / boundingBoxArea;
  if (rectangularityRatio >= rectangularityThreshold) {
    return {
      shapeType: 'rect',
      data: {
        x: minX,
        y: minY,
        width: boundingBoxWidth,
        height: boundingBoxHeight
      }
    };
  }

  // step4: Not rectangular -> trace contour + simplify to polygon
  const rawContourPoints = traceContour(processedRegionMask, naturalImageWidth, naturalImageHeight);
  if (rawContourPoints.length < 3) {
    return null;
  }

  // Scale the simplification tolerance to the size of the detected region,
  // not the whole image. For large regions the image diagonal works fine,
  // but small regions (fine lines, icons) need a higher relative epsilon
  // to smooth out dilation artifacts and pixel-level noise.
  const imageDiagonalLength = Math.sqrt(naturalImageWidth * naturalImageWidth + naturalImageHeight * naturalImageHeight);
  const regionDiagonalLength = Math.sqrt(boundingBoxWidth * boundingBoxWidth + boundingBoxHeight * boundingBoxHeight);
  const imageBasedEpsilon = imageDiagonalLength * 0.0015;
  const regionBasedEpsilon = regionDiagonalLength * 0.01;
  const effectiveEpsilon = polygonSimplificationEpsilon ?? Math.max(imageBasedEpsilon, regionBasedEpsilon);
  const simplifiedPolygonPoints = simplifyPolygon(rawContourPoints, Math.max(1.0, effectiveEpsilon));

  // Level 2 rectangle check: the pixel-based check (Level 1) can fail when
  // JPEG artifacts or shadows create large gaps in the mask. But the simplified
  // polygon might still clearly be a rectangle. Compare its actual area
  // (Shoelace formula) against its bounding box area.
  if (simplifiedPolygonPoints.length <= 8) {
    const polygonBoundsMinX = Math.min(...simplifiedPolygonPoints.map(([x]) => x));
    const polygonBoundsMinY = Math.min(...simplifiedPolygonPoints.map(([, y]) => y));
    const polygonBoundsMaxX = Math.max(...simplifiedPolygonPoints.map(([x]) => x));
    const polygonBoundsMaxY = Math.max(...simplifiedPolygonPoints.map(([, y]) => y));

    const polygonActualArea = computePolygonArea(simplifiedPolygonPoints);
    const polygonBoundingBoxArea =
      (polygonBoundsMaxX - polygonBoundsMinX) * (polygonBoundsMaxY - polygonBoundsMinY);

    const polygonRectangularityRatio = polygonBoundingBoxArea > 0
      ? polygonActualArea / polygonBoundingBoxArea
      : 0;

    if (polygonRectangularityRatio >= 0.90) {
      return {
        shapeType: 'rect',
        data: {
          x: polygonBoundsMinX,
          y: polygonBoundsMinY,
          width: polygonBoundsMaxX - polygonBoundsMinX,
          height: polygonBoundsMaxY - polygonBoundsMinY,
        }
      };
    }
  }

  // shift by 0.5 to get pixel centers instead of corners (for better focuspoint store compatibility)
  const centeredPolygonPoints = simplifiedPolygonPoints.map(
    ([x, y]): [number, number] => [x + 0.5, y + 0.5]
  );

  return { shapeType: 'polygon', data: { points: centeredPolygonPoints}};
}

/**
 * Scans the binary region mask to find:
 * - The axis-aligned bounding box (minX, minY, maxX, maxY)
 * - The total number of filled pixels
 *
 * Single pass over the mask, O(width × height).
 *
 * @returns null if the mask contains no filled pixels.
 */
function computeBoundingBoxFromMask(
  regionMask: Uint8Array,
  imageWidthInPixels: number,
  imageHeightInPixels: number
): ComputedBoundingBoxResult {
  let minX = imageWidthInPixels;
  let minY = imageHeightInPixels;
  let maxX = -1;
  let maxY = -1;
  let filledPixelCount = 0;

  for (let  rowIndex = 0; rowIndex < imageHeightInPixels; rowIndex++) {
    const rowStartOffset = rowIndex * imageWidthInPixels;
    for (let columnIndex = 0; columnIndex < imageWidthInPixels; columnIndex++) {
      if (regionMask[rowStartOffset + columnIndex] === 1) {
        filledPixelCount++;
        if (columnIndex < minX) {
          minX = columnIndex;
        }

        if (columnIndex > maxX) {
          maxX = columnIndex;
        }

        if (rowIndex < minY) {
          minY = rowIndex;
        }

        if (rowIndex > maxY) {
          maxY = rowIndex;
        }
      }
    }
  }

  if (filledPixelCount === 0) {
    return null;
  }

  return {minX, minY, maxX, maxY, filledPixelCount};
}

/**
 * Computes the area of a polygon using the Shoelace formula.
 *
 * Sums the cross-products of consecutive edges.
 * Works for any simple (non-self-intersecting) polygon.
 *
 * @param polygonPoints - Ordered [x, y] vertices
 * @returns Area in square pixels
 */
function computePolygonArea(polygonPoints: [number, number][]): number {
  let twiceSignedArea = 0;
  const vertexCount = polygonPoints.length;

  for (let currentIndex = 0; currentIndex < vertexCount; currentIndex++) {
    const [currentX, currentY] = polygonPoints[currentIndex];
    const [nextX, nextY] = polygonPoints[(currentIndex + 1) %vertexCount];
    twiceSignedArea += currentX * nextY - nextX * currentY;
  }

  return Math.abs(twiceSignedArea) / 2;
}

/**
 * Edge-aware morphological dilation of a binary region mask.
 *
 * Expands filled pixels outward by `radius`, but ONLY into pixels whose
 * color is similar to the average color of their nearest filled neighbor.
 * This prevents the dilation from bridging across thin lines or strong
 * color edges (e.g. a 1px white outline on a dark background).
 *
 * Without edge-awareness, a radius of 2 would bridge any gap ≤ 4px,
 * destroying thin-line boundaries completely.
 *
 * @param mask        - Binary region mask (1 = filled, 0 = empty)
 * @param width       - Image width in pixels
 * @param height      - Image height in pixels
 * @param radius      - Max expansion distance in pixels (1–3 typical)
 * @param pixelBuffer - Raw RGBA pixel data for color comparison
 */
function dilateRegionMask(
  mask: Uint8Array,
  width: number,
  height: number,
  radius: number,
  pixelBuffer: Uint8ClampedArray
): Uint8Array {
  const dilated = new Uint8Array(mask);

  // Squared color distance threshold for dilation.
  // 30² = 900 — allows anti-aliased blending pixels through,
  // but blocks pixels across a clear color edge (e.g. white line on blue).
  const maxDilationColorDistanceSquared = 30 * 30;

  // Iterative single-pixel expansion, repeated `radius` times.
  // Each pass only expands by 1 pixel, ensuring every step is edge-checked.
  for (let pass = 0; pass < radius; pass++) {
    // snapshot of current state — we read from snapshot, write to dilated
    const snapshot = new Uint8Array(dilated);

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const pixelIndex = row * width + col;

        // only process empty pixels (candidates for expansion)
        if (snapshot[pixelIndex] === 1) {
          continue;
        }

        // check if any of the 4 direct neighbors is filled
        const hasFilledNeighbor =
          (col > 0         && snapshot[pixelIndex - 1]     === 1) ||
          (col < width - 1 && snapshot[pixelIndex + 1]     === 1) ||
          (row > 0         && snapshot[pixelIndex - width]  === 1) ||
          (row < height - 1 && snapshot[pixelIndex + width] === 1);

        if (!hasFilledNeighbor) {
          continue;
        }

        // Find the nearest filled neighbor's color to compare against
        const candidateByteOffset = pixelIndex * 4;
        const candidateRed   = pixelBuffer[candidateByteOffset];
        const candidateGreen = pixelBuffer[candidateByteOffset + 1];
        const candidateBlue  = pixelBuffer[candidateByteOffset + 2];

        // Compare against the closest filled neighbor
        let isColorCompatible = false;
        const neighborOffsets = [
          col > 0          ? pixelIndex - 1     : -1,
          col < width - 1  ? pixelIndex + 1     : -1,
          row > 0          ? pixelIndex - width  : -1,
          row < height - 1 ? pixelIndex + width  : -1,
        ];

        for (const neighborIndex of neighborOffsets) {
          if (neighborIndex === -1 || snapshot[neighborIndex] !== 1) {
            continue;
          }

          const neighborByteOffset = neighborIndex * 4;
          const redDelta   = candidateRed   - pixelBuffer[neighborByteOffset];
          const greenDelta = candidateGreen - pixelBuffer[neighborByteOffset + 1];
          const blueDelta  = candidateBlue  - pixelBuffer[neighborByteOffset + 2];
          const colorDistSq = redDelta * redDelta + greenDelta * greenDelta + blueDelta * blueDelta;

          if (colorDistSq <= maxDilationColorDistanceSquared) {
            isColorCompatible = true;
            break;
          }
        }

        if (isColorCompatible) {
          dilated[pixelIndex] = 1;
        }
      }
    }
  }

  return dilated;
}

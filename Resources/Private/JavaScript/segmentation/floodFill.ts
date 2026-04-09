import {colorDistanceSquared} from "./colorDistance";

/**
 * Scanline stack entries: each entry is [leftColumnOfScanline, rightColumnOfScanline, rowIndex, parentRowDirection]
 * parentRowDirection: -1 = came from row below, +1 = came from row above, 0 = initial seed row
 */
type ScanLineEntry = [number, number, number, number];

/**
 * Scanline-based flood fill starting from a seed pixel.
 *
 * Expands outward from the seed, collecting all connected pixels whose
 * RGB color is within `maxColorDistance` of the seed pixel's color.
 *
 * Uses a scanline stack algorithm (not per-pixel recursion) to avoid
 * call-stack overflow on large regions.
 *
 * @param pixelBuffer       - Raw RGBA pixel data from `ImageData.data`
 * @param imageWidthInPixels  - Width of the image in pixels (= ImageData.width)
 * @param imageHeightInPixels - Height of the image in pixels (= ImageData.height)
 * @param seedPixelX        - X coordinate of the click point (column index, 0-based)
 * @param seedPixelY        - Y coordinate of the click point (row index, 0-based)
 * @param maxColorDistance  - Maximum euclidean RGB distance to still count as "same region" (0–441)
 * @returns A binary mask as Uint8Array of length `width * height`.
 *          mask[y * width + x] === 1 means pixel (x, y) belongs to the filled region.
 */
export function floodFill (
  pixelBuffer: Uint8ClampedArray,
  imageWidthInPixels: number,
  imageHeightInPixels: number,
  seedPixelX: number,
  seedPixelY: number,
  maxColorDistance: number
): Uint8Array {
  const totalPixelCount = imageWidthInPixels * imageHeightInPixels;
  const regionMask = new Uint8Array(totalPixelCount);

  // byte offset of the seed in the RGBA buffer (4 bytes / pixel)
  const seedByteOffset = (seedPixelY * imageWidthInPixels + seedPixelX) * 4;

  // bounds check: seed must be inside the image
  if (
    seedPixelX < 0 || seedPixelX >= imageWidthInPixels ||
    seedPixelY < 0 || seedPixelY >= imageHeightInPixels
  ) {
    return regionMask;
  }

  const scanLineStack: ScanLineEntry[] = [];

  const maxColorDistanceSquared = maxColorDistance * maxColorDistance;
  const isPixelWithinTolerance = (columnIndex: number, rowIndex: number): boolean => {
    const candidateByteOffset = (rowIndex * imageWidthInPixels + columnIndex) * 4;
    return colorDistanceSquared(pixelBuffer, seedByteOffset, candidateByteOffset) <= maxColorDistanceSquared;
  }

  // start: find the fulll scanline extent at the seed row
  let scanlineLeftColumn = seedPixelX;
  let scanlineRightColumn = seedPixelX;

  // expand left from seed
  while (scanlineLeftColumn > 0 && isPixelWithinTolerance(scanlineLeftColumn - 1, seedPixelY)) {
    scanlineLeftColumn--;
  }

  // expand right from seed
  while (scanlineRightColumn < imageWidthInPixels - 1 && isPixelWithinTolerance(scanlineRightColumn + 1, seedPixelY)) {
    scanlineRightColumn++;
  }


  // mark the initial scanline and push it
  for (let columnIndex = scanlineLeftColumn; columnIndex <= scanlineRightColumn; columnIndex++) {
    regionMask[seedPixelY * imageWidthInPixels + columnIndex] = 1;
  }

  scanLineStack.push([scanlineLeftColumn, scanlineRightColumn, seedPixelY, 0]);

  // process scanline stack
  while (scanLineStack.length > 0) {
    const [parentLeft, parentRight, parentRow, parentDirection] = scanLineStack.pop()!;

    // checks rows above and below the parent scanline
    const rowsToCheck: number[] = [];
    if (parentRow > 0 && parentDirection <= 0) {
      rowsToCheck.push(parentRow - 1);
    }

    if (parentRow < imageHeightInPixels - 1 && parentDirection >= 0) {
      rowsToCheck.push(parentRow + 1);
    }

    for (const currentRowIndex of rowsToCheck) {
      let currentColumnIndex = parentLeft;

      while (currentColumnIndex <= parentRight) {
        // skip columns already visited or not within tolerance
        while (
          currentColumnIndex <= parentRight &&
          (regionMask[currentRowIndex * imageWidthInPixels + currentColumnIndex] === 1 ||
          !isPixelWithinTolerance(currentColumnIndex, currentRowIndex))
          ) {
          currentColumnIndex++;
        }

        // found the start of a new span in this row
        if (currentColumnIndex > parentRight) {
          break;
        }

        let spanLeftColumn = currentColumnIndex;
        let spanRightColumn = currentColumnIndex;

        // expand the span left (beyond parent range too)
        while (
          spanLeftColumn > 0
          && regionMask[currentRowIndex * imageWidthInPixels + (spanLeftColumn -1)] === 0
          && isPixelWithinTolerance(spanLeftColumn - 1, currentRowIndex)
          ) {
          spanLeftColumn--;
        }

        // expand the span right (beyond parent range too)
        while (
          spanRightColumn < imageWidthInPixels - 1
          && regionMask[currentRowIndex * imageWidthInPixels + (spanRightColumn + 1)] === 0
          && isPixelWithinTolerance(spanRightColumn + 1, currentRowIndex)) {
          spanRightColumn++;
        }

        // mark all pixels in this span
        for (let markColumn = spanLeftColumn; markColumn <= spanRightColumn; markColumn++) {
          regionMask[currentRowIndex * imageWidthInPixels + markColumn] = 1;
        }

        // determine parent direction for the new scanline entry
        const directionFromParent = currentRowIndex < parentRow ? -1 : 1;
        scanLineStack.push([spanLeftColumn, spanRightColumn, currentRowIndex, directionFromParent]);

        // continue scanning for next span in this row
        currentColumnIndex = spanRightColumn + 1;
      }
    }
  }

  return regionMask;
}

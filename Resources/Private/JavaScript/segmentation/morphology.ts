/**
 * Dilates a binary mask by 1 pixel (3×3 kernel).
 *
 * Every pixel that has at least one filled neighbor (including diagonals)
 * becomes filled. This expands the region by 1 pixel in all directions.
 *
 * @param regionMask          - Binary mask (1 = region, 0 = background)
 * @param imageWidthInPixels  - Image width
 * @param imageHeightInPixels - Image height
 * @returns New dilated mask (original is not modified)
 */
export function dilateMask(
  regionMask: Uint8Array,
  imageWidthInPixels: number,
  imageHeightInPixels: number
): Uint8Array {
  const dilatedMask = new Uint8Array(imageWidthInPixels * imageHeightInPixels);

  for (let rowIndex = 0; rowIndex < imageHeightInPixels; rowIndex++) {
    for (let columnIndex = 0; columnIndex < imageWidthInPixels; columnIndex++) {
      let hasFilledNeighbor = false;

      // check 3x3 neighborhood (including the pixel itself)
      for (let neighborRowOffset = -1; neighborRowOffset <= 1 && !hasFilledNeighbor; neighborRowOffset++) {
        for (let neighborColumnOffset = -1; neighborColumnOffset <= 1 && !hasFilledNeighbor; neighborColumnOffset++) {
          const neighborColumn = columnIndex + neighborColumnOffset;
          const neighborRow = rowIndex + neighborRowOffset;

          // bounds check
          if (
            neighborColumn >= 0 && neighborColumn < imageWidthInPixels &&
            neighborRow >= 0 && neighborRow < imageHeightInPixels &&
            regionMask[neighborRow * imageWidthInPixels + neighborColumn] === 1
          ) {
            hasFilledNeighbor = true;
          }
        }
      }

      dilatedMask[rowIndex * imageWidthInPixels + columnIndex] = hasFilledNeighbor ? 1 : 0;
    }
  }

  return dilatedMask;
}

/**
 * Erodes a binary mask by 1 pixel (3×3 kernel).
 *
 * A pixel stays filled only if ALL its neighbors (including diagonals)
 * are also filled. This shrinks the region by 1 pixel from all edges.
 *
 * @param regionMask          - Binary mask (1 = region, 0 = background)
 * @param imageWidthInPixels  - Image width
 * @param imageHeightInPixels - Image height
 * @returns New eroded mask (original is not modified)
 */
export function erodeMask(
  regionMask: Uint8Array,
  imageWidthInPixels: number,
  imageHeightInPixels: number
): Uint8Array {
  const erodedMask = new Uint8Array(imageWidthInPixels * imageHeightInPixels);

  for (let rowIndex = 0; rowIndex < imageHeightInPixels; rowIndex++) {
    for (let columnIndex = 0; columnIndex < imageWidthInPixels; columnIndex++) {
      let allNeighborsFilled = true;

      for (let neighborRowOffset = -1; neighborRowOffset <= 1 && allNeighborsFilled; neighborRowOffset++) {
        for (let neighborColumnOffset = -1; neighborColumnOffset <= 1 && allNeighborsFilled; neighborColumnOffset++) {
          const neighborColumn = columnIndex + neighborColumnOffset;
          const neighborRow = rowIndex + neighborRowOffset;

          if (
            neighborColumn < 0 || neighborColumn >= imageWidthInPixels ||
            neighborRow < 0 || neighborRow >= imageHeightInPixels
          ) {
            allNeighborsFilled = false;
          } else if (regionMask[neighborRow * imageWidthInPixels + neighborColumn] !== 1) {
            allNeighborsFilled = false;
          }
        }
      }

      erodedMask[rowIndex * imageWidthInPixels + columnIndex] = allNeighborsFilled ? 1 : 0;
    }
  }

  return erodedMask;
}

/**
 * Morphological closing: dilate then erode.
 *
 * Fills small gaps and notches at region edges (caused by anti-aliasing,
 * JPEG artifacts, or sub-pixel color variations) while preserving the
 * overall shape and size of the region.
 *
 * @param regionMask          - Binary mask from floodFill
 * @param imageWidthInPixels  - Image width
 * @param imageHeightInPixels - Image height
 * @returns Closed mask with smoother edges
 */
export function closeMask(
  regionMask: Uint8Array,
  imageWidthInPixels: number,
  imageHeightInPixels: number
): Uint8Array {
  const dilatedMask = dilateMask(regionMask, imageWidthInPixels, imageHeightInPixels);
  return erodeMask(dilatedMask, imageWidthInPixels, imageHeightInPixels);
}

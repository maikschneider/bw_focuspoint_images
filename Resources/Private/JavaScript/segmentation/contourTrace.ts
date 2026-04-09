/**
 * Moore-Neighbor contour tracing on a binary region mask.
 *
 * Walks the outer boundary of a filled region (mask value === 1)
 * and returns an ordered list of boundary pixel coordinates (clockwise).
 *
 * @param regionMask         - Binary mask from floodFill: 1 = region, 0 = background
 * @param imageWidthInPixels  - Image width in pixels
 * @param imageHeightInPixels - Image height in pixels
 * @returns Ordered array of [x, y] boundary points. Empty array if mask has no region pixels.
 */
export function traceContour(
  regionMask: Uint8Array,
  imageWidthInPixels: number,
  imageHeightInPixels: number
): [number, number][] {
  const contourPoints: [number, number][] = [];

  // step 1: find the topmost-leftmost region pixel (entry point)
  let entryPixelX = -1;
  let entryPixelY = -1;

  outerSearch:
  for (let rowIndex = 0; rowIndex < imageHeightInPixels; rowIndex++) {
    for (let columnIndex = 0; columnIndex < imageWidthInPixels; columnIndex++) {
      if (regionMask[rowIndex * imageWidthInPixels + columnIndex] === 1) {
        entryPixelX = columnIndex;
        entryPixelY = rowIndex;
        break outerSearch;
      }
    }
  }

  // no region pixels found, return empty contour
  if (entryPixelX === -1 || entryPixelY === -1) {
    return contourPoints;
  }

  /**
   * Moore neighborhood: 8 directions starting from the left neighbor,
   * going clockwise.
   *
   *   7  0  1
   *   6  P  2
   *   5  4  3
   *
   * Each entry: [columnOffset, rowOffset]
   */
  const mooreNeighborOffsets: [number, number][] = [
    [0, -1],   // top
    [1, -1],   // top-right
    [1, 0],    // right
    [1, 1],    // bottom-right
    [0, 1],    // bottom
    [-1, 1],   // bottom-left
    [-1, 0],   // left
    [-1, -1]   // top-left
  ];

  // helper func if pixel inside the region?
  const isRegionPixel = (columnIndex: number, rowIndex: number): boolean => {
    if (columnIndex < 0 || columnIndex >= imageWidthInPixels || rowIndex < 0 || rowIndex >= imageHeightInPixels) {
      return false;
    }

    return regionMask[rowIndex * imageWidthInPixels + columnIndex] === 1;
  };

  // step 2: trace the contour using moor-neighbor algo
  let currentPixelX = entryPixelX;
  let currentPixelY = entryPixelY;

  // start by entering from the left (direction 6), so we begin checking from direction 7
  let backtrackDirectionIndex = 7;

  // safety limit to prevent infinite loops
  const maximumContourSteps = imageWidthInPixels * imageHeightInPixels * 2;
  let stepCounter = 0;

  do {
    contourPoints.push([currentPixelX, currentPixelY]);

    // Search clockwise through the 8 neighbors, starting from the
    // direction AFTER the backtrack direction (= where we came from)
    let foundNextPixel = false;
    for (let neighborCheckOffset = 0; neighborCheckOffset < 8; neighborCheckOffset++) {
      const neighborDirectionIndex = (backtrackDirectionIndex + neighborCheckOffset) % 8;
      const [columnOffset, rowOffset] = mooreNeighborOffsets[neighborDirectionIndex];
      const neighborPixelX = currentPixelX + columnOffset;
      const neighborPixelY = currentPixelY + rowOffset;

      if (isRegionPixel(neighborPixelX, neighborPixelY)) {
        // move to this neighbor
        currentPixelX = neighborPixelX;
        currentPixelY = neighborPixelY;

        // the backtrack direction is the opposite of where we just moved
        // (+4 because opposite in an 8-direction ring)
        // then +1 to start checking from the next direction clockwise after backtrack
        backtrackDirectionIndex = (neighborDirectionIndex + 4 + 1) % 8;
        foundNextPixel = true;
        break;
      }
    }

    // isolate single pixel - no neighbors in the region
    if (!foundNextPixel) {
      break;
    }

    stepCounter++;
    if (stepCounter > maximumContourSteps) {
      break;
    }
  } while (currentPixelX !== entryPixelX || currentPixelY !== entryPixelY);

  return removeCollinearPoints(contourPoints);
}

/**
 * Removes collinear points from a closed contour.
 *
 * Three consecutive points A → B → C are collinear when the cross product
 * of vectors (A→B) and (A→C) is zero — meaning B lies exactly on the line
 * from A to C and carries no shape information.
 *
 * Since the contour is a closed loop, the check wraps around: the last
 * point is tested against the first and second, etc.
 *
 * Uses integer cross-product (no floating point, no epsilon needed)
 * because all coordinates are whole pixel positions.
 *
 * @param contourPoints - Ordered [x, y] boundary points from tracing
 * @returns Filtered array with only the direction-change points kept
 */
function removeCollinearPoints(contourPoints: [number, number][]): [number, number][] {
  const pointCount = contourPoints.length;
  if (pointCount <= 3) {
    return contourPoints;
  }

  const reducedContour: [number, number][] = [];
  for (let currentIndex = 0; currentIndex < pointCount; currentIndex++) {
    const previousIndex = (currentIndex - 1 + pointCount) % pointCount;
    const nextIndex = (currentIndex + 1) % pointCount;

    const [previousX, previousY] = contourPoints[previousIndex];
    const [currentX, currentY]   = contourPoints[currentIndex];
    const [nextX, nextY]         = contourPoints[nextIndex];

    // Cross product of vectors (prev→current) and (prev→next).
    // Zero means all three points lie on the same straight line.
    const crossProduct =
      (currentX - previousX) * (nextY - previousY) -
      (currentY - previousY) * (nextX - previousX);

    if (crossProduct !== 0) {
      reducedContour.push(contourPoints[currentIndex]);
    }
  }
  return reducedContour;
}


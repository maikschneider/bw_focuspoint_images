/**
 * Ramer-Douglas-Peucker polygon simplification.
 *
 * Reduces a high-resolution contour (thousands of points) to a simplified
 * polygon with far fewer vertices, while preserving the overall shape.
 *
 * Higher `maxDeviationTolerance` = fewer points = simpler polygon.
 * Lower  `maxDeviationTolerance` = more points = more detail.
 *
 * @param contourPoints          - Ordered array of [x, y] contour points from traceContour()
 * @param maxDeviationTolerance  - Maximum perpendicular distance a point may deviate from
 *                                  the simplified line before it's kept (in pixels).
 *                                  Recommended: 1.5–3.0 for most images.
 * @returns Simplified polygon as [x, y][] — ready for the focuspoint store.
 */
export function simplifyPolygon(contourPoints: [number, number][], maxDeviationTolerance:number): [number, number][] {
  const pointCount = contourPoints.length;

  // a polygon needs at least 3 points
  if (pointCount <= 3) {
    return contourPoints.slice();
  }

  // find position with largest perpendicular distance
  const firstPointIndex = 0;
  const lastPointIndex = pointCount - 1;

  let largestDeviation = 0;
  let farthestPointIndex = 0;

  const [lineStartX, lineStartY] = contourPoints[firstPointIndex];
  const [lineEndX, lineEndY] = contourPoints[lastPointIndex];

  for (let candidateIndex = 1; candidateIndex < lastPointIndex; candidateIndex++) {
    const perpendicularDistance = perpendicularDistanceToLine(contourPoints[candidateIndex], lineStartX, lineStartY, lineEndX, lineEndY);

    if (perpendicularDistance > largestDeviation) {
      largestDeviation = perpendicularDistance;
      farthestPointIndex = candidateIndex;
    }
  }

  // decide: split or simplify
  if (largestDeviation > maxDeviationTolerance) {
    // the farthest point deviates too much -> split and recurse
    const leftHalfSimplified = simplifyPolygon(
      contourPoints.slice(firstPointIndex, farthestPointIndex +1),
      maxDeviationTolerance
    );

    const rightHalfSimplified = simplifyPolygon(
      contourPoints.slice(farthestPointIndex),
      maxDeviationTolerance
    );

    return [...leftHalfSimplified.slice(0, -1), ...rightHalfSimplified];
  } else {
    // all intermediate points are close enough to the line => drop them
    return [contourPoints[firstPointIndex], contourPoints[lastPointIndex]];
  }
}

/**
 * Perpendicular (shortest) distance from a point to a line segment.
 *
 * @param point       - The point to measure from: [x, y]
 * @param lineStartX  - X of line segment start
 * @param lineStartY  - Y of line segment start
 * @param lineEndX    - X of line segment end
 * @param lineEndY    - Y of line segment end
 * @returns Distance in pixels
 */
function perpendicularDistanceToLine(
  point: [number, number],
  lineStartX: number,
  lineStartY: number,
  lineEndX: number,
  lineEndY: number
): number {
  const [pointX, pointY] = point;

  const lineLengthX = lineEndX - lineStartX;
  const lineLengthY = lineEndY - lineStartY;
  const lineLengthSquared = lineLengthX * lineLengthX + lineLengthY * lineLengthY;

  // degenerate case: start end are the dame point
  if (lineLengthSquared === 0 ) {
    const deltaX = pointX - lineStartX;
    const deltaY = pointY - lineStartY;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }

  // Standard perpendicular distance via cross product:
  // |  (endY - startY) * pointX  -  (endX - startX) * pointY  +  endX * startY  -  endY * startX  |
  // ─────────────────────────────────────────────────────────────────────────────────────────────────
  //                                         lineLength
  const crossProduct = Math.abs(
    lineLengthY * pointX - lineLengthX * pointY + lineEndX * lineStartY - lineEndY * lineStartX
  );

  return crossProduct / Math.sqrt(lineLengthSquared);
}

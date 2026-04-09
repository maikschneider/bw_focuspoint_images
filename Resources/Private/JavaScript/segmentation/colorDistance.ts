/**
* Euclidean RGB distance between two pixels in a raw RGBA ImageData buffer.
*
* The `ImageData.data` array stores pixels as consecutive [R, G, B, A] bytes.
* Each pixel occupies 4 bytes, so the byte offset for pixel N is `N * 4`.
*
* @param pixelBuffer  - The raw `ImageData.data` Uint8ClampedArray (RGBA layout, 4 bytes per pixel)
* @param byteOffsetPixelA - Byte offset of the first pixel  (must be a multiple of 4)
* @param byteOffsetPixelB - Byte offset of the second pixel (must be a multiple of 4)
* @returns Euclidean distance in RGB space (0 = identical, ~441.67 = maximum black↔white)
*/
export function colorDistance (
  pixelBuffer: Uint8ClampedArray,
  byteOffsetPixelA: number,
  byteOffsetPixelB: number
): number {
  const redDelta = pixelBuffer[byteOffsetPixelA] - pixelBuffer[byteOffsetPixelB];
  const greenDelta = pixelBuffer[byteOffsetPixelA + 1] - pixelBuffer[byteOffsetPixelB + 1];
  const blueDelta = pixelBuffer[byteOffsetPixelA + 2] - pixelBuffer[byteOffsetPixelB + 2];

  return Math.sqrt(redDelta * redDelta + greenDelta * greenDelta + blueDelta * blueDelta);
}

export function colorDistanceSquared (
  pixelBuffer: Uint8ClampedArray,
  byteOffsetPixelA: number,
  byteOffsetPixelB: number
): number {
  const redDelta = pixelBuffer[byteOffsetPixelA] - pixelBuffer[byteOffsetPixelB];
  const greenDelta = pixelBuffer[byteOffsetPixelA + 1] - pixelBuffer[byteOffsetPixelB + 1];
  const blueDelta = pixelBuffer[byteOffsetPixelA + 2] - pixelBuffer[byteOffsetPixelB + 2];

  return redDelta * redDelta + greenDelta * greenDelta + blueDelta * blueDelta;
}

export function _16point(angle) {
  /**
   * Customize by changing the number of directions you have
   * We have 8
   */
  const degreePerDirection = 360 / 16;

  /**
   * Offset the angle by half of the degrees per direction
   * Example: in 4 direction system North (320-45) becomes (0-90)
   */
  const offsetAngle = angle + degreePerDirection / 2;

  return offsetAngle >= 0 * degreePerDirection &&
    offsetAngle < 1 * degreePerDirection
    ? "N"
    : offsetAngle >= 1 * degreePerDirection &&
      offsetAngle < 2 * degreePerDirection
    ? "NNE"
    : offsetAngle >= 2 * degreePerDirection &&
      offsetAngle < 3 * degreePerDirection
    ? "NE"
    : offsetAngle >= 3 * degreePerDirection &&
      offsetAngle < 4 * degreePerDirection
    ? "ENE"
    : offsetAngle >= 4 * degreePerDirection &&
      offsetAngle < 5 * degreePerDirection
    ? "E"
    : offsetAngle >= 5 * degreePerDirection &&
      offsetAngle < 6 * degreePerDirection
    ? "ESE"
    : offsetAngle >= 6 * degreePerDirection &&
      offsetAngle < 7 * degreePerDirection
    ? "SE"
    : offsetAngle >= 7 * degreePerDirection &&
      offsetAngle < 8 * degreePerDirection
    ? "SSE"
    : offsetAngle >= 8 * degreePerDirection &&
      offsetAngle < 9 * degreePerDirection
    ? "S"
    : offsetAngle >= 9 * degreePerDirection &&
      offsetAngle < 10 * degreePerDirection
    ? "SSW"
    : offsetAngle >= 10 * degreePerDirection &&
      offsetAngle < 11 * degreePerDirection
    ? "SW"
    : offsetAngle >= 11 * degreePerDirection &&
      offsetAngle < 12 * degreePerDirection
    ? "WSW"
    : offsetAngle >= 12 * degreePerDirection &&
      offsetAngle < 13 * degreePerDirection
    ? "W"
    : offsetAngle >= 13 * degreePerDirection &&
      offsetAngle < 14 * degreePerDirection
    ? "WNW"
    : offsetAngle >= 14 * degreePerDirection &&
      offsetAngle < 15 * degreePerDirection
    ? "NW"
    : "NNW";
}

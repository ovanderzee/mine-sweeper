export const aspectualInside = (low, length, current) => {
  // insideness 0 - 1 when inside
  const insideness = (current - low) / length
  return insideness >= 0 && insideness <= 1
}

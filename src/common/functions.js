const isEnumerable = (value) => {
  return typeof value === 'object' && !Array.isArray(value)
}

export { isEnumerable }
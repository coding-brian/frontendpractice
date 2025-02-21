export function assignToReactive(source, target) {
  Object.keys(source).forEach((key) => {
    target[key] = source[key]
  })
}

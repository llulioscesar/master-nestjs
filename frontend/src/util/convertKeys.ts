export const convertKeysToCamelCase = (data: any) => {
  return data.map((item: any) => {
    const newItem = {} as any
    for (const key in item) {
      const newKey = key.replace(/_([a-z])/g, (m, p1) => p1.toUpperCase())
      newItem[newKey] = item[key]
      if (Array.isArray(newItem[newKey])) {
        newItem[newKey] = convertKeysToCamelCase(newItem[newKey])
      } else if (typeof newItem[newKey] === 'object') {
        newItem[newKey] = convertKeysToCamelCase([newItem[newKey]])[0]
      }
    }
    return newItem
  })
}

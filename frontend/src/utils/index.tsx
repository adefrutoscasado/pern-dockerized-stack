export const formatDecimal = (num, decimals = 2, removeZeroDecimals = true) => {
  if (typeof num === 'string') num = parseFloat(num)
  if (!num && num !== 0) return null
  const fixed = num.toFixed(decimals)
  if ((fixed - Math.floor(fixed) === 0) && removeZeroDecimals) return Math.floor(fixed)
  else return fixed
}

export const flatten = (obj, keySeparator = '.') => {
  const flattenRecursive = (obj, parentProperty, propertyMap = {}) => {
    for(const [key, value] of Object.entries(obj)){
      const property = parentProperty ? `${parentProperty}${keySeparator}${key}` : key
      if(value && typeof value === 'object'){
        flattenRecursive(value, property, propertyMap)
      } else {
        propertyMap[property] = value
      }
    }
    return propertyMap
  }
  return flattenRecursive(obj, undefined, undefined)
}

export const debounceFactory = (defaultDelay = 250) => {
  let timeoutId
  return (fn, delay = undefined) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn()
    }, delay ?? defaultDelay)
  }
}

export const memoize = callback => {
  // We will save the key-value pairs in the following variable. It will be our cache storage
  const cache = new Map()
  return (...args) => {
  // The key will be used to identify the different arguments combination. Same arguments means same key
    const key = JSON.stringify(args)
    // If the cache storage has the key we are looking for, return the previously stored value
    if (cache.has(key)) return cache.get(key)
    // If the key is new, call the function (in your case axios.get)
    const value = callback(...args)
    // And save the new key-value pair to the cache
    cache.set(key, value)
    return value
  }
}

// find value of object property using path
export function deepFind(obj, path) {
  const paths = path.split('.')
  let current = obj
  let i

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined
    } else {
      current = current[paths[i]]
    }
  }
  return current
}

export function isIsoDate(string) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(string)) return false
  const d = new Date(string)
  return d.toISOString() === string
}

export const execRegex = (string: any, regex: string) => {
  if (typeof string !== 'string' || typeof regex !== 'string') return undefined
  const ltRegex = new RegExp(regex)
  const [, result] = ltRegex.exec(string) || []
  return result
}

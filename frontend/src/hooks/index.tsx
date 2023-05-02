import { useRef, useEffect } from 'react'

export const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export function useOnClickOutside(ref, fn = () => {}) {
  const shouldIgnoreElementClick = (target: HTMLElement) => {
    const { className } = target
    // if clicked element has 'ignore-on-click-outside classname, it will be ignored
    if (className.includes('ignore-on-click-outside')) {
      return true
    }
    if (target.parentElement) return shouldIgnoreElementClick(target.parentElement)
    return false
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (shouldIgnoreElementClick(event.target)) return
      if (ref.current && !ref.current.contains(event.target)) {
        fn()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

export function useDidUpdateEffect(fn, inputs) {
  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current)
      return fn()
    else
      didMountRef.current = true
  }, inputs)
}


export function useWhyDidYouUpdate(name, props) {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef()
  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      // @ts-ignore
      const allKeys = Object.keys({ ...previousProps.current, ...props })
      // Use this object to keep track of changed props
      const changesObj = {}
      // Iterate through keys
      allKeys.forEach((key) => {
        // If previous is different from current
      // @ts-ignore
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            // @ts-ignore
            from: previousProps.current[key],
            to: props[key],
          }
        }
      })
      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj)
      }
    }
    // Finally update previousProps with current props for next hook call
    previousProps.current = props
  })
}

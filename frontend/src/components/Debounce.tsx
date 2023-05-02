import React, { useEffect, useState } from 'react'

const DEFAULT_DEBOUNCE_TIME = 1000

// Avoid rendering a component if its not in dom for more than {time} milliseconds
const Debounce = ({ time = DEFAULT_DEBOUNCE_TIME, children }) => {
  const [showChildren, setShowChildren] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowChildren(true), time)
    return () => clearTimeout(timer)
  }, [children, time])

  return showChildren && (
    <>{children}</>
  )
}

// Avoid rendering a debounced component if its not in dom for more than {time} milliseconds. If time is not fulfilled, the priority component is shown
export const DebounceWithPriority = ({
  time = DEFAULT_DEBOUNCE_TIME,
  debouncedComponent,
  priorityComponent,
  showDebounced
}: {
  time?: number,
  debouncedComponent: React.ReactElement,
  priorityComponent: React.ReactElement,
  showDebounced: boolean
}): JSX.Element => {
  const [timeFulfilled, setTimeFulfilled] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setTimeFulfilled(true), time)
    return () => clearTimeout(timer)
  }, [showDebounced])

  return (showDebounced && timeFulfilled) ?
    <>{debouncedComponent}</>
    :
    <>{priorityComponent}</>
}



export default Debounce

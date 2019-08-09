
/**
 * Debounces `value` after `delay`. Use w/another useEffect hook in the component
 * ... to trigger actions when the value returned from useDebounce has changed.
 * See https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay)

    // Here's the actual debounce: clear timeout if hook is called before delay has finished
    return () => {
      clearTimeout(handler);
    }
    // Only update if value has changed
  }, [value])

  return debouncedValue;
}


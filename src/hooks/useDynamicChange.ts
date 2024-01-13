import { useEffect, useState } from "react";

export default function useDynamicChange<T>(onFinish: (input: T | undefined) => void) {
  const [ input, setInput ] = useState<T>();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onFinish(input);
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [ input, onFinish ]);

  return (input: T) => {
    setInput(input);
  };
}

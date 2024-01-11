import { useEffect, useState } from "react";

export default function useDynamicChange<T>(onFinish: (input: T) => void) {
  const [ input, setInput ] = useState<T>();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if(input) {
        onFinish(input);
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [ input, onFinish ]);

  return (input: T) => {
    setInput(input);
  };
}

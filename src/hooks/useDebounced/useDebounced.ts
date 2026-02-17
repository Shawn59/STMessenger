import React, { useRef } from 'react';

export const useDebounced = (func, delay) => {
  const ref = useRef(null);

  return (...args) => {
    clearTimeout(ref.current);

    ref.current = setTimeout(() => func(...args), delay);
  };
};

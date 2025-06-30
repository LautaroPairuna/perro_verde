// src/hooks/useBreakpointCols.ts
import { useState, useEffect } from 'react';

export function useBreakpointCols() {
  const [cols, setCols] = useState(1);

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w >= 1024) setCols(4);
      else if (w >= 768) setCols(3);
      else if (w >= 640) setCols(2);
      else setCols(1);
    }

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return cols;
}

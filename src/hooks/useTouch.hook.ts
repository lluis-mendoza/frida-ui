import { useState } from 'react';

export const useTouch = (
  onTouch: () => void,
  onDoubleTouch: () => void,
  minTime: number = 300
) => {
  const [lastTap, setLastTap] = useState(0);

  function handleTouchStart() {
    const now = Date.now();
    if (now - lastTap <= minTime) {
      if (typeof onDoubleTouch === 'function') {
        onDoubleTouch();
      }
    }
    onTouch();
    setLastTap(now);
  }
  return handleTouchStart;
};

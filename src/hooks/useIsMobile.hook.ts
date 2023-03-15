/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import isMobile from 'ismobilejs';
import { useEffect, useState } from 'react';

export function useIsMobile({
  width = 768,
  customAgent = navigator.userAgent,
} = {}) {
  const [isMobileState, setIsMobile] = useState(
    window.innerWidth <= width ||
      Boolean(isMobile(customAgent).phone) ||
      isMobile(customAgent).tablet
  );

  useEffect(() => {
    function handleResize() {
      if (
        window.innerWidth <= width ||
        Boolean(isMobile(customAgent).phone) ||
        Boolean(isMobile(customAgent).tablet)
      ) {
        if (!isMobileState) {
          setIsMobile(true);
        }
      } else if (isMobileState) {
        setIsMobile(false);
      }
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return isMobileState;
}

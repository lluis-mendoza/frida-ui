import { MutableRefObject, useCallback, useRef } from 'react';

export const useFocus = (): [any, () => void] => {
  const htmlElRef: MutableRefObject<any> = useRef(null);
  const focus = useCallback(() => htmlElRef?.current?.focus?.(), []);

  return [htmlElRef, focus];
};

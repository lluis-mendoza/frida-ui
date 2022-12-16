import { useRef } from 'react';
import { useDateSegment } from 'react-aria';
import { DateFieldState, DateSegment as SegmentProps } from 'react-stately';

interface DateSegmentProps {
  segment: SegmentProps;
  state: DateFieldState;
}
export function DateSegment({ state, segment }: DateSegmentProps) {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);
  return (
    <div
      {...segmentProps}
      ref={ref}
      className={`segment ${segment.isPlaceholder ? 'placeholder' : ''}`}
    >
      {segment.text}
    </div>
  );
}

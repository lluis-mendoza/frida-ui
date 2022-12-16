import { useRef } from 'react';
import { useDateSegment } from 'react-aria';
import { DateFieldState, DateSegment as SegmentProps } from 'react-stately';

interface DateSegmentProps {
  segment: SegmentProps;
  state: DateFieldState;
}
export function DateSegment({ segment, state }: DateSegmentProps) {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      style={{
        ...segmentProps.style,
        /* minWidth:
            segment.maxValue != null && String(segment.maxValue).length + "ch" */
      }}
      className={`px-0.5 box-content tabular-nums text-right outline-none rounded-sm focus:bg-vioconst-600 focus:text-white group ${
        !segment.isEditable ? 'text-gray-500' : 'text-gray-800'
      }`}
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <span
        aria-hidden="true"
        tw="block w-full text-center italic text-gray-500 group-focus:text-white"
        style={{
          /* visibility: segment.isPlaceholder ? "" : "hidden", */
          height: segment.isPlaceholder ? '' : 0,
          pointerEvents: 'none',
        }}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? '' : segment.text}
    </div>
  );
}

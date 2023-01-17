import { useRef } from 'react';
import { useDateSegment } from 'react-aria';
import { DateFieldState, DateSegment as SegmentProps } from 'react-stately';

import { DateSegmentPlaceholder, DateSegmentWrapper } from './DateField.styled';

interface DateSegmentProps {
  segment: SegmentProps;
  state: DateFieldState;
}
const displayText = (segment: SegmentProps) => {
  const text = segment.text;
  if ((segment.type === 'day' || segment.type === 'month') && text.length === 1)
    return `0${text}`;
  return text;
};
export function DateSegment({ segment, state }: DateSegmentProps) {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <DateSegmentWrapper
      {...segmentProps}
      ref={ref}
      style={{
        ...segmentProps.style,
        /* minWidth:
          segment.maxValue != null
            ? `${String(segment.maxValue).length}ch`
            : undefined, */
      }}
      isEditable={segment.isEditable}
      className="group"
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <DateSegmentPlaceholder
        aria-hidden="true"
        isPlaceholder={segment.isPlaceholder}
      >
        {segment.placeholder}
      </DateSegmentPlaceholder>
      {segment.isPlaceholder ? '' : displayText(segment)}
    </DateSegmentWrapper>
  );
}

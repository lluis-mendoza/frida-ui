import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import tw, { css, styled } from 'twin.macro';

import { Button } from '../Button';

export const CalendarContainer = tw.div`
  relative
  inline-block
  w-full
`;
export const RangeCalendarWrapper = tw.div`
  inline-flex
  p-4
  gap-2
`;
const MonthButton = tw(Button)`
  block
  w-8
  min-w-0
  h-8
  p-0
  border-none
  rounded-md
  outline-none
  bg-gray-50
  text-gray-600
`;

export const PrevMonthIcon = tw(BiChevronLeft)`
  h-full
  w-full
`;
export const NextMonthIcon = tw(BiChevronRight)`
  h-full
  w-full
`;
export const PrevMonthButton = tw(MonthButton)`
  absolute
`;
export const NextMonthButton = tw(MonthButton)`
  absolute
  right-0
`;

export const MonthsWrapper = tw.div`
  relative
  inline-flex
  gap-4
`;
export const MonthWrapper = tw.div`
  mt-2
`;
export const MonthName = tw.h2`
  text-xl
  font-semibold
  mb-2
  text-gray-800
  text-center
`;
export const WeekDays = tw.thead`
  text-gray-600
`;
export const WeekDay = tw.th`
  text-center
`;
interface DayCellProps {
  isToday: boolean;
  isOutsideMonth: boolean;
  isPreview: boolean;
  isPreviewStart: boolean;
  isPreviewEnd: boolean;
  isSelected: boolean;
  isSelectedStart: boolean;
  isSelectedEnd: boolean;
}
export const DayCell = styled.div(
  ({
    isToday,
    isOutsideMonth,
    isPreview,
    isPreviewStart,
    isPreviewEnd,
    isSelected,
    isSelectedStart,
    isSelectedEnd,
  }: DayCellProps) => [
    tw`
    relative
    w-9
    h-[1.6rem]
    my-[0.3rem]
    py-[0.1rem]
    text-sm
    flex
    items-center
    justify-center
    outline-none
    text-gray-800
  `,
    isToday &&
      css`
        &:after {
          content: '';
          position: absolute;
          bottom: 4px;
          width: 16px;
          height: 2px;
          left: 50%;
          transform: translate(-50%, 0);
          border-radius: 2px;
        }
      `,
    isToday && tw`after:bg-blue-600`,
    isToday && isSelected && tw`after:bg-white`,
    isOutsideMonth && tw`text-gray-300`,
    isPreview &&
      !isOutsideMonth &&
      tw`
      before:(
        absolute
        -top-[0.2rem]
        h-[2rem]
        w-full
        border-y-[1px]
        border-blue-500
      )
    `,

    isPreview &&
      isPreviewStart &&
      tw`
      before:(
        -left-[0.2rem]
        w-[2.45rem]
        border-l-[1px]
        rounded-l-xl
      )
    `,

    isPreview &&
      isPreviewEnd &&
      tw`
      before:(
        -right-[0.2rem]
        w-[2.45rem]
        border-r-[1px]
        rounded-r-xl
      )
    `,
    isPreview && isPreviewStart && isPreviewEnd && tw`before:w-[2.65rem]`,
    !isPreview &&
      !isOutsideMonth &&
      tw`hover:before:(
        absolute
        -top-[0.2rem]
        -left-[0.2rem]
        h-[2rem]
        rounded-xl
        w-[2.65rem]
        border-[1px]
        border-blue-500
    )`,
    isSelected &&
      !isOutsideMonth &&
      tw`
        text-white
        bg-blue-500
    `,
    isSelectedStart &&
      tw`
    rounded-l-lg
  `,
    isSelectedEnd &&
      tw`
      rounded-r-lg
  `,
  ]
);
export const StaticRangeWrapper = tw.div`
  flex
  flex-col
`;
interface StaticRangeButtonProps {
  isSelected: boolean;
}
export const StaticRangeButton = styled.button(
  ({ isSelected }: StaticRangeButtonProps) => [
    tw`
      px-2
      py-2
      rounded-md
      text-left
      hover:bg-gray-100/[0.80]
    `,
    isSelected &&
      tw`
    bg-blue-200
    hover:bg-blue-300/[0.80]
    text-blue-600
    `,
  ]
);

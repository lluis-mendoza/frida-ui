import tw, { styled } from 'twin.macro';

interface FieldContainerProps {
  block?: boolean;
}
export const FieldContainer = styled.div(({ block }: FieldContainerProps) => [
  tw`
    relative
    inline-flex
    flex-col
    text-left
    w-auto
    `,
  (block ?? false) && tw`w-full`,
]);

export const FieldWrapper = tw.div`
    relative
    inline-flex
    justify-between
    flex-row
    items-center
    rounded-md
    overflow-hidden
    border-2
    px-2
    ring-0
    shadow-sm
    gap-4
    bg-gray-50
    text-gray-700
    border-gray-300
    hover:border-gray-400
    ring-blue-300
    focus-within:border-blue-400
    focus-within:hover:border-blue-500
    focus-within:ring-1
`;

export type FieldSize = 'sm' | 'md' | 'lg';
const fieldSizeLarge = tw`text-lg px-5 h-12 min-w-[3rem]`;
const fieldSizeMedium = tw`text-base px-3 h-11 min-w-[3rem]`;
const fieldSizeSmall = tw`text-xs px-2 h-6 min-w-[1.5rem]`;

export const FieldSizes = {
  sm: fieldSizeSmall,
  md: fieldSizeMedium,
  lg: fieldSizeLarge,
};
export const Label = tw.span`
    text-sm
    font-semibold
    text-gray-700
    leading-tight
`;
export const FieldButton = tw.button`
    outline-none
    h-8
    w-8
`;

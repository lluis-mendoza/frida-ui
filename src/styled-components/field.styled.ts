import tw, { styled } from 'twin.macro';

export interface FieldProps extends FieldContainerProps {
  size?: FieldSize;
  variant?: FieldVariant;
  className?: string;
}
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
interface FieldWrapperProps {
  isDisabled?: boolean;
}
export const FieldWrapper = styled.div(({ isDisabled }: FieldWrapperProps) => [
  tw`
  relative
  w-fit
  min-w-full
  inline-flex
  flex-row
  justify-between
  items-center
  ring-0
  gap-4
  bg-gray-50
  text-gray-700
  focus-within:ring-2
`,
  (isDisabled ?? false) &&
    tw`
    focus-within:border-gray-300
    focus-within:hover:border-gray-400
    focus-within:ring-0
    cursor-not-allowed
    bg-gray-100
    [&>*]:!text-gray-400
    [&>*]:!pointer-events-none`,
]);

export type FieldVariant = 'default' | 'warning' | 'error';
const fieldVariantDefault = tw`border-gray-300 hover:border-gray-400 ring-blue-300 focus-within:border-blue-400 focus-within:hover:border-blue-500`;
const fieldVariantWarining = tw`border-yellow-300 hover:border-yellow-400 ring-yellow-300 focus-within:border-yellow-400 focus-within:hover:border-yellow-500`;
const fieldVariantError = tw`border-red-300 hover:border-red-400 ring-red-300 focus-within:border-red-400 focus-within:hover:border-red-500`;

export const FieldVariants = {
  default: fieldVariantDefault,
  warning: fieldVariantWarining,
  error: fieldVariantError,
};
export type FieldSize = 'sm' | 'md' | 'lg';
const fieldSizeLarge = tw`text-lg px-6 h-14 rounded-xl border-[3px]`;
const fieldSizeMedium = tw`text-base px-4 h-12 rounded-xl border-[2px]`;
const fieldSizeSmall = tw`text-sm px-3 h-8 rounded-md border-2`;

export const FieldSizes = {
  sm: fieldSizeSmall,
  md: fieldSizeMedium,
  lg: fieldSizeLarge,
};
const skeletonSizeLarge = tw`h-14`;
const skeletonSizeMedium = tw`h-12`;
const skeletonSizeSmall = tw`h-8`;

export const SkeletonSizes = {
  sm: skeletonSizeSmall,
  md: skeletonSizeMedium,
  lg: skeletonSizeLarge,
};

export interface LabelProps {
  isRequired: boolean;
}
export const Label = styled.label(({ isRequired }: LabelProps) => [
  tw`
  text-sm
  font-semibold
  text-gray-700
  leading-tight
  mb-[0.3rem]
  whitespace-nowrap
  `,

  isRequired &&
    tw`
      after:(
        content-['*']
      text-red-500
        ml-[0.1rem])
  `,
]);

export const FieldButton = tw.button`
  outline-none
  flex-shrink-0  
  stroke-gray-400
  `;
export const fieldIconSizeLarge = tw`w-7 h-7`;
export const fieldIconSizeMedium = tw`w-6 h-6`;
export const fieldIconSizeSmall = tw`w-5 h-5`;

export const FieldIconSizes = {
  sm: fieldIconSizeSmall,
  md: fieldIconSizeMedium,
  lg: fieldIconSizeLarge,
};
export const FieldError = tw.div`
  text-red-500
  text-sm
  font-semibold
  mt-2
`;

import tw from 'twin.macro';

const spinnerColorPrimary = tw`stroke-blue-500`;
const spinnerColorSuccess = tw`stroke-green-500`;
const spinnerColorError = tw`stroke-red-500`;
const spinnerColorWarning = tw`stroke-yellow-500`;
const spinnerColorInfo = tw`stroke-gray-500`;

const spinnerVariantText = tw``;
const spinnerVariantContained = tw`stroke-white`;
const spinnerVariantOutlined = tw``;

const spinnerSizeSmall = tw`h-[1rem] w-[1rem]`;
const spinnerSizeMedium = tw`h-[1.5rem] w-[1.5rem]`;
const spinnerSizeLarge = tw`h-[2rem] w-[2rem]`;

export const SpinnerColors = {
  primary: spinnerColorPrimary,
  success: spinnerColorSuccess,
  error: spinnerColorError,
  warning: spinnerColorWarning,
  info: spinnerColorInfo,
};
export const SpinnerVariants = {
  text: spinnerVariantText,
  contained: spinnerVariantContained,
  outlined: spinnerVariantOutlined,
};

export const SpinnerSizes = {
  sm: spinnerSizeSmall,
  md: spinnerSizeMedium,
  lg: spinnerSizeLarge,
};

export const SpinnerStrokeWidth = {
  sm: 2,
  md: 3,
  lg: 4,
};

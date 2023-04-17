import { BiCheckCircle, BiInfoCircle, BiX, BiXCircle } from 'react-icons/bi';
import { RiErrorWarningLine } from 'react-icons/ri';
import tw from 'twin.macro';

export const ToastContainer = tw.div`
    flex
    flex-col
    gap-4
    fixed
    md:bottom-10
    md:top-auto
    md:right-auto
    top-5
    left-5
    right-5
    md:min-w-[30rem]
    z-50
`;

export const AlertContainer = tw.div`
    p-4
    rounded-xl
    flex
    flex-row
    items-center
    md:text-xl
    sm:text-lg
    text-base
    gap-3
    h-fit
`;
export const CloseButton = tw.button`
  outline-none
  ml-auto
  flex-shrink-0
`;
export const CloseIcon = tw(BiX)`
  w-9
  h-9
`;
export const iconProps = {
  size: `28px`,
};
export const AlertIcon = tw.div`
  flex-shrink-0
`;
export const AlertIcons = {
  error: BiXCircle(iconProps),
  warning: RiErrorWarningLine(iconProps),
  success: BiCheckCircle(iconProps),
  info: BiInfoCircle(iconProps),
};
export const alertVariantError = tw`bg-red-400 text-red-900`;
export const alertVariantWarning = tw`bg-yellow-400 text-yellow-900`;
export const alertVariantSuccess = tw`bg-green-400 text-green-900`;
export const alertVariantInfo = tw`bg-blue-400 text-blue-900`;

export const AlertVariants = {
  error: alertVariantError,
  warning: alertVariantWarning,
  success: alertVariantSuccess,
  info: alertVariantInfo,
};

import { motion } from 'framer-motion';
import { BiX } from 'react-icons/bi';
import tw, { css, styled } from 'twin.macro';

interface ModalProps {
  width?: number;
  height?: number;
}
export const Underlay = tw.div`
    fixed
    inset-0
    flex
    items-center
    justify-center
    z-50
`;

export const ModalBg = tw(motion.div)`
  fixed
  inset-0
  bg-gray-500
  opacity-75
  z-0  
  pointer-events-none
`;

export const ModalContainer = styled(motion.div)(
  ({ width, height }: ModalProps) => [
    tw`
    relative
    z-50
    shadow-lg
    border
    border-gray-300
    bg-white
    rounded-md
    border-solid
    flex
    flex-col
    items-center
    overflow-hidden
  `,
    css({
      width,
      height,
    }),
  ]
);

export const ModalHeader = tw.div`
  w-full
  flex
  flex-row
  justify-between
`;
export const ModalTitle = tw.span`
  font-semibold
  md:text-2xl
  text-xl
`;
export const ModalContent = tw.div`
  relative
  flex-1
  w-full
  overflow-auto
`;
export const CloseButton = tw.button`
  outline-none
`;
export const CloseIcon = tw(BiX)`
  w-9
  h-9
  text-gray-400
  hover:text-gray-500
`;

export const modalSizeLarge = tw`p-5 m-5 max-w-7xl h-full w-full max-h-[90vh]`;
export const modalSizeMedium = tw`p-5 m-5 max-w-4xl h-full w-full max-h-[80vh]`;
export const modalSizeSmall = tw`p-5 m-5 max-w-xl h-full w-full max-h-[60vh]`;
export const modalSizeExtraSmall = tw`p-5 m-5 max-w-md h-full w-full max-h-[35vh]`;

export const ModalSizes = {
  xs: modalSizeExtraSmall,
  sm: modalSizeSmall,
  md: modalSizeMedium,
  lg: modalSizeLarge,
};

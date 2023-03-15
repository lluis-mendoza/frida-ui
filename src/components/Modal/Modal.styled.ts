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
  absolute
  inset-0
  bg-gray-500
  opacity-75
  z-0
`;

export const ModalContainer = styled(motion.div)(
  ({ width, height }: ModalProps) => [
    tw`
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
  w-full
  h-full
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

export const modalSizeLarge = tw``;
export const modalSizeMedium = tw`p-5`;
export const modalSizeSmall = tw``;

export const ModalSizes = {
  sm: modalSizeSmall,
  md: modalSizeMedium,
  lg: modalSizeLarge,
};

import { motion } from 'framer-motion';
import tw, { styled } from 'twin.macro';

export const TabsContainer = tw.div`
    relative
    flex
    flex-col
    h-full
    flex-auto
    overflow-auto
`;

export const TabList = tw.div`
    relative
    flex
    flex-row
`;

interface TabItemProps {
  isSelected: boolean;
  isDisabled: boolean;
}
export const TabItem = styled.div(({ isSelected }: TabItemProps) => [
  tw`
    outline-none
    relative
    cursor-pointer
    text-lg
    font-medium
    text-gray-600
    rounded-t-xl
    py-2
    px-5
    mb-2
    ease-in-out
    duration-300
      `,
  isSelected &&
    tw`
          text-blue-600
      `,
]);
export const Slider = tw(motion.div)`
    absolute
    -bottom-1
    -left-0
    bg-blue-600
    h-[4px]
    w-full
`;

export const TabContent = tw.div`
    flex-1
    relative
    flex
    flex-col
    rounded-md
    bg-white
    p-4
    overflow-auto
`;

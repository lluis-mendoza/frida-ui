import { FaInbox } from 'react-icons/fa';
import tw from 'twin.macro';

export const EmptyWrapper = tw.div`
    inline-flex
    flex-col
    items-center
    justify-center
`;

export const EmptyIcon = tw(FaInbox)`
    fill-gray-300
`;

const iconSizeSmall = tw`w-20 h-20`;
const iconSizeMedium = tw`w-28 h-28`;
const iconSizeLarge = tw`w-28 h-28`;

export const EmptyIconSizes = {
  sm: iconSizeSmall,
  md: iconSizeMedium,
  lg: iconSizeLarge,
};
export const EmptyText = tw.div`
    text-gray-400
    text-lg
    select-none
`;
const textSizeSmall = tw`text-lg`;
const textSizeMedium = tw`text-xl`;
const textSizeLarge = tw`text-2xl`;

export const EmptyTextSizes = {
  sm: textSizeSmall,
  md: textSizeMedium,
  lg: textSizeLarge,
};

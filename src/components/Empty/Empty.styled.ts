import { FaInbox } from 'react-icons/fa';
import tw from 'twin.macro';

export const EmptyWrapper = tw.div`
    inline-flex
    flex-col
    items-center
    justify-center
`;

export const EmptyIcon = tw(FaInbox)`
    w-20
    h-20
    fill-gray-300
`;

export const EmptyText = tw.div`
    text-gray-400
    text-lg
    select-none
`;

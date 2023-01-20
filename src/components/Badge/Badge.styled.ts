import tw from 'twin.macro';

export const StyledBadge = tw.span`
    inline-flex
    px-4
    items-center
    justify-center
    rounded-xl
`;

const badgeColorGreen = tw`bg-green-500 text-green-500 border-green-500`;
const badgeColorYellow = tw`bg-yellow-500 text-yellow-500 border-yellow-500`;
const badgeColorBlue = tw`bg-blue-500 text-blue-500 border-blue-500`;
const badgeColorRed = tw`bg-red-500 text-red-500 border-red-500`;
const badgeColorGray = tw`bg-gray-500 text-gray-500 border-gray-500`;

export const BadgeColors = {
  green: badgeColorGreen,
  yellow: badgeColorYellow,
  blue: badgeColorBlue,
  red: badgeColorRed,
  gray: badgeColorGray,
};

const badgeVariantContained = tw`text-white`;
const badgeVariantOutlined = tw`bg-transparent border-2`;

export const BadgeVariants = {
  contained: badgeVariantContained,
  outlined: badgeVariantOutlined,
};

const badgeSizeSmall = tw`text-xs`;
const badgeSizeMedium = tw`text-sm`;
const badgeSizeLarge = tw`text-base`;

export const BadgeSizes = {
  sm: badgeSizeSmall,
  md: badgeSizeMedium,
  lg: badgeSizeLarge,
};

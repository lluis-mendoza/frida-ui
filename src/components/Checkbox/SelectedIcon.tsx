import { motion } from 'framer-motion';

interface SelectedIconProps {
  animate: boolean;
}
const SelectedIcon = ({ animate }: SelectedIconProps) => {
  const animation = animate
    ? { initial: { strokeDashoffset: 66 }, animate: { strokeDashoffset: 44 } }
    : { strokeDashoffset: 44 };
  return (
    <motion.polyline
      points="1 9 7 14 15 4"
      fill="none"
      strokeWidth={3}
      strokeDasharray={22}
      {...animation}
    />
  );
};

export default SelectedIcon;

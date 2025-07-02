import Image from 'next/image';
import { APP_CONFIG } from '../../lib/constants';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'header';
  className?: string;
  priority?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'large', 
  className = '', 
  priority = false 
}) => {
  const getDimensions = () => {
    switch (size) {
      case 'small':
        return { width: APP_CONFIG.logo.smallWidth, height: APP_CONFIG.logo.smallHeight };
      case 'medium':
        return { width: APP_CONFIG.logo.smallWidth, height: APP_CONFIG.logo.smallHeight };
      case 'header':
        return { width: APP_CONFIG.logo.headerWidth, height: APP_CONFIG.logo.headerHeight };
      case 'large':
      default:
        return { width: APP_CONFIG.logo.width, height: APP_CONFIG.logo.height };
    }
  };

  const { width, height } = getDimensions();

  return (
    <Image
      className={`relative drop-shadow-[0_0_0.3rem_#ffffff70] dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert transition-all duration-700 ${className}`}
      src="/MathAI.png"
      alt={`${APP_CONFIG.name} Logo`}
      width={width}
      height={height}
      priority={priority}
      style={{ width: 'auto', height: 'auto' }}
    />
  );
};

export default Logo; 
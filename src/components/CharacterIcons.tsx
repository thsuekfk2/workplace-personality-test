'use client';

interface CharacterIconProps {
  type: string;
  size?: number;
  className?: string;
}

export default function CharacterIcon({ type, size = 80, className = "" }: CharacterIconProps) {
  const iconStyle = {
    width: size,
    height: size,
  };

  switch (type) {
    case 'innovator':
      return (
        <svg 
          viewBox="0 0 100 100" 
          style={iconStyle} 
          className={`${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" fill="#FFE4E1" stroke="#FF6B6B" strokeWidth="3"/>
          <circle cx="35" cy="40" r="3" fill="#FF6B6B"/>
          <circle cx="65" cy="40" r="3" fill="#FF6B6B"/>
          <path d="M35 65 Q50 75 65 65" stroke="#FF6B6B" strokeWidth="2" fill="none"/>
          <circle cx="50" cy="25" r="8" fill="#FFD700" stroke="#FFA500" strokeWidth="2"/>
          <path d="M42 20 L45 15 M50 18 L50 12 M58 20 L55 15" stroke="#FFA500" strokeWidth="2"/>
          <path d="M30 30 L25 25 M70 30 L75 25" stroke="#FFA500" strokeWidth="2"/>
        </svg>
      );

    case 'executor':
      return (
        <svg 
          viewBox="0 0 100 100" 
          style={iconStyle} 
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" fill="#E0F2F1" stroke="#4ECDC4" strokeWidth="3"/>
          <circle cx="35" cy="40" r="3" fill="#4ECDC4"/>
          <circle cx="65" cy="40" r="3" fill="#4ECDC4"/>
          <path d="M38 65 Q50 70 62 65" stroke="#4ECDC4" strokeWidth="2" fill="none"/>
          <rect x="40" y="25" width="20" height="15" fill="#4ECDC4" rx="2"/>
          <circle cx="45" cy="32" r="2" fill="#E0F2F1"/>
          <circle cx="55" cy="32" r="2" fill="#E0F2F1"/>
          <rect x="35" y="45" width="30" height="3" fill="#4ECDC4" rx="1"/>
          <rect x="38" y="50" width="24" height="2" fill="#4ECDC4" rx="1"/>
        </svg>
      );

    case 'communicator':
      return (
        <svg 
          viewBox="0 0 100 100" 
          style={iconStyle} 
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" fill="#E3F2FD" stroke="#45B7D1" strokeWidth="3"/>
          <circle cx="35" cy="40" r="3" fill="#45B7D1"/>
          <circle cx="65" cy="40" r="3" fill="#45B7D1"/>
          <path d="M35 65 Q50 75 65 65" stroke="#45B7D1" strokeWidth="2" fill="none"/>
          <ellipse cx="25" cy="35" rx="8" ry="6" fill="#45B7D1" opacity="0.7"/>
          <ellipse cx="75" cy="35" rx="8" ry="6" fill="#45B7D1" opacity="0.7"/>
          <path d="M20 32 Q15 35 20 38" stroke="#45B7D1" strokeWidth="2" fill="none"/>
          <path d="M80 32 Q85 35 80 38" stroke="#45B7D1" strokeWidth="2" fill="none"/>
          <circle cx="18" cy="35" r="2" fill="#45B7D1"/>
          <circle cx="82" cy="35" r="2" fill="#45B7D1"/>
        </svg>
      );

    case 'analyst':
      return (
        <svg 
          viewBox="0 0 100 100" 
          style={iconStyle} 
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" fill="#F3E5F5" stroke="#9B59B6" strokeWidth="3"/>
          <circle cx="35" cy="40" r="3" fill="#9B59B6"/>
          <circle cx="65" cy="40" r="3" fill="#9B59B6"/>
          <path d="M40 65 Q50 70 60 65" stroke="#9B59B6" strokeWidth="2" fill="none"/>
          <rect x="30" y="25" width="40" height="25" fill="none" stroke="#9B59B6" strokeWidth="2" rx="2"/>
          <rect x="35" y="30" width="8" height="6" fill="#9B59B6"/>
          <rect x="46" y="35" width="8" height="8" fill="#9B59B6"/>
          <rect x="57" y="32" width="8" height="11" fill="#9B59B6"/>
          <path d="M35 42 L43 38 L54 40 L65 35" stroke="#9B59B6" strokeWidth="2" fill="none"/>
        </svg>
      );

    case 'supporter':
      return (
        <svg 
          viewBox="0 0 100 100" 
          style={iconStyle} 
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" fill="#FFF3E0" stroke="#F39C12" strokeWidth="3"/>
          <circle cx="35" cy="40" r="3" fill="#F39C12"/>
          <circle cx="65" cy="40" r="3" fill="#F39C12"/>
          <path d="M35 62 Q50 72 65 62" stroke="#F39C12" strokeWidth="2" fill="none"/>
          <path d="M50 25 L55 35 L65 35 L57 42 L60 52 L50 47 L40 52 L43 42 L35 35 L45 35 Z" fill="#F39C12"/>
          <circle cx="25" cy="55" r="8" fill="#F39C12" opacity="0.6"/>
          <circle cx="75" cy="55" r="8" fill="#F39C12" opacity="0.6"/>
          <path d="M25 55 Q30 50 35 55 Q30 60 25 55" fill="#FFE0B2"/>
          <path d="M75 55 Q70 50 65 55 Q70 60 75 55" fill="#FFE0B2"/>
        </svg>
      );

    case 'leader':
      return (
        <svg 
          viewBox="0 0 100 100" 
          style={iconStyle} 
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" fill="#FFEBEE" stroke="#E74C3C" strokeWidth="3"/>
          <circle cx="35" cy="40" r="3" fill="#E74C3C"/>
          <circle cx="65" cy="40" r="3" fill="#E74C3C"/>
          <path d="M35 60 Q50 70 65 60" stroke="#E74C3C" strokeWidth="2" fill="none"/>
          <polygon points="50,15 55,25 67,25 58,33 62,45 50,38 38,45 42,33 33,25 45,25" fill="#FFD700" stroke="#E74C3C" strokeWidth="2"/>
          <rect x="45" y="50" width="10" height="8" fill="#E74C3C" rx="1"/>
          <rect x="40" y="55" width="20" height="3" fill="#E74C3C" rx="1"/>
        </svg>
      );

    case 'creator':
      return (
        <svg 
          viewBox="0 0 100 100" 
          style={iconStyle} 
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" fill="#F3E5F5" stroke="#8E44AD" strokeWidth="3"/>
          <circle cx="35" cy="40" r="3" fill="#8E44AD"/>
          <circle cx="65" cy="40" r="3" fill="#8E44AD"/>
          <path d="M35 65 Q50 75 65 65" stroke="#8E44AD" strokeWidth="2" fill="none"/>
          <rect x="35" y="25" width="30" height="20" fill="none" stroke="#8E44AD" strokeWidth="2" rx="2"/>
          <circle cx="42" cy="32" r="3" fill="#FF6B6B"/>
          <circle cx="50" cy="35" r="3" fill="#4ECDC4"/>
          <circle cx="58" cy="32" r="3" fill="#F39C12"/>
          <path d="M40 38 Q45 42 50 38 Q55 42 60 38" stroke="#8E44AD" strokeWidth="2" fill="none"/>
          <rect x="20" y="30" width="8" height="15" fill="#8E44AD" rx="4"/>
        </svg>
      );

    case 'planner':
      return (
        <svg 
          viewBox="0 0 100 100" 
          style={iconStyle} 
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" fill="#E8F5E8" stroke="#27AE60" strokeWidth="3"/>
          <circle cx="35" cy="40" r="3" fill="#27AE60"/>
          <circle cx="65" cy="40" r="3" fill="#27AE60"/>
          <path d="M38 65 Q50 70 62 65" stroke="#27AE60" strokeWidth="2" fill="none"/>
          <rect x="35" y="22" width="30" height="25" fill="none" stroke="#27AE60" strokeWidth="2" rx="2"/>
          <rect x="32" y="20" width="4" height="8" fill="#27AE60" rx="2"/>
          <rect x="64" y="20" width="4" height="8" fill="#27AE60" rx="2"/>
          <line x1="40" y1="30" x2="60" y2="30" stroke="#27AE60" strokeWidth="1"/>
          <line x1="40" y1="35" x2="55" y2="35" stroke="#27AE60" strokeWidth="1"/>
          <line x1="40" y1="40" x2="58" y2="40" stroke="#27AE60" strokeWidth="1"/>
          <circle cx="42" cy="35" r="1" fill="#27AE60"/>
          <circle cx="42" cy="40" r="1" fill="#27AE60"/>
        </svg>
      );

    default:
      return (
        <div 
          style={iconStyle} 
          className={`${className} bg-gray-200 rounded-full flex items-center justify-center text-2xl`}
        >
          ❓
        </div>
      );
  }
}
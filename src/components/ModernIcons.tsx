'use client';

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

export const QuestionIcon = ({ size = 24, className = "", color = "#6B7280" }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="17" r="1" fill={color}/>
  </svg>
);

export const ClockIcon = ({ size = 24, className = "", color = "#6B7280" }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <polyline points="12,6 12,12 16,14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ListIcon = ({ size = 24, className = "", color = "#6B7280" }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="8" y1="6" x2="21" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="8" y1="12" x2="21" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="8" y1="18" x2="21" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="3" y1="6" x2="3.01" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="3" y1="12" x2="3.01" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="3" y1="18" x2="3.01" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const BookIcon = ({ size = 24, className = "", color = "#6B7280" }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LightbulbIcon = ({ size = 24, className = "", color = "#6B7280" }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 21h6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17v4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 3a6 6 0 0 0-6 6c0 1.8.8 3.4 2 4.5V16a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.5c1.2-1.1 2-2.7 2-4.5a6 6 0 0 0-6-6z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ShareIcon = ({ size = 24, className = "", color = "#6B7280" }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="18" cy="5" r="3" stroke={color} strokeWidth="2"/>
    <circle cx="6" cy="12" r="3" stroke={color} strokeWidth="2"/>
    <circle cx="18" cy="19" r="3" stroke={color} strokeWidth="2"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke={color} strokeWidth="2"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke={color} strokeWidth="2"/>
  </svg>
);

export const RefreshIcon = ({ size = 24, className = "", color = "#6B7280" }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline points="23 4 23 10 17 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="1 20 1 14 7 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const BarChartIcon = ({ size = 24, className = "", color = "#6B7280" }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="12" y1="20" x2="12" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="18" y1="20" x2="18" y2="4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="6" y1="20" x2="6" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const TrendingUpIcon = ({ size = 24, className = "", color = "#6B7280" }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="17 6 23 6 23 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SparklesIcon = ({ size = 24, className = "", color = "#6B7280" }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 3l1.09 3.26L16 5l-2.91 1.09L12 9l-1.09-2.91L8 5l3.26-1.09L12 3z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    <path d="M19 12l1.09 3.26L23 14l-2.91 1.09L19 18l-1.09-2.91L15 14l3.26-1.09L19 12z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    <path d="M5 19l1.09 3.26L9 21l-2.91 1.09L5 25l-1.09-2.91L1 21l3.26-1.09L5 19z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

export const CheckIcon = ({ size = 24, className = "", color = "#6B7280" }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline points="20,6 9,17 4,12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const WorkIcon = ({ size = 24, className = "", color = "#6B7280" }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke={color} strokeWidth="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke={color} strokeWidth="2"/>
  </svg>
);

export const HeartIcon = ({ size = 24, className = "", color = "#6B7280" }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const WarningIcon = ({ size = 24, className = "", color = "#6B7280" }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="9" x2="12" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="17" r="1" fill={color}/>
  </svg>
);

export const ChevronDownIcon = ({ size = 24, className = "", color = "#6B7280" }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline points="6,9 12,15 18,9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ChevronUpIcon = ({ size = 24, className = "", color = "#6B7280" }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline points="18,15 12,9 6,15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ArrowLeftIcon = ({ size = 24, className = "", color = "#6B7280" }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="19" y1="12" x2="5" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="12,19 5,12 12,5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
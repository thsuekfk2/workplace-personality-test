'use client';

import { motion } from 'framer-motion';

interface DisneyCharacterProps {
  type: string;
  size?: number;
  className?: string;
  showCard?: boolean;
}

export default function DisneyStyleCharacter({ type, size = 120, className = "", showCard = true }: DisneyCharacterProps) {
  const cardStyle = {
    width: size,
    height: size * 1.2,
  };

  const getDisneyCharacter = (type: string) => {
    switch (type) {
      case 'advisor':
        return {
          name: '솔직한 조언가',
          bgColor: '#9B59B6',
          bgPattern: 'linear-gradient(135deg, #9B59B6 0%, #AF6BC5 50%, #C8A2C8 100%)',
          character: (
            <g>
              {/* 얼굴 기본 */}
              <ellipse cx="50" cy="45" rx="22" ry="20" fill="#FFDBAC"/>
              <ellipse cx="50" cy="45" rx="20" ry="18" fill="#FFE4B5"/>
              
              {/* 볼터치 */}
              <ellipse cx="35" cy="48" rx="4" ry="3" fill="#FFB3BA" opacity="0.6"/>
              <ellipse cx="65" cy="48" rx="4" ry="3" fill="#FFB3BA" opacity="0.6"/>
              
              {/* 큰 반짝이는 눈 */}
              <ellipse cx="42" cy="40" rx="6" ry="7" fill="white"/>
              <ellipse cx="58" cy="40" rx="6" ry="7" fill="white"/>
              <circle cx="42" cy="40" r="4" fill="#2C3E50"/>
              <circle cx="58" cy="40" r="4" fill="#2C3E50"/>
              <circle cx="44" cy="38" r="2" fill="white"/>
              <circle cx="60" cy="38" r="2" fill="white"/>
              <circle cx="43" cy="42" r="0.5" fill="white"/>
              <circle cx="59" cy="42" r="0.5" fill="white"/>
              
              {/* 눈썹 */}
              <path d="M36 32 Q42 30 48 32" stroke="#8B4513" strokeWidth="2" strokeLinecap="round"/>
              <path d="M52 32 Q58 30 64 32" stroke="#8B4513" strokeWidth="2" strokeLinecap="round"/>
              
              {/* 코 */}
              <ellipse cx="50" cy="46" rx="1.5" ry="1" fill="#FFB3BA"/>
              
              {/* 밝은 미소 */}
              <path d="M42 52 Q50 58 58 52" stroke="#E74C3C" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              
              {/* 머리카락 */}
              <path d="M28 40 Q30 15 50 18 Q70 15 72 40 Q68 20 50 20 Q32 20 28 40" fill="#D2691E"/>
              <circle cx="45" cy="25" r="3" fill="#DEB887"/>
              <circle cx="55" cy="23" r="2.5" fill="#DEB887"/>
              
              {/* 전구 아이디어 효과 */}
              <g transform="translate(65, 20)">
                <circle cx="0" cy="0" r="8" fill="#FFD700" opacity="0.9"/>
                <circle cx="0" cy="0" r="6" fill="#FFF700" opacity="0.7"/>
                <path d="M-6 -6 L-3 -9 M0 -8 L0 -12 M6 -6 L3 -9" stroke="#FFA500" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="0" cy="0" r="3" fill="white" opacity="0.8"/>
              </g>
              
              {/* 몸 */}
              <ellipse cx="50" cy="75" rx="18" ry="15" fill="#4A90E2"/>
              <ellipse cx="50" cy="72" rx="15" ry="12" fill="#5BA3F5"/>
              
              {/* 넥타이 */}
              <polygon points="48,65 52,65 51,80 49,80" fill="#FF6B6B"/>
              <circle cx="50" cy="67" r="2" fill="#FF8E8E"/>
              
              {/* 팔 */}
              <ellipse cx="32" cy="75" rx="6" ry="8" fill="#FFDBAC"/>
              <ellipse cx="68" cy="75" rx="6" ry="8" fill="#FFDBAC"/>
              <circle cx="32" cy="82" r="4" fill="#FFE4B5"/>
              <circle cx="68" cy="82" r="4" fill="#FFE4B5"/>
            </g>
          )
        };
      
      case 'peacemaker':
        return {
          name: '배려가 넘치는 따뜻한 평화주의자',
          bgColor: '#F39C12',
          bgPattern: 'linear-gradient(135deg, #F39C12 0%, #F7B733 50%, #FFCC5C 100%)',
          character: (
            <g>
              {/* 얼굴 */}
              <ellipse cx="50" cy="45" rx="22" ry="20" fill="#FFDBAC"/>
              <ellipse cx="50" cy="45" rx="20" ry="18" fill="#FFE4B5"/>
              
              {/* 안경 */}
              <circle cx="42" cy="40" r="8" fill="none" stroke="#2C3E50" strokeWidth="2"/>
              <circle cx="58" cy="40" r="8" fill="none" stroke="#2C3E50" strokeWidth="2"/>
              <line x1="50" y1="40" x2="50" y2="40" stroke="#2C3E50" strokeWidth="2"/>
              <circle cx="42" cy="40" r="6" fill="white" opacity="0.8"/>
              <circle cx="58" cy="40" r="6" fill="white" opacity="0.8"/>
              
              {/* 눈 (안경 뒤) */}
              <circle cx="42" cy="40" r="3" fill="#2C3E50"/>
              <circle cx="58" cy="40" r="3" fill="#2C3E50"/>
              <circle cx="43" cy="38" r="1" fill="white"/>
              <circle cx="59" cy="38" r="1" fill="white"/>
              
              {/* 진지한 눈썹 */}
              <path d="M34 32 Q42 30 50 32" stroke="#654321" strokeWidth="2" strokeLinecap="round"/>
              <path d="M50 32 Q58 30 66 32" stroke="#654321" strokeWidth="2" strokeLinecap="round"/>
              
              {/* 코 */}
              <ellipse cx="50" cy="46" rx="1.5" ry="1" fill="#FFB3BA"/>
              
              {/* 신뢰감 있는 미소 */}
              <path d="M44 52 Q50 56 56 52" stroke="#4ECDC4" strokeWidth="2" fill="none" strokeLinecap="round"/>
              
              {/* 머리카락 */}
              <path d="M28 40 Q30 18 50 20 Q70 18 72 40 Q68 22 50 22 Q32 22 28 40" fill="#654321"/>
              
              {/* 체크리스트 */}
              <g transform="translate(72, 25)">
                <rect x="-6" y="-8" width="12" height="16" fill="white" stroke="#4ECDC4" strokeWidth="1.5" rx="2"/>
                <line x1="-4" y1="-4" x2="4" y2="-4" stroke="#4ECDC4" strokeWidth="1"/>
                <line x1="-4" y1="0" x2="4" y2="0" stroke="#4ECDC4" strokeWidth="1"/>
                <line x1="-4" y1="4" x2="4" y2="4" stroke="#4ECDC4" strokeWidth="1"/>
                <circle cx="-3" cy="-4" r="1" fill="#4ECDC4"/>
                <circle cx="-3" cy="0" r="1" fill="#4ECDC4"/>
                <path d="M-4 3 L-2 5 L1 2" stroke="#4ECDC4" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </g>
              
              {/* 몸 */}
              <ellipse cx="50" cy="75" rx="18" ry="15" fill="#2C3E50"/>
              <ellipse cx="50" cy="72" rx="15" ry="12" fill="#34495E"/>
              
              {/* 팔 */}
              <ellipse cx="32" cy="75" rx="6" ry="8" fill="#FFDBAC"/>
              <ellipse cx="68" cy="75" rx="6" ry="8" fill="#FFDBAC"/>
              <circle cx="32" cy="82" r="4" fill="#FFE4B5"/>
              <circle cx="68" cy="82" r="4" fill="#FFE4B5"/>
            </g>
          )
        };

      case 'optimist':
        return {
          name: '낙천적으로 사교적인 배짱이',
          bgColor: '#45B7D1',
          bgPattern: 'linear-gradient(135deg, #45B7D1 0%, #6BC5D8 50%, #A8E6CF 100%)',
          character: (
            <g>
              {/* 얼굴 */}
              <ellipse cx="50" cy="45" rx="22" ry="20" fill="#FFDBAC"/>
              <ellipse cx="50" cy="45" rx="20" ry="18" fill="#FFE4B5"/>
              
              {/* 볼터치 */}
              <ellipse cx="35" cy="48" rx="4" ry="3" fill="#FFB3BA" opacity="0.6"/>
              <ellipse cx="65" cy="48" rx="4" ry="3" fill="#FFB3BA" opacity="0.6"/>
              
              {/* 반짝이는 눈 */}
              <ellipse cx="42" cy="40" rx="6" ry="7" fill="white"/>
              <ellipse cx="58" cy="40" rx="6" ry="7" fill="white"/>
              <circle cx="42" cy="40" r="4" fill="#2C3E50"/>
              <circle cx="58" cy="40" r="4" fill="#2C3E50"/>
              <circle cx="44" cy="38" r="2" fill="white"/>
              <circle cx="60" cy="38" r="2" fill="white"/>
              <path d="M38 35 Q42 33 46 35" stroke="#2C3E50" strokeWidth="1.5" fill="none"/>
              <path d="M54 35 Q58 33 62 35" stroke="#2C3E50" strokeWidth="1.5" fill="none"/>
              
              {/* 코 */}
              <ellipse cx="50" cy="46" rx="1.5" ry="1" fill="#FFB3BA"/>
              
              {/* 환한 미소 */}
              <path d="M40 52 Q50 62 60 52" stroke="#E74C3C" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <ellipse cx="50" cy="56" rx="8" ry="4" fill="#FFB3BA" opacity="0.3"/>
              
              {/* 머리카락 */}
              <path d="M28 40 Q30 15 50 18 Q70 15 72 40 Q68 20 50 20 Q32 20 28 40" fill="#D2691E"/>
              <ellipse cx="40" cy="22" rx="3" ry="5" fill="#DEB887"/>
              <ellipse cx="60" cy="22" rx="3" ry="5" fill="#DEB887"/>
              
              {/* 말풍선 */}
              <g transform="translate(75, 30)">
                <ellipse cx="0" cy="0" rx="12" ry="8" fill="#45B7D1" opacity="0.9"/>
                <ellipse cx="0" cy="0" rx="10" ry="6" fill="#5BC8E5"/>
                <path d="M-8 6 L-12 12 L-4 8 Z" fill="#45B7D1" opacity="0.9"/>
                <circle cx="-3" cy="-1" r="1.5" fill="white"/>
                <circle cx="0" cy="-1" r="1.5" fill="white"/>
                <circle cx="3" cy="-1" r="1.5" fill="white"/>
              </g>
              
              {/* 몸 */}
              <ellipse cx="50" cy="75" rx="18" ry="15" fill="#45B7D1"/>
              <ellipse cx="50" cy="72" rx="15" ry="12" fill="#5BC8E5"/>
              
              {/* 팔 (손짓하는 포즈) */}
              <ellipse cx="32" cy="75" rx="6" ry="8" fill="#FFDBAC" transform="rotate(-20 32 75)"/>
              <ellipse cx="68" cy="75" rx="6" ry="8" fill="#FFDBAC" transform="rotate(20 68 75)"/>
              <circle cx="28" cy="80" r="4" fill="#FFE4B5"/>
              <circle cx="72" cy="80" r="4" fill="#FFE4B5"/>
            </g>
          )
        };


      case 'leader':
        return {
          name: '진취적이며 자신감 넘치는 행동대장',
          bgColor: '#E74C3C',
          bgPattern: 'linear-gradient(135deg, #E74C3C 0%, #EC7063 50%, #F1948A 100%)',
          character: (
            <g>
              {/* 얼굴 */}
              <ellipse cx="50" cy="45" rx="22" ry="20" fill="#FFDBAC"/>
              <ellipse cx="50" cy="45" rx="20" ry="18" fill="#FFE4B5"/>
              
              {/* 자신감 있는 눈 */}
              <ellipse cx="42" cy="40" rx="5" ry="6" fill="white"/>
              <ellipse cx="58" cy="40" rx="5" ry="6" fill="white"/>
              <circle cx="42" cy="40" r="3.5" fill="#2C3E50"/>
              <circle cx="58" cy="40" r="3.5" fill="#2C3E50"/>
              <circle cx="43.5" cy="38" r="1.5" fill="white"/>
              <circle cx="59.5" cy="38" r="1.5" fill="white"/>
              
              {/* 카리스마 있는 눈썹 */}
              <path d="M36 32 Q42 30 48 34" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M52 34 Q58 30 64 32" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round"/>
              
              {/* 코 */}
              <ellipse cx="50" cy="46" rx="1.5" ry="1" fill="#FFB3BA"/>
              
              {/* 자신감 있는 미소 */}
              <path d="M43 52 Q50 58 57 52" stroke="#E74C3C" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              
              {/* 리더의 머리 */}
              <path d="M28 40 Q30 15 50 18 Q70 15 72 40 Q68 20 50 20 Q32 20 28 40" fill="#2C3E50"/>
              
              {/* 왕관 */}
              <g transform="translate(50, 20)">
                <polygon points="-12,0 -8,-8 -4,-6 0,-10 4,-6 8,-8 12,0" fill="#FFD700"/>
                <polygon points="-10,2 -6,-6 -2,-4 2,-8 6,-4 10,-6 14,2" fill="#FFA500"/>
                <circle cx="0" cy="-8" r="2" fill="#FF6B6B"/>
                <circle cx="-6" cy="-4" r="1" fill="#FF6B6B"/>
                <circle cx="6" cy="-4" r="1" fill="#FF6B6B"/>
              </g>
              
              {/* 몸 */}
              <ellipse cx="50" cy="75" rx="18" ry="15" fill="#E74C3C"/>
              <ellipse cx="50" cy="72" rx="15" ry="12" fill="#EC7063"/>
              
              {/* 넥타이 */}
              <polygon points="47,65 53,65 52,82 48,82" fill="#2C3E50"/>
              <ellipse cx="50" cy="68" rx="3" ry="2" fill="#34495E"/>
              
              {/* 팔 */}
              <ellipse cx="32" cy="75" rx="6" ry="8" fill="#FFDBAC"/>
              <ellipse cx="68" cy="75" rx="6" ry="8" fill="#FFDBAC"/>
              <circle cx="32" cy="82" r="4" fill="#FFE4B5"/>
              <circle cx="68" cy="82" r="4" fill="#FFE4B5"/>
            </g>
          )
        };


      default:
        return {
          name: '직장인',
          bgColor: '#95A5A6',
          bgPattern: 'linear-gradient(135deg, #95A5A6 0%, #BDC3C7 100%)',
          character: <circle cx="50" cy="50" r="20" fill="#95A5A6"/>
        };
    }
  };

  const data = getDisneyCharacter(type);

  if (!showCard) {
    return (
      <div className={className} style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          {data.character}
        </svg>
      </div>
    );
  }

  return (
    <motion.div 
      className={`${className} relative`}
      style={cardStyle}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      transition={{ duration: 0.3 }}
    >
      {/* 배지 카드 배경 */}
      <div 
        className="w-full h-full rounded-3xl relative overflow-hidden shadow-2xl"
        style={{ background: data.bgPattern }}
      >
        {/* 상단 로고 영역 */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
          <div className="text-white text-xs font-bold opacity-90">EMPLOYEE</div>
          <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>

        {/* 캐릭터 영역 */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center shadow-lg border-4 border-white/50">
            <svg viewBox="0 0 100 100" className="w-16 h-16">
              {data.character}
            </svg>
          </div>
        </div>

        {/* 이름 영역 */}
        <div className="absolute bottom-4 left-3 right-3">
          <div className="text-white text-center">
            <div className="text-xs font-medium opacity-90 mb-1">유형</div>
            <div className="text-sm font-bold leading-tight drop-shadow-lg">{data.name}</div>
          </div>
        </div>

        {/* 장식적 요소들 */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full"></div>
        <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/40 rounded-full"></div>
        <div className="absolute bottom-2 right-2">
          <div className="w-8 h-4 bg-white/30 rounded-full flex items-center justify-center">
            <div className="text-white text-xs font-mono">ID</div>
          </div>
        </div>

        {/* 반짝이는 효과 */}
        <div className="absolute top-4 left-4 w-3 h-3 bg-white/50 rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-6 w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>

        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/20 rounded-3xl"></div>
      </div>
    </motion.div>
  );
}
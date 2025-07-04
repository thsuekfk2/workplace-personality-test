"use client";

import { motion } from "framer-motion";

interface EmployeeCardProps {
  type: string;
  size?: number;
  className?: string;
  showCard?: boolean;
}

export default function EmployeeCardCharacter({
  type,
  size = 120,
  className = "",
  showCard = true,
}: EmployeeCardProps) {
  const cardStyle = {
    width: size,
    height: size * 1.2,
  };

  const getCharacterData = (type: string) => {
    switch (type) {
      case "innovator":
        return {
          name: "아이디어 뱅크형",
          bgColor: "#FF6B6B",
          bgPattern: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
          character: (
            <g>
              {/* 얼굴 */}
              <circle
                cx="50"
                cy="40"
                r="18"
                fill="#FFDBAC"
                stroke="#F4C2A1"
                strokeWidth="1"
              />
              {/* 눈 */}
              <circle cx="45" cy="36" r="2" fill="#2C3E50" />
              <circle cx="55" cy="36" r="2" fill="#2C3E50" />
              {/* 입 */}
              <path
                d="M46 44 Q50 48 54 44"
                stroke="#2C3E50"
                strokeWidth="1.5"
                fill="none"
              />
              {/* 머리카락 */}
              <path
                d="M32 35 Q35 20 50 22 Q65 20 68 35 Q65 25 50 25 Q35 25 32 35"
                fill="#8B4513"
              />
              {/* 전구 아이디어 */}
              <circle cx="65" cy="25" r="6" fill="#FFD700" opacity="0.9" />
              <path
                d="M59 20 L62 17 M65 18 L65 14 M71 20 L68 17"
                stroke="#FFA500"
                strokeWidth="1.5"
              />
              {/* 셔츠 */}
              <rect
                x="35"
                y="55"
                width="30"
                height="25"
                fill="#4A90E2"
                rx="3"
              />
              {/* 넥타이 */}
              <polygon points="48,55 52,55 51,70 49,70" fill="#FF6B6B" />
              {/* 팔 */}
              <circle cx="30" cy="65" r="5" fill="#FFDBAC" />
              <circle cx="70" cy="65" r="5" fill="#FFDBAC" />
            </g>
          ),
        };

      case "executor":
        return {
          name: "든든한 실행형",
          bgColor: "#4ECDC4",
          bgPattern: "linear-gradient(135deg, #4ECDC4 0%, #6DD5D1 100%)",
          character: (
            <g>
              {/* 얼굴 */}
              <circle
                cx="50"
                cy="40"
                r="18"
                fill="#FFDBAC"
                stroke="#F4C2A1"
                strokeWidth="1"
              />
              {/* 안경 */}
              <circle
                cx="45"
                cy="36"
                r="5"
                fill="none"
                stroke="#2C3E50"
                strokeWidth="1.5"
              />
              <circle
                cx="55"
                cy="36"
                r="5"
                fill="none"
                stroke="#2C3E50"
                strokeWidth="1.5"
              />
              <line
                x1="50"
                y1="36"
                x2="50"
                y2="36"
                stroke="#2C3E50"
                strokeWidth="1.5"
              />
              {/* 눈 */}
              <circle cx="45" cy="36" r="1.5" fill="#2C3E50" />
              <circle cx="55" cy="36" r="1.5" fill="#2C3E50" />
              {/* 입 */}
              <path
                d="M46 43 Q50 46 54 43"
                stroke="#2C3E50"
                strokeWidth="1.5"
                fill="none"
              />
              {/* 머리카락 */}
              <path
                d="M32 35 Q35 22 50 24 Q65 22 68 35 Q65 27 50 27 Q35 27 32 35"
                fill="#654321"
              />
              {/* 체크리스트 */}
              <rect
                x="65"
                y="20"
                width="8"
                height="10"
                fill="white"
                stroke="#4ECDC4"
                strokeWidth="1"
              />
              <line
                x1="66"
                y1="23"
                x2="72"
                y2="23"
                stroke="#4ECDC4"
                strokeWidth="0.8"
              />
              <line
                x1="66"
                y1="26"
                x2="72"
                y2="26"
                stroke="#4ECDC4"
                strokeWidth="0.8"
              />
              <circle cx="67" cy="23" r="0.8" fill="#4ECDC4" />
              <circle cx="67" cy="26" r="0.8" fill="#4ECDC4" />
              {/* 셔츠 */}
              <rect
                x="35"
                y="55"
                width="30"
                height="25"
                fill="#2C3E50"
                rx="3"
              />
              {/* 팔 */}
              <circle cx="30" cy="65" r="5" fill="#FFDBAC" />
              <circle cx="70" cy="65" r="5" fill="#FFDBAC" />
            </g>
          ),
        };

      case "communicator":
        return {
          name: "소통 마스터형",
          bgColor: "#45B7D1",
          bgPattern: "linear-gradient(135deg, #45B7D1 0%, #6BC5D8 100%)",
          character: (
            <g>
              {/* 얼굴 */}
              <circle
                cx="50"
                cy="40"
                r="18"
                fill="#FFDBAC"
                stroke="#F4C2A1"
                strokeWidth="1"
              />
              {/* 눈 */}
              <circle cx="45" cy="36" r="2" fill="#2C3E50" />
              <circle cx="55" cy="36" r="2" fill="#2C3E50" />
              {/* 웃는 입 */}
              <path
                d="M44 43 Q50 49 56 43"
                stroke="#2C3E50"
                strokeWidth="1.5"
                fill="none"
              />
              {/* 머리카락 */}
              <path
                d="M32 35 Q35 20 50 22 Q65 20 68 35 Q65 25 50 25 Q35 25 32 35"
                fill="#D2691E"
              />
              {/* 말풍선 */}
              <ellipse
                cx="68"
                cy="28"
                rx="8"
                ry="6"
                fill="#45B7D1"
                opacity="0.8"
              />
              <path d="M64 32 L62 35 L66 33 Z" fill="#45B7D1" opacity="0.8" />
              <circle cx="65" cy="27" r="0.8" fill="white" />
              <circle cx="68" cy="27" r="0.8" fill="white" />
              <circle cx="71" cy="27" r="0.8" fill="white" />
              {/* 셔츠 */}
              <rect
                x="35"
                y="55"
                width="30"
                height="25"
                fill="#45B7D1"
                rx="3"
              />
              {/* 팔 */}
              <circle cx="30" cy="65" r="5" fill="#FFDBAC" />
              <circle cx="70" cy="65" r="5" fill="#FFDBAC" />
            </g>
          ),
        };

      case "analyst":
        return {
          name: "데이터 분석형",
          bgColor: "#9B59B6",
          bgPattern: "linear-gradient(135deg, #9B59B6 0%, #AF6BC5 100%)",
          character: (
            <g>
              {/* 얼굴 */}
              <circle
                cx="50"
                cy="40"
                r="18"
                fill="#FFDBAC"
                stroke="#F4C2A1"
                strokeWidth="1"
              />
              {/* 안경 */}
              <rect
                x="40"
                y="32"
                width="20"
                height="8"
                fill="none"
                stroke="#2C3E50"
                strokeWidth="1.5"
                rx="4"
              />
              <line
                x1="50"
                y1="34"
                x2="50"
                y2="34"
                stroke="#2C3E50"
                strokeWidth="1.5"
              />
              {/* 눈 */}
              <circle cx="45" cy="36" r="1.5" fill="#2C3E50" />
              <circle cx="55" cy="36" r="1.5" fill="#2C3E50" />
              {/* 입 */}
              <line
                x1="47"
                y1="44"
                x2="53"
                y2="44"
                stroke="#2C3E50"
                strokeWidth="1.5"
              />
              {/* 머리카락 */}
              <path
                d="M32 35 Q35 22 50 24 Q65 22 68 35 Q65 27 50 27 Q35 27 32 35"
                fill="#4A4A4A"
              />
              {/* 차트 */}
              <rect
                x="65"
                y="20"
                width="10"
                height="12"
                fill="white"
                stroke="#9B59B6"
                strokeWidth="1"
              />
              <rect x="67" y="28" width="1.5" height="3" fill="#9B59B6" />
              <rect x="69" y="25" width="1.5" height="6" fill="#9B59B6" />
              <rect x="71" y="22" width="1.5" height="9" fill="#9B59B6" />
              {/* 셔츠 */}
              <rect
                x="35"
                y="55"
                width="30"
                height="25"
                fill="#6C5CE7"
                rx="3"
              />
              {/* 팔 */}
              <circle cx="30" cy="65" r="5" fill="#FFDBAC" />
              <circle cx="70" cy="65" r="5" fill="#FFDBAC" />
            </g>
          ),
        };

      case "supporter":
        return {
          name: "따뜻한 지원형",
          bgColor: "#F39C12",
          bgPattern: "linear-gradient(135deg, #F39C12 0%, #F7B733 100%)",
          character: (
            <g>
              {/* 얼굴 */}
              <circle
                cx="50"
                cy="40"
                r="18"
                fill="#FFDBAC"
                stroke="#F4C2A1"
                strokeWidth="1"
              />
              {/* 눈 */}
              <path
                d="M42 34 Q45 36 48 34"
                stroke="#2C3E50"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M52 34 Q55 36 58 34"
                stroke="#2C3E50"
                strokeWidth="1.5"
                fill="none"
              />
              {/* 웃는 입 */}
              <path
                d="M44 43 Q50 48 56 43"
                stroke="#2C3E50"
                strokeWidth="1.5"
                fill="none"
              />
              {/* 머리카락 - 포니테일 */}
              <path
                d="M32 35 Q35 20 50 22 Q65 20 68 35 Q65 25 50 25 Q35 25 32 35"
                fill="#8B4513"
              />
              <ellipse cx="72" cy="30" rx="3" ry="8" fill="#8B4513" />
              {/* 하트 */}
              <path
                d="M65 25 Q68 22 71 25 Q68 28 65 25 Q62 22 65 25"
                fill="#FF69B4"
              />
              {/* 셔츠 */}
              <rect
                x="35"
                y="55"
                width="30"
                height="25"
                fill="#F39C12"
                rx="3"
              />
              {/* 팔 */}
              <circle cx="30" cy="65" r="5" fill="#FFDBAC" />
              <circle cx="70" cy="65" r="5" fill="#FFDBAC" />
            </g>
          ),
        };

      case "emotion":
        return {
          name: "자연스러운 리더형",
          bgColor: "#E74C3C",
          bgPattern: "linear-gradient(135deg, #E74C3C 0%, #EC7063 100%)",
          character: (
            <g>
              {/* 얼굴 */}
              <circle
                cx="50"
                cy="40"
                r="18"
                fill="#FFDBAC"
                stroke="#F4C2A1"
                strokeWidth="1"
              />
              {/* 눈 */}
              <circle cx="45" cy="36" r="2" fill="#2C3E50" />
              <circle cx="55" cy="36" r="2" fill="#2C3E50" />
              {/* 자신감 있는 입 */}
              <path
                d="M45 43 Q50 47 55 43"
                stroke="#2C3E50"
                strokeWidth="1.5"
                fill="none"
              />
              {/* 머리카락 */}
              <path
                d="M32 35 Q35 20 50 22 Q65 20 68 35 Q65 25 50 25 Q35 25 32 35"
                fill="#2C3E50"
              />
              {/* 왕관 */}
              <polygon
                points="42,25 46,20 50,22 54,20 58,25"
                fill="#FFD700"
                stroke="#FFA500"
                strokeWidth="0.5"
              />
              <circle cx="50" cy="21" r="1" fill="#FF6B6B" />
              {/* 셔츠 */}
              <rect
                x="35"
                y="55"
                width="30"
                height="25"
                fill="#E74C3C"
                rx="3"
              />
              {/* 넥타이 */}
              <polygon points="48,55 52,55 51,70 49,70" fill="#2C3E50" />
              {/* 팔 */}
              <circle cx="30" cy="65" r="5" fill="#FFDBAC" />
              <circle cx="70" cy="65" r="5" fill="#FFDBAC" />
            </g>
          ),
        };

      case "creator":
        return {
          name: "창작 예술형",
          bgColor: "#8E44AD",
          bgPattern: "linear-gradient(135deg, #8E44AD 0%, #A569BD 100%)",
          character: (
            <g>
              {/* 얼굴 */}
              <circle
                cx="50"
                cy="40"
                r="18"
                fill="#FFDBAC"
                stroke="#F4C2A1"
                strokeWidth="1"
              />
              {/* 눈 */}
              <circle cx="45" cy="36" r="2" fill="#2C3E50" />
              <circle cx="55" cy="36" r="2" fill="#2C3E50" />
              {/* 입 */}
              <path
                d="M46 43 Q50 47 54 43"
                stroke="#2C3E50"
                strokeWidth="1.5"
                fill="none"
              />
              {/* 머리카락 - 아티스틱 */}
              <path
                d="M32 35 Q35 18 50 20 Q65 18 68 35 Q65 23 50 23 Q35 23 32 35"
                fill="#E67E22"
              />
              <circle cx="68" cy="28" r="2" fill="#FF6B6B" />
              <circle cx="70" cy="24" r="1.5" fill="#3498DB" />
              <circle cx="72" cy="30" r="1" fill="#F39C12" />
              {/* 팔레트 */}
              <ellipse
                cx="25"
                cy="30"
                rx="5"
                ry="3"
                fill="white"
                stroke="#8E44AD"
                strokeWidth="1"
              />
              <circle cx="23" cy="29" r="0.8" fill="#FF6B6B" />
              <circle cx="25" cy="28" r="0.8" fill="#3498DB" />
              <circle cx="27" cy="31" r="0.8" fill="#F39C12" />
              {/* 셔츠 */}
              <rect
                x="35"
                y="55"
                width="30"
                height="25"
                fill="#8E44AD"
                rx="3"
              />
              {/* 팔 */}
              <circle cx="30" cy="65" r="5" fill="#FFDBAC" />
              <circle cx="70" cy="65" r="5" fill="#FFDBAC" />
            </g>
          ),
        };

      case "planner":
        return {
          name: "체계적 기획형",
          bgColor: "#27AE60",
          bgPattern: "linear-gradient(135deg, #27AE60 0%, #58D68D 100%)",
          character: (
            <g>
              {/* 얼굴 */}
              <circle
                cx="50"
                cy="40"
                r="18"
                fill="#FFDBAC"
                stroke="#F4C2A1"
                strokeWidth="1"
              />
              {/* 눈 */}
              <circle cx="45" cy="36" r="2" fill="#2C3E50" />
              <circle cx="55" cy="36" r="2" fill="#2C3E50" />
              {/* 만족한 입 */}
              <path
                d="M46 43 Q50 46 54 43"
                stroke="#2C3E50"
                strokeWidth="1.5"
                fill="none"
              />
              {/* 머리카락 */}
              <path
                d="M32 35 Q35 22 50 24 Q65 22 68 35 Q65 27 50 27 Q35 27 32 35"
                fill="#8B4513"
              />
              {/* 스케줄러/달력 */}
              <rect
                x="65"
                y="20"
                width="10"
                height="12"
                fill="white"
                stroke="#27AE60"
                strokeWidth="1"
              />
              <line
                x1="67"
                y1="22"
                x2="73"
                y2="22"
                stroke="#27AE60"
                strokeWidth="0.5"
              />
              <circle cx="68" cy="24" r="0.5" fill="#27AE60" />
              <circle cx="70" cy="24" r="0.5" fill="#27AE60" />
              <circle cx="72" cy="24" r="0.5" fill="#27AE60" />
              <circle cx="68" cy="26" r="0.5" fill="#FF6B6B" />
              <circle cx="70" cy="26" r="0.5" fill="#27AE60" />
              <circle cx="72" cy="26" r="0.5" fill="#27AE60" />
              {/* 셔츠 */}
              <rect
                x="35"
                y="55"
                width="30"
                height="25"
                fill="#27AE60"
                rx="3"
              />
              {/* 팔 */}
              <circle cx="30" cy="65" r="5" fill="#FFDBAC" />
              <circle cx="70" cy="65" r="5" fill="#FFDBAC" />
            </g>
          ),
        };

      default:
        return {
          name: "직장인",
          bgColor: "#95A5A6",
          bgPattern: "linear-gradient(135deg, #95A5A6 0%, #BDC3C7 100%)",
          character: <circle cx="50" cy="50" r="20" fill="#95A5A6" />,
        };
    }
  };

  const data = getCharacterData(type);

  if (!showCard) {
    return (
      <div className={className} style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
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
        className="w-full h-full rounded-2xl relative overflow-hidden shadow-2xl"
        style={{ background: data.bgPattern }}
      >
        {/* 상단 로고 영역 */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
          <div className="text-white text-xs font-bold opacity-80">
            EMPLOYEE
          </div>
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>

        {/* 캐릭터 영역 */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 100 100" className="w-14 h-14">
              {data.character}
            </svg>
          </div>
        </div>

        {/* 이름 영역 */}
        <div className="absolute bottom-6 left-3 right-3">
          <div className="text-white text-center">
            <div className="text-xs font-medium opacity-90 mb-1">유형</div>
            <div className="text-sm font-bold leading-tight">{data.name}</div>
          </div>
        </div>

        {/* 장식적 요소들 */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full"></div>
        <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/30 rounded-full"></div>
        <div className="absolute bottom-2 right-2">
          <div className="w-8 h-4 bg-white/20 rounded-full flex items-center justify-center">
            <div className="text-white text-xs font-mono">ID</div>
          </div>
        </div>

        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 rounded-2xl"></div>
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "motion/react";
import Image from "next/image";

interface CharacterProps {
  type: string;
  size?: number;
  className?: string;
  showCard?: boolean;
}

export default function Character({
  type,
  size = 120,
  className = "",
  showCard = true,
}: CharacterProps) {
  const cardStyle = {
    width: size,
    height: size,
  };

  const getCharacter = (type: string) => {
    switch (type) {
      case "extrovert":
        return {
          name: "진취적이며 자신감 넘치는 행동대장",
          bgColor: "#E74C3C",
          bgPattern:
            "linear-gradient(135deg, #E74C3C 0%, #EC7063 50%, #F1948A 100%)",
          imagePath: "/images/extrovert.png",
        };
      case "introvert":
        return {
          name: "낙천적으로 사교적인 배짱이",
          bgColor: "#45B7D1",
          bgPattern:
            "linear-gradient(135deg, #45B7D1 0%, #6BC5D8 50%, #A8E6CF 100%)",
          imagePath: "/images/introvert.png",
        };

      case "thought":
        return {
          name: "솔직한 조언가",
          bgColor: "#9B59B6",
          bgPattern:
            "linear-gradient(135deg, #9B59B6 0%, #AF6BC5 50%, #C8A2C8 100%)",
          imagePath: "/images/thought.png",
        };

      case "emotion":
        return {
          name: "배려가 넘치는 따뜻한 평화주의자",
          bgColor: "#F39C12",
          bgPattern:
            "linear-gradient(135deg, #F39C12 0%, #F7B733 50%, #FFCC5C 100%)",
          imagePath: "/images/emotion.png",
        };
      default:
        return {
          name: "직장인",
          bgColor: "#95A5A6",
          bgPattern: "linear-gradient(135deg, #95A5A6 0%, #BDC3C7 100%)",
          imagePath: "/images/솔직한 조언가.png",
        };
    }
  };

  const data = getCharacter(type);

  if (!showCard) {
    return (
      <div className={className} style={{ width: size, height: size }}>
        <Image
          src={data.imagePath}
          alt={data.name}
          width={size}
          height={size}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
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
        className="relative w-full h-full overflow-hidden rounded-3xl"
        style={{ background: data.bgPattern }}
      >
        {/* 캐릭터 영역 */}
        <div className="absolute transform -translate-x-1/2 top-6 left-1/2">
          <div className="flex items-center justify-center w-24 h-24 overflow-hidden border-4 rounded-full shadow-lg bg-white/95 border-white/50">
            <Image
              src={data.imagePath}
              alt={data.name}
              width={100}
              height={100}
              className="object-contain w-24 h-24"
            />
          </div>
        </div>

        {/* 장식적 요소들 */}
        <div className="absolute w-2 h-2 rounded-full top-2 right-2 bg-white/40"></div>
        <div className="absolute w-1 h-1 rounded-full bottom-2 left-2 bg-white/40"></div>

        {/* 반짝이는 효과 */}
        <div className="absolute w-3 h-3 rounded-full top-4 left-4 bg-white/50 animate-pulse"></div>
        <div
          className="absolute w-2 h-2 rounded-full top-8 right-6 bg-white/40 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>

        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 via-transparent to-white/20 rounded-3xl"></div>
      </div>
    </motion.div>
  );
}

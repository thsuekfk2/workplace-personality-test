'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalityTypes } from '@/lib/data';
import Character from '@/components/Characters';
import { 
  ChevronDownIcon, 
  ChevronUpIcon,
  SparklesIcon,
  HeartIcon,
  WarningIcon,
  CheckIcon,
  BookIcon,
  ArrowLeftIcon
} from '@/components/ModernIcons';

interface AllResultsPageProps {
  onBack: () => void;
}

export default function AllResultsPage({ onBack }: AllResultsPageProps) {
  const [expandedTypes, setExpandedTypes] = useState<Set<string>>(new Set());

  const toggleExpanded = (typeId: string) => {
    const newExpanded = new Set(expandedTypes);
    if (newExpanded.has(typeId)) {
      newExpanded.delete(typeId);
    } else {
      newExpanded.add(typeId);
    }
    setExpandedTypes(newExpanded);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeftIcon size={20} />
            <span>결과로 돌아가기</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              모든 직장인 유형 알아보기
            </h1>
            <p className="text-lg text-gray-600">
              4가지 직장인 성격 유형의 특징을 자세히 살펴보세요
            </p>
          </div>
        </motion.div>

        {/* Accordion 리스트 */}
        <div className="space-y-4">
          {personalityTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="modern-card overflow-hidden"
            >
              {/* Accordion 헤더 */}
              <button
                onClick={() => toggleExpanded(type.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Character type={type.character} size={60} showCard={false} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {type.name}
                    </h3>
                    <p className="text-gray-600">
                      {type.description}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {expandedTypes.has(type.id) ? (
                    <ChevronUpIcon size={24} color="#6B7280" />
                  ) : (
                    <ChevronDownIcon size={24} color="#6B7280" />
                  )}
                </div>
              </button>

              {/* Accordion 내용 */}
              <AnimatePresence>
                {expandedTypes.has(type.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        
                        {/* 왼쪽 컬럼 */}
                        <div className="space-y-6">
                          {/* 주요 특징 */}
                          <div>
                            <div className="flex items-center space-x-2 mb-3">
                              <SparklesIcon size={18} color={type.color} />
                              <h4 className="font-semibold text-gray-800">주요 특징</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {type.traits.map((trait, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 rounded-full text-sm font-medium text-white shadow-md"
                                  style={{ backgroundColor: type.color }}
                                >
                                  {trait}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* 상세 설명 */}
                          <div>
                            <div className="flex items-center space-x-2 mb-3">
                              <BookIcon size={18} color="#6B7280" />
                              <h4 className="font-semibold text-gray-800">특징 설명</h4>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                              {type.detailedDescription}
                            </p>
                          </div>
                        </div>

                        {/* 오른쪽 컬럼 */}
                        <div className="space-y-6">
                          {/* 나에게 필요한 것 */}
                          <div>
                            <div className="flex items-center space-x-2 mb-3">
                              <HeartIcon size={18} color="#10B981" />
                              <h4 className="font-semibold text-gray-800">필요한 것</h4>
                            </div>
                            <div className="space-y-2">
                              {type.needs.map((need, idx) => (
                                <div
                                  key={idx}
                                  className="p-3 bg-green-50 rounded-lg border-l-4"
                                  style={{ borderLeftColor: type.color }}
                                >
                                  <span className="text-gray-700 text-sm">{need}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 삐뚤어졌을 때 */}
                          <div>
                            <div className="flex items-center space-x-2 mb-3">
                              <WarningIcon size={18} color="#F59E0B" />
                              <h4 className="font-semibold text-gray-800">주의사항</h4>
                            </div>
                            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                              <p className="text-gray-700 text-sm leading-relaxed">
                                {type.whenDistorted}
                              </p>
                            </div>
                          </div>

                          {/* 추천 직무 */}
                          <div>
                            <div className="flex items-center space-x-2 mb-3">
                              <CheckIcon size={18} color="#6B7280" />
                              <h4 className="font-semibold text-gray-800">추천 직무</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {type.recommendedJobs.map((job, idx) => (
                                <div
                                  key={idx}
                                  className="p-3 bg-gray-50 rounded-lg text-center"
                                >
                                  <span className="text-gray-700 text-sm font-medium">{job}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* 하단 CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="modern-card p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              나의 직장인 유형이 궁금하다면?
            </h3>
            <p className="text-gray-600 mb-6">
              10개의 간단한 질문으로 나만의 직장인 유형을 찾아보세요!
            </p>
            <button
              onClick={onBack}
              className="modern-button-primary px-8 py-3 text-lg font-semibold"
            >
              테스트 다시 하기
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
import { Metadata } from 'next';
import { personalityTypes } from '@/lib/data';

interface Props {
  params: Promise<{ type: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const personalityType = personalityTypes.find(t => t.id === type);
  
  if (!personalityType) {
    return {
      title: '직장인 유형 테스트',
      description: '10가지 질문으로 알아보는 나의 직장 성향',
    };
  }

  const title = `나는 "${personalityType.name}"입니다! - 직장인 유형 테스트`;
  const description = `${personalityType.description} 당신의 직장인 유형도 알아보세요!`;
  const imageUrl = `/api/og?type=${type}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ko_KR',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: personalityType.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
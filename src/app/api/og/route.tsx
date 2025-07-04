import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { personalityTypes } from '@/lib/data';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    const personalityType = personalityTypes.find(t => t.id === type);
    
    if (!personalityType) {
      return new Response('Type not found', { status: 404 });
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8fafc',
            backgroundImage: 'linear-gradient(135deg, #dbeafe 0%, #f3e8ff 100%)',
            fontSize: 32,
            fontWeight: 600,
            padding: '60px',
          }}
        >
          {/* 상단 제목 */}
          <div
            style={{
              fontSize: 24,
              color: '#64748b',
              marginBottom: 30,
            }}
          >
            직장인 유형 테스트 결과
          </div>
          
          {/* 메인 캐릭터/아이콘 영역 */}
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              backgroundColor: personalityType.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 40,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                fontSize: 80,
                color: 'white',
              }}
            >
              {personalityType.character === 'dog' ? '🐶' : 
               personalityType.character === 'cat' ? '🐱' : 
               personalityType.character === 'rabbit' ? '🐰' : '🐹'}
            </div>
          </div>

          {/* 유형 이름 */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: '#1e293b',
              textAlign: 'center',
              marginBottom: 20,
              lineHeight: 1.2,
            }}
          >
            {personalityType.name}
          </div>

          {/* 설명 */}
          <div
            style={{
              fontSize: 24,
              color: '#64748b',
              textAlign: 'center',
              lineHeight: 1.4,
              maxWidth: '800px',
            }}
          >
            {personalityType.description}
          </div>

          {/* 하단 CTA */}
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              fontSize: 20,
              color: '#64748b',
              textAlign: 'center',
            }}
          >
            당신의 직장인 유형도 알아보세요! 🎯
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    console.error('Error generating OG image:', e);
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    return new Response(`Failed to generate image: ${errorMessage}`, {
      status: 500,
    });
  }
}
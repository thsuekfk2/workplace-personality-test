// 디바이스 및 브라우저 정보 감지 유틸리티

export interface DeviceInfo {
  device_type: string;
  os: string;
  browser_name: string;
  browser_version: string;
  screen_resolution: string;
  viewport_size: string;
}

export function getDeviceInfo(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      device_type: 'unknown',
      os: 'unknown',
      browser_name: 'unknown',
      browser_version: 'unknown',
      screen_resolution: 'unknown',
      viewport_size: 'unknown',
    };
  }

  const userAgent = navigator.userAgent;
  
  // 디바이스 타입 감지
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android(?=.*\bMobile\b)/i.test(userAgent) || 
                   (window.screen.width >= 768 && window.screen.width <= 1024);
  
  let deviceType = 'desktop';
  if (isMobile && !isTablet) deviceType = 'mobile';
  else if (isTablet) deviceType = 'tablet';

  // 운영체제 감지
  let os = 'unknown';
  if (/Windows NT/i.test(userAgent)) os = 'Windows';
  else if (/Mac OS X/i.test(userAgent)) os = 'macOS';
  else if (/Linux/i.test(userAgent)) os = 'Linux';
  else if (/Android/i.test(userAgent)) os = 'Android';
  else if (/iPhone|iPad|iPod/i.test(userAgent)) os = 'iOS';

  // 브라우저 정보 감지
  let browserName = 'unknown';
  let browserVersion = 'unknown';
  
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    browserName = 'Chrome';
    const match = userAgent.match(/Chrome\/(\d+\.\d+)/);
    browserVersion = match ? match[1] : 'unknown';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browserName = 'Safari';
    const match = userAgent.match(/Version\/(\d+\.\d+)/);
    browserVersion = match ? match[1] : 'unknown';
  } else if (userAgent.includes('Firefox')) {
    browserName = 'Firefox';
    const match = userAgent.match(/Firefox\/(\d+\.\d+)/);
    browserVersion = match ? match[1] : 'unknown';
  } else if (userAgent.includes('Edg')) {
    browserName = 'Edge';
    const match = userAgent.match(/Edg\/(\d+\.\d+)/);
    browserVersion = match ? match[1] : 'unknown';
  }

  // 화면 해상도
  const screenResolution = window.screen 
    ? `${window.screen.width}x${window.screen.height}`
    : 'unknown';

  // 뷰포트 크기
  const viewportSize = window.innerWidth && window.innerHeight
    ? `${window.innerWidth}x${window.innerHeight}`
    : 'unknown';

  return {
    device_type: deviceType,
    os,
    browser_name: browserName,
    browser_version: browserVersion,
    screen_resolution: screenResolution,
    viewport_size: viewportSize,
  };
}

export function getReferrer(): string {
  if (typeof document === 'undefined') return 'direct';
  
  const referrer = document.referrer;
  if (!referrer) return 'direct';
  
  try {
    const url = new URL(referrer);
    const hostname = url.hostname;
    
    // 주요 소셜미디어 및 검색엔진 분류
    if (hostname.includes('google.')) return 'google';
    if (hostname.includes('naver.')) return 'naver';
    if (hostname.includes('daum.') || hostname.includes('kakao.')) return 'daum/kakao';
    if (hostname.includes('facebook.') || hostname.includes('fb.')) return 'facebook';
    if (hostname.includes('instagram.')) return 'instagram';
    if (hostname.includes('twitter.') || hostname.includes('x.com')) return 'twitter';
    if (hostname.includes('youtube.')) return 'youtube';
    if (hostname.includes('tiktok.')) return 'tiktok';
    if (hostname.includes('linkedin.')) return 'linkedin';
    
    // 기타 사이트는 도메인명으로
    return hostname;
  } catch {
    return 'unknown';
  }
}

// IP 기반 위치 정보 가져오기 (무료 API 사용)
export async function getLocationInfo(): Promise<{
  country: string;
  region: string;
  city: string;
}> {
  const defaultLocation = {
    country: 'unknown',
    region: 'unknown',
    city: 'unknown',
  };

  try {
    // 5초 타임아웃 설정
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    // ipapi.co를 사용 (무료, 1000 requests/day)
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data = await response.json();
      
      // API 오류 응답 체크
      if (data.error) {
        console.warn('위치 정보 API 오류:', data.error);
        return defaultLocation;
      }
      
      return {
        country: data.country_name || 'unknown',
        region: data.region || 'unknown',
        city: data.city || 'unknown',
      };
    } else {
      console.warn('위치 정보 API 응답 오류:', response.status);
      return defaultLocation;
    }
  } catch (error) {
    if (error && typeof error === 'object' && 'name' in error && error.name === 'AbortError') {
      console.warn('위치 정보 API 타임아웃');
    } else {
      console.warn('위치 정보 가져오기 실패:', error);
    }
    return defaultLocation;
  }
}
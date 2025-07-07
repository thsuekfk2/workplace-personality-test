import { TestResult } from "./types";
import { toPng } from "html-to-image";

// 카카오톡 공유 기능
export const shareToKakao = (result: TestResult) => {
  const { personalityType } = result;
  const shareUrl = `${window.location.origin}/result/${personalityType.id}`;

  if (typeof window !== "undefined" && window.Kakao) {
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "직장인 성격 유형 테스트 결과",
        description: `나는 "${personalityType.name}"입니다! \n\n${personalityType.description}\n\n당신의 직장인 유형도 알아보세요!`,
        imageUrl: `${window.location.origin}/api/og?type=${personalityType.id}`,
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: "나도 테스트하기",
          link: {
            mobileWebUrl: window.location.origin,
            webUrl: window.location.origin,
          },
        },
      ],
    });
  } else {
    alert("카카오톡 공유를 위해 페이지를 새로고침해주세요.");
  }
};

// 링크 복사 기능
export const copyToClipboard = async (result: TestResult) => {
  const { personalityType } = result;
  const shareUrl = `${window.location.origin}/result/${personalityType.id}`;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareUrl);
      return true;
    } else {
      // fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand("copy");
      document.body.removeChild(textArea);
      return success;
    }
  } catch (err) {
    console.error("링크 복사 실패:", err);
    return false;
  }
};

// 모바일 친화적 이미지 캡쳐 기능
export const captureResult = async (
  elementId: string,
  filename: string = "result.png"
): Promise<boolean> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("캡쳐할 요소를 찾을 수 없습니다.");
    }

    // 모바일 최적화 옵션
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    const timestamp = Date.now();

    const options = {
      backgroundColor: "#ffffff",
      pixelRatio: 2,
      quality: 1,
      width: element.offsetWidth,
      height: element.offsetHeight,
      style: {
        transform: "scale(1)",
        transformOrigin: "top left",
      },
      // 이미지 로딩 대기
      skipAutoScale: true,
      useCORS: true,
      cacheBust: true,
    };

    // Next.js Image URL을 원본 URL로 변환하는 함수
    const getOriginalSrc = (nextjsSrc: string): string => {
      try {
        const url = new URL(nextjsSrc, window.location.origin);
        if (url.pathname === "/_next/image") {
          const originalUrl = url.searchParams.get("url");
          if (originalUrl) {
            return originalUrl.startsWith("/")
              ? `${window.location.origin}${originalUrl}`
              : originalUrl;
          }
        }
        return nextjsSrc;
      } catch {
        return nextjsSrc;
      }
    };

    // Next.js Image 컴포넌트를 일반 img로 변환
    const nextImages = element.querySelectorAll("img[data-nimg]");
    const imagePromises = Array.from(nextImages).map((img) => {
      return new Promise<void>((resolve) => {
        const htmlImg = img as HTMLImageElement;
        const newImg = document.createElement("img");

        // 원본 이미지 URL 추출 및 캐시 버스터 추가
        const originalSrc = getOriginalSrc(htmlImg.src);
        const separator = originalSrc.includes("?") ? "&" : "?";
        newImg.src = `${originalSrc}${separator}t=${timestamp}&r=${Math.random()}`;

        newImg.alt = htmlImg.alt;
        newImg.style.cssText = htmlImg.style.cssText;
        newImg.className = htmlImg.className;
        newImg.crossOrigin = "anonymous";

        const timeout = setTimeout(() => {
          if (htmlImg.parentNode) {
            htmlImg.parentNode.replaceChild(newImg, htmlImg);
          }
          resolve();
        }, 5000);

        newImg.onload = () => {
          clearTimeout(timeout);
          if (htmlImg.parentNode) {
            htmlImg.parentNode.replaceChild(newImg, htmlImg);
          }
          resolve();
        };

        newImg.onerror = () => {
          clearTimeout(timeout);
          if (htmlImg.parentNode) {
            htmlImg.parentNode.replaceChild(newImg, htmlImg);
          }
          resolve();
        };
      });
    });

    // Next.js 이미지 교체 완료 대기
    await Promise.all(imagePromises);

    // 모바일에서는 박스 쉐도우 제거
    const originalShadows: Array<{ element: Element; boxShadow: string }> = [];
    if (isMobile) {
      const elementsWithShadow = element.querySelectorAll("*");

      elementsWithShadow.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const computedStyle = window.getComputedStyle(htmlEl);
        if (computedStyle.boxShadow && computedStyle.boxShadow !== "none") {
          originalShadows.push({
            element: el,
            boxShadow: htmlEl.style.boxShadow,
          });
          htmlEl.style.boxShadow = "none";
        }
      });
    }

    // 이미지들이 모두 로드되었는지 확인
    const images = element.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map((img) => {
        if (img.complete && img.naturalHeight > 0) return Promise.resolve();
        return new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // 에러가 나도 계속 진행
          setTimeout(() => resolve(), 5000); // 5초 타임아웃
        });
      })
    );

    // 추가 안정화 대기
    await new Promise((resolve) => setTimeout(resolve, 500));

    const dataUrl = await toPng(element, options);

    // 박스 쉐도우 복원
    if (isMobile && originalShadows.length > 0) {
      originalShadows.forEach(({ element, boxShadow }) => {
        (element as HTMLElement).style.boxShadow = boxShadow;
      });
    }

    // 모바일에서는 새 탭으로 열기
    if (isMobile) {
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>결과 이미지</title></head>
            <body style="margin:0;padding:0px;text-align:center;">
              <img src="${dataUrl}" style="max-width:100%;height:auto;" />
              <p>이미지를 길게 눌러서 저장하세요</p>
            </body>
          </html>
        `);
        return true;
      }
    }

    // 데스크톱에서는 다운로드
    const link = document.createElement("a");
    link.download =
      `${filename.replace(/\.(png|jpg|jpeg)$/i, "")}_${timestamp}.png` ||
      `result_${timestamp}.png`;
    link.href = dataUrl;
    link.click();

    return true;
  } catch (error) {
    console.error("캡쳐 실패:", error);
    return false;
  }
};

// 브라우저가 이미지 다운로드를 지원하는지 확인
export const checkDownloadSupport = (): boolean => {
  const a = document.createElement("a");
  return typeof a.download !== "undefined";
};

// 수동 이미지 보기 기능 (다운로드가 안 될 때)
export const showImageInNewTab = async (elementId: string) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("캡쳐할 요소를 찾을 수 없습니다.");
    }

    // Next.js Image 컴포넌트를 일반 img로 변환
    const nextImages = element.querySelectorAll("img[data-nimg]");
    nextImages.forEach((img) => {
      const htmlImg = img as HTMLImageElement;
      const newImg = document.createElement("img");
      newImg.src = htmlImg.src;
      newImg.alt = htmlImg.alt;
      newImg.style.cssText = htmlImg.style.cssText;
      newImg.className = htmlImg.className;
      htmlImg.parentNode?.replaceChild(newImg, htmlImg);
    });

    // 이미지 로딩 대기
    const images = element.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // 에러가 나도 계속 진행
          setTimeout(() => resolve(), 3000); // 3초 타임아웃
        });
      })
    );

    const dataUrl = await toPng(element, {
      backgroundColor: "#ffffff",
      pixelRatio: 1,
      quality: 0.9,
    });

    const newTab = window.open();
    if (newTab) {
      newTab.document.write(`
        <html>
          <head><title>직장인 성격 유형 테스트 결과</title></head>
          <body style="margin:0; display:flex; justify-content:center; align-items:center; min-height:100vh; background:#f0f0f0;">
            <img src="${dataUrl}" alt="테스트 결과" style="max-width:100%; max-height:100%; border:1px solid #ddd; border-radius:8px; box-shadow:0 4px 6px rgba(0,0,0,0.1);" />
          </body>
        </html>
      `);
      newTab.document.close();
      return true;
    }
    return false;
  } catch (err) {
    console.error("새 탭에서 이미지 보기 실패:", err);
    return false;
  }
};

// 카카오 SDK 초기화 (브라우저에서만 실행)
export const initKakao = () => {
  if (typeof window !== "undefined" && !window.Kakao?.isInitialized()) {
    // 실제 프로덕션에서는 환경변수로 관리해야 합니다
    const kakaoAppKey =
      process.env.NEXT_PUBLIC_KAKAO_APP_KEY || "YOUR_KAKAO_APP_KEY";
    window.Kakao?.init(kakaoAppKey);
  }
};

// 카카오 SDK 로드
export const loadKakaoSDK = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    if (window.Kakao) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
    script.integrity =
      "sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4";
    script.crossOrigin = "anonymous";
    script.onload = () => {
      initKakao();
      resolve();
    };
    script.onerror = () => reject(new Error("카카오 SDK 로드 실패"));

    document.head.appendChild(script);
  });
};

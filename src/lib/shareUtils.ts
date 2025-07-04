import { TestResult } from "./types";
import { toPng } from "html-to-image";

// 카카오톡 공유 기능
export const shareToKakao = (result: TestResult) => {
  const { personalityType } = result;

  if (typeof window !== "undefined" && window.Kakao) {
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "직장인 성격 유형 테스트 결과",
        description: `나는 "${personalityType.name}"입니다! 🎯\n\n${personalityType.description}\n\n당신의 직장인 유형도 알아보세요!`,
        imageUrl:
          window.location.origin +
          "/images/" +
          encodeURIComponent(personalityType.name) +
          ".png",
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
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
  const shareText = `직장인 성격 유형 테스트 결과 🎯

나는 "${personalityType.name}"입니다!

${personalityType.description}

당신의 직장인 유형도 알아보세요!
${window.location.origin}`;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareText);
      return true;
    } else {
      // fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareText;
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

// 간단한 이미지 캡쳐 기능 (html-to-image 사용)
export const captureResult = async (
  elementId: string,
  filename: string = "result.png"
): Promise<boolean> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("캡쳐할 요소를 찾을 수 없습니다.");
    }

    const dataUrl = await toPng(element, {
      backgroundColor: "#ffffff",
      pixelRatio: 2,
      quality: 0.95,
    });

    // 다운로드
    const link = document.createElement("a");
    link.download = filename;
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

    const dataUrl = await toPng(element, {
      backgroundColor: "#ffffff",
      pixelRatio: 1.5,
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
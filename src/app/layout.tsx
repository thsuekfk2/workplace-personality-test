import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "직장인 유형 테스트 - 나는 어떤 직장인일까?",
  description:
    "10가지 질문으로 알아보는 당신의 직장 성향! 8가지 유형 중 나에게 맞는 직장인 유형을 찾아보세요. 아이디어형, 실행형, 소통형, 분석형 등 다양한 유형의 특징과 추천 직무를 확인하세요.",
  keywords: [
    "직장인",
    "성격테스트",
    "유형테스트",
    "직업적성",
    "성향분석",
    "워라밸",
    "직무추천",
  ],
  authors: [{ name: "Workplace Personality Test" }],
  openGraph: {
    title: "직장인 유형 테스트",
    description: "10가지 질문으로 알아보는 나의 직장 성향",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "직장인 유형 테스트",
    description: "10가지 질문으로 알아보는 나의 직장 성향",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" style={{ WebkitTouchCallout: "none" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansKR.variable} antialiased`}
        style={{ WebkitTextSizeAdjust: "100%" }}
      >
        {children}
      </body>
    </html>
  );
}

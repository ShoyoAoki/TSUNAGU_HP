"use client";

import Script from "next/script";

// Google Analytics Measurement ID
// 本番環境では環境変数 (process.env.NEXT_PUBLIC_GA_ID) などから取得することを推奨
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // TODO: ここに実際のIDを入れてください

export default function GoogleAnalytics() {
  // IDが設定されていない、またはダミーのままの場合は読み込まない
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}


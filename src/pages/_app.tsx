import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Script from "next/script";
import { useRouter } from "next/router";
import { GA_MEASUREMENT_ID } from "@/lib/data";
import Navigation from "@/components/backoffice/Navigation";
import QueryProvider from "@/components/QueryProvider";
// import AuthWrapper from "@/components/backoffice/AuthWrapper";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isBackoffice = router.pathname.startsWith("/backoffice");
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <QueryProvider>
        {isBackoffice ? (
          <>
            <Navigation />
            {/* <AuthWrapper> */}
            <Component {...pageProps} />
            {/* </AuthWrapper> */}
          </>
        ) : (
          <Component {...pageProps} />
        )}
      </QueryProvider>
    </>
  );
}

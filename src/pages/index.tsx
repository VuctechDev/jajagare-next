import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import useFonts from "@/hooks/useFonts";
import Head from "next/head";

export default function Home() {
  const { ibmPlexSans, openSans } = useFonts();
  return (
    <>
      <Head>
        <title>
          Domaća organska jaja iz slobodnog uzgoja | Besplatna dostava, Banja
          Luka
        </title>
        <meta
          name="description"
          content="Naša domaća jaja dolaze sa porodične farme iz slobodnog uzgoja, pažljivo sakupljena i dostavljena na vašu adresu. Besplatna dostava, Banja Luka."
        />
        <link rel="icon" href="/favicon.png" sizes="32x32" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Vuctech" />
        <meta property="og:title" content="Domaća jaja iz slobodnog uzgoja" />
        <meta
          property="og:description"
          content="Svježa domaća jaja iz slobodnog uzgoja sa besplatnom dostavom na kućnu adresu."
        />
        <meta property="og:image" content="/cover.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Domaća jaja iz slobodnog uzgoja" />
        <meta
          name="twitter:description"
          content="Poručite domaća jaja sa besplatnom dostavom."
        />
        <meta name="twitter:image" content="/cover.png" />
      </Head>
      <div
        className={`relative w-full flex flex-col items-center justify-start text-black min-h-screen gap-4 `}
      >
        <Hero />
        <div
          className={`w-full flex items-start justify-center px-4 mt-4 md:mt-0 md:mb-18`}
        >
          <div
            className={`flex flex-col w-full max-w-[1248px] items-start justify-center md:flex-row`}
          >
            <div className={`w-full md:w-1/2 flex flex-col mb-5 md:mb-0`}>
              <h1
                className={`text-[34px] md:text-[56px] text-black font-bold text-center md:text-left ${ibmPlexSans}`}
              >
                Domaća organska jaja iz slobodnog uzgoja
              </h1>
            </div>
            <div className={`w-full md:w-1/2 flex flex-col`}>
              <h5
                className={`text-[14px] md:text-[18px] text-black w-full text-center md:text-left ${openSans}`}
              >
                Naša organska jaja dolaze sa porodične farme iz slobodnog
                uzgoja, gde koke uživaju u prirodnom okruženju. Svako jaje je
                pažljivo sakupljeno kako bi do vašeg stola stiglo sveže i puno
                ukusa.
              </h5>
              <p
                className={`text-[14px] md:text-[18px] font-semibold text-black w-full mt-6 mb-6 md:mb-4 text-center md:text-left ${openSans}`}
              >
                Besplatna dostava na kućnu adresu na teritoriji Banja Luke!
              </p>
              <Button fullWidthSmall href="/order" label="Poruči" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

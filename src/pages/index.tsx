import { Exo_2 } from "next/font/google";
import Head from "next/head";
import Link from "next/link";

const poppins = Exo_2({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Home() {
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Vuctech" />
        <meta property="og:title" content="Domaća jaja iz slobodnog uzgoja" />
        <meta
          property="og:description"
          content="Svježa domaća jaja iz slobodnog uzgoja sa besplatnom dostavom na kućnu adresu."
        />
        <meta property="og:image" content="/cover.jpg" />{" "}
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Domaća jaja iz slobodnog uzgoja" />
        <meta
          name="twitter:description"
          content="Poručite domaća jaja sa besplatnom dostavom."
        />
        <meta name="twitter:image" content="/cover.jpg" />
      </Head>
      <div
        className={`relative w-full flex flex-col items-center justify-start text-black min-h-screen pb-20 gap-4 bg-white ${poppins.className} `}
      >
        <div
          className="relative max-h-[600px] w-full h-auto bg-black"
          style={{
            overflow: "hidden",
          }}
        >
          <video
            className="
          relative 
          w-full 
          z-0 
          top-[0px] 
          xl:-top-[100px] 
          2xl:-top-[100px]
        "
            autoPlay
            muted
            loop
            playsInline
            src="/chick.mp4"
          ></video>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="absolute -bottom-[5px] xl:bottom-[-30px] "
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,256L60,234.7C120,213,240,171,360,176C480,181,600,235,720,250.7C840,267,960,245,1080,224C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>

        <h1
          className={`text-[26px] md:text-[50px]  text-center text-black font-semibold font-sans`}
        >
          Domaća organska jaja iz slobodnog uzgoja
        </h1>
        <h5
          className={`text-[14px] md:text-[16px] max-w-[1000px] text-center text-black w-full`}
        >
          Naša organska jaja dolaze sa porodične farme iz slobodnog uzgoja, gde
          koke uživaju u prirodnom okruženju. Svako jaje je pažljivo sakupljeno
          kako bi do vašeg stola stiglo sveže i puno ukusa.
        </h5>
        <div
          className={`w-full flex flex-col mt-4 items-center justify-center`}
        >
          <p
            className={`text-[16px] md:text-[16px] font-bold text-center text-black w-full`}
          >
            Besplatna dostava na kućnu adresu na teritoriji Banja Luke!
          </p>
          <Link href="/order" className="mt-4">
            <button className="ml-3 text-[18px] px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-all duration-300 cursor-pointer">
              Poruči
            </button>
          </Link>
        </div>
        {/* <Link href="/backoffice">BO</Link> */}
      </div>
    </>
  );
}

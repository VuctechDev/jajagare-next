import Footer from "@/components/Footer";
import Form from "@/components/Form";
import Snackbar from "@/components/Snackbar";
import SubscriptionModal from "@/components/SubscriptionModal";
import useFonts from "@/hooks/useFonts";
import { eggPrice } from "@/lib/data";
import Head from "next/head";
import { useState } from "react";

export default function OrderPage() {
  const { openSans } = useFonts();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  return (
    <>
      <Head>
        <title>
          Poručite domaća organska jaja iz slobodnog uzgoja | Dostava, Banja
          Luka
        </title>
        <meta
          name="description"
          content="Naša domaća jaja dolaze sa porodične farme iz slobodnog uzgoja, pažljivo sakupljena i dostavljena na vašu adresu. Besplatna dostava, Banja Luka."
        />
        <link rel="icon" href="/favicon.png" sizes="32x32" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Vuctech" />
        <meta
          property="og:title"
          content="Poručite domaća jaja iz slobodnog uzgoja | Dostava, Banja
          Luka"
        />
        <meta
          property="og:description"
          content="Svježa domaća jaja iz slobodnog uzgoja sa besplatnom dostavom na kućnu adresu."
        />
        <meta property="og:image" content="/cover.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Poručite domaća jaja iz slobodnog uzgoja | Dostava, Banja
          Luka"
        />
        <meta
          name="twitter:description"
          content="Poručite domaća jaja sa besplatnom dostavom."
        />
        <meta name="twitter:image" content="/cover.png" />
      </Head>
      <div
        className={`flex flex-col items-center justify-start w-full pt-3 min-h-screen pt-6 ${openSans} `}
      >
        {/* <h5
          className={`text-[16px] md:text-[20px] max-w-[700px] px-5 text-center text-black w-full`}
        >
          <strong>Besplatna dostava</strong> na Vašu adresu na teritoriji Banja
          Luke svakog utorka i subote u prijepodnevnim časovima.
        </h5> */}

        <h5
          className={`text-[16px] md:text-[20px] max-w-[700px] px-5 text-center text-black w-full`}
        >
          Po dogovoru, nudimo<strong>Besplatnu dostavu</strong> na teritoriji
          Banja Luke! 
        </h5>
        <h5
          className={`text-[16px] md:text-[18px] my-3 md:my-6 text-center font-semibold text-black w-full`}
        >
          Cijena: 10 jaja / {10 * eggPrice}KM
        </h5>
        <Form />
        <div className={`flex-grow`} />
        <Footer />
        <SubscriptionModal successCallback={() => setSnackbarOpen(true)} />
        <Snackbar
          open={snackbarOpen}
          message="Hvala na povjerenju, Vaš email je uspješno sačuvan!"
          onClose={() => setSnackbarOpen(false)}
        />
      </div>
    </>
  );
}

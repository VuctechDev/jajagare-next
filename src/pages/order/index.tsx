import Footer from "@/components/Footer";
import Form from "@/components/Form";
import Snackbar from "@/components/Snackbar";
import SubscriptionModal from "@/components/SubscriptionModal";
import useFonts from "@/hooks/useFonts";
import { useState } from "react";

export default function OrderPage() {
  const { openSans } = useFonts();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  return (
    <div
      className={`flex flex-col items-center justify-start w-full pt-3 min-h-screen pt-6 ${openSans} `}
    >
      <h5
        className={`text-[16px] md:text-[20px] max-w-[700px] px-5 text-center text-black w-full`}
      >
        <strong>Besplatna dostava</strong> na Vašu adresu na teritoriji Banja
        Luke svakog utorka i subote u prijepodnevnim časovima.
      </h5>
      <h5
        className={`text-[16px] md:text-[18px] my-6 text-center font-semibold text-black w-full`}
      >
        Cijena: 10 jaja / 5KM
      </h5>
      <Form />
      <div className={`flex-grow`}/>
      <Footer />
      <SubscriptionModal successCallback={() => setSnackbarOpen(true)} />
      <Snackbar
        open={snackbarOpen}
        message="Hvala na povjerenju, Vaš email je uspješno sačuvan!"
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
}

import Form from "@/components/Form";
import Instagram from "@/icons/Instagram";
import Viber from "@/icons/Viber";
import { Exo_2 } from "next/font/google";

const poppins = Exo_2({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function OrderPage() {
  return (
    <div
      className={`flex flex-col items-center justify-start w-full p-3 bg-white min-h-screen pt-6 ${poppins.className} `}
    >
      <h5
        className={`text-[16px] md:text-[20px] max-w-[1000px] text-center text-black w-full`}
      >
        Dostava svaki utorak i subotu u prijepodnevnim časovima.
      </h5>
      <h5
        className={`text-[16px] md:text-[18px] my-6 text-center font-semibold text-black w-full`}
      >
        Cijena 10 jaja / 5KM
      </h5>

      <Form />
      <footer className="w-full py-6 flex items-center justify-center gap-6">
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram />
        </a>

        <a
          href="viber://chat?number=+38765815174"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Viber />
        </a>
      </footer>
    </div>
  );
}

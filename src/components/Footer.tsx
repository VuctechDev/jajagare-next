import useFonts from "@/hooks/useFonts";
import Instagram from "@/icons/Instagram";
import Viber from "@/icons/Viber";
import Link from "next/link";

const Footer: React.FC = () => {
  const { openSans } = useFonts();
  return (
    <footer className="w-full pb-4 flex flex-col items-center justify-center gap-x-6 bg-[#20263E] mt-20">
      <div className="w-full py-1 flex items-center justify-center gap-x-6">
        <a
          href="https://www.instagram.com/poruci_jaje"
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
      </div>

      <div className="w-full py-1 flex items-center justify-center gap-x-6">
        <Link
          className={`text-[14px] text-white font-semibold ${openSans}`}
          href="privacy-policy"
        >
          Politika privatnosti
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

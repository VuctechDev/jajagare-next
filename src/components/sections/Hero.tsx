import React from "react";

const Hero: React.FC = () => {
  return (
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
        viewBox="0 0 1440 290"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[102vw] absolute -bottom-[5px] xl:bottom-[-2px]"
      >
        <g clip-path="url(#clip0_1_5)">
          <path
            d="M872.906 1268.07C1127.65 1248.41 1277.59 1079.35 1299.74 925.899C1321.88 772.445 1350.79 713.159 1451.18 572.85C1569.55 406.707 1444.98 194.888 1203.06 187.925C960.56 181.651 708.587 265.953 436.718 175.865C164.849 85.7768 -154.168 306.042 -102.044 553.804C-50.5503 801.624 175.775 818.932 299.214 949.423C458.686 1118.58 625.733 1287.04 872.906 1268.07Z"
            fill="#FAF8F1"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_5">
            <rect
              width="1440"
              height="160"
              fill="white"
              transform="translate(-1 130)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Hero;

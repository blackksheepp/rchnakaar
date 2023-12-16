import React from "react";
import SpinImage from "@/components/SpinImage";

const Hero = () => {
  return (
    <div className="flex flex-col items-center md:w-1/2 md:mt-[1%] md:ml-[2%]">
      <SpinImage
        src="/img/9.jpg"
        alt="carti"
        className="w-[50%] md:w-[50%] lg:w-[40%] mt-[10%] mx-auto"
      />

      <div className="font-retro text-accent dropshadow w-full mx-auto max-w-max text-center mt-[4%] leading-tight">
        <p className="text-f1 md:text-flg1">COVER YOUR</p>
        <p className="text-f2 md:text-flg2">WALLS WITH</p>
        <p className="text-f3 md:text-flg3">EXTR4 DR1P!</p>
      </div>
    </div>
  );
};

export default Hero;

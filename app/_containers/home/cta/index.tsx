import React from "react";
import Link from "next/link";
import ImageSlider from "@/components/ImageSlider";

const CTA = () => {
  return (
    <div className="md:w-1/2 md:flex md:flex-col-reverse md:mb-[2%] md:mr-[3%]">
      <div className="mx-auto inset-x-0 max-w-max mt-7">
        <p className="text-accent font-retro dropshadow text-fe md:text-felg">
          Press Enter to Shop
        </p>
        <div className="mx-auto inset-x-0 max-w-max w-full mt-[5%]">
          <Link href="/shop">
            <button className="btn w-bw h-bh md:text-[1rem] font-retro">
              ENTER
            </button>
          </Link>
        </div>
      </div>
      <div>
        <ImageSlider
          autoplay={true}
          className="md:hidden mt-[7%] md:mx-[3%] lg:mx-[10%]"
          show={5}
        />
        <ImageSlider
          autoplay={true}
          className="hidden md:block mt-[7%] md:mx-[3%] lg:mx-[10%]"
          show={3}
        />
        <p className="text-accent font-retro text-fh md:text-fhlg lg:text-[30px] mx-auto inset-x-0 max-w-max w-full py-[1%]">
          Our Comics Collection
        </p>
      </div>
    </div>
  );
};

export default CTA;

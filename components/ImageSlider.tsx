"use client"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";


export default function ImageSlider({ autoplay, className, show }: { autoplay: boolean, className: string, show: number }) {

  var settings = {
    autoplay: autoplay,
    autoplaySpeed: 1000,
    infinite: true,
    speed: 500,
    slidesToShow: show,
    slidesToScroll: 2,
    arrows: false,
  };

  return (
    <div className={className}>
      <Slider {...settings}>
        <Image
          src="/img/1.jpg"
          alt="slide"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
        <Image
          src="/img/2.jpg"
          alt="slide"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
        <Image
          src="/img/3.jpg"
          alt="slide"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
        <Image
          src="/img/4.jpg"
          alt="slide"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
        <Image
          src="/img/5.jpg"
          alt="slide"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
        <Image
          src="/img/6.jpg"
          alt="slide"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
        <Image
          src="/img/7.jpg"
          alt="slide"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
        <Image
          src="/img/8.jpg"
          alt="slide"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
        
      </Slider>
      
    </div>
  );
};

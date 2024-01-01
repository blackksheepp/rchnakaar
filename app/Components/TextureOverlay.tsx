import React from "react";

export const BackgroundTexture = () => {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen pointer-events-none opacity-[50%]`}
      style={{
        backgroundImage: `url('/img/grunge.jpg')`,
        backgroundSize: "cover",
        mixBlendMode: "screen",
      }}
    />
  );
};

export const TextureOverlay = () => {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen pointer-events-none opacity-[30%]`}
      style={{
        backgroundImage: `url('/img/grunge.jpg')`,
        backgroundSize: "cover",
        mixBlendMode: "screen",
      }}
    />
  );
};

export const FitTexture = () => {
  return (
    <div
      className={`absolute z-20 w-full h-full pointer-events-none opacity-[50%]`}
      style={{
        backgroundImage: `url('/img/grunge.jpg')`,
        backgroundSize: "cover",
        mixBlendMode: "screen",
      }}
    />
  );
};



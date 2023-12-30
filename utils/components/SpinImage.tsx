import React from 'react'
import Image from 'next/image'

const SpinImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      className={`rotate h-auto ${className}`}
    />
  );
};

export default SpinImage;
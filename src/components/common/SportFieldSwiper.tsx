"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Carousel, Spin } from "antd";
import styles from "./SportFieldSwiper.module.scss";
import Image from "next/image";
import { cn } from '@/libs/utils';
import { DEFAULT_IMAGES } from '@/constants/constant';

type SportFieldSwiperProps = {
  images: string[];
  className?: string;
};
const SportFieldSwiper = ({
  images = DEFAULT_IMAGES,
  className,
}: SportFieldSwiperProps) => {
  const [loading, setLoading] = useState(true);

  if (!images.length) {
    images = DEFAULT_IMAGES;
  }

  useEffect(() => {
    const loadImage = () => {
      let loadedCount = 0;
      const totalImages = images.length;
      const handleImageLoad = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setLoading(false);
        }
      };

      images.forEach((image) => {
        const img = new window.Image();
        img.src = image;
        img.onload = handleImageLoad;
      });
    };

    loadImage();
  }, [images]);

  return (
    <div className={cn(styles.sliderContainer, className)}>
      {loading ? (
        <div className="flex h-card w-full items-center justify-center rounded-large bg-accent-100">
          <Spin size="large" />
        </div>
      ) : (
        <Carousel
          className="relative h-card w-full"
          autoplay
          arrows
          autoplaySpeed={2000}
          dotPosition="top"
          effect="scrollx"
        >
          {images.map((image, index) => (
            <div key={image} className="relative h-card w-full">
              <Image src={image} alt={`Slide ${index + 1}`} fill />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default SportFieldSwiper;

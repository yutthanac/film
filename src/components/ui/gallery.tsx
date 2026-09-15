"use client";

import { Ref, forwardRef, useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { motion, useMotionValue, Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Direction = "left" | "right";

export interface GalleryPhoto {
  id: number;
  order: number;
  x: string;
  y: string;
  zIndex: number;
  direction: Direction;
  src: string;
  alt?: string;
}

const defaultPhotos: GalleryPhoto[] = [
  {
    id: 1,
    order: 0,
    x: "-320px",
    y: "15px",
    zIndex: 50,
    direction: "left",
    src: "/images/LINE_ALBUM_251067_260916_1.jpg",
    alt: "Memory photo 1",
  },
  {
    id: 2,
    order: 1,
    x: "-160px",
    y: "32px",
    zIndex: 40,
    direction: "left",
    src: "/images/LINE_ALBUM_251067_260916_2.jpg",
    alt: "Memory photo 2",
  },
  {
    id: 3,
    order: 2,
    x: "0px",
    y: "8px",
    zIndex: 30,
    direction: "right",
    src: "/images/LINE_ALBUM_สวนสัตว์_260916_1.jpg",
    alt: "Memory photo 3",
  },
  {
    id: 4,
    order: 3,
    x: "160px",
    y: "22px",
    zIndex: 20,
    direction: "right",
    src: "/images/LINE_ALBUM_26268_260916_1.jpg",
    alt: "Memory photo 4",
  },
  {
    id: 5,
    order: 4,
    x: "320px",
    y: "44px",
    zIndex: 10,
    direction: "left",
    src: "/images/LINE_ALBUM_251067_260916_1.jpg",
    alt: "Memory photo 5",
  },
];

export const PhotoGallery = ({
  animationDelay = 0.5,
  photos = defaultPhotos,
  title = "Welcome to My",
  highlightTitle = "Stories",
  subtitle = "A Journey Through Visual Stories",
  actionText = "View All Stories",
  onActionClick,
}: {
  animationDelay?: number;
  photos?: GalleryPhoto[];
  title?: string;
  highlightTitle?: string;
  subtitle?: string;
  actionText?: string;
  onActionClick?: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay * 1000);

    const animationTimer = setTimeout(
      () => {
        setIsLoaded(true);
      },
      (animationDelay + 0.4) * 1000
    );

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(animationTimer);
    };
  }, [animationDelay]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const photoVariants: Variants = {
    hidden: () => ({
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
    }),
    visible: (custom: { x: string | number; y: string | number; order: number }) => ({
      x: custom.x,
      y: custom.y,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 12,
        mass: 1,
        delay: custom.order * 0.15,
      },
    }),
  };

  return (
    <div className="mt-20 sm:mt-32 relative">
      <div className="absolute inset-0 max-md:hidden top-[200px] -z-10 h-[300px] w-full bg-transparent bg-[linear-gradient(to_right,#57534e_1px,transparent_1px),linear-gradient(to_bottom,#57534e_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#a8a29e_1px,transparent_1px),linear-gradient(to_bottom,#a8a29e_1px,transparent_1px)]"></div>
      <p className="lg:text-md my-2 text-center text-xs font-light uppercase tracking-widest text-slate-600 dark:text-slate-400">
        {subtitle}
      </p>
      <h3 className="z-20 mx-auto max-w-2xl justify-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text py-3 text-center text-4xl text-transparent dark:bg-gradient-to-r dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 dark:bg-clip-text md:text-7xl">
        {title} <span className="text-rose-500">{highlightTitle}</span>
      </h3>
      <div className="relative mb-8 h-[350px] w-full items-center justify-center flex">
        <motion.div
          className="relative mx-auto flex w-full max-w-7xl justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="relative flex w-full justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <div className="relative h-[220px] w-[220px]">
              {[...photos].reverse().map((photo) => (
                <motion.div
                  key={photo.id}
                  className="absolute left-0 top-0"
                  style={{ zIndex: photo.zIndex }}
                  variants={photoVariants}
                  custom={{
                    x: photo.x,
                    y: photo.y,
                    order: photo.order,
                  }}
                >
                  <Photo
                    width={220}
                    height={220}
                    src={photo.src}
                    alt={photo.alt || "Memory photo"}
                    direction={photo.direction}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      {actionText && (
        <div className="flex w-full justify-center">
          <Button onClick={onActionClick}>{actionText}</Button>
        </div>
      )}
    </div>
  );
};

function getRandomNumberInRange(min: number, max: number): number {
  if (min >= max) {
    throw new Error("Min value should be less than max value");
  }
  return Math.random() * (max - min) + min;
}

const MotionImage = motion(
  forwardRef(function MotionImage(
    props: ImageProps,
    ref: Ref<HTMLImageElement>
  ) {
    const { alt = "", ...rest } = props;
    return <Image ref={ref} alt={alt} {...rest} />;
  })
);

export const Photo = ({
  src,
  alt,
  className,
  direction = "left",
  width,
  height,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  direction?: Direction;
  width: number;
  height: number;
}) => {
  const [rotation] = useState<number>(() => {
    return getRandomNumberInRange(1, 4) * (direction === "left" ? -1 : 1);
  });
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  function handleMouse(event: {
    currentTarget: { getBoundingClientRect: () => DOMRect };
    clientX: number;
    clientY: number;
  }) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  const resetMouse = () => {
    x.set(200);
    y.set(200);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.2, zIndex: 9999 }}
      whileHover={{
        scale: 1.1,
        rotateZ: 2 * (direction === "left" ? -1 : 1),
        zIndex: 9999,
      }}
      whileDrag={{
        scale: 1.1,
        zIndex: 9999,
      }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{
        width,
        height,
        perspective: 400,
        transform: `rotate(0deg) rotateX(0deg) rotateY(0deg)`,
        zIndex: 1,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "none",
      }}
      className={cn(
        className,
        "relative mx-auto shrink-0 cursor-grab active:cursor-grabbing"
      )}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      draggable={false}
      tabIndex={0}
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-md border border-white/40">
        <MotionImage
          className={cn("rounded-3xl object-cover")}
          fill
          src={src}
          alt={alt}
          {...props}
          draggable={false}
        />
      </div>
    </motion.div>
  );
};

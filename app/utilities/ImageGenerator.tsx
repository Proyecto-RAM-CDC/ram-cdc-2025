import React, { useState, useEffect } from "react";
import img1 from "~/images/Photos/unsplash-a.webp";
import img2 from "~/images/Photos/unsplash-b.webp";
import img3 from "~/images/Photos/unsplash-c.webp";
import img4 from "~/images/Photos/unsplash-d.webp";

import img5 from "~/images/Photos/pixnio-a.webp";
import img6 from "~/images/Photos/pixnio-b.webp";
import img7 from "~/images/Photos/pixnio-c.webp";
import img8 from "~/images/Photos/pixnio-d.webp";

import img9 from "~/images/Photos/guerrero-a.webp";
import img10 from "~/images/Photos/guerrero-b.webp";
import img11 from "~/images/Photos/guerrero-c.webp";
import img12 from "~/images/Photos/guerrero-d.webp";
import img13 from "~/images/Photos/guerrero-e.webp";
import img14 from "~/images/Photos/guerrero-f.webp";
import img15 from "~/images/Photos/guerrero-g.webp";
import img16 from "~/images/Photos/guerrero-h.webp";
import img17 from "~/images/Photos/guerrero-i.webp";
import img18 from "~/images/Photos/guerrero-j.webp";
import img19 from "~/images/Photos/guerrero-k.webp";
import img20 from "~/images/Photos/guerrero-l.webp";
import img21 from "~/images/Photos/guerrero-m.webp";
import img22 from "~/images/Photos/guerrero-n.webp";
import img23 from "~/images/Photos/guerrero-o.webp";

import img24 from "~/images/Photos/sonora-a.webp";
import img25 from "~/images/Photos/sonora-b.webp";
import img26 from "~/images/Photos/sonora-c.webp";
import img27 from "~/images/Photos/sonora-d.webp";
import img28 from "~/images/Photos/sonora-e.webp";
import img29 from "~/images/Photos/sonora-f.webp";
import img30 from "~/images/Photos/sonora-g.webp";
import img31 from "~/images/Photos/sonora-h.webp";
import img32 from "~/images/Photos/sonora-i.webp";
import img33 from "~/images/Photos/sonora-j.webp";
import img34 from "~/images/Photos/sonora-k.webp";

import img35 from "~/images/Diseases/edas.webp";
import img36 from "~/images/Diseases/iras.webp";
import img37 from "~/images/Diseases/its.webp";
import img38 from "~/images/Diseases/ivu.webp";

import img39 from "~/images/Photos/inDRE-a.webp";
import img40 from "~/images/Photos/inDRE-b.webp";
import img41 from "~/images/Photos/inDRE-c.webp";
import img42 from "~/images/Photos/inDRE-d.webp";
import img43 from "~/images/Photos/inDRE-e.webp";
import img44 from "~/images/Photos/inDRE-f.webp";
import img45 from "~/images/Photos/inDRE-g.webp";
import img46 from "~/images/Photos/inDRE-h.webp";
import img47 from "~/images/Photos/inDRE-i.webp";
import img48 from "~/images/Photos/inDRE-j.webp";
import img49 from "~/images/Photos/inDRE-k.webp";
import img50 from "~/images/Photos/inDRE-l.webp";
import img51 from "~/images/Photos/inDRE-m.webp";

import img52 from "~/images/Photos/imss.webp";

// Define a TypeScript interface for the component props
interface RandomImageProps {
  duration?: number;
  altText?: string;
  classes?: string;
}

const RandomImage: React.FC<RandomImageProps> = ({
  duration = 10,
  altText = "Random Mexico vista",
  classes = "aspect-[6/5] w-full max-w-lg 2xl:max-w-2xl rounded-2xl shadow-xl border-2 border-secondary object-cover mx-auto mt-10 sm:mt-16 lg:my-auto",
}) => {
  const [imagePath, setImagePath] = useState<string | null>(null);

  useEffect(() => {
    const imageFiles = [
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
      img10,
      img11,
      img12,
      img13,
      img14,
      img15,
      img16,
      img17,
      img18,
      img19,
      img20,
      img21,
      img22,
      img23,
      img24,
      img25,
      img26,
      img27,
      img28,
      img29,
      img30,
      img31,
      img32,
      img33,
      img34,
      img35,
      img36,
      img37,
      img38,
      img39,
      img40,
      img41,
      img42,
      img43,
      img44,
      img45,
      img46,
      img47,
      img48,
      img49,
      img50,
      img51,
      img52,
    ];

    // Set an initial random image path.
    const initialImagePath =
      imageFiles[Math.floor(Math.random() * imageFiles.length)];
    setImagePath(initialImagePath);

    // Set an interval to change the image path every `duration` seconds.
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * imageFiles.length);
      const newImagePath = imageFiles[randomIndex];
      setImagePath(newImagePath);
    }, duration * 1000);

    // Clear the interval when the component is unmounted.
    // This is a cleanup function that React calls when the component is about to unmount or
    // before re-running the effect due to a dependency change. It clears the interval, ensuring
    // that only one interval is active at any given time and preventing the interval from running
    // after the component has unmounted.
    return () => clearInterval(intervalId);
  }, [duration]);

  return imagePath ? (
    <img src={imagePath} alt={altText} className={classes} />
  ) : null;
};

export default RandomImage;

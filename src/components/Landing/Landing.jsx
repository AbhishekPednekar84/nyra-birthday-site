"use client";

import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { Typewriter } from "react-simple-typewriter";
import { PLANET_NAMES } from "@/utils/constants";
import { generateRandomIndex } from "@/utils/helpers";

export const Landing = () => {
  const [planetName, setPlanetName] = useState(null);
  const [showSecondLine, setShowSecondLine] = useState(false);

  const now = DateTime.now().setZone("local");
  const formattedDateTime = now.toFormat("EEEE, MMMM d',' yyyy, h:mm a");

  useEffect(() => {
    const randomIndex = generateRandomIndex(PLANET_NAMES?.length);
    setPlanetName(PLANET_NAMES[randomIndex]);

    setTimeout(() => {
      setShowSecondLine(true);
    }, 3500);
  }, []);

  return (
    <div className="h-screen w-screen font-autowide flex flex-col justify-center items-center text-md lg:text-2xl text-cyan-300 font-stretch-50% glow px:5 lg:px-0">
      <div>
        <Typewriter
          words={[formattedDateTime]}
          loop={1}
          typeSpeed={70}
          delaySpeed={1500}
        />
      </div>

      {showSecondLine && (
        <div className="mt-5 lg:ml-1">
          <Typewriter
            words={[`Somewhere on planet ${planetName}`]}
            typeSpeed={70}
            delaySpeed={1000}
            cursor
            cursorStyle="_"
            loop={1}
          />
        </div>
      )}
    </div>
  );
};

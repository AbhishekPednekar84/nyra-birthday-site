import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { PlayCircle } from "lucide-react";

const opacityVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const Invite = () => {
  return (
    <div className="text-cyan-300">
      <p>INCOMING TRANSMISSION - TOP SECRET(ISH)</p>

      <motion.div
        variants={opacityVariant}
        initial="initial"
        animate="animate"
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="my-4">
          <p className="text-responsive">[ORIGIN: PLANET ROW]</p>
          <p className="text-responsive">[To: Commander Nyra]</p>
        </div>

        <div className="my-4">
          <p className="text-responsive">{`>>> MISSION DIRECTIVE:`}</p>
          <p className="text-responsive">
            You’re officially invited to an out-of-this-world celebration for
            Commander Nyra’s birthday! 🎉🪐
          </p>
        </div>

        <div className="my-4">
          <p className="text-responsive">{`>>> MISSION LOCATION:`}</p>
          <p className="text-responsive">
            The party hall at the Republic of Whitefield Clubhouse – aka
            Galactic Party HQ
          </p>
        </div>

        <div className="my-4">
          <p className="text-responsive">{`>>> MISSION WINDOW:`}</p>
          <p className="text-responsive">
            Saturday, June 21<sup>st</sup> between 11:30 AM and 2:30 PM
            (Standard Earth Time)
          </p>
        </div>

        <div className="my-4">
          <p className="text-responsive">{`>>> MISSION PARAMETERS:`}</p>
          <p className="text-responsive">
            1. Hit the button below to accept your mission. ✅
          </p>
          <p className="text-responsive">
            2. Fun is not optional — it's mandatory. 😄
          </p>
          <p className="text-responsive">
            3. Success = full tummy + happy heart + and interstellar amounts of
            fun! 🍰🎈🛸
          </p>
        </div>

        <div className="my-4">
          <p className="text-responsive">END OF TRANSMISSION</p>
          <p className="text-responsive">
            (But the party is just getting started...)
          </p>
        </div>

        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
            whileTap={{ y: 5 }}
            className="flex justify-center items-center gap-2 w-60 bg-cyan-300 h-12 cursor-pointer rounded-md p-2 text-black"
          >
            ACCEPT MISSION <span className="text-[12px]">(RSVP)</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export const Hero = () => {
  const [showLines, setShowLines] = useState({
    first: false,
    second: false,
    third: false,
  });

  const [showInvite, setShowInvite] = useState(false);

  const handleShowInvite = () => {
    setShowInvite(true);
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowLines((prev) => ({ ...prev, first: true }));
    }, 4000);

    const timer2 = setTimeout(() => {
      setShowLines((prev) => ({ ...prev, second: true }));
    }, 12000);

    const timer3 = setTimeout(() => {
      setShowLines((prev) => ({ ...prev, third: true }));
    }, 16000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="relative h-screen w-full">
      <video
        className="hidden md:block absolute top-0 left-0 w-full h-full object-cover"
        src="https://ik.imagekit.io/puppyparty25/nyra-birthday-25/hero-large.mp4?updatedAt=1748760866843"
        autoPlay
        muted
        loop
        playsInline
      />

      <video
        className="block md:hidden absolute top-0 left-0 w-full h-full object-cover"
        src="https://ik.imagekit.io/puppyparty25/nyra-birthday-25/hero-small.mp4?updatedAt=1748760904450"
        autoPlay
        muted
        loop
        playsInline
      />

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: showInvite ? "90vh" : "70vh", opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute top-1/2 left-1/2 lg:left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-full lg:w-2xl bg-black/70 p-4 lg:p-6 rounded-lg"
      >
        <AnimatePresence mode="wait" exitBeforeEnter>
          {showInvite ? (
            <motion.div
              variants={opacityVariant}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <Invite />
            </motion.div>
          ) : (
            <motion.div
              key="text-content"
              variants={opacityVariant}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {showLines?.first && (
                <p className="text-cyan-300 text-md">
                  <Typewriter
                    words={[
                      "After successfully completing her last space mission, our brave space commander, Nyra, is eagerly awaiting news of her next exciting adventure.",
                    ]}
                    loop={1}
                    typeSpeed={50}
                    delaySpeed={1500}
                  />
                </p>
              )}

              {showLines?.second && (
                <p className="text-cyan-300 text-md mt-5">
                  <Typewriter
                    words={[
                      "Just then, she receives an important message from mission control.",
                    ]}
                    loop={1}
                    typeSpeed={50}
                    delaySpeed={1500}
                  />
                </p>
              )}

              {showLines?.third && (
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                  <motion.button
                    variants={opacityVariant}
                    initial="initial"
                    animate="animate"
                    whileTap={{ y: 5 }}
                    className="flex justify-center items-center gap-2 w-50 bg-cyan-300 h-12 cursor-pointer rounded-md p-2 text-black"
                    onClick={handleShowInvite}
                  >
                    <PlayCircle className="h-6 w-6" />
                    Play message
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

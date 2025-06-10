"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { PlayCircle } from "lucide-react";
import { getGenderPronoun, getPersonalPronoun } from "@/utils/helpers";
import axios from "axios";
import ConfettiExplosion from "react-confetti-explosion";
import { redirect } from "next/navigation";
import { EMAIL_RECIPIENTS } from "@/utils/constants";

const opacityVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const Invite = ({ callout_name, token, invitee_identifier, rsvp }) => {
  const [sendingRsvp, setSendingRsvp] = useState(false);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [rsvpData, setRsvpData] = useState({});

  useEffect(() => {
    if (rsvpData?.status === "ok") {
      setSendingRsvp(false);
      setRsvpSent(true);
    }
  }, [rsvpData]);

  const handleSendRsvp = async () => {
    const payload = { invitee_identifier, token, recipients: EMAIL_RECIPIENTS };
    const headers = `Bearer ${token}`;
    setSendingRsvp(true);

    try {
      // const res = await axios.put(
      //   `${process.env.NEXT_PUBLIC_API_URL}/invitees`,
      //   payload,
      //   {
      //     headers: {
      //       Authorization: headers,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_FYNO_WORKFLOW_URL}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res?.data) {
        setRsvpData(res?.data);
      }
    } catch (error) {
      return;
    }
  };

  return (
    <div className="text-cyan-300">
      <p className="text-orange-300 text-responsive">
        INCOMING TRANSMISSION - TOP SECRET(ISH)
      </p>

      <motion.div
        variants={opacityVariant}
        initial="initial"
        animate="animate"
        transition={{ delay: 3, duration: 1 }}
      >
        <div className={`my-4 ${rsvp && "lg:my-7"}`}>
          <p className="text-responsive text-orange-300">
            [ORIGIN: PLANET R.O.W]
          </p>
          <p className="text-responsive">[To: Commander {callout_name}]</p>
        </div>

        <div className={`my-4 ${rsvp && "lg:my-7"}`}>
          <p className="text-responsive text-orange-300">{`>>> MISSION DIRECTIVE:`}</p>
          <p className="text-responsive">
            You’re officially invited to an out-of-this-world celebration for
            Commander Nyra’s{" "}
            <span className="text-orange-300">
              5<sup>th</sup>
            </span>{" "}
            birthday! 🎉🪐
          </p>
        </div>

        <div className={`my-4 ${rsvp && "lg:my-7"}`}>
          <p className="text-responsive text-orange-300">{`>>> MISSION LOCATION:`}</p>
          <p className="text-responsive">
            The party hall at the Republic of Whitefield Clubhouse – aka
            Galactic Party HQ
          </p>
        </div>

        <div className="my-4">
          <p className="text-responsive text-orange-300">{`>>> MISSION WINDOW:`}</p>
          <p className="text-responsive">
            Saturday, June 21<sup>st</sup> at 12:00 PM (Standard Earth Time)
          </p>
        </div>

        <div className={`my-4 ${rsvp && "lg:my-7"}`}>
          <p className="text-responsive text-orange-300">{`>>> MISSION PARAMETERS:`}</p>
          <p className="text-responsive mb-1">
            1. Hit the button below to accept your mission. ✅
          </p>
          <p className="text-responsive mb-1">
            2. Fun is not optional — it's mandatory. 😄
          </p>
          <p className="text-responsive">
            3. Success = full tummy + happy heart + interstellar amounts of fun!
            🍰🎈🛸
          </p>
        </div>

        <div className={`my-4 ${rsvp && "lg:my-7"}`}>
          <p className="text-responsive text-orange-300">END OF TRANSMISSION</p>
          <p className="text-responsive">
            (But the party is just getting started...)
          </p>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <AnimatePresence mode="wait">
            {!rsvpSent && !rsvp && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4, duration: 1 }}
                exit={{ opacity: 0 }}
                whileTap={{ y: 5 }}
                className="flex justify-center items-center gap-2 w-60 bg-cyan-300 h-10 md:h-12 cursor-pointer rounded-md p-2 text-black shadow-cyan-300 text-responsive font-semibold"
                disabled={sendingRsvp || rsvpSent}
                onClick={handleSendRsvp}
              >
                {sendingRsvp ? "...ACCEPTING MISSION" : "ACCEPT MISSION"}{" "}
                {!sendingRsvp && <span className="text-[12px]">(RSVP)</span>}
              </motion.button>
            )}

            {rsvpSent && (
              <ConfettiExplosion
                force={0.8}
                duration={3000}
                particleCount={250}
                particleSize={5}
                onComplete={() =>
                  redirect(`/invited?invitee_identifier=${invitee_identifier}`)
                }
              />
            )}

            {rsvpSent && (
              <motion.p
                key="rsvp-done"
                variants={opacityVariant}
                initial="initial"
                animate="animate"
                exit="initial"
                className="text-cyan-300 text-responsive mb-1"
              >
                Mission Accepted! 🚀
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export const Hero = ({
  callout_name,
  gender,
  token,
  invitee_identifier,
  rsvp,
}) => {
  const [showLines, setShowLines] = useState({
    first: false,
    second: false,
    third: false,
  });

  const [showInvite, setShowInvite] = useState(false);

  const handleShowInvite = () => {
    setShowInvite(true);
  };

  const genderPronoun = getGenderPronoun(gender);
  const personalPronoun = getPersonalPronoun(gender);

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
        className="absolute top-1/2 left-1/2 md:left-1/2 lg:left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-xs md:w-xl lg:w-2xl h-full bg-black/75 p-3 lg:p-6 rounded-lg"
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
              <Invite
                callout_name={callout_name}
                token={token}
                invitee_identifier={invitee_identifier}
                rsvp={rsvp}
              />
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
                <p className="text-cyan-300 text-responsive">
                  <Typewriter
                    words={[
                      `After successfully completing ${genderPronoun} last space mission, our brave space commander, ${callout_name}, is eagerly awaiting news of ${genderPronoun} next exciting adventure.`,
                    ]}
                    loop={1}
                    typeSpeed={50}
                    delaySpeed={1500}
                  />
                </p>
              )}

              {showLines?.second && (
                <p className="text-cyan-300 text-responsive mt-5">
                  <Typewriter
                    words={[
                      `Just then, ${personalPronoun} receives an important message from mission control.`,
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
                    className="flex justify-center items-center gap-2 w-50 bg-cyan-300 h-10 md:h-12 cursor-pointer rounded-md p-2 text-black text-responsive font-semibold tracking-wider"
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

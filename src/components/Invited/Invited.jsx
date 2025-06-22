"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { calculateDays } from "@/utils/helpers";
import { FOOTER_TEXT } from "@/utils/constants";
import { Typewriter } from "react-simple-typewriter";
import { generateRandomIndex } from "@/utils/helpers";
import ConfettiExplosion from "react-confetti-explosion";
import axios from "axios";

import { EMAIL_RECIPIENTS } from "@/utils/constants";

import { Schoolbell } from "next/font/google";

const schoolbell = Schoolbell({
  subsets: ["latin"],
  weight: "400",
});

const opacityVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const ConfirmedInvitationChild = ({ name }) => {
  const [showFooter, setShowFooter] = useState(false);
  const [footerText, setFooterText] = useState(null);

  useEffect(() => {
    const randomIndex = generateRandomIndex(FOOTER_TEXT?.length);
    setFooterText(FOOTER_TEXT[randomIndex]);

    setTimeout(() => {
      setShowFooter(true);
    }, 5000);
  }, []);

  return (
    <div className="text-cyan-300 relative h-full">
      <motion.div
        variants={opacityVariant}
        initial="initial"
        animate="animate"
        transition={{ delay: 3, duration: 1 }}
      >
        <div className="mb-4">
          <p className="text-base text-orange-300">
            Commander <span className="text-cyan-300">{name}</span> - your
            mission starts{" "}
            <span className="text-cyan-300">{calculateDays()}</span>
          </p>
        </div>

        <div className="my-4 md:my-5">
          <p className="text-responsive">Here's your mission summary</p>
        </div>

        <div className="my-4 md:my-5">
          <p className="text-responsive text-orange-300">{`>>> MISSION LOCATION:`}</p>
          <p className="text-responsive">
            The party hall at the Republic of Whitefield Clubhouse
          </p>
        </div>

        <div className="my-4 md:my-5">
          <p className="text-responsive text-orange-300">{`>>> MISSION WINDOW:`}</p>
          <p className="text-responsive">
            Saturday, June 21<sup>st</sup> at 12:00 PM (Standard Earth Time)
          </p>
        </div>

        <div className="my-4 md:my-5">
          <p className="text-responsive text-orange-300">{`>>> MISSION PARAMETERS:`}</p>
          <p className="text-responsive mb-1">
            1. Fun is not optional — it's mandatory. 😄
          </p>
          <p className="text-responsive mb-1">
            2. Success = full tummy + happy heart + interstellar amounts of fun!
            🍰🎈🛸
          </p>
        </div>
      </motion.div>

      <div className="absolute bottom-3 text-responsive">
        {showFooter && (
          <Typewriter
            words={[footerText]}
            typeSpeed={70}
            delaySpeed={1000}
            cursor
            cursorStyle="_"
            loop={1}
          />
        )}
      </div>
    </div>
  );
};

const ConfirmInvitationAdult = ({ name, invitee_identifier, token, rsvp }) => {
  const [sendingRsvp, setSendingRsvp] = useState(false);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [rsvpData, setRsvpData] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);

  const rsvpDone = rsvp || rsvpSent;

  useEffect(() => {
    if (rsvpData?.status === "ok") {
      setSendingRsvp(false);
      setRsvpSent(true);
      setShowConfetti(true);
    }
  }, [rsvpData]);

  const handleSendRsvp = async () => {
    const payload = { invitee_identifier, token, recipients: EMAIL_RECIPIENTS };
    const headers = `Bearer ${token}`;
    setSendingRsvp(true);

    try {
      // const res = await axios.post(
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
    <motion.div
      variants={opacityVariant}
      initial="initial"
      animate="animate"
      transition={{ delay: 2, duration: 1 }}
      className={`${schoolbell.className} text-orange-300 text-lg lg:text-2xl relative h-full `}
    >
      <p className="text-responsive-schoolbell">
        Dear <span className="text-cyan-300">{name}</span>,
      </p>

      {/* <div className="my-3 md:my-5">
        <p className="text-responsive-schoolbell">
          I’m turning five! And I’m having a{" "}
          <strong>super fun birthday party</strong> and I really really want you
          to come! 🎉
        </p>
      </div>

      <div className="my-3 md:my-5">
        <p className="text-responsive-schoolbell">
          There will be balloons, cake (with lots of icing), games and a lot of
          yummy food! 🎈
        </p>
      </div>

      <div className="my-3 md:my-5">
        <p className="text-responsive-schoolbell">
          The party is on{" "}
          <span className="text-cyan-300">
            Saturday, June 21<sup>st</sup> at 12:00 PM
          </span>{" "}
          in the{" "}
          <span className="text-cyan-300">
            Republic of Whitefield party hall
          </span>
        </p>
      </div>

      <div className="my-3 md:my-5">
        <p className="text-responsive-schoolbell">
          Please come, okay? I will save you a big piece of cake 🍰
        </p>
      </div>

      <div className="my-3 md:my-5">
        <AnimatePresence mode="wait">
          {rsvpDone ? (
            <motion.p
              key="rsvp-done"
              variants={opacityVariant}
              initial="initial"
              animate="animate"
              transition={{ duration: 1 }}
              exit="initial"
              className="mb-2 text-responsive-schoolbell"
            >
              See you <span className="text-cyan-300">{calculateDays()}</span>!!
            </motion.p>
          ) : (
            <motion.p
              key="please-rsvp"
              variants={opacityVariant}
              initial="initial"
              animate="animate"
              exit="initial"
              className="text-responsive-schoolbell"
            >
              Just click on the button so that Amma and Daddy know that you are
              coming :)
            </motion.p>
          )}
        </AnimatePresence>
      </div> */}

      <div className="my-3 md:my-5">
        <p className="text-responsive-schoolbell">
          Thank you for attending my party! 🙂
        </p>
      </div>

      <div className="my-3 md:my-5">
        <p className="text-cyan-300 text-responsive-schoolbell">
          <span className="text-orange-300">-</span> Nyra
        </p>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full flex justify-center pb-4">
        <AnimatePresence mode="wait">
          {!rsvpDone && (
            <motion.button
              key="rsvp-button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 3, duration: 1 }}
              whileTap={{ y: 5 }}
              disabled={sendingRsvp || rsvpSent}
              onClick={handleSendRsvp}
              className="flex justify-center items-center gap-2 w-60 bg-cyan-300 h-10 md:h-12 cursor-pointer rounded-md p-2 text-black shadow-cyan-300 tracking-widest font-semibold"
            >
              {sendingRsvp ? "...RSVP'ing" : "RSVP ❤️"}
            </motion.button>
          )}

          {showConfetti && (
            <ConfettiExplosion
              force={0.8}
              duration={3000}
              particleCount={250}
              particleSize={5}
            />
          )}

          {rsvpSent && (
            <motion.p
              key="rsvp-done"
              variants={opacityVariant}
              initial="initial"
              animate="animate"
              exit="initial"
            >
              Thank you! ❤️
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const Invited = ({ apiResponse }) => {
  const {
    invitee: {
      callout_name = "",
      child = true,
      invitee_identifier = "",
      rsvp = false,
    } = {},
    token = "",
  } = apiResponse || {};

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center bg-[url('https://ik.imagekit.io/puppyparty25/nyra-birthday-25/invited-small.png?updatedAt=1749379600859')] lg:bg-[url('https://ik.imagekit.io/puppyparty25/nyra-birthday-25/invited-large-2.png?updatedAt=1749379637136')]">
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "75vh", opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="w-xs md:w-xl lg:w-2xl h-full bg-black/75 p-3 lg:p-6 rounded-lg"
      >
        {child ? (
          <ConfirmedInvitationChild name={callout_name} />
        ) : (
          <ConfirmInvitationAdult
            name={callout_name}
            invitee_identifier={invitee_identifier}
            token={token}
            rsvp={rsvp}
          />
        )}
      </motion.div>
    </div>
  );
};

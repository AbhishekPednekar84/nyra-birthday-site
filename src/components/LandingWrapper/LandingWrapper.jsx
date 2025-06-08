"use client";

import { useState, useEffect } from "react";
import { Landing, Hero } from "@/components";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

export const LandingWrapper = ({ apiResponse }) => {
  const {
    invitee: {
      name = "",
      callout_name = "",
      child = false,
      gender = "",
      invitee_identifier = "",
    } = {},
    token = "",
  } = apiResponse || {};

  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLanding(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      <section className="relative h-screen w-full overflow-hidden">
        <AnimatePresence>
          {showLanding ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <Landing />
            </motion.div>
          ) : (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <Hero
                callout_name={callout_name}
                gender={gender}
                token={token}
                invitee_identifier={invitee_identifier}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
};

LandingWrapper.propTypes = {
  apiResponse: PropTypes.object,
};

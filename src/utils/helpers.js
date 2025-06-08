import { DateTime } from "luxon";

export const getGenderPronoun = (gender) => {
  if (gender === "F") {
    return "her";
  }

  return "his";
};

export const getPersonalPronoun = (gender) => {
  if (gender === "F") {
    return "she";
  }

  return "he";
};

export const calculateDays = () => {
  const partyDate = DateTime.fromISO("2025-06-21");

  const today = DateTime.local().startOf("day");

  const diffInDays = partyDate.diff(today, "days").toObject().days;

  if (diffInDays === 0) {
    return "today";
  } else if (diffInDays === 1) {
    return "tomorrow";
  } else {
    return `in ${Math.floor(diffInDays)} days`;
  }
};

export const generateRandomIndex = (length) => {
  return Math.floor(Math.random() * length);
};

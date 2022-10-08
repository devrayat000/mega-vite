export const container = {
  hidden: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
  show: {
    transition: {
      staggerChildren: 0.05,
      when: "beforeChildren",
    },
  },
};

export const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

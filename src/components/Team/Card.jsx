import React from "react";
import { motion } from "framer-motion";

/* ---------- VARIANTS ---------- */

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: "easeOut",
    },
  },
};

const CardGrid = ({ cards }) => {
  return (
    <motion.ul
      variants={gridVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
    >
      {cards.map((card) => (
        <motion.li
          key={card.title}
          variants={cardVariants}
          whileHover={{
            scale: 1.045,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          className="
            cursor-pointer
            rounded-2xl
            p-4
            bg-white/10 backdrop-blur-xl
            shadow-[0_8px_24px_rgba(0,0,0,0.35)]
            hover:bg-white/15
            will-change-transform
          "
        >
          <div className="h-96 w-full rounded-xl overflow-hidden relative">
            <img
              src={card.src}
              alt={card.title}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <h3 className="mt-3 text-center text-xl font-semibold text-white">
            {card.title}
          </h3>
          <p className="text-center text-sm text-white/60">
            {card.description}
          </p>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default CardGrid;

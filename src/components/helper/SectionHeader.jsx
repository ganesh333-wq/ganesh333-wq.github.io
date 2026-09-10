import { motion } from "framer-motion";

/**
 * One header treatment shared by the homepage sections: a headline with an
 * optional supporting line, left aligned on the same axis as the content below.
 */
function SectionHeader({ title, description, className = "" }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className={`section-header ${className}`}
    >
      <span className="section-header__rule" aria-hidden="true" />

      {title ? <h2 className="section-header__title">{title}</h2> : null}

      {description ? (
        <p className="section-header__lede">{description}</p>
      ) : null}
    </motion.header>
  );
}

export default SectionHeader;

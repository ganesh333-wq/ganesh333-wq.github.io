import { motion } from "framer-motion";

/**
 * One header treatment shared by the homepage sections: a headline with an
 * optional supporting line, left aligned on the same axis as the content below.
 */
function SectionHeader({ title, description, className = "" }) {
  const renderTitle = () => {
    if (!title) return null;
    const cleanedTitle = title.replace(/\.$/, '');
    const words = cleanedTitle.split(' ');
    if (words.length === 1) {
      return <h2 className="section-header__title"><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16f2b3] to-[#3b82f6]">{cleanedTitle}</span></h2>;
    }
    const lastWord = words.pop();
    return (
      <h2 className="section-header__title">
        {words.join(' ')}{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16f2b3] to-[#3b82f6]">
          {lastWord}
        </span>
      </h2>
    );
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className={`section-header ${className}`}
    >
      <span className="section-header__rule" aria-hidden="true" />

      {renderTitle()}

      {description ? (
        <p className="section-header__lede">{description}</p>
      ) : null}
    </motion.header>
  );
}

export default SectionHeader;

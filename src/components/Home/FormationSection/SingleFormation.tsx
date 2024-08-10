import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './FormationSection.module.css';
import useInView from '~/hooks/useInView';
import { useMediaQuery } from '~/hooks/useMediaQuery';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SingleFormationProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

const SingleFormation: React.FC<SingleFormationProps> = ({ icon, title, description, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const isInView = useInView(ref, 0, false);
  const isMobile = useMediaQuery('(max-width: 960px)');
  const transition = { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] };
  const cardVariants = {
    initial: { opacity: 0, y: 250 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
  };

  const contentVariants = {
    initial: isMobile ? { y: -20, transition } : { y: 0, transition },
    animate: isMobile ? { y: -20, transition } : { y: 0, transition },
    hover: { y: -20, transition },
  };

  const paragraphVariants = {
    initial: isMobile ? { y: 0, opacity: 1, transition } : { y: 0, opacity: 0, transition },
    animate: isMobile ? { y: 0, opacity: 1, transition } : { y: 0, opacity: 0, transition },
    hover: { y: 0, opacity: 1, transition },
  };
  return (
    <motion.div
      className={styles['singleFormation']}
      ref={ref}
      variants={cardVariants}
      initial='initial'
      animate='animate'
      whileHover='hover'
      transition={{ duration: 0.9, delay: index * 0.2, ease: 'easeInOut' }}
    >
      <img src={icon} alt={title} />
      <motion.div className={styles['singleFormation__content']} variants={contentVariants}>

        <motion.div variants={paragraphVariants}>
          <div className={styles['singleFormation__title']}>{title}</div>
          <p className={styles['singleFormation__description']}>{description}</p>
          <Link to='formation_page' target='_blank'>{t('homepage.formationFactorsSection.readMore')}</Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SingleFormation;

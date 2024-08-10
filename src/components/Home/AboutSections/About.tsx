import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import aboutPhoto from 'src/assets/Shared/success.png';
import styles from './About.module.css';
import useInView from '~/hooks/useInView';

const About = () => {
  const { t, i18n } = useTranslation();
  const refContent = useRef(null);
  const refImage = useRef(null);
  const isInViewContent = useInView(refContent, 0.4, false);
  const isInViewImage = useInView(refImage, 0.4, false);
  const transition = { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] };

  const slideFadeLeft = {
    hidden: { x: i18n.dir() === 'ltr' ? -100 : 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const slideFadeRight = {
    hidden: { x: i18n.dir() === 'ltr' ? 100 : -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
  return (
    <div className={styles['about']}>
      <h2 className={styles['about__title']}>
        {t('homepage.about.title')}
      </h2>
      <div className={styles['about__wrapper']}>
        <motion.div
          className={styles['about__wrapper__image']}
          ref={refImage}
          initial='hidden'
          animate={isInViewImage ? 'visible' : 'hidden'}
          variants={slideFadeLeft}
          transition={transition}
        >
          <img
            src={aboutPhoto}
            alt='Academy about'
            className={styles['about__image']}
          />
        </motion.div>
        <motion.div className={styles['about__wrapper__content']} ref={refContent}>
          <motion.p
            transition={{ ...transition, delay: 0.15 }}
            initial='hidden'
            animate={isInViewContent ? 'visible' : 'hidden'}
            variants={slideFadeRight}
          >
            {t('homepage.about.description')}
          </motion.p>
          <motion.div
            transition={{ ...transition, delay: 0.3 }}
            initial='hidden'
            animate={isInViewContent ? 'visible' : 'hidden'}
            variants={slideFadeRight}
          >
            <Link to='formation_page' target='_blank'>{t('homepage.about.readMore')}</Link>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;

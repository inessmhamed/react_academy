import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import goalsPhoto from 'src/assets/Shared/profession.png';
import styles from './Goals.module.css';
import useInView from '~/hooks/useInView';

const Goals = () => {
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
    <div className={styles['goals']}>
      <h2 className={styles['goals__title']}>
        {t('homepage.goals.title')}
      </h2>
      <div className={styles['goals__wrapper']}>
        <motion.div className={styles['goals__wrapper__content']} ref={refContent}>

          <motion.p
            transition={{ ...transition, delay: 0.15 }}
            initial='hidden'
            animate={isInViewContent ? 'visible' : 'hidden'}
            variants={slideFadeLeft}
          >
            {t('homepage.goals.description')}
          </motion.p>
          <motion.div
            transition={{ ...transition, delay: 0.3 }}
            initial='hidden'
            animate={isInViewContent ? 'visible' : 'hidden'}
            variants={slideFadeLeft}
          >
            <Link to='https://merchant.armadadelivery.com/signup' target='_blank'>
              <motion.button className={styles['goals__cta']}>
                {t('homepage.goals.contactUs')}
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className={styles['goals__wrapper__image']}
          ref={refImage}
          initial='hidden'
          animate={isInViewImage ? 'visible' : 'hidden'}
          variants={slideFadeRight}
          transition={transition}
        >
          <img
            src={goalsPhoto}
            alt='Academy goals'
            className={styles['goals__image']}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Goals;

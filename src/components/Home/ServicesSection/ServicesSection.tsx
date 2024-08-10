import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import vision from 'src/assets/Shared/vision.png';
import mission from 'src/assets/Shared/te-goals.png';
import styles from './ServicesSection.module.css';
import useInView from '~/hooks/useInView';

const Services = () => {
  const { t, i18n } = useTranslation();
  const refContent = useRef(null);
  const transition = { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] };
  const isInViewContent = useInView(refContent, 0.4, false);

  const slideFadeLeft = {
    hidden: { x: i18n.dir() === 'ltr' ? -200 : 200, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const slideFadeRight = {
    hidden: { x: i18n.dir() === 'ltr' ? 200 : -200, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
  return (
    <div className={styles['services']}>
      <h3 className={styles['services__title']}>
        {t('homepage.servicesSection.title')}
      </h3>
      <div className={styles['services__content']}>
        <motion.div
          ref={refContent}
          className={styles['services__description-card']}
          transition={{ ...transition, delay: 0.3 }}
          initial='hidden'
          animate={isInViewContent ? 'visible' : 'hidden'}
          variants={slideFadeLeft}
        >
          <div className={styles['services__description-card__image']}>
            <img src={vision} alt='vision' />
          </div>
          <div className={styles['services__description-card__content']}>
            <p>{t('homepage.servicesSection.vision_desc')}</p>

          </div>

        </motion.div>
        <motion.div
          className={styles['services__description-card']}
          ref={refContent}
          transition={{ ...transition, delay: 0.3 }}
          initial='hidden'
          animate={isInViewContent ? 'visible' : 'hidden'}
          variants={slideFadeRight}
        >
          <div className={styles['services__description-card__image']}>
            <img src={mission} alt='mission' />
          </div>
          <div className={styles['services__description-card__content']}>
            <p>{t('homepage.servicesSection.mission_desc')}</p>

          </div>

        </motion.div>
      </div>

    </div>
  );
};

export default Services;

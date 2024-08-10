import { useTranslation } from 'react-i18next';
import informatique from 'src/assets/Shared/informatique.png';
import development from 'src/assets/Shared/production.png';
import profession from 'src/assets/Shared/profession.png';
import useInView from '~/hooks/useInView';
import langue from 'src/assets/Shared/langue.png';

import styles from './Fields.module.css';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const Fields = () => {
  const { t } = useTranslation();
  const [startAnimation, setStartAnimation] = useState(false);
  const ref = useRef(null);

  const isInView = useInView(ref, 0.4, false);
  const FieldCards = [
    {
      title: t('homepage.fieldsSection.informatique'),
      image: informatique,
      label: "informatique",
    },
    {
      title: t('homepage.fieldsSection.development'),
      image: development,
      label: "development",
    },
    {
      title: t('homepage.fieldsSection.profession'),
      image: profession,
      label: "profession",
    },
    {
      title: t('homepage.fieldsSection.langue'),
      image: langue,
      label: "langue",
    },

  ];
  useEffect(() => {
    if (isInView) {
      setStartAnimation(true);
    }
  }, [isInView]);

  return (
    <div className={styles['fields']}>
      <h2 className={styles['fields__title']}>{t('homepage.fieldsSection.title')}</h2>
      <div ref={ref} className={styles['fieldsFactors__wrapper']}>
        {FieldCards.map((logo, index) => (
          <motion.div key={index} className={styles['fields_operate']}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={startAnimation ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 1,
              delay: 1.5,
              ease: [0, 0.71, 0.2, 1.01]
            }}>
            <img src={logo.image} alt='Fields logo' />
            <div className={styles['fields_operate_footer']}>
              <div className={styles['fields_operate_title']}>
                <h3>{t(`homepage.fieldsSection.${logo.label}`)}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div >
  );
};

export default Fields;

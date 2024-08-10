import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';
import logo from '../../../assets/Shared/logo-2.jpg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faYoutubeSquare, faFacebookSquare, faInstagramSquare, faTwitterSquare, faLinkedin, faGooglePlusSquare } from '@fortawesome/free-brands-svg-icons';
import telegram from '../../../assets/Shared/telegram - white.svg';

const Footer = () => {
  const year = new Date().getFullYear();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer-block']}>
        <div className={styles['logo-part']}>
          <div className={styles['logo-centre']}>
            <img src={logo} width='150px' height='150px' className={styles['logo']} />
            <h2 className={styles['title-header']}>{t('common.AlRaeed Academy')}</h2>
          </div>
        </div>
        <div className={styles['element-contact']}>
          <h4>{t('footer.contact us')}</h4>
          <div className={styles['info_content']}>
            <div className={styles['flx-row']}>
              <FontAwesomeIcon icon={faPhoneAlt} className={`${styles['info-icon']} ${!isArabic ? styles['icon-flip'] : ''}`}  />
              <div className={styles['info']}>{t('footer.telephone')}</div>
            </div>
            <div className={styles['flx-row']}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles['info-icon']}/>
              <div className={styles['info']}>{t('footer.address')}</div>
            </div>
            <div className={styles['flx-row']}>
              <FontAwesomeIcon icon={faEnvelope} className={styles['info-icon']} />
              <div className={styles['info']}>alraeedacademy@gmail.com</div>
            </div>
          </div>
        </div>
        <div className={styles['info-centre']}>
          <h4>{t('footer.academyVision')}</h4>
          <p className={styles['info-intro']}> {t('footer.intro')}</p>
        </div>
        <div className={styles['info-centre']}>
          <h4>{t('footer.connectwithus')}</h4>
          <div className={styles['flx-row-media']}>
            <Link to='https://www.youtube.com/channel/UChYhbCNQvq9zoSNMZX4PLmg' target='_blank' title={t('media.Youtube')}>
              <FontAwesomeIcon icon={faYoutubeSquare} className={styles.iconStyle} />
            </Link>
            <Link to='https://www.facebook.com/alraeedacademy' target='_blank' title={t('media.Facebook')}>
              <FontAwesomeIcon icon={faFacebookSquare} className={styles.iconStyle} />
            </Link>
            <Link to='https://www.facebook.com/alraeedacademy' target='_blank' title={t('media.Instagram')}>
              <FontAwesomeIcon icon={faInstagramSquare} className={styles.iconStyle} />
            </Link>
            <Link to='https://www.facebook.com/alraeedacademy' target='_blank' title={t('media.Twitter')}>
              <FontAwesomeIcon icon={faTwitterSquare} className={styles.iconStyle} />
            </Link>
            <Link to='https://www.facebook.com/alraeedacademy' target='_blank' title={t('media.LinkedIn')}>
              <FontAwesomeIcon icon={faLinkedin} className={styles.iconStyle} />
            </Link>
            <Link to='https://t.me/alraeedacademy?fbclid=IwAR3f9vQs-_fLxN7ZdS5uvJ2relI7XEtEeE8JnLp71m4V3lFKn-0IjdcTGTM' target='_blank' title={t('media.Telegram')}>
              <img src={telegram} alt="Telegram" className={`${styles.iconStyle} ${styles.telegramIcon}`} />

            </Link>
            <Link to='https://www.facebook.com/alraeedacademy' target='_blank' title={t('media.Gmail')}>
              <FontAwesomeIcon icon={faGooglePlusSquare} className={styles.iconStyle} />
            </Link>
          </div>
        </div>
      </div>
      <div className={`${styles['footer__copyright']}`}>
        <p>
          © {year} {t('footer.copyright')}
        </p>
      </div>
    </footer>

  );
};

export default Footer;

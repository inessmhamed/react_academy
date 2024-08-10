import React from 'react';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faYoutubeSquare, faFacebookSquare, faInstagramSquare, faTwitterSquare, faGooglePlusSquare } from '@fortawesome/free-brands-svg-icons';
import logo from '../../../assets/logo.png';
import telegram from '../../../assets/Shared/telegram.svg';

import Navbar from '../NavBar/NavBar';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.header}>
            <div className={styles.blackHeader}>

                <div className={styles.titlePart}>
                    <h1 className={styles.titleHeader}>{t('header.title')}</h1>
                    <h3 className={styles.subtitle}>{t('header.subtitle')}</h3>
                    <div className={styles.socialIcons}>
                        <FontAwesomeIcon icon={faYoutubeSquare} className={styles.iconHeader} />
                        <FontAwesomeIcon icon={faFacebookSquare} className={styles.iconHeader} />
                        <FontAwesomeIcon icon={faInstagramSquare} className={styles.iconHeader} />
                        <FontAwesomeIcon icon={faTwitterSquare} className={styles.iconHeader} />
                        <FontAwesomeIcon icon={faLinkedin} className={styles.iconHeader} />
                        <img src={telegram} alt="Telegram" className={`${styles.iconHeader} ${styles.telegramIcon}`} />
                        <FontAwesomeIcon icon={faGooglePlusSquare} className={styles.iconHeader} />
                    </div>
                </div>
                <div className={styles.logoPart}>
                    <img src={logo} width="120px" height="110px" className={styles.logo} alt="logo" />
                </div>
            </div>
            <Navbar />
        </div>
    );
};

export default Header;

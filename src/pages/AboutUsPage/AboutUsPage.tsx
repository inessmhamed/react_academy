import styles from './AboutUsPage.module.css';
import UnderHeader from '~/components/UnderHeader/UnderHeader';
import aboutUsImage from '~/assets/AboutUs/academy.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Map from '~/components/Home/MapSection/Map';
import { faBullseye, faCircleInfo, faEye, faList } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const AboutUsPage = () => {
    const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
    return (
        <div>
            <main className={styles['about-page']}>
                <UnderHeader img_underHeader={aboutUsImage} title_underHeader={t('navbar.aboutUs')} />
                <div className={styles['container']}>
                    <div className={styles['aboutUscontent']}>
                        <div className={styles['about-content']}>
                            <h3 className={styles['title']}> <FontAwesomeIcon icon={faCircleInfo} className={styles['icon']}></FontAwesomeIcon>{t('aboutUspage.aboutus-title')}</h3>
                            <p className={styles['content']}>{t('aboutUspage.aboutus-content')}</p>
                        </div>
                        <div className='vision-content'>
                            <h3 className={styles['title']}><FontAwesomeIcon icon={faEye} className={styles['icon']}></FontAwesomeIcon>{t('aboutUspage.vision-title')}</h3>
                            <p className={styles['content']}>{t('aboutUspage.vision-content')}</p>
                        </div>
                        <div className='mission-content'>
                            <h3 className={styles['title']}><FontAwesomeIcon icon={faBullseye} className={styles['icon']}></FontAwesomeIcon>{t('aboutUspage.mission-title')}</h3>
                            <p className={styles['content']}>{t('aboutUspage.mission-content')}</p>
                        </div>
                        <div className='services-content'>
                            <h3 className={styles['title']}><FontAwesomeIcon icon={faList}  className={`${styles['icon']} ${isArabic ? styles['icon-flip'] : ''}`}></FontAwesomeIcon>{t('aboutUspage.services-title')}</h3>
                            <p className={styles['content']}>{t('aboutUspage.services-content')}</p>
                        </div>
                    </div>
                    <Map />

                </div>

            </main>
        </div>
    );
};

export default AboutUsPage;
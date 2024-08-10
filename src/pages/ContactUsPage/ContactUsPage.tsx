import styles from './ContactUsPage.module.css';
import UnderHeader from '~/components/UnderHeader/UnderHeader';
import contactUsImage from '~/assets/Contact-us/contact.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faMessage, faPhoneAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

const ContactUsPage = () => {
    const { t, i18n } = useTranslation();
    // const isArabic = i18n.language === 'ar';
   

    const optionsFields = [
        { value: 'Informatique', label: t('contactUspage.informatique') },
        { value: 'Self-development', label: t('contactUspage.development') },
        { value: 'Profession', label: t('contactUspage.profession') },
        { value: 'Langue', label: t('contactUspage.langue') },
        { value: 'option5', label: t('contactUspage.option5') },
    ];
    const optionsCommunication = [
        { value: 'SMS', label: t('contactUspage.sms') },
        { value: 'Call', label: t('contactUspage.call') },
        { value: 'Email', label: t('contactUspage.email') },

    ];
    return (
        <main className={styles['contact-page']}>
            <UnderHeader img_underHeader={contactUsImage} title_underHeader={t('navbar.contactUs')} />
            <div className={styles['contact-container']}>
                <div className={styles['input-content']}>
                    <div className={styles['icon-container']}>
                        <FontAwesomeIcon icon={faUserAlt} className={styles['icon']} />
                    </div>
                    <input type="text" className={styles['input']} placeholder={t('contactUspage.fullName')} />
                </div>
                <div className={styles['input-content']}>
                    <div className={styles['icon-container']}>
                        <FontAwesomeIcon icon={faPhoneAlt} className={`${styles['icon']} ${styles['phone-icon']}`} />
                    </div>
                    <input type="text" className={styles['input']} placeholder={t('contactUspage.phone')} />
                </div>
                <div className={styles['input-content']}>
                    <div className={styles['icon-container']}>
                        <FontAwesomeIcon icon={faAt} className={styles['icon']} />
                    </div>
                    <input type="text" className={styles['input']} placeholder={t('contactUspage.email')} />
                </div>

                <div className={styles['row-content']}>
                    <div className={styles['select-content']}>
                        <div className={styles['icon-container']}>
                            <FontAwesomeIcon icon={faUserAlt} className={styles['icon']} />
                        </div>
                        <Select
                            options={optionsFields}
                            className={styles['select']}
                            placeholder={t('contactUspage.fields')}
                        />
                    </div>
                    <div className={styles['select-content']}>
                        <div className={styles['icon-container']}>
                            <FontAwesomeIcon icon={faUserAlt} className={styles['icon']} />
                        </div>
                        <Select
                            options={optionsCommunication}
                            className={styles['select']}
                            placeholder={t('contactUspage.communication')}
                        />
                    </div>
                </div>
                <div className={styles['input-content']}>
                    <div className={`${styles['icon-container']} ${styles['icon-message']}`}>
                        <FontAwesomeIcon icon={faMessage} className={styles['icon']} />
                    </div>
                    <textarea rows={10}  className={styles['textarea']} placeholder={t('contactUspage.message')} />
                </div>

                <div className={styles['button-container']}>
                    <button  className={styles['button-content']} type='button'>{t('contactUspage.send')}</button>
                </div>
            </div>

        </main >
    );
};

export default ContactUsPage;
import styles from './ContactUsPage.module.css';
import UnderHeader from '~/components/UnderHeader/UnderHeader';
import contactUsImage from '~/assets/Contact-us/contact.jpg';
import businessContactImage from '~/assets/Contact-us/business-contact.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faMessage, faPhoneAlt, faUserAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { useState, FormEvent } from 'react';

interface FormData {
    fullName: string;
    phone: string;
    email: string;
    field: { value: string; label: string } | null;
    communication: { value: string; label: string } | null;
    message: string;
}

interface FormErrors {
    fullName?: string;
    phone?: string;
    email?: string;
    field?: string;
    communication?: string;
    message?: string;
}

const ContactUsPage = () => {
    const { t, i18n } = useTranslation();
    // const isArabic = i18n.language === 'ar';

    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        phone: '',
        email: '',
        field: null,
        communication: null,
        message: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);

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

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = t('contactUspage.fullName') + ' ' + t('contactUspage.isRequired');
        }

        if (!formData.phone.trim()) {
            newErrors.phone = t('contactUspage.phone') + ' ' + t('contactUspage.isRequired');
        } else if (!/^\d{8,}$/.test(formData.phone.trim())) {
            newErrors.phone = t('contactUspage.validPhone');
        }

        if (!formData.email.trim()) {
            newErrors.email = t('contactUspage.email') + ' ' + t('contactUspage.isRequired');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            newErrors.email = t('contactUspage.validEmail');
        }

        if (!formData.field) {
            newErrors.field = t('contactUspage.fields') + ' ' + t('contactUspage.isRequired');
        }

        if (!formData.communication) {
            newErrors.communication = t('contactUspage.communication') + ' ' + t('contactUspage.isRequired');
        }

        if (!formData.message.trim()) {
            newErrors.message = t('contactUspage.message') + ' ' + t('contactUspage.isRequired');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            // Form is valid, proceed with submission
            console.log('Form submitted:', formData);
            setSubmitted(true);

            // Reset form after submission
            setFormData({
                fullName: '',
                phone: '',
                email: '',
                field: null,
                communication: null,
                message: ''
            });

            // Clear errors
            setErrors({});

            // Reset submitted state after 3 seconds
            setTimeout(() => {
                setSubmitted(false);
            }, 3000);
        }
    };
    return (
        <main className={styles['contact-page']}>
            <UnderHeader img_underHeader={contactUsImage} title_underHeader={t('navbar.contactUs')} />
            <div className={styles['form-container']}>

                <form className={styles['contact-container']} onSubmit={handleSubmit}>
                    <div className={styles['input-content']}>
                        <div className={styles['icon-container']}>
                            <FontAwesomeIcon icon={faUserAlt} className={styles['icon']} />
                        </div>
                        <input
                            type="text"
                            className={`${styles['input']} ${errors.fullName ? styles['input-error'] : ''}`}
                            placeholder={t('contactUspage.fullName')}
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                    </div>
                    {errors.fullName && <div className={styles['error-message']}>{errors.fullName}</div>}

                    <div className={styles['input-content']}>
                        <div className={styles['icon-container']}>
                            <FontAwesomeIcon icon={faPhoneAlt} className={`${styles['icon']} ${styles['phone-icon']}`} />
                        </div>
                        <input
                            type="text"

                            className={`${styles['input']} ${errors.phone ? styles['input-error'] : ''}`}
                            placeholder={t('contactUspage.phone')}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    {errors.phone && <div className={styles['error-message']}>{errors.phone}</div>}

                    <div className={styles['input-content']}>
                        <div className={styles['icon-container']}>
                            <FontAwesomeIcon icon={faAt} className={styles['icon']} />
                        </div>
                        <input
                            type="email"
                            className={`${styles['input']} ${errors.email ? styles['input-error'] : ''}`}
                            placeholder={t('contactUspage.email')}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    {errors.email && <div className={styles['error-message']}>{errors.email}</div>}

                    <div className={styles['row-content']}>
                        <div className={styles['select-content']}>
                            <div className={styles['icon-container']}>
                                <FontAwesomeIcon icon={faUserAlt} className={styles['icon']} />
                            </div>
                            <Select
                                options={optionsFields}
                                className={`${styles['select']} ${errors.field ? styles['select-error'] : ''}`}
                                placeholder={t('contactUspage.fields')}
                                value={formData.field}
                                onChange={(selectedOption) => setFormData({ ...formData, field: selectedOption })}
                            />
                        </div>
                        <div className={styles['select-content']}>
                            <div className={styles['icon-container']}>
                                <FontAwesomeIcon icon={faUserAlt} className={styles['icon']} />
                            </div>
                            <Select
                                options={optionsCommunication}
                                className={`${styles['select']} ${errors.communication ? styles['select-error'] : ''}`}
                                placeholder={t('contactUspage.communication')}
                                value={formData.communication}
                                onChange={(selectedOption) => setFormData({ ...formData, communication: selectedOption })}
                            />
                        </div>
                    </div>
                    <div className={styles['error-row']}>
                        {errors.field && <div className={styles['error-message']}>{errors.field}</div>}
                        {errors.communication && <div className={styles['error-message']}>{errors.communication}</div>}
                    </div>

                    <div className={styles['input-content']}>
                        <div className={`${styles['icon-container']} ${styles['icon-message']}`}>
                            <FontAwesomeIcon icon={faMessage} className={styles['icon']} />
                        </div>
                        <textarea
                            rows={10}
                            className={`${styles['textarea']} ${errors.message ? styles['textarea-error'] : ''}`}
                            placeholder={t('contactUspage.message')}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                    </div>
                    {errors.message && <div className={styles['error-message']}>{errors.message}</div>}

                    <div className={styles['button-container']}>
                        <button
                            className={`${styles['custom-button']} ${submitted ? styles['button-success'] : ''}`}
                            type='submit'
                            disabled={submitted}
                        >
                            <span className={styles['button-text']}>
                                {submitted ? t('contactUspage.sent') : t('contactUspage.send')}
                            </span>
                            
                        </button>
                    </div>

                    {submitted && (
                        <div className={styles['success-message']}>
                            {t('contactUspage.successMessage')}
                        </div>
                    )}
                </form>
                <div className={styles['image-container']}>
                    <div className={styles['form-instructions']}>
                        {t('contactUspage.formInstructions')}
                    </div>
                    <img src={businessContactImage} alt="Business Contact" className={styles['contact-image']} />
                </div>
            </div>
        </main>
    );
};

export default ContactUsPage;

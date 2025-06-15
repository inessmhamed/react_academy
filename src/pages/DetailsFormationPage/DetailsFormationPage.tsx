import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import styles from './DetailsFormationPage.module.css';
import UnderHeader from '~/components/UnderHeader/UnderHeader';
import formationImage from '~/assets/Formation/details-formation.png';
import { useTranslation } from 'react-i18next';

// Import formation images
import formation1 from '~/assets/Home/formation1.jpg';
import formation2 from '~/assets/Home/formation2.jpg';
import formation3 from '~/assets/Home/formation3.jpg';
import formation4 from '~/assets/Home/formation4.jpeg';
import informatique from '~/assets/Shared/informatique.png';
import selfDevelopment from '~/assets/Shared/تنمية-ذاتية.jpg';
import langue from '~/assets/Shared/langue.png';
import profession from '~/assets/Shared/profession.png';

// Formation type definition
interface Formation {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
  date?: string;
  duration?: string;
  language?: string;
  price?: string;
  longDescription?: string;
}

const DetailsFormationPage = () => {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';
    const { id } = useParams<{ id: string }>();
    const [formation, setFormation] = useState<Formation | null>(null);
    const [loading, setLoading] = useState(true);
    
    // Mock formations data (in a real app, this would come from an API)
    const formations: Formation[] = [
        {
            id: 1,
            image: formation1,
            title: 'دورة الميلتيميديا الإعلامية',
            description: 'دورة الميلتيميديا الإعلامية دورة الميلتيميديا الإعلامية',
            category: 'profession',
            date: '2021/4/18',
            duration: '3 أشهر',
            language: 'عربية',
            price: '550 د',
            longDescription: t('homepage.formationFactorsSection.successCard1.description')
        },
        {
            id: 2,
            image: formation2,
            title: t('homepage.formationFactorsSection.successCard2.title'),
            description: t('homepage.formationFactorsSection.successCard2.description'),
            category: 'development',
            date: '2022/5/20',
            duration: '2 أشهر',
            language: 'عربية',
            price: '450 د',
            longDescription: t('homepage.formationFactorsSection.successCard2.description')
        },
        {
            id: 3,
            image: formation3,
            title: t('homepage.formationFactorsSection.successCard3.title'),
            description: t('homepage.formationFactorsSection.successCard3.description'),
            category: 'langue',
            date: '2022/7/15',
            duration: '4 أشهر',
            language: 'عربية',
            price: '600 د',
            longDescription: t('homepage.formationFactorsSection.successCard3.description')
        },
        {
            id: 4,
            image: formation4,
            title: t('homepage.formationFactorsSection.successCard1.title'),
            description: t('homepage.formationFactorsSection.successCard1.description'),
            category: 'informatique',
            date: '2023/1/10',
            duration: '3 أشهر',
            language: 'عربية',
            price: '500 د',
            longDescription: t('homepage.formationFactorsSection.successCard1.description')
        },
        {
            id: 5,
            image: informatique,
            title: t('homepage.formationFactorsSection.successCard2.title'),
            description: t('homepage.formationFactorsSection.successCard2.description'),
            category: 'informatique',
            date: '2023/3/5',
            duration: '2 أشهر',
            language: 'عربية',
            price: '400 د',
            longDescription: t('homepage.formationFactorsSection.successCard2.description')
        },
        {
            id: 6,
            image: selfDevelopment,
            title: 'دورة في 3D 6',
            description: t('homepage.formationFactorsSection.successCard3.description'),
            category: 'development',
            date: '2021/4/18',
            duration: '3 أشهر',
            language: 'عربية',
            price: '550 د',
            longDescription: 'دورة في 3D دورة في 2021 - 3D دورة في 3D دورة في 2021 - 3D دورة في 3D دورة في 2021 - 3D دورة في 3D دورة في 2021 - 3D دورة في 3D دورة في 2021 - 3D دورة في 3D دورة في 2021 - 3D'
        },
        {
            id: 7,
            image: langue,
            title: t('homepage.formationFactorsSection.successCard1.title'),
            description: t('homepage.formationFactorsSection.successCard1.description'),
            category: 'langue',
            date: '2023/6/20',
            duration: '3 أشهر',
            language: 'عربية',
            price: '550 د',
            longDescription: t('homepage.formationFactorsSection.successCard1.description')
        },
        {
            id: 8,
            image: profession,
            title: t('homepage.formationFactorsSection.successCard2.title'),
            description: t('homepage.formationFactorsSection.successCard2.description'),
            category: 'profession',
            date: '2023/9/1',
            duration: '4 أشهر',
            language: 'عربية',
            price: '650 د',
            longDescription: t('homepage.formationFactorsSection.successCard2.description')
        }
    ];
    
    // Find the formation based on the ID
    useEffect(() => {
        if (id) {
            const foundFormation = formations.find(f => f.id === parseInt(id));
            setFormation(foundFormation || null);
        }
        setLoading(false);
    }, [id, i18n.language]);
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!formation) {
        return (
            <div>
                <UnderHeader img_underHeader={formationImage} title_underHeader={t('navbar.detailsFormation')} />
                <div className={styles.container}>
                    <h2>{isArabic ? 'الدورة غير موجودة' : 'Formation not found'}</h2>
                    <Link to="/formations">{isArabic ? 'العودة إلى الدورات' : 'Back to Formations'}</Link>
                </div>
            </div>
        );
    }
  
    return (
        <div>
            <main>
                <UnderHeader img_underHeader={formationImage} title_underHeader={t('navbar.detailsFormation')} />
                <div className={styles.container}>
                    <div className={styles['formation-details']}>
                        {/* Main content layout */}
                        <div className={styles['main-content']}>
                            {/* Left side - Image section */}
                            <motion.div 
                                className={styles['image-section']}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <img 
                                    src={formation.image} 
                                    alt={formation.title} 
                                    className={styles['main-image']}
                                />
                                
                                {/* Thumbnail images */}
                                <div className={styles['thumbnail-container']}>
                                    <img src={formation.image} alt="thumbnail 1" className={styles.thumbnail} />
                                    <img src={formation.image} alt="thumbnail 2" className={styles.thumbnail} />
                                    <img src={formation.image} alt="thumbnail 3" className={styles.thumbnail} />
                                </div>
                            </motion.div>

                            {/* Right side - Course info */}
                            <motion.div 
                                className={styles['info-section']}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <h1 className={styles['formation-title']}>{formation.title}</h1>
                                <p className={styles['formation-subtitle']}>{formation.description}</p>
                                
                                {/* Course metadata */}
                                <div className={styles['meta-grid']}>
                                    <div className={styles['meta-item']}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm7 6h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm-5-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM1.5 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM2 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm6-8.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                                        </svg>
                                        <span>{formation.price}</span>
                                    </div>
                                    
                                    <div className={styles['meta-item']}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z"/>
                                            <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.059c.285.784.75 1.543 1.343 2.235-.793-.151-1.673-.481-2.203-.973-.532.498-1.431.824-2.218.973.6-.699 1.062-1.469 1.353-2.235h-.637a4.992 4.992 0 0 1-1.976 2.501 4.992 4.992 0 0 1-1.976-2.501H3.622c.5.923 1.162 1.696 1.962 2.262-.83.171-1.39.427-1.854.694l.443.789c.292-.156.791-.392 1.437-.622-.34.175-.795.396-1.006.573.236.193.478.39.704.571.256-.175.626-.361 1.09-.561-.629.349-1.203.791-1.719 1.302l.645.645c.563-.596 1.223-1.063 1.945-1.409.721.346 1.382.813 1.945 1.409l.645-.645c-.516-.511-1.09-.953-1.719-1.302.464.2.834.386 1.09.561a6.74 6.74 0 0 1 .704-.571c-.211-.177-.666-.398-1.006-.573.646.23 1.145.466 1.437.622l.443-.789c-.464-.267-1.024-.523-1.854-.694.8-.566 1.462-1.339 1.962-2.262h-.637A4.992 4.992 0 0 1 8 11.059 4.992 4.992 0 0 1 6.024 8.56H5.387z"/>
                                        </svg>
                                        <span>{formation.language}</span>
                                    </div>
                                    
                                    <div className={styles['meta-item']}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                        </svg>
                                        <span>{formation.duration}</span>
                                    </div>
                                    
                                    <div className={styles['meta-item']}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                        </svg>
                                        <span>{formation.date}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* About the program section */}
                        <motion.div 
                            className={styles['about-section']}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <h2 className={styles['section-title']}>نبذة عن البرنامج :</h2>
                            <p className={styles['section-content']}>{formation.longDescription}</p>
                            
                            <button className={styles['apply-button']}>
                                {isArabic ? 'طلب الدورة' : 'Apply for Course'}
                            </button>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DetailsFormationPage;

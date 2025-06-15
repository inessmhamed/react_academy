import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './FormationsPage.module.css';
import UnderHeader from '~/components/UnderHeader/UnderHeader';
import formationImage from '~/assets/Formation/formation.png';
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
}

// Formation Card Component props interface
interface FormationCardProps {
  image: string;
  title: string;
  description: string;
  index: number;
  id: number;
}

// Formation Card Component
const FormationCard: React.FC<FormationCardProps> = ({ image, title, description, index, id }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className={styles['formation-card']}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <img src={image} alt={title} />
      <div className={styles['formation-content']}>
        <div className={styles['formation-title']}>{title}</div>
        <p>{description}</p>
        <div className={styles['card-actions']}>
          <Link to={`/formation_details/${id}`} className={styles['eye-icon-link']}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              fill="currentColor" 
              viewBox="0 0 16 16"
              className={styles['eye-icon']}
            >
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>
          </Link>
          <span className={styles['read-more-text']}>
            {t('homepage.formationFactorsSection.readMore')}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const FormationsPage = () => {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';
    const [activeFilter, setActiveFilter] = useState('all');
    const [filteredFormations, setFilteredFormations] = useState<Formation[]>([]);
    
    // Formation data
    const formations: { all: Formation[] } = {
        all: [
            {
                id: 1,
                image: formation1,
                title: t('homepage.formationFactorsSection.successCard1.title'),
                description: t('homepage.formationFactorsSection.successCard1.description'),
                category: 'profession'
            },
            {
                id: 2,
                image: formation2,
                title: t('homepage.formationFactorsSection.successCard2.title'),
                description: t('homepage.formationFactorsSection.successCard2.description'),
                category: 'development'
            },
            {
                id: 3,
                image: formation3,
                title: t('homepage.formationFactorsSection.successCard3.title'),
                description: t('homepage.formationFactorsSection.successCard3.description'),
                category: 'langue'
            },
            {
                id: 4,
                image: formation4,
                title: t('homepage.formationFactorsSection.successCard1.title'),
                description: t('homepage.formationFactorsSection.successCard1.description'),
                category: 'informatique'
            },
            {
                id: 5,
                image: informatique,
                title: t('homepage.formationFactorsSection.successCard2.title'),
                description: t('homepage.formationFactorsSection.successCard2.description'),
                category: 'informatique'
            },
            {
                id: 6,
                image: selfDevelopment,
                title: t('homepage.formationFactorsSection.successCard3.title'),
                description: t('homepage.formationFactorsSection.successCard3.description'),
                category: 'development'
            },
            {
                id: 7,
                image: langue,
                title: t('homepage.formationFactorsSection.successCard1.title'),
                description: t('homepage.formationFactorsSection.successCard1.description'),
                category: 'langue'
            },
            {
                id: 8,
                image: profession,
                title: t('homepage.formationFactorsSection.successCard2.title'),
                description: t('homepage.formationFactorsSection.successCard2.description'),
                category: 'profession'
            }
        ]
    };
    
    // Filter categories
    const filterCategories = [
        { id: 'all', label: isArabic ? 'الكل' : 'All' },
        { id: 'profession', label: isArabic ? 'حرف مهنية' : 'Professional crafts' },
        { id: 'development', label: isArabic ? 'تنمية ذاتية' : 'Self development' },
        { id: 'langue', label: isArabic ? 'لغات' : 'Languages' },
        { id: 'informatique', label: isArabic ? 'إعلامية' : 'Informatique' },
        { id: 'intelligence', label: isArabic ? 'تنمية الذكاء' : 'Intelligence development' }
    ];
    
    // Filter formations based on active filter
    useEffect(() => {
        if (activeFilter === 'all') {
            setFilteredFormations(formations.all);
        } else {
            const filtered = formations.all.filter(formation => formation.category === activeFilter);
            setFilteredFormations(filtered);
        }
    }, [activeFilter, i18n.language]);
    
    return (
        <div>
            <main className={styles['formations-page']}>
                <UnderHeader img_underHeader={formationImage} title_underHeader={t('navbar.formations')} />
                <div className={styles['container']}>
                    {/* Filter Buttons */}
                    <div className={styles['filter-container']}>
                        {filterCategories.map(category => (
                            <div 
                                key={category.id}
                                className={`${styles['filter-button']} ${activeFilter === category.id ? styles['active'] : ''}`}
                                onClick={() => setActiveFilter(category.id)}
                            >
                                {category.label}
                            </div>
                        ))}
                    </div>
                    
                    {/* Formations Grid */}
                    <div className={styles['formations-grid']}>
                        {filteredFormations.length > 0 ? (
                            filteredFormations.map((formation, index) => (
                                <FormationCard 
                                    key={formation.id}
                                    id={formation.id}
                                    image={formation.image}
                                    title={formation.title}
                                    description={formation.description}
                                    index={index}
                                />
                            ))
                        ) : (
                            <div className={styles['no-formations']}>
                                {isArabic ? 'لا توجد دورات تدريبية في هذه الفئة حاليًا' : 'No formations in this category at the moment'}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FormationsPage;

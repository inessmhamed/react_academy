import { useTranslation } from 'react-i18next';
import formation1 from '../../../assets/Home/formation1.jpg';
import formation2 from '../../../assets/Home/formation2.jpg';
import formation3 from '../../../assets/Home/formation3.jpg';
import formation4 from '../../../assets/Home/formation4.jpeg';
import styles from './FormationSection.module.css';
import SingleFormation from './SingleFormation';
import { Link } from 'react-router-dom';

const Formation = () => {
    const { t } = useTranslation();
    const successCards = [
        {
            icon: formation1,
            title: t('homepage.formationFactorsSection.successCard1.title'),
            description: t('homepage.formationFactorsSection.successCard1.description'),
        },
        {
            icon: formation2,
            title: t('homepage.formationFactorsSection.successCard3.title'),
            description: t('homepage.formationFactorsSection.successCard3.description'),
        },
        {
            icon: formation3,
            title: t('homepage.formationFactorsSection.successCard2.title'),
            description: t('homepage.formationFactorsSection.successCard2.description'),
        },
        {
            icon: formation4,
            title: t('homepage.formationFactorsSection.successCard2.title'),
            description: t('homepage.formationFactorsSection.successCard2.description'),
        },
    ];
    return (
        <div className={styles['formationFactors']}>
            <h2 className={styles['formationFactors__title']}>
                {t('homepage.formationFactorsSection.title')}
            </h2>
            <div className={styles['formationFactors__wrapper']}>
                {successCards.map((card, index) => (
                    <SingleFormation
                        key={index}
                        icon={card.icon}
                        title={card.title}
                        description={card.description}
                        index={index}
                    />
                ))}

            </div> <Link to='https://merchant.armadadelivery.com/signup' target='_blank'>
                <button className={styles['formation_button']} type='button'>
                    {t('homepage.formationFactorsSection.allFormation')}
                </button>
            </Link>
        </div>
    );
};

export default Formation;

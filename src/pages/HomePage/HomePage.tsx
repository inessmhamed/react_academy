import Formation from '~/components/Home/FormationSection/FormationSection';
import Carousel from '../../components/Home/CarouselSection/CarouselSection';
import styles from './HomePage.module.css';
import Fields from '~/components/Home/FieldsSection/Fields';
import Services from '~/components/Home/ServicesSection/ServicesSection';
import Goals from '~/components/Home/GoalsSections/Goals';
import About from '~/components/Home/AboutSections/About';


const HomePage = () => {
    return (
        <div>
            <main className={styles['home-page']}>
                <Carousel />
                <Formation />
                <Goals />
                <Fields />
                <About />
                <Services />
            </main>
        </div>
    );
};

export default HomePage;
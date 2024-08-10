import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel1 from '../../../assets/Home/Carousel2.jpg';
import Carousel2 from '../../../assets/Home/Carousel22.jpg';
import Carousel3 from '../../../assets/Home/Carousel3.jpg';
import styles from './CarouselSection.module.css';
import { useTranslation } from 'react-i18next';

const Carousel = () => {
    const { i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        rtl: isRtl,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className={`${styles['carousel-container']} ${isRtl ? styles['rtl'] : 'carousel-container'}`}>
            <Slider {...settings}>
                <div className={styles['carousel-image']}>
                    <img src={Carousel1} alt="Picture 1" />
                </div>
                <div className={styles['carousel-image']}>
                    <img src={Carousel2} alt="Picture 2" />
                </div>
                <div className={styles['carousel-image']}>
                    <img src={Carousel3} alt="Picture 3" />
                </div>
            </Slider>
        </div>

    );
};

export default Carousel;

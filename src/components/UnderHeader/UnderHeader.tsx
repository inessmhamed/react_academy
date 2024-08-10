
import styles from './UnderHeader.module.css';
interface Props {
    img_underHeader: string;
    title_underHeader: string;
}
const UnderHeader = ({ img_underHeader, title_underHeader }: Props) => {

    return (
        <div className={styles['underHeader']}>
            <img src={img_underHeader} className={styles.underHeader_content} alt='underHeader image' />
            <div className={styles.title}>
                <p> {title_underHeader} </p>
            </div>
        </div>
    );
};

export default UnderHeader;

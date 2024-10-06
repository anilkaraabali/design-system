import styles from './ButtonLoader.module.scss';

export const ButtonLoader: React.FC = () => (
  <>
    <span className={styles['loading-dot']} />
    <span className={styles['loading-dot']} />
    <span className={styles['loading-dot']} />
  </>
);

import styles from '../styles/Header.module.css'

export default function HeroLayout({children}) {
    return (
        <header className={styles.header}>
            <div className={`${styles.hero_bg}`}>{children}</div>
        </header>
    )
}
import styles from '../styles/layout.module.css'
import Nav from './navbar'
import Footer from './footer'

export default function Layout({ children, navbar }) {
    return (
        <div className={styles.container}>
            {navbar ? <Nav /> : null}
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </div>
    )
}
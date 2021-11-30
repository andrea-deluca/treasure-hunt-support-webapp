import styles from '../styles/layout.module.css'
import Footer from './footer'

export default function Layout({ main }) {
    return (
        <div>
            <main className={styles.main}>
                {main}
            </main>
            <Footer />
        </div>
    )
}
import Layout from "./layout";
import Image from 'next/image'
import Link from 'next/link'
import accessDenied from '../public/svg/accessDenied.svg'
import styles from '../styles/accessDenied.module.css'
import { Button } from 'react-bootstrap'

export default function AccessDenied() {
    return (
        <Layout navbar>
            <div className={"d-flex flex-column align-items-center"}>
                <Image src={accessDenied} alt="Accesso negato" width={300} height={300} />
                <h2 className={styles.title}>Accesso negato!</h2>
                <h6 className={styles.description}>Non hai i permessi per accedere alla pagina richiesta.</h6>
                <Link href={"/"}>
                    <Button>Torna alla home</Button>
                </Link>
            </div>
        </Layout>
    );
}
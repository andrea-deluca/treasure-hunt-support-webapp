import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/layout';
import Divider from '../components/divider';
import styles from '../styles/login.module.css'
import logo from '../public/images/logo.png'
import { Col, Form, Button } from 'react-bootstrap';
import { useCallback, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/loading';

function LoginHead() {
    return (
      <Head>
        <title>Treasure Hunt | Login</title>
        <meta name="description" content="Webapp di supporto per la caccia al tesoro organizzata dalla Consulta Giovanile di Lascari" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
    );
  }

function LoginMain() {
    const router = useRouter()
    const { currentUser } = useContext(AuthContext)

    if (currentUser) {
        router.push('/')
        return <Loading />
    }

    const loginHandler = async (e) => {
        e.preventDefault()
        const { username, password } = e.target.elements
        try {
            await signInWithEmailAndPassword(auth, username.value, password.value)
            router.push('/')
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    // const loginHandler = useCallback(
    //     async (event) => {
    //         event.preventDefault()
    //         const { username, password } = event.target.elements
    //         try {
    //             await signInWithEmailAndPassword(auth, username.value, password.value)
    //             router.push('/')
    //         } catch (error) {
    //             console.log(error)
    //             alert(error)
    //         }
    //     }, [router])

    return (
        <>
            <Col xs={{ span: 4 }} className={"d-none d-lg-block"}>
                <Image src={logo} alt="Consulta Giovanile di Lascari Logo" />
            </Col>
            <Col xs={{ span: 2 }} className={"d-none d-lg-block"}>
                <Divider />
            </Col>
            <Col xs={{ span: 10 }} lg={{ span: 4 }} className={styles.main_col}>
                <Image className={"me-3 d-block d-lg-none"} src={logo} alt="Consulta Giovanile di Lascari Logo" width={150} height={150} />
                <h1 className={styles.title}>Benvenuto alla<br /><span className={styles.title_span}>Treasure Hunt</span></h1>
                <Form onSubmit={loginHandler}>
                    <Form.Group className="mb-4 mt-5" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="email" placeholder="Username" name="username" />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" />
                    </Form.Group>
                    {/* <Link href={"/signin"}>
                        <p className={styles.signIn}>Non hai un account? Registrati</p>
                    </Link> */}
                    <Button variant="primary" type="submit">
                        Accedi
                    </Button>
                </Form>
            </Col>
        </>
    );
}

export default function Login() {
    return (
        <Layout>
            <LoginHead />
            <LoginMain />
        </Layout>
    )
}

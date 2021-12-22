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
            <meta name="apple-touch-fullscreen" content="yes" />
            <meta name="apple-mobile-web-app-title" content="Treasure Hunt" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <link rel="apple-touch-startup-image" sizes="320x480" href="/splash/apple_splash_320x480.png" />
            <link rel="apple-touch-startup-image" sizes="640x960" href="/splash/apple_splash_640x960.png" />
            <link rel="apple-touch-startup-image" sizes="640x1136" href="/splash/apple_splash_640x1136.png" />
            <link rel="apple-touch-startup-image" sizes="750x1334" href="/splash/apple_splash_750x1334.png" />
            <link rel="apple-touch-startup-image" sizes="768x1024" href="/splash/apple_splash_768x1024.png" />
            <link rel="apple-touch-startup-image" sizes="828x1792" href="/splash/apple_splash_828x1792.png" />
            <link rel="apple-touch-startup-image" sizes="1024x748" href="/splash/apple_splash_1024x748.png" />
            <link rel="apple-touch-startup-image" sizes="1024x768" href="/splash/apple_splash_1024x768.png" />
            <link rel="apple-touch-startup-image" sizes="1125x2436" href="/splash/apple_splash_1125x2436.png" />
            <link rel="apple-touch-startup-image" sizes="1242x2208" href="/splash/apple_splash_1242x2208.png" />
            <link rel="apple-touch-startup-image" sizes="1242x2688" href="/splash/apple_splash_1242x2688.png" />
            <link rel="apple-touch-startup-image" sizes="1334x750" href="/splash/apple_splash_1334x750.png" />
            <link rel="apple-touch-startup-image" sizes="1536x2008" href="/splash/apple_splash_1536x2008.png" />
            <link rel="apple-touch-startup-image" sizes="1536x2048" href="/splash/apple_splash_1536x2048.png" />
            <link rel="apple-touch-startup-image" sizes="1668x2224" href="/splash/apple_splash_1668x2224.png" />
            <link rel="apple-touch-startup-image" sizes="1792x828" href="/splash/apple_splash_1792x828.png" />
            <link rel="apple-touch-startup-image" sizes="2048x1496" href="/splash/apple_splash_2048x1496.png" />
            <link rel="apple-touch-startup-image" sizes="2048x1536" href="/splash/apple_splash_2048x1536.png" />
            <link rel="apple-touch-startup-image" sizes="2048x2732" href="/splash/apple_splash_2048x2732.png" />
            <link rel="apple-touch-startup-image" sizes="2208x1242" href="/splash/apple_splash_2208x1242.png" />
            <link rel="apple-touch-startup-image" sizes="2224x1668" href="/splash/apple_splash_2224x1668.png" />
            <link rel="apple-touch-startup-image" sizes="2436x1125" href="/splash/apple_splash_2436x1125.png" />
            <link rel="apple-touch-startup-image" sizes="2688x1242" href="/splash/apple_splash_2688x1242.png" />
            <link rel="apple-touch-startup-image" sizes="2732x2048" href="/splash/apple_splash_2732x2048.png" />
            <link rel="apple-touch-startup-image" sizes="768x1004" href="/splash/default.png" />
            <link rel="apple-touch-startup-image" sizes="1536x2008" href="/splash/default_ipad.png" />
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

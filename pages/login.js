import Head from 'next/head'
import Image from 'next/image'
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
            <title>Caccia al tesoro | Login</title>
            <meta name="description" content="Webapp di supporto per la caccia al tesoro organizzata dalla Consulta Giovanile di Lascari" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}

function LoginMain() {
    const router = useRouter()
    const { currentUser } = useContext(AuthContext)

    const loginHandler = useCallback(
        async (event) => {
            event.preventDefault()
            const { username, password } = event.target.elements
            try {
                await signInWithEmailAndPassword(auth, username.value, password.value)
                router.push('/')
            } catch (error) {
                console.log(error)
                alert(error)
            }
        }, [router])

    if (currentUser) {
        router.push('/')
        return <Loading />
    }

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

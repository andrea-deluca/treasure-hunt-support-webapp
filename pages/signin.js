import { useContext, useCallback } from 'react';
import { Col, Button, Form } from 'react-bootstrap'
import Layout from '../components/layout';
import styles from '../styles/signin.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/loading';
import { auth, database } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, update, push, child, set } from 'firebase/database'

export default function SignIn() {
    const router = useRouter()
    const { currentUser } = useContext(AuthContext)

    if (currentUser) {
        router.push('/')
        return <Loading />
    }

    const signinHandle = useCallback(
        async (event) => {
            event.preventDefault()
            const { name, email, password } = event.target.elements
            try {
                await createUserWithEmailAndPassword(auth, email.value, password.value).then((user) => {
                    const userData = {
                        name: name.value,
                        type: "user"
                    }
                    const initSupportData = {
                        chatName: "Supporto della Consulta",
                        message: `Benvenuto nella chat di supporto della 
                            Consulta Giovanile di Lascari per la caccia al tesoro. 
                            Scrivici e un membro del nostro staff ti risponderà in tempo reale.`
                    }
                    const dbRef = ref(database)
                    const chatKey = push(child(dbRef, 'chats/')).key
                    const updates = {}
                    updates[`users/${user.user.uid}/`] = userData
                    updates[`chats/${chatKey}`] = {
                        name: initSupportData.chatName,
                        lastMessage: initSupportData.message,
                        supportId: "0SZxA5aEhvf3YR23awtaGZxD4rg2",
                        memberId: user.user.uid,
                        messages: [{
                            sender: "0SZxA5aEhvf3YR23awtaGZxD4rg2",
                            dest: user.user.uid,
                            text: initSupportData.message,
                            timestamp: Date.now()
                        }]
                    }
                    update(dbRef, updates)
                })
            } catch (error) {
                console.log(error)
                alert(error)
            }
        }, [router])

    return (
        <Layout>
            <Col xs={{ span: 5 }}>
                <h1 className={styles.title}>Registrati alla<br /><span className={styles.title_span}>Treasure Hunt</span></h1>
                <Form onSubmit={signinHandle}>
                    <Form.Group className="mb-4 mt-5" controlId="name">
                        <Form.Label>Nome della squadra</Form.Label>
                        <Form.Control type="text" placeholder="Nome della squadra" name="name" />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" name="email" />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" />
                    </Form.Group>
                    <Link href={"/login"}>
                        <p className={styles.login}>Hai già un account? Accedi ora</p>
                    </Link>
                    <Button variant="primary" type="submit">
                        Registrati
                    </Button>
                </Form>
            </Col>
        </Layout>
    );
}
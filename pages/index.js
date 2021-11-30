import Head from 'next/head'
import styles from '../styles/Login.module.css'

import { Col, Image, Form, Button } from 'react-bootstrap';

function LoginHead() {
  return (
    <Head>
      <title>Caccia al tesoro</title>
      <meta name="description" content="Webapp di supporto per la caccia al tesoro organizzata dalla Consulta Giovanile di Lascari" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default function Login() {
  return (
    <div className={styles.container}>
      <LoginHead />

      <main className={styles.main}>

        <Col xs={{ span: 4 }} className="">
          <Image fluid className="w-100" src="/images/logo.png" alt="Consulta Giovanile di Lascari Logo" />
        </Col>
        <Col xs={{ span: 2 }}>
          <div className={styles.divider}>{''}</div>
        </Col>
        <Col xs={{ span: 4 }}>
          <h1 className={styles.title}>Accedi</h1>


          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>




        </Col>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

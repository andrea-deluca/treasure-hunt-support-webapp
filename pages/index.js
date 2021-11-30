import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout';
import styles from '../styles/login.module.css'
import { Col, Form, Button } from 'react-bootstrap';

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
  return (
    <>
      <Col xs={{ span: 4 }}>
        <Image src="/images/logo.png" alt="Consulta Giovanile di Lascari Logo" width={539} height={539} />
      </Col>
      <Col xs={{ span: 2 }}>
        <div className={styles.divider}>{''}</div>
      </Col>
      <Col xs={{ span: 4 }}>
        <h1 className={styles.title}>Benvenuto alla<br /><span className={styles.title_span}>Treasure Hunt</span></h1>
        <Form>
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
    <>
      <LoginHead />
      <Layout main={LoginMain()} />
    </>
  )
}

import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import Divider from "../components/divider"
import { Row, Col, Card, Button } from 'react-bootstrap'
import styles from '../styles/home.module.css'

function HomeHead() {
    return (
        <Head>
            <title>Caccia al tesoro | Home</title>
            <meta name="description" content="Webapp di supporto per la caccia al tesoro organizzata dalla Consulta Giovanile di Lascari" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}

function HomeMain() {
    return (
        <>
            <Col xs={{ span: 10 }} lg={{ span: 4 }}>
                <Card className={styles.card}>
                    <Image variant="top" src="/svg/map.svg" width={200} height={200} />
                    <Card.Body>
                        <Card.Title className={styles.title}>Caccia al tesoro</Card.Title>
                        <Card.Text className={styles.text}>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Button variant={"primary"}>
                            Entra ora
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={{ span: 2 }}>
                <Divider />
            </Col>
            <Col xs={{ span: 10 }} lg={{ span: 4 }}>
                <Card className={styles.card}>
                    <Image variant="top" src="/svg/support.svg" width={200} height={200} />
                    <Card.Body>
                        <Card.Title className={styles.title}>Supporto</Card.Title>
                        <Card.Text className={styles.text}>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Button variant={"dark"}>
                            Accedi al supporto
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
}

export default function Home() {
    return (
        <Layout navbar>
            <HomeHead />
            <HomeMain />
        </Layout>
    );
}
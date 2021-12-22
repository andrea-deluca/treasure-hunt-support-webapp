import { useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout";
import Divider from "../components/divider"
import { Row, Col, Card, Button } from 'react-bootstrap'
import styles from '../styles/home.module.css'
import support from '../public/svg/support.svg'
import map from '../public/svg/map.svg'
import AuthRoute from "../components/authRoute";
import { RiMap2Fill, RiCustomerService2Fill } from 'react-icons/ri'

function HomeHead() {
  return (
    <Head>
      <title>Treasure Hunt | Home</title>
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

function HomeMain() {
  return (
    <>
      <Row className={"justify-content-center mx-0"}>
        <Col xs={{ span: 10 }} lg={{ span: 4 }}>
          <Card className={styles.card}>
            <Image variant="top" src={map} alt={"Immagine mappa"} width={200} height={200} />
            <Card.Body>
              <Card.Title className={styles.title}>Caccia al tesoro</Card.Title>
              <Card.Text className={styles.text}>
                Some quick example text to build on the card title and make up the bulk of
                the card s content.
              </Card.Text>
              <Link href={"/treasure"}>
                <Button variant={"primary"}>
                  <RiMap2Fill className={"me-2"} />
                  Entra ora
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={{ span: 2 }} className={"d-lg-block d-none"}>
          <Divider />
        </Col>
        <Col xs={{ span: 10 }} lg={{ span: 4 }}>
          <Card className={styles.card}>
            <Image variant="top" src={support} alt={"Immagine supporto"} width={200} height={200} />
            <Card.Body>
              <Card.Title className={styles.title}>Supporto</Card.Title>
              <Card.Text className={styles.text}>
                Some quick example text to build on the card title and make up the bulk of
                the card s content.
              </Card.Text>
              <Link href={"/support"}>
                <Button variant={"dark"}>
                  <RiCustomerService2Fill className={"me-2"} />
                  Accedi al supporto
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default function Home() {
  return (
    <AuthRoute>
      <Layout navbar>
        <HomeHead />
        <HomeMain />
      </Layout>
    </AuthRoute>
  );
}
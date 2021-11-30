import Head from "next/head";
import Layout from "../components/layout";
import { Row, Col, Card } from 'react-bootstrap'

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
            <div className={"row gy-5"}>
                <Card className={"mx-auto col-lg-4 col-10"}>
                    <Card.Body>
                        <Card.Title>Caccia al tesoro</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
                <Card className={"mx-auto col-lg-4 col-10"}>
                    <Card.Body>
                        <Card.Title>Supporto</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
            </div>
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
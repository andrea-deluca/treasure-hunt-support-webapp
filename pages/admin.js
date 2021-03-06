import { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import { Row, Col, Tab, Nav } from "react-bootstrap";
import styles from '../styles/admin.module.css'
import AuthRoute from "../components/authRoute";
import { AuthContext } from "../context/AuthContext";
import AccessDenied from "../components/accessDenied";
import { RiUserAddFill, RiNotification2Fill, RiUserSettingsFill } from 'react-icons/ri'
import AddUserForm from "../components/addUserForm";
import SendNotificationForm from "../components/sendNotificationForm";
import ManageUsers from "../components/manageUsers";

function AdminHead() {
    return (
        <Head>
            <title>Treasure Hunt | Admin</title>
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

export default function AdminPanel() {
    const { userData } = useContext(AuthContext)

    if (userData.userType === "user") {
        return (
            <>
                <AdminHead />
                <AccessDenied />
            </>)
    } else {
        return (
            <>
                <AdminHead />
                <AuthRoute>
                    <Layout navbar>
                        <Tab.Container id="{left-tab" defaultActiveKey="createUser">
                            <Row className={"w-100"}>
                                <Col xs={{ span: 10, offset:1 }} lg={{span: 3}}>
                                    <Nav variant="pills" className="flex-column mb-5 mb-lg-0">
                                        <Nav.Item className={styles.item}>
                                            <Nav.Link className={styles.link} eventKey="createUser">
                                                <RiUserAddFill className={"me-3"} />Aggiungi squadra
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className={styles.item}>
                                            <Nav.Link className={styles.link} eventKey="manageUsers">
                                                <RiUserSettingsFill className={"me-3"} />Gestione squadre</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className={styles.item}>
                                            <Nav.Link className={styles.link} eventKey="sendNotification">
                                                <RiNotification2Fill className={"me-3"} />Invia notifiche</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col xs={{ span: 10, offset:1 }} lg={{span: 6, offset:1}}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="createUser">
                                            <h3 className={"mb-5 fw-bold"}>Aggiungi una nuova squadra</h3>
                                            <AddUserForm />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="manageUsers">
                                            <h3 className={"mb-5 fw-bold"}>Gestione squadre</h3>
                                            <ManageUsers />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="sendNotification">
                                            <h3 className={"mb-5 fw-bold"}>Invia notifiche</h3>
                                            <SendNotificationForm />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Layout>
                </AuthRoute>
            </>
        );
    }

}
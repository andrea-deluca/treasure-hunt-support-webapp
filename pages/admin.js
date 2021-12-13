import { useContext } from "react";
import Layout from "../components/layout";
import { Col, Tab, Nav } from "react-bootstrap";
import styles from '../styles/admin.module.css'
import AuthRoute from "../components/authRoute";
import { AuthContext } from "../context/AuthContext";
import AccessDenied from "../components/accessDenied";
import { RiUserAddFill, RiNotification2Fill } from 'react-icons/ri'
import AddUserForm from "../components/addUserForm";
import SendNotificationForm from "../components/sendNotificationForm";

export default function AdminPanel() {
    const { userData } = useContext(AuthContext)

    if (userData.userType === "user") {
        return <AccessDenied />
    } else {
        return (
            <AuthRoute>
                <Layout navbar>
                    <Tab.Container id="left-tab" defaultActiveKey="createUser">
                        <Col xs={{ span: 3 }}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item className={styles.item}>
                                    <Nav.Link className={styles.link} eventKey="createUser">
                                        <RiUserAddFill className={"me-3"} />Aggiungi team
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className={styles.item}>
                                    <Nav.Link className={styles.link} eventKey="sendNotification">
                                        <RiNotification2Fill className={"me-3"} />Invia notifiche</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col xs={{ span: 6, offset: 1 }}>
                            <Tab.Content>
                                <Tab.Pane eventKey="createUser">
                                    <h3 className={"mb-5 fw-bold"}>Aggiungi una nuova squadra</h3>
                                    <AddUserForm />
                                </Tab.Pane>
                                <Tab.Pane eventKey="sendNotification">
                                    <h3 className={"mb-5 fw-bold"}>Invia notifiche</h3>
                                    <SendNotificationForm />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Tab.Container>
                </Layout>
            </AuthRoute>
        );
    }

}
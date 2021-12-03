import Image from "next/image";
import Layout from "../components/layout";
import { Col } from 'react-bootstrap'
import logo from '../public/images/logo.png'
import styles from '../styles/support.module.css'

export default function Support() {
    return (
        <Layout navbar>
            <Col xs={{ span: 3 }}>
                <div className={styles.chatsBox}>
                    <Image src={logo} alt={"Logo consulta giovanile di Lascari"} width={48} height={48} className={styles.chatPicture} />
                    <div className={"ms-3"}>
                        <h6 className={styles.chatTitle}>Supporto della Consulta</h6>
                        <p className={"text-muted m-0"}>Ultimo messaggio: </p>
                    </div>
                </div>
            </Col>
            <Col xs={{ span: 6, offset: 1 }} className={"align-self-end overflow-scroll"} style={{height: "60vh"}}>
                <div className={styles.chatBox}>
                    <div className={styles.messageReceivedContainer}>
                        <div className={styles.chatMessageReceived}>
                            <p className={styles.chatMessageText}>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Sint cumque recusandae accusantium minima iure, distinctio error,
                                eaque nihil totam perferendis eum! Alias dolore quia aspernatur
                                eveniet molestias vero, obcaecati nesciunt.
                            </p>
                        </div>
                    </div>
                    <div className={styles.messageSentContainer}>
                        <div className={styles.chatMessageSent}>
                            <p className={styles.chatMessageText}>Testo del messaggio 1</p>
                        </div>
                    </div>
                    <div className={styles.messageReceivedContainer}>
                        <div className={styles.chatMessageReceived}>
                            <p className={styles.chatMessageText}>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Sint cumque recusandae accusantium minima iure, distinctio error,
                                eaque nihil totam perferendis eum! Alias dolore quia aspernatur
                                eveniet molestias vero, obcaecati nesciunt.
                            </p>
                        </div>
                    </div>
                    <div className={styles.messageSentContainer}>
                        <div className={styles.chatMessageSent}>
                            <p className={styles.chatMessageText}>Testo del messaggio 1</p>
                        </div>
                    </div>
                    <div className={styles.messageReceivedContainer}>
                        <div className={styles.chatMessageReceived}>
                            <p className={styles.chatMessageText}>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Sint cumque recusandae accusantium minima iure, distinctio error,
                                eaque nihil totam perferendis eum! Alias dolore quia aspernatur
                                eveniet molestias vero, obcaecati nesciunt.
                            </p>
                        </div>
                    </div>
                    <div className={styles.messageSentContainer}>
                        <div className={styles.chatMessageSent}>
                            <p className={styles.chatMessageText}>Testo del messaggio 1</p>
                        </div>
                    </div>
                </div>
            </Col>
        </Layout>
    );
}
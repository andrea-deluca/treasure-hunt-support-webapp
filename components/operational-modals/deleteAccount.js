import { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";

export default function DeleteAccountModal(props) {
    const [response, setResponse] = useState({
        show: false,
        type: '',
    })

    const handleDeleteAccount = (e) => {
        e.preventDefault()
        const req = {
            method: "POST",
            body: {
                uid: props.user
            }
        }
        fetch("/api/deleteUser", {
            method: req.method,
            body: JSON.stringify(req.body)
        }).then(res => {
            if (res.status === 200) {

                setResponse({
                    show: true,
                    type: 'success'
                })
            } else {
                setResponse({
                    show: true,
                    type: 'danger'
                })
            }
        })
    }

    return (
        <Modal centered show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{"Sei sicuro di voler eliminare l'account?"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {response.show ?
                    <Alert variant={response.type}>
                        {response.type === 'success' ? "Operazione avvenuta con successo!" : "Mi dispiace... non è stato possibile completare l'operazione."}
                    </Alert>
                    :
                    <>
                        <p>{`Eliminando l'account verranno persi tutti i dati e le informazioni ad esso associato.`}</p>
                        <Button variant="secondary" onClick={props.onHide}>
                            Annulla
                        </Button>
                        <Button className={"ms-2"} variant="primary" onClick={handleDeleteAccount}>
                            Elimina account
                        </Button>
                    </>
                }
            </Modal.Body>
        </Modal>
    )
}
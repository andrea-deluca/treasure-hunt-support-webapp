import { ref, get } from "firebase/database";
import { useEffect, useState } from "react";
import { Table, DropdownButton, Dropdown } from "react-bootstrap";
import { database } from "../lib/firebase";
import ManageUsersModal from "./manageUsersModal";

export default function ManageUsers() {
    const [users, setUsers] = useState(null)
    const [modals, setModals] = useState({
        request: {
            show: false,
            type: ''
        }
    })

    useEffect(() => {
        const dbRef = ref(database, "users/")
        get(dbRef).then((snapshot) => {
            const snapUsers = []
            snapshot.forEach(snap => {
                snapUsers.push({
                    key: snap.key,
                    ...snap.val()
                })
            })
            setUsers(snapUsers)
        })
    }, [])

    return (
        <>
            <ManageUsersModal user={modals.request.key} show={modals.request.show} type={modals.request.type} onHide={() => setModals({ ...modals, request: { show: false } })} />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Tipo</th>
                        <th>Percorso</th>
                        <th>Livello</th>
                        <th>Operazioni</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => {
                        return (
                            <tr key={user.key}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.type}</td>
                                <td>{!user.path ? "ND" : user.path}</td>
                                <td>{user.level}</td>
                                <td>
                                    <DropdownButton size="sm" id="operations" variant="secondary" title="Apri">
                                        <Dropdown.Item onClick={() => setModals({ ...modals, request: { show: true, type: 'NAME', key: user.key } })}>Modifica nome</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setModals({ ...modals, request: { show: true, type: 'EMAIL', key: user.key } })}>Modifica email</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setModals({ ...modals, request: { show: true, type: 'USER_TYPE', key: user.key } })}>Modifica tipo utente</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={() => setModals({ ...modals, request: { show: true, type: 'PATH', key: user.key } })}>Assegna percorso</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setModals({ ...modals, request: { show: true, type: 'LEVEL', key: user.key } })}>Assegna livello</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={() => setModals({ ...modals, request: { show: true, type: 'DELETE', key: user.key } })}>Elimina account</Dropdown.Item>
                                    </DropdownButton>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}
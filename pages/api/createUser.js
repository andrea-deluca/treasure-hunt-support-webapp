import admin from "../../lib/firebase-admin";

export default async function handler(req, res) {
    const data = JSON.parse(req.body)
    admin.auth().createUser({
        email: data.email,
        password: data.password
    }).then((user) => {
        const chat = admin.database().ref().child('/chats').push().key
        const updates = {}
        updates[`users/${user.uid}/`] = {
            name: data.name,
            type: "user",
            email: data.email
        }
        updates[`chats/${chat}`] = {
            name: "Supporto della Consulta",
            supportId: process.env.NEXT_PUBLIC_SUPPORT_UID,
            memberId: user.uid,
            memberName: data.name,
            messages: [{
                sender: process.env.NEXT_PUBLIC_SUPPORT_UID,
                dest: user.uid,
                text: `Benvenuto nella chat di supporto della 
                Consulta Giovanile di Lascari per la caccia al tesoro. 
                Scrivici e un membro del nostro staff ti risponderà in tempo reale.`,
                timestamp: Date.now()
            }]
        }
        admin.database().ref().update(updates).then(() => {
            res.status(200).send()
        }).catch(err => {
            admin.auth().deleteUser(user.uid)
            res.status(500).json(err.errorInfo)
        })
    }).catch((err) => {
        res.status(500).json(err.errorInfo)
    })
}
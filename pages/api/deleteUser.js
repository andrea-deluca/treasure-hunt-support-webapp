import admin from "../../lib/firebase-admin";

export default async function handler(req, res) {
    const data = JSON.parse(req.body)
    admin.database().ref(`users/${data.uid}`).remove().then(() => {
        admin.database().ref(`notifications/${data.uid}`).remove().then(() => {
            admin.auth().deleteUser(data.uid).then(() => {
                res.status(200).send()
            }).catch(err => {
                res.status(500).json(err.errorInfo)
            })
        })
    })
}
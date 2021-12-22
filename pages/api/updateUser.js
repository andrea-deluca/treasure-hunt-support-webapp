import admin from "../../lib/firebase-admin";

export default async function handler(req, res) {
    const data = JSON.parse(req.body)
    admin.auth().getUser(data.uid).then(user => {
        const recoveryEmail = user.email
        admin.auth().updateUser(data.uid, {email: data.email}).then((user) => {
            admin.database().ref(`users/${user.uid}/email`).set(user.email).then(() => {
                res.status(200).send()
            }).catch(err => {
                admin.updateUser(user.uid, {email: recoveryEmail}).then(user => {
                    res.status(500).json(err.errorInfo)
                })
            })
        }).catch((err) => {
            res.status(500).json(err.errorInfo)
        })
    })
}
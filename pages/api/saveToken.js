export default function handler(req, res) {
    const data = JSON.parse(req.body)
    console.log(req)
    res.status(200).send()
  }
  
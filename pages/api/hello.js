// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const data = JSON.parse(req.body)
  res.status(200).send({ name: data.name })
}

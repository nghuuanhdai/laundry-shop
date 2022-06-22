import { loginCheck } from "../../../utils/firebaseAdmin"
import dbConnect from "../../../utils/dbConnect"
import Request from "../../../models/Request";

export default async function handler(req, res) {
  try {
    await loginCheck(req, res)
  } catch (error) {
    res.status(401).send('FORBIDDEN')
    return
  }
  await dbConnect()

  if(req.method === 'POST')
  {
    const newRequest = new Request({
      uid: req.decodedClaims.uid,
      requestDate: new Date(req.body.requestDate + ":00.000Z"),
      dueDate: new Date(req.body.dueDate + ":00.000Z"),
      status: req.body.status,
      contact: req.body.contact,
      location: req.body.location,
      note: req.body.note
    })
    const savingRs = await newRequest.save()
    return res.status(200).send(savingRs)
  }
  return res.status(200).send({ })
}
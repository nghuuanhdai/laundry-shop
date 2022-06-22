import { loginCheck } from "../../../utils/firebaseAdmin"
import dbConnect from "../../../utils/dbConnect"
import Request from "../../../models/Request"
export default async function handler(req, res) {
  try {
    await loginCheck(req, res)
  } catch (error) {
    res.status(401).send('FORBIDDEN')
    return
  }
  await dbConnect()
  if(req.method === 'PUT')
  {
    let request = await Request.findById(req.query.id)
    if (!request?.uid || request.uid != req.decodedClaims.uid)
      return res.status(401).send('FORBIDDEN')

    request.dueDate = new Date(req.body.dueDate + ":00.000Z")
    request.status = req.body.status
    request.contact = req.body.contact
    request.location = req.body.location
    request.note = req.body.note
    const saveRs = await request.save()
    return res.status(200).send(saveRs)
  }
  if(req.method === 'GET')
  {
    let request = await Request.findOne({_id: req.query.id, uid: req.decodedClaims.uid})
    if(!request)
      return res.status(400).send('NOT FOUND')
    return res.status(200).send(request)
  }
  if(req.method === 'DELETE')
  {
    let deleteRs = await Request.findOneAndDelete({_id: req.query.id, uid: req.decodedClaims.uid})
    return res.status(200).send(deleteRs)
  }

  res.status(200).send({ status: 'ok', uid: uid })
}
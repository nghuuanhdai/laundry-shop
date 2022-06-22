import dbConnect from "../../../utils/dbConnect"
import Request from "../../../models/Request"
export default async function handler(req, res) {
  await dbConnect()
  if(req.method === 'GET')
  {
    let request = await Request.findOne({_id: req.query.id})
    if(!request)
      return res.status(400).send('NOT FOUND')
    return res.status(200).send({
      id: request._id,
      requestDate: request.requestDate,
      dueDate: request.dueDate,
      status: request.status,
      contact: request.contact,
      note: request.note
    })
  }

  res.status(404).send('NOT FOUND')
}
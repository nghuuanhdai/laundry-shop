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
  // const query = req.query
  // const rId = query.id
  // const rDate = query.req
  // const rDue = query.due
  // const pLimit = query.pageCount
  // const pIndex = query.page_index
  let query = {uid: req.decodedClaims.uid}
  if(req.query.id)
    query._id = req.query.id
  const pageIndex = parseInt(req.query.page_index)||0
  const pageCount = parseInt(req.query.page_count)||0
  let sortMode = {}
  if (req.query.req != 0)
    sortMode.requestDate = req.query.req
  if (req.query.due != 0)
    sortMode.dueDate = req.query.due

  const requests = await Request.find(query)
                      .sort(sortMode)
                      .skip(pageIndex*pageCount)
                      .limit(pageCount)
                      .exec()
  const count = await Request.find(query).count()
  
  res.status(200).send({
    documents: requests.map(r => ({id: r._id})),
    pageCount: Math.ceil(count/pageCount) - 1
  })
}
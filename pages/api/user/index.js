import { loginCheck } from "../../../utils/firebaseAdmin"

export default async function handler(req, res) {
    try {
        await loginCheck(req, res)
    } catch (error) {
        res.redirect(307, '/login')
        return
    }
    const { uid } = req.query
    res.status(200).send({ status: 'ok', uid: uid })
}
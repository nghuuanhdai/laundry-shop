import { loginCheck } from "../../../utils/firebaseAdmin"

export default async function handler(req, res) {
    try {
        await loginCheck(req, res)
    } catch (error) {
        res.redirect(307, '/login')
        return
    }
    res.status(200).json({ status: 'ok', uid: req.decodedClaims.uid })
}
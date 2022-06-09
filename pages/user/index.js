import { getAuth } from "firebase/auth"
import { useEffect } from "react"
import { loginCheck } from "../../utils/firebaseAdmin"
import { getApp } from "../../utils/firebaseClient"

export default function SignIn({id}) {
    return (
        <div>
            <h1>{id}</h1>
        </div>
    )
}

export async function getServerSideProps(context) {
    try {
        await loginCheck(context.req, context.res)
    } catch (error) {
        console.log(error)
        context.res.writeHead(302, { Location: '/login' });
        context.res.end();
        return { props: {}}
    }
    return {
      props: {id: context.req.decodedClaims.uid}, // will be passed to the page component as props
    }
}
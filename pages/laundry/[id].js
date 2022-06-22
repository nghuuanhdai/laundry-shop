import AppHead from "../../components/appHead";
import Footer from "../../components/footer";
import NavBar from "../../components/navBar";
import styles from "../../styles/Tracking.module.css"
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { QRdiv } from "../../components/qr";
import PrintQRButton from "../../components/printQRBtn";

export default function TrackingPage() {
  const fetcher = (url)=>
		fetch(url)
			.then((res)=>res.json())
  const router = useRouter()
  const { id } = router.query
  const {data: req, err} = useSWR(`/api/track/${id}`, fetcher)

  function formatDateTime(isoString) {
    if(!isoString) return 'Unknown'
    const m = new Date(isoString)
    const dateString =
      m.getUTCFullYear() + "/" +
      ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
      ("0" + m.getUTCDate()).slice(-2) + " " +
      ("0" + m.getUTCHours()).slice(-2) + ":" +
      ("0" + m.getUTCMinutes()).slice(-2)
    return dateString
  }
  
  return (
    <>
      <AppHead></AppHead>
      <NavBar fixed={false}></NavBar>
      <div className={styles.header_div}></div>
      <main className="pt-5 container">
        <h1 className={styles.title}>REQUEST TRACKING</h1>
        <dl className="row">
          <dt className="col-sm-3">Receipt Id</dt>
          <dd className="col-sm-9">{id}</dd>


          <dt className="col-sm-3">Request date</dt>
          <dd className="col-sm-9">{formatDateTime(req?.requestDate)}</dd>

          <dt className="col-sm-3">Due date</dt>
          <dd className="col-sm-9">{formatDateTime(req?.dueDate)}</dd>

          <dt className="col-sm-3">Due date</dt>
          <dd className="col-sm-9">{req?.status??'Unknown'}</dd>

          <dt className="col-sm-3">Contact</dt>
          <dd className="col-sm-9">{req?.contact??'Unknown'}</dd>

          <dt className="col-sm-3">Note</dt>
          <dt className="col-sm-9">{req?.note??'Unknown'}</dt>
          
          <dt className="col-sm-3">QR</dt>
          <dd className="col-sm-9" id="qr">
            <QRdiv text={id}></QRdiv>
          </dd>
        </dl>
        <PrintQRButton request={req}></PrintQRButton>
      </main>
      <Footer></Footer>
    </>
  )
}
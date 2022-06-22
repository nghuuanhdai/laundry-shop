import AppHead from '../components/appHead'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import NavBar from '../components/navBar'
import HeroLayout from '../components/heroLayout'
import Footer from '../components/footer'
import QRScanBtn from '../components/qrScanBtn'

export default function Home() {
  const [receiptId, setReceiptId] = useState('')

  function onQrDetected(qr) {
    setReceiptId(qr)
  }
  return (
    <div className={styles.container}>
      <AppHead></AppHead>
      <NavBar></NavBar>

      <main className={styles.main}>
        <HeroLayout>
          <div className={`${styles.title_container} container`}>
            <h1 className={styles.title}>easy laundry</h1>
            <p className={styles.slogan}>easy laundry easy life</p>
            <form action={`/laundry/${receiptId}`} method='get' className={`input-group ${styles.track_input_group}`}>
              <input type="text" className="form-control" placeholder="Receipt ID" aria-label="Recipient's username with two button addons" aria-describedby="button-addon4" value={receiptId} onChange={(evt)=>setReceiptId(evt.target.value)}></input>
              <div className="input-group-append" id="button-addon4">
                <button className="btn btn-light" type="submit">Track</button>
                <QRScanBtn onQrDetected={onQrDetected}></QRScanBtn>
              </div>
            </form>
          </div>
        </HeroLayout>
        <section className='section container mb-5'>
          <div className='d-flex justify-content-center'>
            <h2 className={styles.section_title}>Services</h2>
          </div>
          <div className='d-flex justify-content-between flex-wrap flex-sm-nowrap'>
            <div className='card w-100 flex-grow-1 m-1'>
              <div className='card-body'>
                <div className='d-flex justify-content-center m-5'>
                  <Image src='/image/delivery.png' width='100px' height='100px' alt='24/7 icon'></Image>
                </div>
                <h5 className=''>24/7 service</h5>
                <p className='text-black-50'>We are always available at your service. Come by and leave your clothes to us any time of the day.</p>
              </div>
            </div >
            <div className='card w-100 flex-grow-1 m-1'>
              <div className="card-body">
                <div className='d-flex justify-content-center m-5'>
                  <Image src='/image/value.png' width='100px' height='100px' alt='24/7 icon'></Image>
                </div>
                <h5>Handle with care</h5>
                <p className='text-black-50'>No one wants to ruin their favorite shirt or pant. We treasure your clothes as they are ours.</p>
              </div>
            </div>
            <div className='card w-100 flex-grow-1 m-1'>
              <div className="card-body">
                <div className='d-flex justify-content-center m-5'>
                  <Image src='/image/timer.png' width='100px' height='100px' alt='24/7 icon'></Image>
                </div>
                <h5>Ultra fast</h5>
                <p className='text-black-50'>Your time is valuable. Knowing that we always strive to get your request done as soon as possible. Your clothes will be ready as fast as a few hours.</p>
              </div>
            </div>
          </div>            
        </section>
      </main>
      <Footer></Footer>
    </div>
  )
}

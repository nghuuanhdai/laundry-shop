import Script from 'next/script'
import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useState } from 'react';

export default function QRScanBtn({onQrDetected}){
  const [show, setShow] = useState(false)
  const [scanner, setScanner] = useState(null)
  function scan() {
    setShow(true)
    Html5Qrcode.getCameras().then(cameras => {
        /**
          * devices would be an array of objects of type:
          * { id: "id", label: "label" }
        */
        if (cameras && cameras.length) {
          var cameraId = cameras[0].id;
            // .. use this to start scanning.
          const newScanner = new Html5Qrcode("reader");
          setScanner(newScanner)
          newScanner.start(
            cameraId, // retreived in the previous step.
            {
                fps: 10,    // sets the framerate to 10 frame per second 
                qrbox: 250  // sets only 250 X 250 region of viewfinder to
                            // scannable, rest shaded.
          },
          qrCodeMessage => {     // do something when code is read. For example:
              console.log(`QR Code detected: ${qrCodeMessage}`);
              newScanner.stop()
              setShow(false)
              setScanner(null)
              onQrDetected(qrCodeMessage)
          },
          errorMessage => {     // parse error, ideally ignore it. For example:
              // console.log(`QR Code no longer in front of camera.`);
          })
          .catch(err => {     // Start failed, handle it. For example, 
              console.log(`Unable to start scanning, error: ${err}`);
          });
        }
        else
        setShow(false)
    }).catch(err => {
      // handle err   
      setShow(false)
    });
  }

  function cancel() {
    scanner.stop()
    setScanner(null)
    setShow(false)
  }
  return (
    <>
    <div style={{position:'fixed', width: '100vw', height: '100vh', display: show?'flex':'none', top: 0, left: 0, zIndex: 5, justifyContent: 'center', alignItems: 'center'}}>
      <div className="card">
        <div className="card-body">
          <div id="reader" style={{ width: '500px'}}></div>
          <button className='btn btn-light' onClick={cancel}>Cancel</button>
        </div>
      </div>
    </div>
    <button className="btn btn-dark" type="button" onClick={scan}>Scan QR</button>
    </>
  )
}
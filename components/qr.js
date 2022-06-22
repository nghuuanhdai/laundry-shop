import QRCode from "react-qr-code";

export function QRdiv({text}){

  if(!text)
    return (<></>)
  return (
    <div style={{ background: 'white', padding: '0px', borderRadius: '1rem'}}>
        <QRCode value={text} fgColor='#724cd9FF'/>
    </div>
  );
}
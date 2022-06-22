export default function PrintQRButton({request}) {
  function printReceipt(evt) {
		var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + 'Receipt'  + '</title>');
		mywindow.document.write('<style> html * {font-family: Arial, Helvetica, sans-serif;} </style>')
    mywindow.document.write('</head><body >');

		mywindow.document.write('<div style="display: flex; justify-content: center; flex-direction: column;   align-items: center;">')
		mywindow.document.write('<h1>Easy laundry</h1>');
		mywindow.document.write(`<h2>Receipt: ${request.id||request._id}</h2>`);
		mywindow.document.write(`<p>due date: ${request.dueDate}</p>`)
    mywindow.document.write(document.getElementById('qr').innerHTML);
		mywindow.document.write('</div>')
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    // mywindow.close();

	}

  if(!request)
    return <></>
  return <button type="button" className="btn btn-info" onClick={printReceipt}>Print Receipt</button>
}
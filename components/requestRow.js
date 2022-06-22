
import useSWR from 'swr'

const fetcher = (url) => 
  fetch(url)
    .then(res => res.json())
    // .then(data => {console.log(data); return data;})

export default function RequestRow({request, onEdit, onDelete}) {
  const {data: req, err} = useSWR(`/api/request/${request.id}`, fetcher)

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
    <tr>
      <th scope="row">{request.index + 1}</th>
      <td>{request.id}</td>
      <td>{formatDateTime(req?.requestDate)}</td>
      <td>{formatDateTime(req?.dueDate)}</td>
      <td>{req?.status??'Unknown'}</td>
      <td>{req?.location??'Unknown'}</td>
      <td>{req?.contact??'Unknown'}</td>
      <td>{req?.note??''}</td>
      <td><button className="btn btn-primary" onClick={(evt)=>onEdit(request.id)}>Edit</button></td>
      <td><button className="btn btn-danger" onClick={(evt)=>onDelete(request.id)}>Delete</button></td>
    </tr>
  )
}
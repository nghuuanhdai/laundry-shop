
import useSWR from 'swr'

const fetcher = (url)=>{
  return {id: "ef", requestDate: '06/04/2022', dueDate: '06/09/2022', status: 'waiting', contact: '09-xxxx-xxxx', note: 'deep clean'}
}

export default function RequestRow({request, onEdit}) {
  const {data: req, err} = useSWR(`/request/${request.id}`, fetcher)

  return (
    <tr>
      <th scope="row">{request.index + 1}</th>
      <td>{req?.id??'Unknown'}</td>
      <td>{req?.requestDate??'Unknown'}</td>
      <td>{req?.dueDate??'Unknown'}</td>
      <td>{req?.status??'Unknown'}</td>
      <td>{req?.contact??'Unknown'}</td>
      <td>{req?.note??''}</td>
      <td><button className="btn btn-primary" onClick={(evt)=>onEdit(request.id)}>Edit</button></td>
      <td><button className="btn btn-danger">Delete</button></td>
    </tr>
  )
}
import { useState } from "react";
import AppHead from "../../components/appHead";
import Footer from "../../components/footer";
import NavBar from "../../components/navBar";

import styles from "../../styles/Shop.module.css"
import useSWR from 'swr'
import { mutate, SWRConfig } from "swr";
import RequestRow from "../../components/requestRow";
import { useEffect } from "react";

import { loginCheck } from "../../utils/firebaseAdmin";

function SearchInput({searchId}) {
	const [receiptId, setReceiptId] = useState('')
	function search(evt) {
		searchId(receiptId)
	}
	function scanQR(evt) {
		setReceiptId('ef')
	}
	return (
		<div className="input-group mb-3">
			<input type="text" className="form-control" placeholder="Receipt ID" aria-label="Recipient's username with two button addons" aria-describedby="button-addon4" value={receiptId} onChange={(evt)=>setReceiptId(evt.target.value)}></input>
			<div className="input-group-append" id="button-addon4">
				<button className="btn btn-light" type="button" onClick={search}>Search</button>
				<button className="btn btn-dark" type="button" onClick={scanQR}>Scan QR</button>
			</div>
		</div>
	)
}

function RequestForm({id, clearId, createNew, updateRequest}) {
	const fetcher = (url) => 
		fetch(url)
			.then(res => res.json())
			// .then(data => {console.log(data); return data;})
	const {data: request, err} = useSWR(`/api/request/${id}`, fetcher)

	function requestSubmit(evt) {
		evt.preventDefault()
		const formData = new FormData(document.getElementById('request-form'))
		const data = {
			requestDate: formData.get('requestDate'),
			dueDate: formData.get('dueDate'),
			status: formData.get('status'),
			contact: formData.get('contact'),
			note: formData.get('note')
		}
		if(id==='')
			createNew(data)
		else
			updateRequest(id, data)
	}

	useEffect(()=>{
		function formatTime(date) {
			var isoString = date.toISOString();
			return formatTimeStr(isoString);
		}
	
		function formatTimeStr(isoString) {
			if(!isoString) return isoString
			return isoString.substring(0, (isoString.indexOf("T")|0) + 6|0);
		}

		const statusSelectInput = document.getElementById('status')
		const noteInput = document.getElementById('note')
		const dueDateInput = document.getElementById('dueDate')
		const requestDateInput = document.getElementById('requestDate')
		const contactInput = document.getElementById('contact')
		
		statusSelectInput.value = request?.status??'waiting'
		noteInput.value = request?.note??''
		dueDateInput.value = formatTimeStr(request?.dueDate)??formatTime(new Date())
		requestDateInput.value = request?.requestDate??formatTime(new Date())
		contactInput.value = request?.contact??''

	},[request])

	return (
		<form onSubmit={requestSubmit} className={styles.request_form} id='request-form'>
			<h1>{`${id} Request Detail`}</h1>
			<input id="requestDate" type="hidden" name="requestDate" className="form-control"></input>
			<div className='form-group'>
				<label htmlFor="dueDate">Due date</label>
				<input id="dueDate" type="datetime-local" name="dueDate" className="form-control"></input>
			</div>
			<div className="form-group">
				<label htmlFor="status">Status</label>
				<select className="form-control" id="status" name='status'>
					<option>waiting</option>
					<option>washing</option>
					<option>done</option>
				</select>
			</div>
			<div className="form-group">
				<label htmlFor="contact">Contact</label>
				<input className="form-control" id="contact" name='contact'></input>
			</div>
			<div className="form-group">
				<label htmlFor="note">Note</label>
				<textarea className="form-control" id="note" rows="3" name='note'></textarea>
			</div>
			<div className={styles.button_group}>
				<button type="submit" className="btn btn-primary">{id===''?'New':'Update'}</button>
				<button type="button" className="btn btn-light" onClick={clearId}>Clear</button>
			</div>
		</form>
	)
}

function partialSWRInvalidate(partialKey) {
	const keys = Array.from(SWRConfig.default.cache.keys())
	keys.filter(key => key.startsWith(partialKey))
		.forEach(key => mutate(key))
}

export default function Shop() {
	const fetcher = (url)=>
		fetch(url)
			.then((res)=>res.json())
			// .then(data => {console.log(data); return data})
	const perPageCount = 5

	const [receiptId, setReceiptId] = useState('')
	const [requestSort, setRequestSort] = useState(0)
	const [dueSort, setDueSort] = useState(0)
	const [pageIndex, setPageIndex] = useState(0)
	const [selectedId, setSelectedId] = useState('')
	const {data: swrData, reqErr} = useSWR(`/api/requests/${pageIndex}?id=${receiptId}&req=${requestSort}&due=${dueSort}&page_count=${perPageCount}`, fetcher) 
	
	function clearSelectedId() {
		setSelectedId('')
	}
	const pageCount = swrData?.pageCount??0
	function updatePageIndex(index){
		index = index<0?0:index
		index = index>(pageCount??0)?(pageCount??0):index
		setPageIndex(index)
	}
	const requests = (swrData?.documents??[]).map((req, index) => ({index: (index+pageIndex*perPageCount), ...req}))
	function toggleRequestDatesort(evt) {
		let newSortMode = requestSort+1
		if(newSortMode> 1)
			newSortMode=-1
		if(newSortMode< -1)
			newSortMode=-1
		setRequestSort(newSortMode)
		setPageIndex(0)
	}
	function toggleDueDatesort(evt) {
		let newSortMode = dueSort+1
		if(newSortMode> 1)
			newSortMode=-1
		if(newSortMode< -1)
			newSortMode=-1
		setDueSort(newSortMode)
		setPageIndex(0)
	}
	const contentType = 'application/json'
	async function createNew(data) {
		const res = await fetch(`/api/request`, {
			method: 'POST',
			headers: {
				Accept: contentType,
				'Content-Type': contentType
			},
			body: JSON.stringify(data)
		})
		const json = await res.json()
		partialSWRInvalidate('/api/requests')
		setSelectedId(json._id)
	}
	async function deleteRequest(id) {
		const res = await fetch(`/api/request/${id}`, {
			method: 'DELETE',
			headers: {
				Accept: contentType,
				'Content-Type': contentType
			}
		})
		const json = await res.json()
		partialSWRInvalidate('/api/requests')
		
		if(id == selectedId)
			clearSelectedId()
	}
	async function updateRequest(id, data) {
		const res = await fetch(`/api/request/${id}`, {
			method: 'PUT',
			headers: {
				Accept: contentType,
				'Content-Type': contentType
			},
			body: JSON.stringify(data)
		})
		const json = await res.json()
		mutate(`/api/request/${id}`, json, false)
	}
	return ( 
	<div>
		<AppHead></AppHead>
		<NavBar fixed={false} ></NavBar>
		<div className={styles.header_div}></div>
		<main className="pt-5 container">
		<h1 className={styles.shop_admin}>SHOP ADMIN</h1>
		<SearchInput searchId={setReceiptId}></SearchInput>
		<div className={styles.table_container}>
			<table className="table">
				<thead className={styles.table_header}>
					<tr>
					<th scope="col">#</th>
					<th scope="col">Receipt Id</th>
					<th scope="col"><button onClick={toggleRequestDatesort} className="btn">Request date<i className={(requestSort==1)?"arrow down":(requestSort==-1)?"arrow up":"arrow none"}></i></button></th>
					<th scope="col"><button onClick={toggleDueDatesort} className="btn">Due date<i className={(dueSort==1)?"arrow down":(dueSort==-1)?"arrow up":"arrow none"}></i></button></th>
					<th scope="col">Status</th>
					<th scope="col">Contact</th>
					<th scope="col">Note</th>
					<th scope="col">Edit</th>
					<th scope="col">Delete</th>
					</tr>
				</thead>
					<tbody>
						{requests.map(request => <RequestRow key={request.index} request={request} onEdit={setSelectedId} onDelete={deleteRequest}></RequestRow>)}
					</tbody>
				</table>
		</div>
			<nav aria-label="Pagination">
				<ul className="pagination">
				<li className="page-item">
						<button className="page-link" onClick={(evt)=>updatePageIndex(0)} aria-label="Previous">
							<span className="sr-only">&laquo;</span>
						</button>
					</li>
					<li className="page-item">
						<button className="page-link" onClick={(evt)=>updatePageIndex(pageIndex-1)} aria-label="Previous">
							<span className="sr-only">&lsaquo;</span>
						</button>
					</li>
					<li className="page-item"><a className="page-link" href="#">{pageIndex+1}/{(pageCount??0) + 1}</a></li>
					<li className="page-item">
						<button className="page-link" onClick={(evt)=>updatePageIndex(pageIndex+1)} aria-label="Next">
							<span aria-hidden="true">&rsaquo;</span>
						</button>
					</li>
					<li className="page-item">
						<button className="page-link" onClick={(evt)=>updatePageIndex(pageCount??0)} aria-label="Next">
							<span aria-hidden="true">&raquo;</span>
						</button>
					</li>
				</ul>
			</nav>
			<div className="divider"></div>
			<div className={styles.form_container}>
				<RequestForm id={selectedId} clearId ={clearSelectedId} createNew={createNew} updateRequest={updateRequest}></RequestForm>
			</div>
		</main>
		<Footer></Footer>
	</div>
	);
}

export async function getServerSideProps(context) {
	try {
			await loginCheck(context.req, context.res)
	} catch (error) {
			context.res.writeHead(302, { Location: '/login' });
			context.res.end();
			return { props: {}}
	}
	return {
		props: {id: context.req.decodedClaims.uid}, // will be passed to the page component as props
	}
}
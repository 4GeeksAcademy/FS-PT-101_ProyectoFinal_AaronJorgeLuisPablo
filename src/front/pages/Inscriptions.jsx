import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import { Link, useNavigate, useParams } from "react-router-dom"
import collection from "../services/collection"

export const Inscriptions = () => {
	const {id} = useParams()
	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()

	const [user, setUser] = useState({name: "", surname: "", NID: "", telephone: "", birthdate: null, username: "", email: "", confirmEmail: "", password: "", confirmPassword: "", city: "", address: "", gender: "MALE", avatar: "", is_professional: false, professional:{type: "", tax_address: "", business_name: "", bio: "", nuss: ""}})
	const [inscriptions, setInscriptions] = useState([])

	const getUser = async () => {
		const resp = await collection.getOneUser(id)
		if("error" in resp)
			navigate("/")
		else{
			setUser({...resp,...resp.professional})
		}
	}

	const formatDate = (date) => {
		return date.toLocaleString("en-GB", { timeZone: "UTC" })
	}

	const loadInscriptions = async () => {
		const resp = await collection.getInscriptionsForUser(id)
		if("eror" in resp)
			setInscriptions([])
		else
			setInscriptions([...resp])
	}

	useEffect(() => {
		getUser()
	}, [])

	useEffect(()=>{
		loadInscriptions()
	},[user])

	return (
		<div className="container bg-white rounded my-3 py-5">
			<h4 className="TextDark text-center display-5 fw-semibold mb-5">Mis inscripciones</h4>
			{(inscriptions.length > 0 ?
					<table className="table table-bordered y-4 p-2">
						<thead className="table-info">
							<tr>
								<th scope="col" className="text-center">Nombre</th>
								<th scope="col" className="text-center">Fecha inicio</th>
								<th scope="col" className="text-center">Fecha fin</th>
								<th scope="col" className="text-center">Precio</th>
								<th scope="col" className="text-center"><i class="fa-solid fa-star"></i></th>
							</tr>
						</thead>
						<tbody className="table-group-divider">
						{inscriptions.map((item, i)=>{
							return(
							<tr key={i}>
								<td className="ps-2"><Link className="text-decoration-none" to={"/activity/"+item.activity.id}>{item.activity.info_activity.name}</Link></td>
								<td className="text-center">{formatDate(new Date(item.activity.start_date))}</td>
								<td className="text-center">{formatDate(new Date(item.activity.end_date))}</td>
								<td className="text-center">{item.activity.price + "€"}</td>
								<td className="text-center"><Link className="text-decoration-none" to="">Reseñar</Link></td>
							</tr>)
							})}
						</tbody>
					</table>
				: <p className="text-center">No estás inscrito a ninguna actividad</p>)}
			</div>
	);
}; 
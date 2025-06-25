import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import collection from "../services/collection"

export const NewProfessionalForm = () => {
	const [user,setUser] = useState(null)
	const [formData, setFormdata] = useState({bio: "", type: "FREELANCE", business_name: "", tax_address: "", nuss: ""})

	const navigate = useNavigate()
	const {store,dispatch} = useGlobalReducer()

	const handleCreateProf = async (e) => {
		e.preventDefault()
		const resp = await collection.createProf(formData)
		if(!resp.success)
			console.log("Hubo un error")
		else
			dispatch({type: "loadUser", payload: resp.user})
			setTimeout(()=>navigate("/detailsprofessional/" + store.user.id),2000)
	}

	const handleChange = async (e) => {
		if(e.target.name == "type" && e.target.value == "FREELANCE")
			setFormdata({...formData, business_name: "", [e.target.name]: e.target.value})
		else
			setFormdata({
						...formData, [e.target.name]: e.target.value
					})
	}
	
	const getUser = async () => {
		const resp = await collection.loginToken()
		if ("error" in resp)
			navigate("/")
		else {
			setUser({ ...resp, ...resp.professional })
		}
	}

	useEffect(() => {
		getUser()
	}, [])

	return (
		<div className="container bg-white rounded my-3">
			<div className="row p-0">
				<div className="col-md-2 m-0 BannerLogin BannerLoginLeft rounded-start"></div>
				<div className="col-12 col-md-8">
					<div className="row my-4 col-md-10 mx-auto align-items-center">
							<div className="col-6 col-md-3 mx-auto">
								<img className="img-fluid" src="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721555/Logo_Nomadik_txkiej.png" alt="" />
							</div>
							<div className="col-6 col-md-9 align-self-center">
								<p className="TextDark fs-5 fw-semibold mt-3">Necesitamos conocer datos sobre tu situación fiscal para poder procesar los pagos. Por favor complete este formulario.</p>
							</div>
					</div>
					<form className="row col-md-10 mx-auto" onSubmit={handleCreateProf}>
						<div className="col-12 row">
								<div className="col-12 col-md-6">
									<div className="form-floating my-2 mx-auto">
										<input type="text" name="tax_address" className="form-control" id="tax_address" placeholder="" onChange={handleChange} value={formData.tax_address} />
										<label className="fs-6" htmlFor="tax_address">Dirección fiscal</label>
									</div>
								</div>
								<div className="col-12 col-md-6">
									<div className="form-floating my-2 mx-auto">
										<input type="text" name="nuss" className="form-control" id="nuss" placeholder="" onChange={handleChange} value={formData.nuss} />
										<label className="fs-6" htmlFor="nuss">NUSS</label>
									</div>
								</div>
								<div className="col-12 col-md-6">
									<div className="form-floating my-2 mx-auto">
										<select className="form-select" aria-label="Professional type" id="type" name="type" placeholder="" onChange={handleChange} value={formData.type}>
											<option value="BUSINESS">Empresa</option>
											<option value="FREELANCE">Autónomo</option>
										</select>
										<label className="fs-6" htmlFor="gender">Tipo de profesional</label>
									</div>
								</div>
								<div className="col-12 col-md-6">
									<div className="form-floating my-2 mx-auto">
										<input disabled={formData.type == "FREELANCE"} type="text" name="business_name" className="form-control" id="business_name" placeholder="" onChange={handleChange} value={formData.business_name} />
										<label className="fs-6" htmlFor="business_name">Nombre de la empresa</label>
									</div>
								</div>
								<div className="col-12">
									<div className="form my-2 mx-auto">
										<label className="fs-6" htmlFor="bio">Biografía</label>
										<div id="bioHelpBlock" className="col-12 form-text">
											Una desripción sobre ti y lo que quieres que los usuarios puedan leer para conocerte.
										</div>
										<textarea name="bio" className="form-control mt-2" style={{ height: '280px' }} id="bio" placeholder="" onChange={handleChange} value={formData.bio} />
									</div>
								</div>
							<div className="row">
								<input type="submit" value="Enviar" className="btn btn-primary my-2 w-auto mx-auto fw-bold" />
								<p className="text-danger text-center fw-semibold">{formData.response}</p>
							</div>
						</div>
					</form>
				</div>
				<div className="col-md-2 col-0 m-0 BannerLogin BannerLoginRight rounded-end"></div>
			</div>
		</div>
	)
}
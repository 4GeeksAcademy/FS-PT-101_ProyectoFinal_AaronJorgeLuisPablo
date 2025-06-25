import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import collection from "../services/collection"

export const CompleteUserForm = (props) => {
	const [user, setUser] = useState(null)
	const [formData, setFormdata] = useState({ name: "", surname: "", NID: "", telephone: "", birthdate: undefined, username: "", city: "", country: "", address: "", gender: "NOT TELLING", bio: "", type: "FREELANCE", business_name: "", tax_address: "", nuss: "", error: false, response: "" })
	const [messages, setMessages] = useState({ username: "Empieza a escribir para comprobar si está disponible.", usernameClass: "", usernameStatus: false })
	const [avatarImg, setAvatarImg] = useState("https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721682/0_y2kkuy.jpg")
	const [birthdate, setBirthdate] = useState("")

	const { store, dispatch } = useGlobalReducer()


	const navigate = useNavigate()

	const handleCompleteClient = async (e) => {
		e.preventDefault()
		if (props.firstTime) {
			if (!messages.usernameStatus)
				setMessages({ ...formData, response: "No puede registrarse con ese usuario" })
			else {
				const request_body = new FormData()
				Object.entries(formData).forEach(([clave, valor]) => {
					request_body.append(clave, valor)
				});
				request_body.append("avatar", avatarImg)
				const resp = await collection.createClient(request_body)
				if (!resp.success)
					setFormdata({ ...formData, error: true, response: resp.response })
				else {
					setFormdata({ ...formData, error: false, response: "Datos actualizados con éxito" })
					dispatch({ type: "loadUser", payload: resp.user })
					setTimeout(() => navigate("/personalspace"), 2000)
				}
			}
		} else {
			if (!messages.usernameStatus)
				setMessages({ ...formData, response: "No puede registrarse con ese usuario" })
			else {
				const request_body = new FormData()
				Object.entries(formData).forEach(([clave, valor]) => {
					request_body.append(clave, valor)
				});
				request_body.append("avatar", avatarImg)
				const resp = await collection.editUser(request_body)
				if (!resp.success)
					setFormdata({ ...formData, error: true, response: resp.response })
				else {
					setFormdata({ ...formData, error: false, response: "Datos actualizados con éxito" })
					dispatch({ type: "loadUser", payload: resp.user })
					setTimeout(() => navigate(0), 2000)
				}
			}
		}
	}

	const handleChange = async (e) => {
		if (["name", "surname", "city", "country"].includes(e.target.name))
			setFormdata({ ...formData, [e.target.name]: e.target.value.replace(/[^a-zA-Zñ\s]/g, '') })
		else if (e.target.name == "telephone")
			setFormdata({ ...formData, [e.target.name]: e.target.value.replace(/(?!^\+)[^\d]/g, '') })
		else
			setFormdata({
				...formData, [e.target.name]: e.target.value
			})
		if (e.target.name == "username") {
			if (e.target.value != user.username) {
				let available = false
				let response = ""
				if (e.target.value.length > 3) {
					available = await collection.checkUser(e.target.value)
					response = (available ? "El nombre de usuario está dispomible" : "Ya existe un usuario con ese nombre")
				}
				else
					response = "Empieza a escribir para comprobar si está disponible."
				setMessages({ ...messages, usernameStatus: available, username: response })
			}
			else
				setMessages({ ...messages, username: "" })
		} else if (e.target.name == "birthdate") {
			if (e.target.value != "") {
				setFormdata({ ...formData, birthdate: (new Date(e.target.value)).toISOString() })
				setBirthdate(e.target.value)
			}
		}
	}

	const getUser = async () => {
		const resp = await collection.loginToken()
		if("error" in resp)
			navigate("/")
		else{
			let prof = {}
			if (resp.is_professional) {
				prof = resp.professional
				delete resp.professional
			}
			setUser(resp)
			setAvatarImg(resp.avatar_url)
			if (resp.birthdate != null)
				setBirthdate(new Date(resp.birthdate).toISOString().split("T")[0])
			if (!props.firstTime) {
				setFormdata({ ...resp, ...prof })
				setMessages({ ...messages, username: "", usernameStatus: true })
			}
		}
	}

	const handleAvatarChange = async (e) =>{
		const file = e.target.files[0]
		const data = new FormData()
		try {
			data.append("file", file)
			data.append("upload_preset", "Preset_Nomadik")
			data.append("cloud_name", "dsn6qtd9g")
			const resp = await fetch('https://api.cloudinary.com/v1_1/dsn6qtd9g/image/upload', {
				method: 'POST',
				body: data,
			})
			const result = await resp.json()
			setAvatarImg(result.secure_url)

		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if(store.user.id == null)
			navigate("/login")
		if(user == null)
			getUser()
	}, [])

	return (
		<div className="container bg-white rounded my-3">
			<div className="row p-0">
				<div className="col-md-2 m-0 BannerLogin BannerLoginLeft rounded-start"></div>
				<div className="col-12 col-md-8">
					<div className="row my-4 col-md-8 mx-auto align-items-center">
						{props.firstTime ? <>
							<div className="col-6 col-md-3 mx-auto">
								<img className="img-fluid" src="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721555/Logo_Nomadik_txkiej.png" alt="" />
							</div>
							<div className="col-6 col-md-9 align-self-center">
								<p className="TextDark fs-5 fw-semibold mt-3">Necesitamos que complete su perfil. No podrá realizar algunas acciones hasta que lo haga.</p>
							</div>
						</>
							: <div>
								<h3 className="text-center display-5 font1">Datos de usuario</h3>
								<p className="m-4 fw-semibold mt-3">Si lo que desea es cambiar su contraseña. Haga click <Link className="TextDark text-decoration-none" to="/newpassword">aquí</Link></p>
								</div>
						}
					</div>
					{user ?
						<form className="row col-md-8 mx-auto" onSubmit={handleCompleteClient}>
							<div className="col-8 col-sm-6 my-2">
								<div className="form-floating">
									<input className="form-control" pattern=".*[a-zA-Z].*" title="El nombre de usuario debe contener al menos tres letras" required type="text" name="username" id="username" minLength="4" maxLength="16" placeholder="" autoComplete="username" onChange={handleChange} value={formData?.username} />
									<label className="fs-6" htmlFor="username"><span className="text-danger">∗</span> Nombre de usuario</label>
								</div>
							</div>
							<div className="col-4 col-sm-6 align-content-center">
								<div id="checkuserHelpBlock" className={"form-text " + (messages.usernameStatus ? "text-success" : "text-danger")}>
									{(messages.usernameStatus ?
										<i className="fa-solid fa-circle-check text-success me-2"></i>
										: <i className="fa-solid fa-circle-xmark text-danger me-2"></i>)}
									{messages.username}
								</div>
							</div>
							<div id="usernameHelpBlock" className="col-12 form-text mb-2 ms-2">
								El nick debe tener más de 3 caracteres.
							</div>
							<div className="col-12 col-lg-6">
								<div className="form-floating my-2 mx-auto">
									<input required type="text" name="name" className="form-control" id="name" placeholder="" onChange={handleChange} value={formData?.name} />
									<label className="fs-6" htmlFor="name"><span className="text-danger">∗</span> Nombre</label>
								</div>
							</div>
							<div className="col-12 col-lg-6">
								<div className="form-floating my-2 mx-auto">
									<input required type="text" name="surname" className="form-control" id="surname" placeholder="" onChange={handleChange} value={formData?.surname} />
									<label className="fs-6" htmlFor="surname"><span className="text-danger">∗</span> Apellidos</label>
								</div>
							</div>
							<div className="col-12 col-lg-6">
								<div className="form-floating my-2 mx-auto">
									<input required type="text" name="NID" className="form-control" id="nid" placeholder="" maxLength="11" onChange={handleChange} value={formData?.NID} />
									<label className="fs-6" htmlFor="nid"><span className="text-danger">∗</span> Dto. de identidad</label>
								</div>
							</div>
							<div className="col-12 col-lg-6">
								<div className="form-floating my-2 mx-auto">
									<input required type="text" name="telephone" className="form-control" id="telephone" placeholder="" onChange={handleChange} value={formData?.telephone} />
									<label className="fs-6" htmlFor="telephone"><span className="text-danger">∗</span> Nº de teléfono</label>
								</div>
							</div>
							<div className="col-12 col-lg-6">
								<div className="form-floating my-2 mx-auto">
									<input type="date" name="birthdate" className="form-control" id="birthdate" placeholder="" onChange={handleChange} value={birthdate} />
									<label className="fs-6" htmlFor="birthdate">Fecha de nacimiento</label>
								</div>
							</div>
							<div className="col-12 col-lg-6">
								<div className="form-floating my-2 mx-auto">
									<select className="form-select" aria-label="Gender select menu" id="gender" name="gender" placeholder="" onChange={handleChange} value={formData?.gender}>
										<option value="MALE">Masculino</option>
										<option value="FEMALE">Femenino</option>
										<option value="OTHER">Otro</option>
										<option value="NOT TELLING">No responder</option>
									</select>
									<label className="fs-6" htmlFor="gender">Género</label>
								</div>
							</div>
							<div className="col-6">
								<div className="form-floating my-2 mx-auto">
									<input type="text" name="city" className="form-control" id="city" placeholder="" onChange={handleChange} value={formData?.city} />
									<label className="fs-6" htmlFor="city">Ciudad</label>
								</div>
							</div>
							<div className="col-6">
								<div className="form-floating my-2 mx-auto">
									<input type="text" name="country" className="form-control" id="country" placeholder="" onChange={handleChange} value={formData?.country} />
									<label className="fs-6" htmlFor="country">País</label>
								</div>
							</div>
							<div className="col-12">
								<div className="form-floating my-2 mx-auto">
									<input type="text" name="address" className="form-control" id="address" placeholder="" onChange={handleChange} value={formData?.address} />
									<label className="fs-6" htmlFor="address">Dirección</label>
								</div>
							</div>
							<div className="row my-3">
								<div className="col-3 overflow-hidden align-content-center">
									<img src={avatarImg} id="preview" className="rounded-circle img-fluid NoDeformImg" />
								</div>
								<div className="col-9 mb-3">
									<label htmlFor="avatar" className="form-label col-10">Foto de perfil <span className="ms-2 text-light-emphasis">(.jpg)</span></label>
									<input className="form-control" type="file" accept="image/jpeg" name="avatar" id="avatar" onChange={handleAvatarChange} />
								</div>
							</div>
							{store.user?.is_professional ? <>
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
							</> : ""}
							<div className="row">
								{props.firstTime ?
									<input type="submit" value="Crear usuario" className="btn btn-primary my-2 w-auto mx-auto fw-bold" />
									: <div className="d-flex">
										<input type="submit" value="Editar datos" className="btn btn-primary my-2 w-auto mx-auto fw-bold" />
										<input type="reset" value="Reiniciar" className="btn btn-secondary my-2 w-auto mx-auto fw-bold" onClick={getUser} />
										<button className="btn btn-danger my-2 w-auto mx-auto fw-bold" onClick={() => navigate("/personalspace")}>Cancelar</button>
									</div>
								}
								<p className={"text-center fw-semibold " + (formData.error ? "text-danger" : "text-success")}>{formData.response}</p>
							</div>
						</form> : <div className="text-center">
							<div className="spinner-grow LoadingSpinner" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>}
				</div>
				<div className="col-md-2 col-0 m-0 BannerLogin BannerLoginRight rounded-end"></div>
			</div>
		</div>
	)
}
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import collection from "../services/collection"

export const Signup = () => {
	const [formData, setFormdata] = useState({name: "", surname: "", NID: "", telephone: "", birthdate: null, username: "", email: "", confirmEmail: "", password: "", confirmPassword: "", city: "", address: "", gender: "MALE", avatar: "", is_professional: false, type: "", tax_address: "", business_name: "", bio: "", nuss: ""})
	const [messages, setMessages] = useState({username: "", usernameClass: "", usernameStatus: false, email: "", emailClass: "", password: "", passwordClass: ""})

	const navigate = useNavigate()

	const handleSignup = async (e) => {
		e.preventDefault()
		
		if(formData.email != formData.confirmEmail)
			setMessages({...messages, email: "Las direcciones de email no coinciden."})
		else if(formData.password != formData.confirmPassword)
			setMessages({...messages, password: "Las contraseñas no coinciden."})
		else if(formData.avatar.width != formData.avatar.width)
			setMessages({...formData, response: "La imagen debe ser cuadrada"})
		else{
			const request_body = new FormData()
			Object.entries(formData).forEach(([clave, valor]) => {
				request_body.append(clave, valor)
			});
			const resp = await collection.signupUser(request_body)
			console.log(resp)
			if(!resp.success)
				setFormdata({...formData, response: resp.response, error: true})
			else{
				setFormdata({...formData, error: false, response: ""})
				navigate("/login")
			}
		}
	}

	const handleChange = async (e) => {
        setFormdata({
            ...formData, [e.target.name]: e.target.value
        })
		if (e.target.name == "username"){
			let available = false
			let response = ""
			if(e.target.value.length > 3){
				available = await collection.checkUser(e.target.value)
				response = (available ? "El nombre de usuario está dispomible": "Ya existe un usuario con ese nombre")
			}
			else
				response = ""

			setMessages({...messages, usernameStatus: available, username: response})
		} else if (e.target.name == "email" || e.target.name == "confirmEmail")
			setMessages({...messages, email: ""})
		else if (e.target.name == "password" || e.target.name == "confirmPassword")
			setMessages({...messages, password: ""})
    }

	const handleCheckboxChange = (e) => {
		setFormdata({
			...formData, [e.target.name]: !formData[e.target.name]
		})
	}

	useEffect(()=>{
		const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
		const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
	},[])

	return (
		<div className="container bg-white rounded my-3">
			<div className="row p-0">
			<div className="col-md-2 m-0 BannerLogin BannerLoginLeft rounded-start"></div>
			<div className="col-12 col-md-8">
				<div className="row my-4 w-75 mx-auto">
					<div className="col-6 col-md-4 mx-auto">
						<img className="img-fluid" src="\src\front\assets\img\Logo_Nomadik.png" alt="" />
					</div>
					<div className="col-12 col-md-8 align-self-center">
						<h3 className="display-3 fw-bold text-center my-2 TextDark">Sign Up</h3>
						<p className="text-center fw-semibold mt-3">¿Ya tienes una cuenta? Haga click <Link className="text-decoration-none" to="/login">aquí</Link></p>
					</div>
				</div>
					<form className="m-3" onSubmit={handleSignup}>
						<div className="row w-75 mx-auto">
							<div className="col-12 col-lg-6">
								<div class="form-floating my-2 mx-auto">
									<input required type="text" name="name" className="form-control" id="name" placeholder="" onChange={handleChange} value={formData.name}/>
									<label className="fs-6" for="name">Nombre</label>
								</div>
							</div>
							<div className="col-12 col-lg-6">
								<div class="form-floating my-2 mx-auto">
									<input required type="text" name="surname" className="form-control" id="surname" placeholder="" onChange={handleChange} value={formData.surname}/>
									<label className="fs-6" for="surname">Apellidos</label>
								</div>
							</div>
							<div className="col-12 col-lg-6">
								<div class="form-floating my-2 mx-auto">
		
									<input required type="text" name="NID" className="form-control" id="nid" placeholder="" onChange={handleChange} value={formData.NID}/>
									<label className="fs-6" for="nid">Documento de identidad</label>
								</div>
							</div>
							<div className="col-12 col-lg-6">
								<div class="form-floating my-2 mx-auto">
									<input required type="text" name="telephone" className="form-control" id="telephone" placeholder="" onChange={handleChange} value={formData.telephone}/>
									<label className="fs-6" for="telephone">Nº de teléfono</label>
								</div>
							</div>
							<div className="col-12 col-lg-6">
								<div class="form-floating my-2 mx-auto">
									<input required type="date" name="birthdate" className="form-control" id="birthdate" placeholder="" onChange={handleChange} value={formData.birthdate}/>
									<label className="fs-6" for="birthdate">Fecha de nacimiento</label>
								</div>
							</div>
							<div className="col-12 col-lg-6">
								<div class="form-floating my-2 mx-auto">
									<select className="form-select" aria-label="Gender select menu" id="gender" name="gender" placeholder="" onChange={handleChange} value={formData.gender}>
										<option value="MALE" selected>Masculino</option>
										<option value="FEMALE">Femenino</option>
										<option value="NOT TELLING">Otro</option>
									</select>
									<label className="fs-6" for="gender">Género</label>
								</div>
							</div>
							<div className="col-6">
								<div class="form-floating my-2 mx-auto">
									<input required type="text" name="username" className="form-control" id="username" placeholder="" autoComplete="username" onChange={handleChange} value={formData.username}/>
									<label className="fs-6" for="username">Username</label>
								</div>
							</div>
							<div className="col-6 align-content-center">
								<div id="checkuserHelpBlock" className={"col-12 form-text " + (messages.usernameStatus ? "text-success": "text-danger")}>
								{(formData.username.length > 3 ? (messages.usernameStatus ? 
									<i class="fa-solid fa-circle-check text-success me-2"></i>
									: <i className="fa-solid fa-circle-xmark text-danger me-2"></i>) : "")}
										{messages.username}
								</div>
							</div>
							<div id="usernameHelpBlock" className="col-12 form-text">
									El nick debe tener más de 3 caracteres.
							</div>
							<div className="col-12 col-lg-6">
								<div class="form-floating my-2 mx-auto">
									<input required type="text" name="email" className="form-control" id="email" placeholder="" autoComplete="username" onChange={handleChange} value={formData.email}/>
									<label className="fs-6" for="email">Email</label>
								</div>
							</div>
							<div className="col-12 col-lg-6">
								<div class="form-floating my-2 mx-auto">
									<input required type="text" name="confirmEmail" className="form-control" id="confirmEmail" placeholder="" onChange={handleChange} value={formData.confirmEmail}/>
									<label className="fs-6" for="confirmEmail">Confirmar email</label>
								</div>
							</div>
							<div id="emailHelpBlock" className="col-12 form-text text-danger">
									{(messages.email ? messages.email : "")}
							</div>
							<div className="col-12 col-lg-6">
								<div class="form-floating my-2 mx-auto">
									<input required type="password" name="password" className="form-control" id="password" placeholder="" autoComplete="new-password" onChange={handleChange} value={formData.password}/>
									<label className="fs-6" for="password">Contraseña</label>
								</div>
							</div>
							<div className="col-12 col-lg-6">
								<div class="form-floating my-2 mx-auto">
									<input required type="password" name="confirmPassword" className={"form-control " + messages.emailClass} id="confirmPassword" placeholder="" autoComplete="new-password" onChange={handleChange} value={formData.confirmPassword}/>
									<label className="fs-6" for="confirmPassword">Confirmar contraseña</label>
								</div>
							</div>
							<div id="passwordHelpBlock" className="col-12 form-text text-danger">
									{(messages.password ? messages.password : "")}
							</div>
							<div className="col-12 col-md-4">
								<div class="form-floating my-2 mx-auto">
									<input required type="text" name="city" className="form-control" id="city" placeholder="" onChange={handleChange} value={formData.city}/>
									<label className="fs-6" for="city">Ciudad</label>
								</div>
							</div>
							<div className="col-12 col-md-8">
								<div class="form-floating my-2 mx-auto">
									<input required type="text" name="address" className="form-control" id="address" placeholder="" onChange={handleChange} value={formData.address}/>
									<label className="fs-6" for="address">Dirección</label>
								</div>
							</div>
							<div className="col-12 mb-3">
								<label for="formFile" class="form-label">Foto de perfil</label>
								<input className="form-control" type="file" id="formFile" accept="image/jpg" onChange={(e) => setFormdata({...formData, avatar: e.target.files[0]}) }/>
							</div>
							<div className="col-12">
								<div class="form-check my-2 mx-auto">
									<input class="form-check-input" name="is_professional" type="checkbox" id="is_professional" onChange={handleCheckboxChange} value={formData.is_professional}/>
									<label class="form-check-label fs-6" for="checkChecked">
										Soy profesional
										<span className="ms-2" data-bs-toggle="tooltip" data-bs-title="Un profesional es un usuario que puede añadir actividades a la plataforma y actúa como responsable de la misma." >
											<i class="fa-solid fa-circle-info"></i>
										</span>
									</label>
								</div>
							</div>
							{ formData.is_professional ? <>
								<div className="col-12">
									<div className="form my-2 mx-auto">
										<label className="fs-6" for="bio">Biografía</label>
										<div id="bioHelpBlock" className="col-12 form-text">
												Una desripción sobre ti y lo que quieres que los usuarios puedan leer para conocerte.
										</div>
										<textarea name="bio" className="form-control mt-2" style={{ height: '140px' }}  id="bio" placeholder="" onChange={handleChange} value={formData.bio}/>
									</div>
								</div>
							<div className="col-12 col-md-6">
								<div class="form-floating my-2 mx-auto">
									<input type="text" name="tax_address" className="form-control" id="tax_address" placeholder="" onChange={handleChange} value={formData.tax_address}/>
									<label className="fs-6" for="tax_address">Dirección fiscal</label>
								</div>
							</div>
							
							<div className="col-12 col-md-6">
								<div class="form-floating my-2 mx-auto">
									<input type="text" name="business_name" className="form-control" id="business_name" placeholder="" onChange={handleChange} value={formData.business_name}/>
									<label className="fs-6" for="business_name">Nombre de la empresa</label>
								</div>
							</div>
							
							<div className="col-12 col-md-6">
								<div class="form-floating my-2 mx-auto">
									<input type="text" name="nuss" className="form-control" id="nuss" placeholder="" onChange={handleChange} value={formData.nuss}/>
									<label className="fs-6" for="nuss">NUSS</label>
								</div>
							</div>
							<div className="col-12 col-lg-6">
								<div class="form-floating my-2 mx-auto">
									<select className="form-select" aria-label="Professional type" id="type" name="type" placeholder="" onChange={handleChange} value={formData.type}>
										<option value="FREELANCE" selected>Autónomo</option>
										<option value="BUSINESS">Empresa</option>
									</select>
									<label className="fs-6" for="gender">Tipo de profesional</label>
								</div>
							</div>
							</> : ""
							}

							<div className="row">
								<input type="submit" value="Crear usuario" className="btn btn-primary my-2 w-auto mx-auto fw-bold"/>
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
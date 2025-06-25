import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import collection from "../services/collection"
import useGlobalReducer from "../hooks/useGlobalReducer"

export const Signup = () => {
	const [formData, setFormdata] = useState({ username: "", email: "", confirmEmail: "", password: "", confirmPassword: "" })
	const [messages, setMessages] = useState({ username: "", usernameClass: "", usernameStatus: false, email: "", emailClass: "", password: "", passwordClass: "" })
	const [tooltipTimeout, setTooltipTimeout] = useState(null)

	const {store,dispatch} = useGlobalReducer()

	const checkRef = useRef(null)
	const tooltipRef = useRef(null)

	const navigate = useNavigate()

	const handleSignup = async (e) => {
		e.preventDefault()

		if (formData.email != formData.confirmEmail)
			setMessages({ ...messages, email: "Las direcciones de email no coinciden." })
		else if (formData.password != formData.confirmPassword)
			setMessages({ ...messages, password: "Las contraseñas no coinciden." })
		else if (checkRef.current.checked) {
			const request_body = new FormData()
			Object.entries(formData).forEach(([clave, valor]) => {
				request_body.append(clave, valor)
			});
			const resp = await collection.signupUser(request_body)
			console.log(resp)
			if (!resp.success)
				setFormdata({ ...formData, response: resp.response, error: true })
			else {
				setFormdata({ ...formData, error: false, response: "Usuario creado con éxito" })
				setTimeout(() => navigate("/login"), 2000)
			}
		} else {
			tooltipRef.current.show()
			setTooltipTimeout(setTimeout(() => {
				tooltipRef.current.hide()
			}, 3000))
		}
	}

	const handleChange = async (e) => {
		setFormdata({
			...formData, [e.target.name]: e.target.value
		})
		if (e.target.name == "username") {
			let available = false
			let response = ""
			if (e.target.value.length > 3) {
				available = await collection.checkUser(e.target.value)
				response = (available ? "El nombre de usuario está dispomible" : "Ya existe un usuario con ese nombre")
			}
			else
				response = ""

			setMessages({ ...messages, usernameStatus: available, username: response })
		} else if (e.target.name == "email" || e.target.name == "confirmEmail")
			setMessages({ ...messages, email: "" })
		else if (e.target.name == "password" || e.target.name == "confirmPassword")
			setMessages({ ...messages, password: "" })
	}

	useEffect(() => {
		tooltipRef.current = new bootstrap.Tooltip(checkRef.current, {
			title: 'Debes aceptar los términos de servicio',
			trigger: 'manual',
			animation: true,
			placement: 'top'
		});
	}, [])

	useEffect(() => {
		if (store.user.id != null)
			navigate("/personalspace")
	}, [store.user])

	return (
		<div className="container bg-white rounded my-3">
			<div className="row p-0">
				<div className="col-md-2 m-0 BannerLogin BannerLoginLeft rounded-start"></div>
				<div className="col-12 col-md-8">
					<div className="row my-4 w-75 mx-auto">
						<div className="col-6 col-md-4 mx-auto">
							<img className="img-fluid" src="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721555/Logo_Nomadik_txkiej.png" alt="" />
						</div>
						<div className="col-12 col-md-8 align-self-center">
							<h3 className="display-2 fw-bold text-center my-2 TextDark">Sign Up</h3>
							<div className="col-12 align-self-center">
								<p className="text-center fw-semibold mt-3">¿Ya tiene una cuenta? Haga click <Link className="text-decoration-none TextDark" to="/login">aquí</Link></p>
							</div>
						</div>
					</div>
					<div className="mx-auto align-self-center w-75 d-none d-md-block">
						<p className="m-4 fw-semibold mt-3">Únete a nuestra comunidad y descubre un mundo de actividades, experiencias únicas y personas con tus mismas ganas de disfrutar.</p>
					</div>
					<form className="m-3" onSubmit={handleSignup}>
						<div className="row w-75 mx-auto">
							<div className="col-12 col-lg-6">
								<div className="my-2 mx-auto">
									<label className="fs-6 fw-semibold mb-2" htmlFor="email">Email</label>
									<input required type="email" name="email" className="form-control" id="email" placeholder="name@gmail.com" autoComplete="username" onChange={handleChange} value={formData.email} />
								</div>
							</div>
							<div className="col-12 col-lg-6">
								<div className="my-2 mx-auto">
									<label className="fs-6 fw-semibold mb-2" htmlFor="confirmEmail">Confirmar email</label>
									<input required type="email" name="confirmEmail" className="form-control" id="confirmEmail" placeholder="name@gmail.com" onChange={handleChange} value={formData.confirmEmail} />
								</div>
							</div>
							<div id="emailHelpBlock" className="col-12 form-text text-danger">
								{(messages.email ? messages.email : "")}
							</div>
							<div className="col-12 col-lg-6">
								<div className="my-2 mx-auto">
									<label className="fs-6 fw-semibold mb-2" htmlFor="password">Contraseña</label>
									<input required type="password" name="password" className="form-control" id="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" autoComplete="new-password" onChange={handleChange} value={formData.password} />
								</div>
							</div>
							<div className="col-12 col-lg-6">
								<div className="my-2 mx-auto">
									<label className="fs-6 fw-semibold mb-2" htmlFor="confirmPassword">Confirmar contraseña</label>
									<input required type="password" name="confirmPassword" className={"form-control " + messages.emailClass} id="confirmPassword" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" autoComplete="new-password" onChange={handleChange} value={formData.confirmPassword} />
								</div>
							</div>
							<div id="passwordHelpBlock" className="col-12 form-text text-danger">
								{(messages.password ? messages.password : "")}
							</div>

							<div className="form-check my-3 mx-auto w-auto">
								<input ref={checkRef} className="form-check-input" type="checkbox" value="" id="checkChecked" data-bs-title="This top tooltip is themed via CSS variables." />
								<label className="form-check-label fw-semibold" htmlFor="checkChecked">
									Acepta los <Link className="text-decoration-none TextDark" target="_blank" to="/termsandconditions">Términos de Servicio</Link>
								</label>
							</div>

							<div className="row">
								<input type="submit" value="Registrarse" className="btn Button my-2 w-auto mx-auto fw-bold" />
								<p className={"text-center fw-semibold " + (!formData.error ? "text-success" : "text-danger")}>{formData.response}</p>
							</div>
						</div>
					</form>
				</div>
				<div className="col-md-2 col-0 m-0 BannerLogin BannerLoginRight rounded-end"></div>
			</div>
		</div>
	)
}
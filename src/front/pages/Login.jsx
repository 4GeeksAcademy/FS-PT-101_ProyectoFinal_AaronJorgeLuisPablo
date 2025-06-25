import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import collection from "../services/collection"

export const Login = () => {
	const { store, dispatch } = useGlobalReducer()
	const [formData, setFormdata] = useState({ user: "", password: "", response: " ", error: false })
	const [modalEmail, setModalEmail] = useState("")
	const [modalResult, setModalResult] = useState({ success: false, message: "" })

	const emailModalField = useRef(null)

	const navigate = useNavigate()

	const handleLogin = async (e) => {
		e.preventDefault()
		let request_body = { password: formData.password }
		if (formData.user.includes("@"))
			request_body = { ...request_body, email: formData.user }
		else
			request_body = { ...request_body, username: formData.user }

		const resp = await collection.loginUser(request_body)
		if (!resp.success)
			setFormdata({ ...formData, response: resp.response, error: true })
		else {
			setFormdata({ ...formData, error: false, response: "Sesión iniciada con éxito" })
			dispatch({ type: "loadUser", payload: resp })
			localStorage.setItem("token", resp.token)
			setTimeout(() => navigate("/personalspace"), 2000)
		}
	}

	const handleReset = async (e) => {
		e.preventDefault()
		const resp = await collection.resetPassword(modalEmail)
		emailModalField.current.disabled = true
		if (!resp.success) {
			setModalResult({ success: false, message: "No se encontró un usuario con ese mail" })
			setTimeout(()=>emailModalField.current.disabled = false,1000)
		}
		else {
			setModalResult({ success: true, message: "Correo de recuperación enviado, compruebe su bandeja de correo electrónico" })
			setTimeout(() => navigate(0), 4000)
		}
	}

	const handleChange = (e) => {
		setFormdata({
			...formData, [e.target.name]: e.target.value
		})
	}

	useEffect(()=>{
		if (store.user.username != ""){
			navigate("/completeuserform")

		}
		else if (store.user.id != null)
			navigate("/personalspace")
	},[store.user])

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
							<h3 className="display-2 fw-bold text-center my-2 TextDark">Log In</h3>
							<p className="text-center fw-semibold mt-3">¿Aún no estás registrado? Haga click <Link className="text-decoration-none TextDark" to="/signup">aquí</Link></p>
						</div>
					</div>
					<form className="m-3" onSubmit={handleLogin}>
						<div className="form-label my-3 w-75 mx-auto">
							<label className="fs-6 mb-2 fw-semibold" htmlFor="email">Email o nombre de usuario</label>
							<input required type="text" name="user" className="form-control" id="email" placeholder="name@gmail.com" autoComplete="current-email" onChange={handleChange} value={formData.user} />
						</div>
						<div className="form-label my-3 w-75 mx-auto">
							<label className="fs-6 mb-2 fw-semibold" htmlFor="password">Contraseña</label>
							<input required type="password" name="password" className="form-control" id="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" autoComplete="current-password" onChange={handleChange} value={formData.password} />
							<p className="text-center fs-6 my-3 fw-semibold">¿Has olvidado tu contraseña? Haga click <Link className="text-decoration-none TextDark" data-bs-toggle="modal" data-bs-target="#resetPasswordModal">aquí</Link></p>

						</div>
						<div className="row">
							<input type="submit" value="Iniciar sesión" className="btn Button my-2 w-auto mx-auto fw-bold" />
							<p className={"text-center fw-semibold " + (formData.error ? "text-danger" : "text-success")}>{formData.response}</p>
						</div>
					</form>
					<div className="modal fade" id="resetPasswordModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div className="modal-dialog modal-dialog-centered">
							<div className="modal-content">
								<form onSubmit={handleReset}>
									<div className="modal-header BgSecondary">
										<h1 className="modal-title fs-5 text-white" id="exampleModalLabel">He olvidado mi contraseña</h1>
										<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div className="modal-body">
										<div className="mb-3">
											<label htmlFor="modalEmail" className="form-label">Correo electrónico</label>
											<input ref={emailModalField} type="email" className="form-control" id="modalEmail" placeholder="name@example.com" value={modalEmail} name="modalEmail" onChange={(e) => setModalEmail(e.target.value)} />
										</div>
										<div className="PlaceholderP">
											<p className={"text-center " + (modalResult.success ? "text-success" : "text-danger")}>
												{modalResult.message}
											</p>
										</div>
									</div>
									<div className="modal-footer">
										<button type="submit" className="btn Button fw-semibold">Enviar</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-2 col-0 m-0 BannerLogin BannerLoginRight rounded-end"></div>
			</div >
		</div >
	)
}
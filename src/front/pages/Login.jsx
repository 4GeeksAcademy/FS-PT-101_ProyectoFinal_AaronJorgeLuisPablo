import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import collection from "../services/collection"

export const Login = () => {
	const {store,dispatch} = useGlobalReducer()
	const [formData, setFormdata] = useState({user: "", password: "", response: " ", error: false})
	const navigate = useNavigate()

	const handleLogin = async (e) => {
		e.preventDefault()
		let request_body = {password: formData.password}
		if(formData.user.includes("@"))
			request_body = {...request_body, email: formData.user}
		else
			request_body = {...request_body, username: formData.user}

		const resp = await collection.loginUser(request_body)
		if(!resp.success)
            setFormdata({...formData, response: resp.response, error: true})
        else{
            setFormdata({...formData, error: false, response: "Sesión iniciada con éxito"})
            dispatch({type: "loadUser", payload: resp})
            localStorage.setItem("token", resp.token)
            setTimeout(()=>navigate("/personalspace"), 2000)
		}
	}

	const handleChange = (e) => {
        setFormdata({
            ...formData, [e.target.name]: e.target.value
        })
    }

	return (
		<div className="container bg-white rounded my-3">
			<div className="row p-0">
			<div className="col-md-2 m-0 BannerLogin BannerLoginLeft rounded-start"></div>
			<div className="col-12 col-md-8">
				<div className="row my-4 w-75 mx-auto">
					<div className="col-6 col-md-4 mx-auto">
						<img className="img-fluid" src="src\front\assets\img\Logo_Nomadik.png" alt="" />
					</div>
					<div className="col-12 col-md-8 align-self-center">
						<h3 className="display-2 fw-bold text-center my-2 TextDark">Log In</h3>
						<p className="text-center fw-semibold mt-3">¿Aún no estás registrado? Haga click <Link className="text-decoration-none" to="/signup">aquí</Link></p>
					</div>
				</div>
				<form className="m-3" onSubmit={handleLogin}>
					<div className="form-label my-3 w-75 mx-auto">
						<label className="fs-6 mb-2 fw-semibold" htmlFor="email">Email o nombre de usuario</label>
						<input type="text" name="user" className="form-control" id="email" placeholder="name@gmail.com" autoComplete="current-email" onChange={handleChange} value={formData.user}/>
					</div>
					<div className="form-label my-3 w-75 mx-auto">
						<label className="fs-6 mb-2 fw-semibold" htmlFor="password">Contraseña</label>
						<input type="password" name="password" className="form-control" id="password" placeholder="Password" autoComplete="current-password" onChange={handleChange}  value={formData.password}/>
						<p className="text-center fs-6 my-3 fw-semibold">¿Has olvidado tu contraseña? Haga click <Link className="text-decoration-none" to="/">aquí</Link></p>
					</div>
					<div className="row">
						<input type="submit" value="Iniciar sesión" className="btn btn-primary my-2 w-auto mx-auto fw-bold"/>
						<p className={"text-center fw-semibold " + (formData.error ? "text-danger": "text-success")}>{formData.response}</p>
					</div>
				</form>
			</div>
			<div className="col-md-2 col-0 m-0 BannerLogin BannerLoginRight rounded-end"></div>
			</div>
		</div>
	)
}
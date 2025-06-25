import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import collection from "../services/collection"

export const ResetPassword = (props) => {
	const [searchParams] = useSearchParams()
	const [formData, setFormdata] = useState({ password: "", passwordConfirm: "" })
	const [passResult, setPassResult] = useState({ success: false, message: "" })
	const navigate = useNavigate()
	const {store,dispatch} = useGlobalReducer()

	const handleReset = async (e) => {
		e.preventDefault()
		if (formData.password != formData.passwordConfirm)
			setPassResult({ success: false, message: "Las contraseñas no coinciden" })
		else {
			if (props.new) {
				const resp = await collection.changePassword(localStorage.getItem("token"), formData.password)
				if (!resp.success)
					setPassResult({ success: false, message: "Error al cambiar la contraseña" })
				else {
					setPassResult({ success: true, message: "Contraseña actualizada con éxito." })
					dispatch({type: "closeSession"})
					setTimeout(() => navigate("/login"), 2000)
				}
			}
			else {
				const resp = await collection.changePassword(searchParams.get("token"), formData.password)
				if (!resp.success)
					setPassResult({ success: false, message: "Error al cambiar la contraseña" })
				else {
					setPassResult({ success: true, message: "Contraseña actualizada con éxito." })
					setTimeout(() => navigate("/login"), 2000)

				}

			}

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
							<img className="img-fluid" src="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721555/Logo_Nomadik_txkiej.png" alt="" />
						</div>
						<div className="col-12 col-md-8 align-self-center">
							{props.new ? <h3 className="display-5 fw-bold text-center my-2 TextDark">Cambio de contraseña</h3>
							 : <h3 className="display-5 fw-bold text-center my-2 TextDark">Restablecimiento de contraseña</h3>}
						</div>
					</div>
					<form className="m-3" onSubmit={handleReset}>
						<div hidden className="">
							<input type="text" name="user" className="form-control" id="email" autoComplete="current-email" />
						</div>
						<div className="form-label my-3 w-75 mx-auto">
							<label className="fs-6 mb-2 fw-semibold" htmlFor="password">Contraseña</label>
							<input type="password" name="password" required className="form-control" id="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" autoComplete="current-password" onChange={handleChange} value={formData.password} />
						</div>
						<div className="form-label my-3 w-75 mx-auto">
							<label className="fs-6 mb-2 fw-semibold" htmlFor="passwordConfirm">Cconfirmar contraseña</label>
							<input type="password" name="passwordConfirm" required className="form-control" id="passwordConfirm" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" autoComplete="current-password" onChange={handleChange} value={formData.confirmPassword} />
						</div>
						<div className="row">
							<input type="submit" value="Iniciar sesión"className="btn btn-primary my-2 w-auto mx-auto fw-bold" />
							<p className={"text-center fw-semibold " + (passResult.success ? "text-success" : "text-danger")}>{passResult.message}</p>
						</div>
					</form>
				</div>
				<div className="col-md-2 col-0 m-0 BannerLogin BannerLoginRight rounded-end"></div>
			</div >
		</div >
	)
}
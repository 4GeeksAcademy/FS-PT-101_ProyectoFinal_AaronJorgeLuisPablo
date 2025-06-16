import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import { Link, useNavigate, useParams } from "react-router-dom"
import collection from "../services/collection"

export const PersonalSpace = () => {
	const {id} = useParams()
	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()

	const [user, setUser] = useState({name: "", surname: "", NID: "", telephone: "", birthdate: null, username: "", email: "", confirmEmail: "", password: "", confirmPassword: "", city: "", address: "", gender: "MALE", avatar: "", is_professional: false, professional:{type: "", tax_address: "", business_name: "", bio: "", nuss: ""}})
	const [editUser, setEditUser] = useState({})
	const [message, setMessage] = useState("")
	const [editable, setEditable]  = useState(false)

	const getUser = async () => {
		const resp = await collection.getOneUser(id)
		if("error" in resp)
			navigate("/")
		else{
			setUser({...resp,...resp.professional})
			setEditUser({...editUser, is_professional: resp.is_professional})
		}
	}

	const handleChange = (e) => {
		setEditUser({
            ...editUser, [e.target.name]: e.target.value
        })
		setUser({
            ...user, [e.target.name]: e.target.value
        })
	}

	const handleEditUser = async (e) => {
		e.preventDefault()
		const resp = await collection.editUser(id,{...editUser})

		if(resp.success == false) setMessage(resp.response)
		else setMessage("Usuario editado con éxito.")
	}

	useEffect(() => {
		getUser()
	}, [])

	return (
		<div className="container bg-white rounded my-3">
			<div className="container bg-white rounded my-3">
				<div className="row p-5">
					<h4 className="TextDark text-center display-5 fw-semibold">Datos del usuario</h4>
					<form className="mt-3" onSubmit={handleEditUser}>
						<div className="row w-75 mx-auto">
						<fieldset disabled={!editable}>
							<div className="row mb-3">
								<label for="name" className="col-md-4 col-form-label">Nombre</label>
								<div className="col-md-8">
									<input type="text" className="form-control" name="name" id="name" value={user.name} onChange={handleChange}/>
								</div>
							</div>
							<div className="row mb-3">
								<label for="surname" className="col-md-4 col-form-label">Apellidos</label>
								<div className="col-md-8">
									<input type="text" className="form-control" name="surname" id="surname" value={user.surname} onChange={handleChange}/>
								</div>
							</div>
							<div className="row mb-3">
								<label for="username" className="col-md-4 col-form-label">Nombre de usuario</label>
								<div className="col-md-8">
									<input type="text" className="form-control" name="username" id="username" value={user.username} onChange={handleChange}/>
								</div>
							</div>
							<div className="row mb-3">
								<label for="NID" className="col-md-4 col-form-label">Nombre de usuario</label>
								<div className="col-md-8">
									<input type="text" className="form-control" name="NID" id="NID" value={user.NID} onChange={handleChange}/>
								</div>
							</div>
							<div className="row mb-3">
								<label for="telephone" className="col-md-4 col-form-label">Teléfono</label>
								<div className="col-md-8">
									<input type="text" className="form-control" name="telephone" id="telephone" value={user.telephone} onChange={handleChange}/>
								</div>
							</div>
							<div className="row mb-3">
								<label for="city" className="col-md-4 col-form-label">Ciudad</label>
								<div className="col-md-8">
									<input type="text" className="form-control" name="city" id="city" value={user.city} onChange={handleChange}/>
								</div>
							</div>
							<div className="row mb-3">
								<label for="address" className="col-md-4 col-form-label">Dirección</label>
								<div className="col-md-8">
									<input type="text" className="form-control" name="address" id="address" value={user.address} onChange={handleChange}/>
								</div>
							</div>
							<div class="row mb-3">
								<label className="col-md-4 col-form-label" for="gender">Género</label>
								<div className="col-md-8">
									<select className="form-select" aria-label="Gender select menu" id="gender" name="gender" placeholder="" onChange={handleChange} value={user.gender}>
										<option value="MALE" selected>Masculino</option>
										<option value="FEMALE">Femenino</option>
										<option value="NOT TELLING">Otro</option>
									</select>
								</div>
							</div>
							<div className="row mb-3">
								<label for="birthdate" className="col-md-4 col-form-label">Fecha de nacimiento</label>
								<div className="col-md-8">
									<input required type="date" name="birthdate" className="form-control" id="birthdate" placeholder="" onChange={handleChange} value={user.birthdate?.split("T")[0]}/>
								</div>
							</div>
							{user.is_professional ? <>
								<div className="row mb-3">
									<label for="address" className="col-md-4 col-form-label">Biografía</label>
									<div className="col-md-8">
										<textarea name="bio" className="form-control mt-2" style={{ height: '140px' }}  id="bio" placeholder="" onChange={handleChange} value={user.bio} />
									</div>
								</div>
								<div className="row mb-3">
									<label for="address" className="col-md-4 col-form-label">Dirección fiscal</label>
									<div className="col-md-8">
										<input type="text" className="form-control" name="tax_address" id="tax_address" value={user.tax_address} onChange={handleChange}/>
									</div>
								</div>
								<div className="row mb-3">
									<label for="address" className="col-md-4 col-form-label">Nombre de la empresa</label>
									<div className="col-md-8">
										<input type="text" className="form-control" name="business_name" id="business_name" value={user.business_name} onChange={handleChange}/>
									</div>
								</div>
								<div class="row mb-3">
									<label className="col-md-4 col-form-label" for="gender">Tipo de profesional</label>
									<div className="col-md-8">
										<select className="form-select" aria-label="Professional type" id="type" name="type" placeholder="" onChange={handleChange} value={user.type}>
										<option value="FREELANCE" selected>Autónomo</option>
										<option value="BUSINESS">Empresa</option>
									</select>
									</div>
								</div>
								<div className="row mb-3">
									<label for="address" className="col-md-4 col-form-label">NUSS</label>
									<div className="col-md-8">
										<input type="text" className="form-control" name="nuss" id="nuss" value={user.nuss} onChange={handleChange}/>
									</div>
								</div>
							</>
							: <p hidden className="text-center fw-semibold mt-3">¿Desa hacerse profesional? Haga click <Link className="text-decoration-none" to="/signup-profesional">aquí</Link></p>
							}
								<div className="row">
									<input type="submit" value="Guardar cambios" className="btn btn-primary my-2 w-auto mx-auto fw-bold"/>
									{(message?.includes("xito") ?
									<p className="text-success text-center fw-semibold">Usuario editado con éxito</p>
									: <p className="text-danger text-center fw-semibold">{message}</p>)
									}
								</div>
							</fieldset>
							
						</div>
					</form>
					{ !editable ? 
							<button className="btn btn-success w-auto mx-auto" onClick={()=>setEditable(!editable)}>Editar valores</button>
							: <button className="btn btn-secondary w-auto mx-auto" onClick={()=>{
								getUser()
								setEditable(false)
							}}>Cancelar</button>

							}
				</div>
			</div>
		</div>
	);
}; 
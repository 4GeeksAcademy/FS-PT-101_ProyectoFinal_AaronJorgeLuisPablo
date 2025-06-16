import { Link, useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useEffect, useRef, useState } from "react"
import collection from "../services/collection"

export const Navbar = () => {
	const {store,dispatch} = useGlobalReducer()
	const navigate = useNavigate()

	const [search, setSearch] = useState("")
	const [searchResults, setSearchResults] = useState({professionals: [], activities: []})
	const [searching, setSearching] = useState(false)

	const handleSearch = async (e) => {
		setSearch(e.target.value)
		setSearchResults({...searchResults, professionals: [], activities: []})
	}

	const searchText = async (text) => {
		if(search.length > 2){
			setSearching(true)
			const data = await collection.search(search)
			setSearchResults({...searchResults, professionals: data.professionals, activities: data.activities})
			setSearching(false)
		}
	}

	useEffect(()=>{searchText(search)},[search])

	return (
		<nav className="navbar navbar-expand-md navbar-light navbg p-0">
			<div className="container-fluid text-white">
				<a className="navbar-brand" href="#">
					<img className="img-fluid logo" src="/src/front/assets/img/Logo_Nomadik.png" alt="Logo" />
				</a>

				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<div className="navbar-nav me-auto mb-0 gap-3 w-auto">
						<Link className="nav-item nav-link active text-white fs-6 ms-auto fw-semibold" to={"/"}>Home</Link>
						<div className="nav-item dropdown ms-auto">
							<a className="nav-link dropdown-toggle text-white fw-semibold" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Excursiones</a>
							<ul className="dropdown-menu dropdown-menu-dark NavbarDropdown">
								<li><a className="dropdown-item text-white" href="#">Deporte</a></li>
								<li><a className="dropdown-item text-white" href="#">Ocio</a></li>
								<li><a className="dropdown-item text-white" href="#">Turismo</a></li>
							</ul>
						</div>
						<Link className="nav-item nav-link active text-white fs-6 ms-auto fw-semibold" to={"/"}>Equipo</Link>
						<Link className="nav-item nav-link active text-white fs-6 ms-auto fw-semibold" to={"/"}>Contacto</Link>
					</div>

						<form className="mx-auto NavbarSearch input-group">
							<input className="form-control dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" type="search" placeholder="Buscar..." aria-label="Search" value={search} onChange={handleSearch} />
							<ul className="dropdown-menu dropdown-menu-end NavbarSearchDropdown" data-bs-auto-close="outside">
								{(searching ? <div class="spinner-border" role="status">
												<span class="visually-hidden">Loading...</span>
											</div> : 
								(searchResults.professionals.length > 0 || searchResults.activities.length > 0 ? 
									<>
									{searchResults.professionals.map((item, i)=>{
										return (<li className="px-2" key={i}>
											<Link className="text-decoration-none text-dark" to={"/professional/"+item.user_id}>
												<i className="fa-regular fa-user me-2"></i> {item.name + " " + item.surname}
											</Link>
										</li>)
									})}
									{searchResults.activities.map((item, i)=>{
										return (<li className="px-2" key={i}>
											<Link className="text-decoration-none text-dark" to={"/activity/"+item.id}>
												<i className="fa-regular fa-file-lines me-2"></i> {item.name}
											</Link>
										</li>)
									})}
								</>
								
								: <li className="px-2">No se encontraron resultados</li>))}
							</ul>
							{/* <button className="btn btn-light" type="submit"><i className="fa-solid fa-magnifying-glass"></i></button> */}
						</form>
					<div className="d-flex flex-column justify-content-evenly flex-md-row my-2 gap-3">
						{!store.user.id ?
							<div className="d-flex gap-3 w-100">
								<div className="nav-item w-50">
									<button className="btn navbarButton w-100" onClick={()=>{navigate("/login")}}>Login</button>
								</div>
								<div className="nav-item w-50">
									<button className="btn navbarButton text-nowrap w-100" onClick={()=>{navigate("/signup")}}>Sign up</button>
								</div>
							</div> :<>
								<div className="shadow nav-item rounded-pill d-flex NavbarUserPill dropdown" data-bs-toggle="dropdown" aria-expanded="false">
									<img className="rounded-circle" src={store.user.avatar_url} alt=""/>
									<span className="text-white text-capitalize fs-6 fw-semibold ms-2 me-3 align-self-center">{store.user.username}</span>
									
								</div>
								<ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end NavbarDropdown me-3">
									<li><Link className="dropdown-item text-white d-flex justify-content-between" to={"/personalspace/" + store.user.id}>
											<div className="me-3"><i class="fa-solid fa-user fa-sm me-auto"></i></div> <span>Mi espacio personal</span>
										</Link></li>
									{store.user.is_professional ? 
										<li><Link className="dropdown-item text-white d-flex justify-content-between" to={"/professionalspace/" + store.user.id}>
												<div><i class="fa-solid fa-suitcase fa-sm"></i></div> <span>Mis actividades</span>
											</Link></li>
									: <></>}
									<li><Link className="dropdown-item text-white d-flex justify-content-between" to={"/inscriptions/" + store.user.id}>
											<div><i class="fa-solid fa-file-lines fa-sm"></i></div> <span>Mis inscripciones</span>
										</Link></li>
									<li><Link className="dropdown-item text-white d-flex justify-content-between" onClick={()=>{dispatch({type: "closeSession"})}}>
										<div><i class="fa-solid fa-power-off fa-sm"></i></div> <span className="ms-auto">Cerrar sesión</span>
										</Link></li>
								</ul>
							</>
						}
					</div>
				</div>
			</div>
		</nav>
	);
};
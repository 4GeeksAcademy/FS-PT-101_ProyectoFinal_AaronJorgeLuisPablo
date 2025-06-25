import { Link, useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useEffect, useRef, useState } from "react"
import collection from "../services/collection"

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()


	const navigate = useNavigate()

	const [search, setSearch] = useState("")
	const [searchResults, setSearchResults] = useState({ professionals: [], activities: [] })
	const [searching, setSearching] = useState(false)
	const [dropdownOpen, setDropdownOpen] = useState(false)

	const dropRef = useRef(null)

	const handleClickExcursiones = () => {
		if (dropdownOpen) {
			navigate("/activities")
			setDropdownOpen(false)
		}
		else
			setDropdownOpen(true)
	}

	const handleSearch = async (e) => {
		setSearch(e.target.value)
		setSearchResults({ ...searchResults, professionals: [], activities: [] })
	}

	const searchText = async (text) => {
		if (search.length > 2) {
			setSearching(true)
			const data = await collection.search(search)
			setSearchResults({ ...searchResults, professionals: data.professionals, activities: data.activities })
			setSearching(false)
		}
	}
	
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropRef.current && !dropRef.current.contains(event.target))
				setDropdownOpen(false)
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	useEffect(() => { searchText(search) }, [search])

	return (
		<nav className="navbar navbar-expand-lg navbar-light navbg p-0 sticky-top BgSecondary">
			<div className="container-fluid text-white">
				<a className="navbar-brand" href="#">
					<img className="img-fluid logo" src="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721555/Logo_Nomadik_txkiej.png" alt="Logo" />
				</a>

				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse text-center text-lg-start w-100" id="navbarSupportedContent">
					<div className="navbar-nav mb-0 gap-3 w-auto d-flex justify-content-center justify-content-lg-start">
						<Link className="nav-item nav-link active text-white fs-6 fw-semibold navbarLink" to={"/"}>Inicio</Link>
						<div className="nav-item dropdown" ref={dropRef}>
							<a className="nav-link dropdown-toggle text-white fw-semibold navbarLink" onClick={handleClickExcursiones} role="button" data-bs-toggle="dropdown" aria-expanded="false">Excursiones</a>
							<ul className="dropdown-menu dropdown-menu-dark NavbarDropdown text-center text-lg-start">
								<li onClick={() => setDropdownOpen(false)}><Link className="dropdown-item text-white" to="/sport">Deporte</Link></li>
								<li onClick={() => setDropdownOpen(false)}><Link className="dropdown-item text-white" to="/leisure">Ocio</Link></li>
								<li onClick={() => setDropdownOpen(false)}><Link className="dropdown-item text-white" to="/tourism">Turismo</Link></li>
							</ul>
						</div>
						<Link className="nav-item nav-link active text-white fs-6 fw-semibold navbarLink" to={"/nosotros"}>Equipo</Link>
						<Link className="nav-item nav-link active text-white fs-6 fw-semibold navbarLink me-2" to={"/contacto"}>Contacto</Link>
					</div>

					<form className="mx-auto busquedaBarra input-group">
						<input className="form-control dropdown-toggle me-2" role="button" data-bs-toggle="dropdown" aria-expanded="false" type="search" placeholder="Buscar..." aria-label="Search" value={search} onChange={handleSearch} />
						<ul className="dropdown-menu dropdown-menu-center NavbarSearchDropdown my-2 my-lg-0" data-bs-auto-close="outside">
							{(searching ? <div className="text-center">
								<div className="spinner-border mx-auto LoadingSpinner" role="status">
									<span className="visually-hidden">Loading...</span>
								</div>
							</div> :
								(searchResults.professionals.length > 0 || searchResults.activities.length > 0 ?
									<>
										{searchResults.activities.map((item, i) => {
											return (<li className="px-2" key={i}>
												<Link className="text-decoration-none text-dark" to={"/activities/" + item.id}>
													<i className="fa-regular fa-file-lines me-2"></i> {item.name + " (" + item.location + ")"}
												</Link>
											</li>)
										})}
										{searchResults.professionals.map((item, i) => {
											return (<li className="px-2" key={i}>
												<Link className="text-decoration-none text-dark text-capitalize" to={"/professional/" + item.user_id}>
													<i className="fa-solid fa-user-tie me-2"></i> {item.name + " " + item.surname}
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
									<button className="btn navbarButton fw-semibold w-100 ms-md-2" onClick={() => { navigate("/login") }}>Login</button>
								</div>
								<div className="nav-item w-50">
									<button className="btn navbarButton fw-semibold text-nowrap w-100" onClick={() => { navigate("/signup") }}>Sign up</button>
								</div>
							</div> :
							<div className="dropdown w-100">
								<div className="shadow nav-item rounded-pill d-flex NavbarUserPill" data-bs-toggle="dropdown" aria-expanded="false">
									<img className="rounded-circle" src={(store.user.avatar_url ? store.user.avatar_url : "https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721682/0_y2kkuy.jpg")} alt="" />
									<span className="text-white text-capitalize fs-6 fw-semibold ms-2 me-3 align-self-center">{store.user.username}</span>

								</div>
								<ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end NavbarDropdown me-3 mt-3 shadow">
									<li><Link className="dropdown-item text-white d-flex justify-content-between" to="/personalspace/">
										<div className="me-3"><i className="fa-solid fa-user fa-sm me-auto"></i></div> <span className="fw-semibold">Mi espacio personal</span>
									</Link></li>
									{store.user?.is_admin && <li><Link className="dropdown-item text-white d-flex justify-content-between" to="/admin/">
										<div className="me-3"><i className="fa-solid fa-user fa-sm me-auto"></i></div> <span className="fw-semibold">Administración</span>
									</Link></li>}
									<li><Link className="dropdown-item text-white d-flex justify-content-between" onClick={() => {
										dispatch({ type: "closeSession" })
										setTimeout(() => navigate(0), 50)
									}}>
										<div><i className="fa-solid fa-power-off fa-sm"></i></div> <span className="fw-semibold">Cerrar sesión</span>
									</Link></li>
								</ul>
							</div>
						}
					</div>
				</div>
			</div>
		</nav>
	);
};
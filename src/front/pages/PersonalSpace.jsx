import React, { useEffect, useRef, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import { Link, useNavigate, useParams } from "react-router-dom"
import { NewProfessionalBox } from "../components/NewProfessionalBox.jsx";
import { ActivityCard } from "../components/ActivityCard.jsx";
import { CommentBox } from "../components/CommentBox.jsx";
import { UserInscriptions } from "../components/UserInscriptions.jsx";
import { ProfessionalPanel } from "../components/ProfessionalPanel.jsx";

export const PersonalSpace = () => {
	const navigate = useNavigate()
	const { store, dispatch } = useGlobalReducer()
	const [activeTab, setActiveTab] = useState('inscripciones')
	const [favourites, setFavourites] = useState([])

	useEffect(() => {
		if (store.user.id == null)
			navigate("/login")
		else if (store.user.needs_filling == true)
			navigate("/completeuserform")
		else if (store.user.is_professional)
			setActiveTab("professionalPanel")
}, [])

return (
	<div className="container">
		<div className="bg-white shadow my-3 rounded">
			<div className="m-0 p-0 rounded-top shadow overflow-hidden">
				<div className="container-fluid ps-5 BgSecondary ">
					<div className="row pt-3 pt-md-0">
						<div className="col-8 col-md-3 justify-content-center align-content-center mx-auto px-5 px-md-3">
							<img className="shadow img-fluid rounded-circle NoDeformImg my-auto"
								src={(store.user?.avatar_url ? store.user?.avatar_url : "https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721682/0_y2kkuy.jpg")} alt="avatar"
							/>
						</div>
						<div className="col-12 col-md-9 align-items-center align-items-md-start my-3 row">
							<div className="col-12 text-center mb-4">
								<h4 className="text-white fw-bold display-6 text-capitalize name-gradient font1 m-0">
									{store.user?.name + " " + store.user?.surname + (store.user?.is_professional ? " - Usuario profesional" : "")}
								</h4>
							</div>
							<div className="col-12 col-md-11 ms-auto row">
								<div className="col-12 col-md-6">
									<h4 className="text-white fs-5 fw-semibold font1 text-center text-md-start">
										<i className="fa-solid fa-user fa-sm me-2"></i>@{store.user?.username}
									</h4>

									{store.user.NID && (
										<p className="text-light fw-semibold text-center text-md-start">
											<i className="fa-solid fa-id-card me-2"></i> {store.user.NID}
										</p>
									)}

									{store.user.birthdate && (
										<p className="text-light fw-semibold text-center text-md-start">
											<i className="fa-solid fa-cake-candles me-2"></i>{" "}
											{new Date(store.user?.birthdate).toLocaleDateString("es-ES", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</p>
									)}

									{store.user.email && (
										<p className="text-light fw-semibold text-center text-md-start">
											<i className="fa-solid fa-at me-2"></i> {store.user?.email}
										</p>
									)}

									{store.user.telephone && (
										<p className="text-light fw-semibold text-center text-md-start">
											<i className="fa-solid fa-phone me-2"></i> {store.user?.telephone}
										</p>
									)}

									{store.user?.professional?.business_name && (
										<h4 className="text-white fs-5 fw-semibold font1 text-capitalize text-center text-md-start">
											<i className="fa-solid fa-briefcase me-2"></i>
											{store.user?.professional?.business_name}
										</h4>
									)}
								</div>

								<div className="col-12 col-md-6">
									<p className="text-light font1 text-center text-md-start">
										<i className="fa-solid fa-map-location-dot me-2"></i>
										{(store.user?.city || "") + (store.user?.country ? ", " + store.user.country : "")}
									</p>

									<p className="text-light font1 text-center text-md-start">
										<i className="fa-solid fa-house me-2"></i>
										{store.user?.address}
									</p>

									<p className="text-light font1 text-center text-md-start">
										<i className="fa-solid fa-people-group me-2"></i>
										{"Miembro desde " +
											new Date(store.user?.creation_date).toLocaleDateString("es-ES", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
									</p>
									<div className="d-flex justify-content-center justify-content-md-start">
										<button
											type="button"
											className="btn text-white DarkButton mt-2"
											onClick={() => navigate("/edituser")}
										>
											<i className="fa-solid fa-pen-to-square me-2"></i> Editar datos
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<ul className="nav nav-underline d-flex justify-content-evenly mt-4 mx-2">
					{store.user.is_professional && <li className="nav-item">
						<button
							className={`nav-link TextDark ${activeTab === 'professionalPanel' ? 'active' : ''}`}
							onClick={() => setActiveTab('professionalPanel')}
						>
							<i className="fa-solid fa-suitcase me-2"></i>Área profesional
						</button>
					</li>}
					<li className="nav-item">
						<button
							className={`nav-link TextDark ${activeTab === 'inscripciones' ? 'active' : ''}`}
							onClick={() => setActiveTab('inscripciones')}
						>
							<i className="fa-solid fa-book me-2"></i>Inscripciones
						</button>
					</li>
					{/* <li className="nav-item">
						<button
							className={`nav-link TextDark ${activeTab === 'favoritos' ? 'active' : ''}`}
							onClick={() => setActiveTab('favoritos')}
						>
							<i className="fa-solid fa-star me-2"></i>Favoritos
						</button>
					</li> */}
					<li className="nav-item">
						<button
							className={`nav-link TextDark ${activeTab === 'reseñas' ? 'active' : ''}`}
							onClick={() => setActiveTab('reseñas')}
						>
							<i className="fa-solid fa-comments me-2"></i>Reseñas
						</button>
					</li>
				</ul>
				<div className="tab-content PersonalTabContent">
					{activeTab === "professionalPanel" && store.user.is_professional == true &&
						<ProfessionalPanel />
					}
					{activeTab === 'inscripciones' && (
						<UserInscriptions />
					)}

					{/* {activeTab === 'favoritos' && (
						<div className="py-4">
							{store.user.favourites && store.user.favourites.length > 0 ?
								<div className="row d-flex  justify-content-evenly px-4 py-3">
									{favourites?.map((el, i) => {
										return <div key={i} className="col-sm-12 col-md-6 col-lg-4 my-3">
											<ActivityCard activity={el} />
										</div>
									})}
								</div>
								:
								<p className="text-center">No tienes favoritos</p>
							}
						</div>
					)} */}

					{activeTab === 'reseñas' &&
						<div className="py-4">
							{store.user.reviews && store.user.reviews.length > 0 ?
								<div className="row d-flex justify-content-evenly px-4 py-3">
									{store.user.reviews?.map((el, i) => {
										return <div key={i} className="col-sm-12 col-md-6 col-lg-4 my-3">
											<CommentBox target="activity" review={el} />
										</div>
									})}
								</div>
								: (
									<p className="text-center">No has realizado ninguna reseña</p>
								)}

						</div >
					}
				</div >

				<div>

					{store.user.is_professional ? "" : <div className="rounded-bottom overflow-hidden"><NewProfessionalBox /></div>}
				</div>
			</div >
		</div >
	</div >
);
}; 
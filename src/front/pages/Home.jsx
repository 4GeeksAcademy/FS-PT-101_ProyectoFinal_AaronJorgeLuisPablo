import React, { useEffect, useState } from "react"
import { NewProfessionalBox } from "../components/NewProfessionalBox.jsx"
import collection from "../services/collection"
import { ActivityCard } from "../components/ActivityCard.jsx"
import { Link, useNavigate } from "react-router-dom"
import { CommentBox } from "../components/CommentBox.jsx"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"

export const Home = () => {
	const { store, dispatch } = useGlobalReducer()
	const [activities, setActivities] = useState([])
	const [reviews, setReviews] = useState([])
	const navigate = useNavigate()

	const loadActivities = async () => {
		const resp = await collection.returnActivities()
		setActivities(shuffle(resp?.filter((item) => item.is_active && !item.is_finished)))
	}

	const loadReviews = async () => {
		const resp = await collection.getReviews()
		setReviews(resp)
	}

	const shuffle = (input) => {
		for (let i = input.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[input[i], input[j]] = [input[j], input[i]];
		}
		return input;
	};

	useEffect(() => {
		loadActivities()
		loadReviews()
	}, [])

	return (
		<div className="container-fluid p-0">
			<div id="homeCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
				<div className="carousel-indicators">
					<button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
					<button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
					<button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
				</div>
				<div className="carousel-inner HomeCar">
					<div className="carousel-item active HomeCarSlide" data-bs-interval="9000">
						<div className="carousel-caption d-block">
							<h5>Vive experiencias inolvidables</h5>
							<p className="w-50 mx-auto">Descubre y vive experiencias únicas, únete a la comunidad donde cada evento es una nueva historia.</p>
						</div>
					</div>
					<div className="carousel-item HomeCarSlide" data-bs-interval="9000">
						<div className="carousel-caption d-block">
							<h5>Conoce gente haciendo lo que más te gusta</h5>
							<p className="w-50 mx-auto">Ya sea una escapada al aire libre, una clase creativa o un tour por la ciudad, aquí encontrarás momentos para disfrutar y nuevas amistades por descubrir.</p>
						</div>
					</div>
					<div className="carousel-item HomeCarSlide" data-bs-interval="9000">
						<div className="carousel-caption d-block">
							<h5>Recuerda valorar el servicio</h5>
							<p className="w-50 mx-auto">Tanto nosotros como los profesionales que depositan su confianza en nuestro servicio agradecemos vuestras valoraciones.</p>
						</div>
					</div>
				</div>
				<button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>
			<div className="container mb-2">
				<div className="bg-white rounded-end overflow-hidden">
					<h1 className="font1 pt-5 pb-3 text-center">Algunas de nuestras actividades</h1>
					{activities.length > 0 ?
						<div className="row row-cols-md-3 mx-2">
							{(activities.filter((item, index) => index < 9).map((item, index, arr) =>
								<div key={index} className={"col-12 col-md-6 col-lg-4 mt-2 p-3" + (index == (arr.length - 1) && index % 2 == 0 ? " d-block d-md-none d-lg-block" : "")}>
									<ActivityCard activity={item} />
								</div>
							))}
							<Link className="mx-auto my-auto col-3 btn w-auto text-decoration-none text-dark fw-semibold fs-4" to="/activities">Ver más</Link>
						</div>
						: <div className="text-center">
							<div className="spinner-grow LoadingSpinner" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>}

					{!store.user.id && <div className="p-0 NewSignUpBanner" onClick={() => navigate("/signup")}>
						<p className="text-white fs-2 font1 col-12 col-md-6 text-center text-md-start">¡No pierdas el tiempo!<br />Crea ya tu cuenta de forma gratuita y empieza a ser parte de esto<br />Haz click aquí</p>
					</div>}

					<h1 className="font1 pt-5 text-center">Algunos clientes satisfechos</h1>
					{reviews?.length > 0 ?
						<div className="row row-cols-md-3 mx-2 pb-5">
							{reviews.filter((item) => item.activity_rating != null && item.activity_message != "").sort((a, b) => a.activity_rating - b.activity_rating).filter((item, index) => index < 6).map((item, index, arr) =>
								<div key={index} className={"col-12 col-md-6 col-lg-4 my-2" + (index == (arr.length - 1) && index % 2 != 0 ? " d-block d-md-none d-lg-block" : "")}>
									<CommentBox target="activity" review={item} />
								</div>)}
						</div>
						: <div className="text-center">
							<div className="spinner-grow LoadingSpinner" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>}
					{!store.user.is_professional && <NewProfessionalBox />}
				</div>
			</div>
		</div>
	);
};

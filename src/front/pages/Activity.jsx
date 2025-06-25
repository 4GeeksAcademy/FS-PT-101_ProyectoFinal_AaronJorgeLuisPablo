import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import collection from "../services/collection"
import CommentBox from "../components/CommentBox"
import Inputmask from 'inputmask';
import Cleave from 'cleave.js/react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ModalReport } from "../components/ModalReport"
import StarRating from "../components/StarRating"

export const Activity = () => {
    const [activity, setActivity] = useState(null)
    const stripe = useStripe()
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [paymentError, setPaymentError] = useState("");
    const [paymentResponse, setPaymentResponse] = useState({ message: "", error: true })
    const [cardHolder, setCardHolder] = useState("")
    const [errorHolder, setErrorHolder] = useState("")
    const [counter1, setCounter1] = useState(0)
    const [reviewLimit, setReviewLimit] = useState(6)

    const params = useParams()
    const navigate = useNavigate()
    const { store, dispatch } = useGlobalReducer()

    const GOOGLE_MAPS_API = import.meta.env.VITE_GOOGLE_MAPS_API

    function parseDate(date) {
        const utcDate1 = new Date(date);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return utcDate1.toLocaleString("es-ES", options)
    }

    function parseFullDate(date) {
        const utcDate1 = new Date(date);
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        let fulldate = utcDate1.toLocaleString("es-ES", options)
        return fulldate.charAt(0).toUpperCase() + fulldate.slice(1)
    }

    function parseTime(date) {
        const utcDate1 = new Date(date);
        const options = {
            hour: "numeric",
            minute: "numeric"
        };
        return utcDate1.toLocaleString("es-ES", options)

    }

    function handleClickMore1(counter) {
        if (counter >= 0 && counter < (activity?.info_activity?.media.length - 1)) {
            let contador1 = counter
            contador1++
            setCounter1(contador1)
        }
    }

    function handleClickLess1(counter) {
        if (counter > 0) {
            let contador1 = counter
            contador1--
            setCounter1(contador1)
        }
    }

    function returnType() {
        let type = ""
        if (activity?.info_activity?.type === "SPORT") {
            type = "Deportiva"
        }
        else if (activity?.info_activity?.type === "TOURISM") {
            type = "Turística"
        }
        else if (activity?.info_activity?.type === "LEISURE") {
            type = "Lúdica"
        }
        return type
    }

    const favItem = async () => {
        const resp = await collection.createFav(activity?.info_activity.id)
        if (resp.success) {
            setTimeout(() => dispatch({ type: "loadUser", payload: resp.user }), 200)
        }
    }

    const delItem = async () => {
        const resp = await collection.deleteFav(activity?.info_activity.id)
        if (resp.success) {
            setTimeout(() => dispatch({ type: "loadUser", payload: resp.user }), 200)
        }
    }

    const loadActivity = async () => {
        const resp = await collection.returnActivity(params.id)
        setActivity(resp)
        dispatch({ type: 'activity', payload: resp })
    }


    async function handleSubmit(e) {
        e.preventDefault();
        setPaymentError("");
        setLoading(true);

        const amount = Math.round(activity?.price * 100);

        const { clientSecret, error: backendError } = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({ amount: amount, activity_id: activity?.id })
        }).then(r => r.json());

        if (backendError) {
            setPaymentResponse({ message: backendError, error: true });
            setLoading(false);
            return;
        }

        const card = elements.getElement(CardElement);
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card, billing_details: { name: cardHolder } }
        });

        if (result.error) {
            setPaymentResponse({ message: result.error.message, error: true });
        } else if (result.paymentIntent.status === 'succeeded') {
            setPaymentResponse({ message: "Pago realizado con éxito", error: false })
            resetValues()
            setTimeout(() => navigate(0), 2000)
        }

        setLoading(false);
    }

    function resetValues() {
        setCardHolder("")
    }


    useEffect(() => {
        loadActivity()
        const scrollContainer3 = document.querySelector('.scroll3');

        scrollContainer3.addEventListener('wheel', (e) => {
            e.preventDefault();
            scrollContainer3.scrollLeft += e.deltaY;
        });
    }, [params.id])


    return (
        <div className="p-0 container bg-white my-5 rounded myActivityCard row fontFamily overflow-hidden">
            <div className="col-12 col-lg-8 order-1">
                <div className="d-flex align-items-center pt-3">
                    <h2 className="font1 ps-5 pe-1 mt-2">{activity?.info_activity?.name}</h2>
                    <div className="ms-auto me-3">
                        {store.user.id != null && (
                            store.user?.favourites?.map((item) => item.activity.id).includes(parseInt(activity?.info_activity.id)) ?
                                <button className="btn FavButton" onClick={(e) => {
                                    e.stopPropagation();
                                    if (store.user.needs_filling === true) navigate("/completeuserform");
                                    else delItem();
                                }}>
                                    <img src="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721658/heart-full_lwj5lu.svg" alt="" />
                                </button>
                                :
                                <button className="btn FavButton" onClick={(e) => {
                                    e.stopPropagation();
                                    if (store.user.needs_filling === true) navigate("/completeuserform");
                                    else favItem();
                                }}>
                                    <img src="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721657/heart-empty_myfvgl.svg" alt="" />
                                </button>
                        )}
                    </div>
                </div>
                <h5 className="font1 px-5 mt-2">{activity?.info_activity?.location}</h5>

                <p className="activityTextFormat mt-3 mx-0 px-5">{activity?.info_activity?.desc}</p>
                <ModalReport target={"activity"} activity={activity} />

                {/* Modal de pago */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Formulario de pago</h1>
                                <i className="fa-brands fa-cc-stripe mx-3 display-6"></i>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mt-3">
                                        <label className="col-form-label">Detalles de tarjeta:</label>
                                        <div className="form-control">
                                            <CardElement options={{
                                                style: {
                                                    base: {
                                                        fontSize: '16px',
                                                        color: '#424770',
                                                        '::placeholder': { color: '#aab7c4' }
                                                    },
                                                    invalid: { color: '#9e2146' }
                                                }
                                            }} />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="col-form-label">Nombre del titular:</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={cardHolder}
                                            required
                                            maxLength={35}
                                            placeholder="Ingresa tu nombre"
                                            onChange={(e) => setCardHolder(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                                        />
                                        {errorHolder && <p className="fixingErrorsForm">{errorHolder}</p>}
                                    </div>
                                    <p className={"text-center " + (paymentResponse.error ? "text-danger" : "text-success")}>{paymentResponse.message}</p>

                                    <div className="modal-footer">
                                        <button type="button" onClick={resetValues} className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                        <button type="submit" className="btn btn-success" disabled={!stripe || loading}>
                                            {loading ? 'Procesando...' : 'Pagar'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Galería escritorio */}
                <div className="d-none d-md-block">
                    <div className="d-flex justify-content-around gap-3">
                        <button className="buttonStyle rounded-circle ms-3 me-auto" onClick={() => handleClickLess1(counter1)}><i className="fa-solid fa-arrow-left"></i></button>
                        <div className="d-flex justify-content-center w-100">
                            <img className="px-1 MediaActivity rounded-4" src={!activity?.info_activity?.media[counter1] ? "https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721672/0_gf4vc4.jpg" : activity?.info_activity?.media[counter1]} />
                        </div>
                        <button className="buttonStyle rounded-circle me-3 ms-auto" onClick={() => handleClickMore1(counter1)}><i className="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>

                {/* Galería móvil */}
                <div className="d-flex overflow-auto gap-3 p-3 scroll-horizontal scroll3 d-block d-md-none">
                    {activity?.info_activity?.media.map((item, i) => (
                        <img className="MediaActivity" key={i} src={item} />
                    ))}
                </div>

                {activity?.info_activity.reviews.length > 0 ? <>
                    <h3 className="px-5 pt-5">Reseñas</h3>
                    <div className="mx-3 row mb-4">
                        {activity?.info_activity?.reviews?.filter((item, index) => index < 2)
                            .filter((item, index) => index < reviewLimit)
                            .map((item, index) =>
                                <div key={index} className={"col-12 col-md-6 my-2 "}>
                                    <CommentBox target="activity" review={item} />
                                </div>
                            )}
                    </div>
                    {reviewLimit < activity?.info_activity.reviews.length &&
                        <div className="w-100 row mb-3">
                            <button className="mx-auto btn text-decoration-none text-dark fw-semibold border-white" onClick={() => setReviewLimit(limit + 6)}>
                                Ver más
                            </button>
                        </div>
                    }
                </>
                    :
                    <h4 className="px-5 pt-5 TextDark">No hay reseñas para esta actividad</h4>
                }

            </div>

            {/* Panel de detalles y mapa */}
            <div className="col-12 col-lg-4 order-2 BgPrimary fw-semibold">
                <div className="d-flex align-items-center mt-3 mx-auto">
                    <p className="my-auto text-nowrap w-100 me-2 text-center font3 fw-semibold rounded">Actividad {returnType()}</p>
                    {!store.user?.inscriptions?.map((item) => item.activity_id).includes(activity?.id) ? (
                        store.user.id != null ?
                            <button type="button" className="ms-auto btn BuyButton align-self-center fw-semibold d-flex" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Inscribirse <img src="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721657/shopping-cart_hpzadi.svg" width="22" height="22" alt="" />
                            </button>
                            :
                            <button type="button" onClick={() => navigate("/signup")} className="ms-auto btn BuyButton align-self-center fw-semibold d-flex">
                                Inscribirse <img src="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721657/shopping-cart_hpzadi.svg" width="22" height="22" alt="" />
                            </button>
                    ) : (
                        <button type="button" className="ms-auto btn BuyButtonDisabled align-self-center fw-semibold text-nowrap" onClick={()=>navigate("/personalspace")}>
                            Ya inscrito
                        </button>
                    )}
                </div>

                <div className="d-flex mx-auto">
                    <p className="mt-3 font2 py-1 px-2 rounded">Publicado</p>
                    <p className="mt-3 font2 ms-2 w-100 text-center py-1 rounded">{parseFullDate(activity?.creation_date)}</p>
                </div>

                <div className="rounded mx-auto d-flex overflow-hidden font2 ProfCard BgBackground" onClick={() => navigate("/detailsprofessional/" + activity?.info_activity.professional.id)}>
                    <div className="proActivityPhoto">
                        <img className="imgProfessionalAct rounded" src={activity?.info_activity?.professional?.user?.avatar_url} />
                    </div>
                    <div className="proActivityName ps-3 py-1 d-flex flex-column justify-content-evenly TextDark">
                        <p className="m-0 fw-semibold rounded text-truncate">{activity?.info_activity?.professional?.user?.name} {activity?.info_activity?.professional?.user?.surname}</p>
                        <p className="m-0 fw-medium text-truncate">{activity?.info_activity.professional.type != "BUSINESS" ? "Profesional autónomo" : "Empresa: " + activity?.info_activity.professional.business_name}</p>
                        <StarRating rating={activity?.info_activity.professional.rating} variable={false} className="fs-6" />
                    </div>
                </div>

                <div className="d-flex mx-auto row mt-3">
                    <p className="col-2 font2 p-1 rounded me-auto text-center">Inicio</p>
                    <p className="col-7 font2 p-1 rounded mx-auto text-center">{parseDate(activity?.start_date)}</p>
                    <p className="col-2 font2 p-1 rounded ms-auto text-center">{parseTime(activity?.start_date)}</p>

                    <p className="col-2 font2 p-1 rounded me-auto text-center">Fin</p>
                    <p className="col-7 font2 p-1 rounded mx-auto text-center">{parseDate(activity?.end_date)}</p>
                    <p className="col-2 font2 p-1 rounded ms-auto text-center">{parseTime(activity?.end_date)}</p>
                </div>

                <div className="row mt-0 mx-auto">
                    <p className="text-center col-7 font2 p-1 me-auto rounded">Precio</p>
                    <p className="text-center col-4 font2 p-1 rounded">{activity?.price.toFixed(2)}€</p>
                </div>
                <div className="row mt-0 mx-auto">
                    <p className="text-center col-7 font2 me-auto p-1 rounded">Plazas Ocupadas</p>
                    <p className="text-center col-4 font2 ms-auto p-1 rounded d-flex justify-content-evenly"><span>{activity?.slots_taken}</span> / <span>{activity?.slots}</span></p>
                </div>

                <div className="containerMap p-0 mt-0 mb-5 mx-auto">
                    <p className="font2 p-1 rounded text-center">Punto de encuentro</p>
                    <iframe className="theMap rounded"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        referrerPolicy="no-referrer-when-downgrade"
                        src={"https://www.google.com/maps/embed/v1/place?key=" + GOOGLE_MAPS_API + "&q=" + activity?.meeting_point}
                        allowFullScreen>
                    </iframe>
                    <p className="font2 p-1 mt-1 rounded text-center">{activity?.meeting_point}</p>
                    {store.user.id != null &&
                        <button type="button" className="text-white ms-auto btn BuyButton align-self-center fw-semibold d-flex bg-danger" data-bs-toggle="modal" data-bs-target="#reportModal">
                            Reportar  <svg className="ms-2" fill="#ffffff" width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m22.7 17.5-8.1-14c-.8-1.4-2.7-1.9-4.1-1.1-.5.3-.9.7-1.1 1.1l-8.1 14c-.8 1.4-.3 3.3 1.1 4.1.5.3 1 .4 1.5.4H20c1.7 0 3-1.4 3-3 .1-.6-.1-1.1-.3-1.5M12 18c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1m1-5c0 .6-.4 1-1 1s-1-.4-1-1V9c0-.6.4-1 1-1s1 .4 1 1z"/></svg>
                        </button>
                    }
                </div>
            </div>

        </div>
    )
}
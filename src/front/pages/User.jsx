import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import collection from "../services/collection"
import useGlobalReducer, { StoreProvider } from "../hooks/useGlobalReducer.jsx"

export const User = () => {

    function parseDate(date) {

        const utcDate1 = new Date(date);
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",

        };

        return utcDate1.toLocaleString("es-ES", options)
    }
    function parseGender(gender) {

        if (gender == "MALE") {
            return "Hombre"
        }
        else if (gender == "FEMALE") {
            return "Mujer"
        }
        else if (gender == "NOT_TELLING") {
            return "NS/NC"
        }
    }

    const [user, setUser] = useState(null)

    const { store, dispatch } = useGlobalReducer()

    const params = useParams()
    const chosen = Number(params.id)
    const navigate = useNavigate()

    useEffect(() => {
        collection.returnAllUsers().then(data => {
            dispatch({ type: 'users', payload: data })

            const foundUser = data.find((item) => item.id === chosen)
            setUser(foundUser)
        })

    }, [])



    async function handleSubmit(e) {
        e.preventDefault()

        collection.deleteUser(user.id)

        setTimeout(() => {

        }, "1000");

        navigate("/admin")

    }


    if (!user) {
        return (
            <div className="container my-5">
                <p className="text-center">Cargando usuario...</p>
            </div>
        )
    }

    return (
        <div className="container rounded-end rounded fontFamily bg-white my-5 p-0">
            <h1 className="p-3">{user.username}</h1>
            <hr className="mx-3"></hr>
            <div className="d-flex p-3">
                <img src={"/public/avatar/" + user.avatar_url}></img>
                <div>
                    <p className="mx-3"><strong>Nombre completo: </strong>{user.name} {user.surname}</p>
                    <p className="mx-3"><strong>Género: </strong>{parseGender(user.gender)}</p>
                    <p className="mx-3"><strong>País: </strong>{user.country}</p>
                    <p className="mx-3"><strong>Ciudad: </strong>{user.city}</p>
                    <p className="mx-3"><strong>Dirección: </strong>{user.address}</p>
                    <p className="mx-3"><strong>Fecha de nacimiento: </strong>{parseDate(user.birthdate)}</p>
                    <p className="mx-3"><strong>Correo: </strong>{user.email}</p>
                    <p className="mx-3"><strong>Teléfono: </strong>{user.telephone}</p>
                </div>
            </div>
            <hr className="mx-3"></hr>
            <h2 className="p-3">Actividades favoritas</h2>
            {user.favourites?.length > 0 ? (
                user.favourites.map((item, i) => (
                    <div className="mx-3">
                        <Link className="linkUserActivity text-decoration-none"
                            to={i > 0 ? "/activities/" + (item.activity.id + 1) : "/activities/" + item.activity.id}
                            key={i}>
                            <span>
                                {item.activity.name}
                            </span>

                        </Link>
                    </div>
                ))
            ) : (
                <p>Este usuario no tiene actividades favoritas</p>
            )
            }
            {user.is_professional == true &&

                <div className="p-3">
                    <hr></hr>
                    <h2>Cuadro de profesional</h2>
                    <p className="mt-3"><strong>Biografía: </strong>{user.professional?.bio}</p>
                    <p><strong>Nombre del negocio: </strong>{user.professional?.business_name}</p>
                    <p><strong>Tipo de negocio: </strong>{user.professional?.type}</p>
                    <p><strong>Dirección de facturación: </strong>{user.professional?.tax_address}</p>
                    <p><strong>Calificación media: </strong>{user.professional?.rating}</p>
                    <p>
                        <strong>Actividades generadas: </strong>
                        {user.professional?.info_activities?.length > 0
                            ? user.professional.info_activities.map((item, i) => (
                                <Link className="linkUserActivity text-decoration-none"
                                    to={i > 0 ? "/activities/" + (item.id + 1) : "/activities/" + item.id}
                                    key={i}><span key={i}>{item.name}{i < user.professional.info_activities.length - 1 ? ', ' : ''}</span>
                                    </Link>
                                    ))
                            : "Este usuario no tiene actividades generadas"}
                                </p>
                </div>
            }
            <div className="d-flex justify-content-center m-3">
                <button className="btn btn-danger p-2" onClick={handleSubmit}>Borrar usuario</button>
            </div>

        </div>
    )

}
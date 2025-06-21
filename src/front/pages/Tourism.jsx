import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { ActivityCard } from "../components/ActivityCard"
import collection from "../services/collection"
import { Link } from "react-router-dom";

export const Tourism = () => {
    const { store, dispatch } = useGlobalReducer()
    const [active, setActive] = useState([])

    function returnCounter(fecha) {
        var fechaEnMiliseg = Date.now();
        var fechaActual = new Date(fechaEnMiliseg)
        var resultado = new Date(fecha) - fechaActual
        var diferencia = resultado / (86400000)
        var dias = Math.floor(diferencia)
        var horas = Math.floor((diferencia - dias) * 24)
        if (dias == 0) {
            return (horas > 1 ? `Faltan ${horas} horas` : `Falta ${horas}  hora`)
        }
        else {
            return (dias > 1 ? `Faltan ${dias}  días` : `Falta  ${dias}  día`) + (horas > 1 ? ` y  ${horas}  horas` : ` y  ${horas}  hora`)
        }
    }

    const loadActivities = async () => {
        try {
            const resp = await collection.returnActivities()
            dispatch({ type: 'activities', payload: resp })
            setActive(resp.filter((item)=>item.is_active && !item.is_finished && item.info_activity.type == "TOURISM")) 
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        loadActivities()
    }, [])

    return (
        <div className="pb-5 container bg-white my-5 rounded myActivityCard fontFamily">
            <h1 className="font1 p-5 text-center">Actividad más valorada</h1>
            <div className="row justify-content-around">
                {active?.sort((a,b)=>b.info_activity.rating - a.info_activity.rating).filter((item,index) => index < 3).map((activity, i) => <Link key={i} className="text-decoration-none valor-card2 col-lg-4 col-md-6 col-sm-12 mt-4" to={'/activities/' + activity.id}><ActivityCard className="mw-100" img={activity.info_activity.media[0]} title={activity.info_activity.name} origin={activity.meeting_point} description={activity.info_activity.desc.slice(0, 40)}  timeleft={returnCounter(activity.start_date)}></ActivityCard></Link>)}
            </div>
            <h1 className="font1 p-5 mt-5 text-center">Actividades turísticas activas</h1>

            <div className="row justify-content-around">
                {active?.map((activity, i) => <Link key={i} className="text-decoration-none valor-card2 col-lg-4 col-md-6 col-sm-12 mt-4" to={'/activities/' + activity.id}><ActivityCard className="mw-100" img={activity.info_activity.media[0]} title={activity.info_activity.name} origin={activity.meeting_point} description={activity.info_activity.desc.slice(0, 40)} timeleft={returnCounter(activity.start_date)}></ActivityCard></Link>)}
            </div>
        </div>
    )
}

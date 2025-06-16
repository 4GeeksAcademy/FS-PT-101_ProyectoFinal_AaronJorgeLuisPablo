import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { ActivityCard } from "../components/ActivityCard"
import collection from "../services/collection"
import { Link } from "react-router-dom";

export const Activities = () => {



const {store, dispatch} = useGlobalReducer()

let counter1 = 0
let counter2 = 1
let counter3 = 2

useEffect(()=>{

    collection.returnActivities().then(data=>dispatch({type: 'activities', payload: data}))
    

},[])

useEffect(()=>{

    console.log(store.all_activities)
    

},[store])


function returnActive(){

    let newArray = []

    for(let i = 0; i<store.all_activities.length;i++){

        if(store.all_activities[i].is_finished==false){
            
            newArray.push(store.all_activities[i])

        }
    }
    
    return newArray
}


return(

    <div className="pb-5 backgroundBody">

        <img src="src/front/assets/img/Landscape.jpg" className="fixLandscape"></img>

        <h1 className="font1 p-5 text-center">Actividades por tipo</h1>

        <div className="d-flex justify-content-around">

           <Link className="text-decoration-none valor-card2"  to={'/activities/sport'}><ActivityCard img={"src/front/assets/img/Padel.webp"} title={"Actividades deportivas"} description={"Apúntate a diversas actividades deportivas para mantenerte sano y en forma"}></ActivityCard></Link>
           

           <Link className="text-decoration-none valor-card2" to={'/activities/tourism'}><ActivityCard img={"src/front/assets/img/Ruinas.jpeg"} title={"Actividades turísticas"} description={"Recorre el mundo descubriendo nuevas ubicaciones con un encanto exótico"}></ActivityCard></Link>


           <Link className="text-decoration-none valor-card2" to={'/activities/leisure'}><ActivityCard img={"src/front/assets/img/Poker.webp"} title={"Actividades recreativas"} description={"No te quedes sin sitio en nuestras actividades recreativas donde puedes pasar un buen rato"}></ActivityCard></Link>

        </div>


        <h1 className="font1 p-5 mt-5 text-center">Excursiones</h1>

        <div className="d-flex justify-content-around">

            <button className="buttonStyle rounded-circle"><i class="fa-solid fa-arrow-left"></i></button>

           <Link className="text-decoration-none valor-card2"  to={'/activities/' + store.all_activities[counter1]?.id}><ActivityCard img={store.all_activities[counter1]?.info_activity.media[0]} title={store.all_activities[counter1]?.info_activity.name} origin={store.all_activities[counter1]?.meeting_point} description={store.all_activities[counter1]?.info_activity.desc.slice(0,100)}></ActivityCard></Link>

           <Link className="text-decoration-none valor-card2"  to={'/activities/' + store.all_activities[counter2]?.id}> <ActivityCard img={store.all_activities[counter2]?.info_activity.media[0]} title={store.all_activities[counter2]?.info_activity.name} origin={store.all_activities[counter2]?.meeting_point} description={store.all_activities[counter2]?.info_activity.desc.slice(0,100)}></ActivityCard></Link>

           <Link className="text-decoration-none valor-card2"  to={'/activities/' + store.all_activities[counter3]?.id}><ActivityCard img={store.all_activities[counter3]?.info_activity.media[0]} title={store.all_activities[counter3]?.info_activity.name} origin={store.all_activities[counter3]?.meeting_point} description={store.all_activities[counter3]?.info_activity.desc.slice(0,100)}></ActivityCard></Link>

            <button className="buttonStyle rounded-circle"><i class="fa-solid fa-arrow-right"></i></button>

        </div>

        <h1 className="font1 p-5 mt-5 text-center">Actividades de ocasión</h1>

        <div className="d-flex justify-content-around">

            <button className="buttonStyle rounded-circle"><i class="fa-solid fa-arrow-left"></i></button>

            <Link className="text-decoration-none valor-card2"  to={'/activities/' + returnActive()[counter1]?.id}><ActivityCard img={returnActive()[counter1]?.info_activity.media[0]} title={returnActive()[counter1]?.info_activity.name} origin={returnActive()[counter1]?.meeting_point} description={returnActive()[counter1]?.info_activity.desc.slice(0,100)} timeleft={"Faltan 3 horas"}></ActivityCard></Link>

            <Link className="text-decoration-none valor-card2"  to={'/activities/' + returnActive()[counter2]?.id}><ActivityCard img={returnActive()[counter2]?.info_activity.media[0]} title={returnActive()[counter2]?.info_activity.name} origin={returnActive()[counter2]?.meeting_point} description={returnActive()[counter2]?.info_activity.desc.slice(0,100)} timeleft={"Faltan 15 horas"}></ActivityCard></Link>

            <Link className="text-decoration-none valor-card2"  to={'/activities/' + returnActive()[counter3]?.id}><ActivityCard img={returnActive()[counter3]?.info_activity.media[0]} title={returnActive()[counter3]?.info_activity.name} origin={returnActive()[counter3]?.meeting_point} description={returnActive()[counter3]?.info_activity.desc.slice(0,100)} timeleft={"Faltan 2 días"}></ActivityCard></Link>
            
            <button className="buttonStyle rounded-circle"><i class="fa-solid fa-arrow-right"></i></button>

        </div>
    </div>

)




}
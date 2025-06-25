import React, { useEffect, useState } from 'react';
import { CommentBox } from "../components/CommentBox"
import { useParams } from 'react-router-dom';
import collection from '../services/collection';
import { ActivityCard } from '../components/ActivityCard';
import useGlobalReducer from '../hooks/useGlobalReducer';

export const DetailsProfessional = () => {
    const { id } = useParams();

    const {store,dispatch} = useGlobalReducer()
    const [professional, setProfessional] = useState(null);

    useEffect(() => {

        collection.getProfessionalDetails(id).then(data => {
            setProfessional(data)
        })

    }, [])
    if (!professional) return <h1>loading...</h1>

    return (
        <div className="container details mt-3 p-0 d-flex flex-column mb-3">
            <div className="profile d-flex justify-content-around">
                <img className="imagen" src={professional.user.avatar_url} />
                <div className="professional p-0">
                    <h3>{professional.user.name + " " + professional.user.surname}</h3>
                    <h6>{professional.user.creation_date}</h6>
                    <h2 className="stars">★★★★★</h2>
                </div>
                <div>
                    <h5 className="float-end"><strong>Contacto</strong></h5>
                    <p>{professional.user.email}</p>
                    <p>{professional.user.telephone}</p>
                </div>
            </div>
            <div className="biography m-5">
                <h5><strong>Sobre mi</strong></h5>
                <p>
                    {professional.bio}
                </p>
            </div>

            <div className="container text-center activities">
                <h3 className="d-flex justify-content-start m-3">{professional.business_name}</h3>
                <div className="row g-4">

                    {
                        store.all_activities?.filter((item)=>item.info_activity.professional.id == professional.id).map((activity) => (
                            <div  key={activity.id} className="col-12 col-md-6 col-lg-4">
                                <ActivityCard activity={activity}/>
                            </div>
                        ))
                    }
                    <h6 className="more m-4">ver mas</h6>

                </div>
            </div>
            <div className="commnetBox m-5">
                <h3 className="m-3">Comentarios de otros Usuarios</h3>
                {
                    professional.reviews.map((review) => (
                        <CommentBox key={review.id}
                            rating={review.professional_rating}
                            titulo={review.info_activity.name}
                            comment={review.activity_message}
                            img={review.user.avatar_url}
                            Reviewer_Name={review.user.name + " " + review.user.surname}
                            Date={review.creation_date.replace(" ","")}
                        />
                    ))
                }
                <h6 className="more m-4">ver mas</h6>
            </div>
            <div className="d-flex justify-content-end m-5"><button type="button" className="btn btn-danger report ">Report</button></div>
        </div>
    );
}




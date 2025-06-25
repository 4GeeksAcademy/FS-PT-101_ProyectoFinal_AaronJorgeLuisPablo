import React from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import StarRating from './StarRating'
import { Link } from 'react-router-dom';

export const CommentBox = (props) => {
  const { store, dispatch } = useGlobalReducer();
  return (props.review ?
    <div className="comentario-card mt-3 shadow h-100">
      <div className="contenido">
        <div className="estrellas">
        </div>
        <Link className="d-flex text-decoration-none TextDark fw-semibold">
          <h5 className='fw-semibold'>{props.review.info_activity.name}</h5>
        </Link>
        <div className='d-flex'>
          <StarRating rating={props.review.activity_rating || 0} variable={false} />
          <Link className="ms-auto text-nowrap me-2 d-flex text-decoration-none TextDark fw-semibold" to={"/detailsprofessional/" + props.review.professional.id}>
            <i className="fa-solid fa-user-tie me-2"></i> <h6 className='fw-semibold text-capitalize'>{props.review.professional.username}</h6>
          </Link>
        </div>
        <div className='mb-auto'>
          <p className='commentMessage'>
            {props.review.activity_message}
          </p>
        </div>
        <div className="autor-info mt-auto">
          <img src={props.review.user.avatar_url} alt="avatar" className="avatar" />
          <div>
            <div className="nombre ms-2">{props.review.user.username}</div>
            <div className="fecha ms-2">{props.review.creation_date.split("T")[0]}</div>
          </div>
        </div>
      </div>
    </div>
    :
    <div className="comentario-card mt-3">
      <div className="contenido">
        <div className="estrellas">
          ★★★★★<h1>{props.rating}</h1>
        </div>
        <h4>{props.titulo}</h4>
        <p>
          {props.comment}
        </p>
        <div className="autor-info">
          <img src={props.img} alt="avatar" className="avatar" />
          <div>
            <div className="nombre m-2">{props.Reviewer_Name}</div>
            <div className="fecha m-2">{props.Date.replace(" ", "")}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentBox
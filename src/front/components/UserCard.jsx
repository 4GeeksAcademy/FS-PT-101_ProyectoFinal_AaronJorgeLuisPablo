export const UserCard = (props) => {



    
    return (
        <div className="card p-3 fontFamily col-lg-6 col-md-12 col-sm-12">
            <div className="d-flex">
                <img className="rounded-circle" src={props.avatar}></img>
                <h3 className="alignUserTitle mx-5">{props.username}</h3>
            </div>
            <div className="p-3 m-3">
                <p><strong>Nombre completo:</strong> {props.name} {props.surname}</p>
                <p><strong>Email:</strong> {props.email}</p>
                {props.is_professional == true &&
                    <p><strong>Nombre de la empresa:</strong> {props.business}<br></br><strong>Calificación:</strong> {props.rating}<br></br><strong>Tipo de negocio:</strong> {props.type}</p>
                }
                <button className="btn reportButtonFormat p-2" onClick={props.navigate}>Ir al perfil del usuario</button>
            </div>

        </div>
    )
}
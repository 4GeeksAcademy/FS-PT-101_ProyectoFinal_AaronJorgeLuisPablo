import React from "react";
import { Link } from "react-router-dom";


export const VisionMision = () => {

    return (
        <>
            <div className="container bg-light mb-5">
                <div className="row mt-5 p-lg-0 px-4">
                    <div className="col-sm-12 col-md-6 col-lg-7">
                        <h2 className="mt-5 ms-lg-5 fw-bold seccion-titulo"><i className="fa-solid fa-handshake me-3"></i>Mision</h2>
                        <p className="justified-text ms-lg-5">
                            En Nomadik, nuestra misión es inspirar y conectar a las personas con la naturaleza a través de experiencias deportivas, turísticas y recreativas que promuevan el bienestar, la aventura y el respeto por el entorno.
                        </p>
                        <p className="justified-text ms-lg-5">
                            Diseñamos rutas únicas que fomentan el descubrimiento, el compañerismo y el crecimiento personal, siempre con un enfoque sostenible y humano.
                        </p>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-5">
                        <img className="img-fluid logo-img w-50 mx-auto ms-lg-6" src="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721556/senderista1_rfli4d.png" alt="senderista" />
                    </div>
                </div>

                <div className="text-center my-5">
                    <hr className="w-50 mx-auto separador" />
                </div>

                <div className="row mt-5 p-lg-0 px-4">
                    <div className="col-sm-12 col-md-6 col-lg-6 order-1 order-md-2">
                        <div className="text-end me-lg-5">
                            <h2 className="mt-5 fw-bold seccion-titulo" >Visión<i className="fa-solid fa-eye ms-3"></i></h2>
                        </div>
                        <p className="justified-text text-end me-lg-5" >
                            Ser una comunidad líder en experiencias deportivas y turísticas que transforme la manera en que las personas viven el ocio, promoviendo un estilo de vida activo, consciente y conectado con la naturaleza.
                        </p>
                        <p className="justified-text text-end me-lg-5" >
                            Aspiramos a expandir nuestras rutas y actividades por nuevos territorios, creando impacto positivo en las personas y en el planeta.
                        </p>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 order-2 order-md-1">
                        <img className="img-fluid logo-img w-50 mx-auto me-lg-6" src="src/front/assets/img/viajes.png" alt="viajes" />
                    </div>
                </div>

                <div className="text-center my-5">
                    <hr className="w-50 mx-auto separador" />
                </div>

                <div className="row mt-5">
                    <div className="text-center overflow-hidden">
                        <h2 className="seccion-titulo d-inline-block"><i className="fa-solid fa-camera me-3 mb-5"></i>Nuestros Momentos</h2>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
                        <img className="img-fluid w-100 h-100 object-fit-cover" src="https://blog.caixabank.es/wp-content/uploads/sites/4/2021/07/turismo-bleisure-viajar-mini-783x412.jpg" alt="" />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
                        <img className="img-fluid w-100 h-100 object-fit-cover" src="https://periodistasturismovalencia.es/wp-content/uploads/2025/03/turismo-valencia-1.jpg" alt="" />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
                        <img className="img-fluid w-100 h-100 object-fit-cover" src="https://denomades-blog.imgix.net/blog/wp-content/uploads/2023/11/27184834/dave-mcdermott-JOCG2ZVgtBc-unsplash.jpg?auto=compress%2Cformat&ixlib=php-3.3.1" alt="" />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
                        <img className="img-fluid w-100 h-100 object-fit-cover" src="https://st4.depositphotos.com/1000604/20060/i/450/depositphotos_200605526-stock-photo-yoga-on-a-nature.jpg" alt="" />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
                        <img className="img-fluid w-100 h-100 object-fit-cover" src="https://mamamountainperu.com/wp-content/uploads/2023/01/pantalon-de-montana-y-trekking-mama-mountain.webp" alt="" />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
                        <img className="img-fluid w-100 h-100 object-fit-cover" src="https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt3777f1fa850162b4/652d7eedbb7cdd1aa6d4bf85/Seville_LP_Header.webp?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart" alt="" />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
                        <img className="img-fluid w-100 h-100 object-fit-cover" src="https://images.squarespace-cdn.com/content/v1/5a86b05bcf81e0af04936cc7/1730047392452-DDAFFGOUXTAAFVZPPQFW/que-ver-cerca-de-granada.jpg?format=1500w" alt="" />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
                        <img className="img-fluid w-100 h-100 object-fit-cover" src="https://www.pampadiario.com/imagen_noticia.php?id=51957" alt="" />
                    </div>

                    <div className="text-center my-5">
                        <h3 className="fw-bold">
                            ¿Listo para vivir tu próxima aventura?
                        </h3>
                        <p className="fs-5">
                            Únete a nuestra comunidad de exploradores y descubre experiencias únicas en la naturaleza, el deporte y el turismo.
                        </p>
                        <Link to={"/signup"} className="btn btn-lg mt-3 btn-Sigup">
                            ¡Regístrate aquí y comienza tu viaje!
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
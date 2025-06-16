import React from "react";

export const VisionMision = () => {
    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-sm-12 col-md-6 col-lg-7">
                        <h2 className="mt-5 ms-lg-5 fw-bold"><i className="fa-solid fa-handshake me-3"></i>Mision</h2>
                        <p className="justified-text ms-lg-5">
                            En Nomadik, nuestra misión es inspirar y conectar a las personas con la naturaleza a través de experiencias deportivas, turísticas y recreativas que promuevan el bienestar, la aventura y el respeto por el entorno.
                        </p>
                        <p className="justified-text ms-lg-5">
                            Diseñamos rutas únicas que fomentan el descubrimiento, el compañerismo y el crecimiento personal, siempre con un enfoque sostenible y humano.
                        </p>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-5">
                        <img className="img-fluid logo-img w-50 mx-auto ms-lg-6" src="src/front/assets/img/senderista1.png" alt="senderista" />
                    </div>
                </div>

                <div className="text-center my-5">
                    <hr className="w-50 mx-auto separador" />
                </div>

                <div className="row mt-5">
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <img className="img-fluid logo-img w-50 mx-auto me-lg-6" src="src/front/assets/img/viajes.png" alt="viajes" />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <h2 className="mt-5 text-end fw-bold me-lg-5" >Visión<i className="fa-solid fa-eye ms-3"></i></h2>
                        <p className="justified-text text-end me-lg-5" >
                            Ser una comunidad líder en experiencias deportivas y turísticas que transforme la manera en que las personas viven el ocio, promoviendo un estilo de vida activo, consciente y conectado con la naturaleza.
                        </p>
                        <p className="justified-text text-end me-lg-5" >
                            Aspiramos a expandir nuestras rutas y actividades por nuevos territorios, creando impacto positivo en las personas y en el planeta.
                        </p>
                    </div>
                </div>

                <div className="text-center my-5">
                    <hr className="w-50 mx-auto separador" />
                </div>

                <div className="row mt-5 bg-primary">
                    <h2 className="text-center" ><i className="fa-solid fa-camera me-3 mb-5"></i>Nuestros Momentos</h2>
                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <img className="img-fluid" src="https://blog.caixabank.es/wp-content/uploads/sites/4/2021/07/turismo-bleisure-viajar-mini-783x412.jpg" alt="" />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <img className="img-fluid" src="https://periodistasturismovalencia.es/wp-content/uploads/2025/03/turismo-valencia-1.jpg" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

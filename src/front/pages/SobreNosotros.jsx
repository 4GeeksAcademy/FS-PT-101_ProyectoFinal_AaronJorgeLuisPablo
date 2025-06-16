import React from "react";


export const SobreNosotros = () => {
    return (
        <>
            <div className="container my-5 bg-white px-3">

                <div className="manifiesto-section my-5 py-5 text-center text-white rounded">
                    <div className="container px-4">
                        <h2 className="mb-4 display-5 fw-bold">Nuestro Manifiesto</h2>
                        <p className="lead px-md-5">
                            Creemos en <strong>caminar descalzos</strong>, respirar profundo y <strong>perderse para encontrarse</strong>.<br />
                            En la <em>magia del presente</em>, en la <strong>transformación a través del movimiento</strong>, y en que <strong>cada paso deja huella</strong>.<br />
                            No somos turistas, somos <strong>exploradores conscientes</strong>.<br />
                            No buscamos lugares... <strong>buscamos sentidos</strong>.
                        </p>
                    </div>
                </div>

                <div className="text-center my-5">
                    <hr className="w-50 mx-auto separador" />
                </div>

                <div className="row align-items-center">
                    <h2 className="text-center fw-bold mt-2 mb-4">¿Qué Somos?</h2>
                    <div className="col-sm-12 col-md-6 col-lg-5 mb-4 mb-md-0">
                        <img
                            className="img-fluid logo-img w-100 mx-auto"
                            src="src/front/assets/img/LogoNomadik.png"
                            alt="Logo"
                        />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-7">
                        <p className="justified-text">
                            <strong>Nomadik</strong> nace con la pasión de <strong>explorar, descubrir y conectar</strong>. Somos una plataforma hecha para quienes buscan algo más que un simple destino: buscamos crear <em>experiencias inolvidables</em>, <em>aventuras compartidas</em> y un <strong>estilo de vida activo y consciente</strong>.
                        </p>
                        <p className="justified-text">
                            Creemos en el poder del <strong>turismo sostenible</strong>, el <strong>ocio consciente</strong> y las <strong>rutas deportivas</strong> como formas de ver el mundo desde nuevas perspectivas.
                        </p>
                        <p className="justified-text">
                            Nos mueve la idea de <strong>reconectar</strong>: con la naturaleza, con otras personas, pero sobre todo, contigo mismo. Organizamos <em>escapadas que recargan el alma</em>, <em>caminatas que inspiran</em> y <em>retiros que invitan a parar, respirar y redescubrir</em>.
                        </p>
                        <p className="justified-text">
                            <strong>En Nomadik, no solo viajas. Te transformas.</strong><br />
                            Somos tribu, somos aventura, <strong>somos Nomadik</strong>.
                        </p>
                    </div>
                </div>

                <div className="text-center my-5">
                    <hr className="w-50 mx-auto separador" />
                </div>

                <div className="row">
                    <h2 className="text-center mt-2 mb-4">Valores Destacados</h2>
                    <div className="row text-center">
                        {[
                            {
                                icon: "fa-star",
                                title: "Sostenibilidad",
                                text: "Promovemos el respeto por la naturaleza en cada experiencia que diseñamos.",
                            },
                            {
                                icon: "fa-handshake",
                                title: "Conexión",
                                text: "Fomentamos vínculos genuinos entre personas, culturas y entornos.",
                            },
                            {
                                icon: "fa-compass",
                                title: "Aventura consciente",
                                text: "Exploramos con intención, viviendo cada paso del camino con propósito.",
                            },
                            {
                                icon: "fa-seedling",
                                title: "Transformación personal",
                                text: "Cada experiencia está pensada para ayudarte a crecer, reflexionar y renovarte.",
                            },
                        ].map((val, index) => (
                            <div className="col-sm-6 col-md-3 mb-4" key={index}>
                                <div className="valor-card p-4 border rounded shadow-sm h-100">
                                    <div className="mb-3 text-warning">
                                        <i className={`fas ${val.icon} fa-2x`}></i>
                                    </div>
                                    <h5 className="fw-bold">{val.title}</h5>
                                    <p>{val.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center my-5">
                    <hr className="w-50 mx-auto separador" />
                </div>

                <div className="row text-center">
                    <h2 className="text-center mb-4">Nuestro Equipo</h2>
                    {[
                        {
                            name: "Aarón",
                            role: "Diseño UI/UX & Comunicación",
                            img: "https://media.gq.com.mx/photos/5be9c2f8f0f5ace8ac143be1/master/pass/chris_evans_anuncia_que_ya_no_sera_capitan_america_en_twitter_6663.jpg",
                        },
                        {
                            name: "Jorge",
                            role: "Líder de Proyecto & Backend",
                            img: "https://i.pinimg.com/736x/de/42/15/de421571a33cd8305585409b45be98df.jpg",
                        },
                        {
                            name: "Luis",
                            role: "Frontend & Estética visual",
                            img: "https://media.revistagq.com/photos/61c0acf73a8adbe7b237d779/1:1/w_1280,h_1280,c_limit/Tom%20Holland.jpg",
                        },
                        {
                            name: "Pablo",
                            role: "Planificación & Testing",
                            img: "https://hips.hearstapps.com/hmg-prod/images/thor-ragnarok-1555946061.jpg?crop=1xw:0.7722701149425287xh;center,top&resize=640:*",
                        },
                    ].map((member, index) => (
                        <div className="col-sm-6 col-md-3 mb-4" key={index}>
                            <div className="card valor-card h-100 border shadow-sm">
                                <img src={member.img} className="card-img-top fotoCreador" alt={member.name} />
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">{member.name}</h5>
                                    <p className="card-text">{member.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
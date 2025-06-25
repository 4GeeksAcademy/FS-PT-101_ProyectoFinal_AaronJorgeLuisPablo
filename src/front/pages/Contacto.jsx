import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import collection from "../services/collection";

export const Contacto = () => {
    const [mensaje, setMensaje] = useState("");
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [response,setResponse] = useState({message: "", error: false})

    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault();
        const resp = collection.contactEmail(name, email, mensaje)
        if(resp.error)
            setResponse({message: "Error al enviar email", error: true})
        else{
            setResponse({message: "Email enviado con éxito", error: false})
            setTimeout(()=>navigate("/"), 2000)
        }

    }

    return (
        <>
            <div className="container p-lg-2 p-4">
                <div className="row mb-5 mt-5 bg-white rounded overflow-hidden">
                    <div className="col-sm-12 col-md-6 col-lg-6 p-0">
                        <img src="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721556/contacto_ue3w69.png" className="img-contactanos" alt="" style={{height: "-webkit-fill-available", direction: "rtl"}}/>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <h3 className="p-4 fw-bold">Nos encanta escucharte.
                            <br/>¿Tienes dudas, ideas o simplemente quieres decir hola? ¡Contáctanos!</h3>
                        <form onSubmit={handleSubmit} className="px-4">
                            <div className="row">
                                <div className="col-sm-12 col-lg-10 mb-lg-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Nombre completo</label>
                                    <input required type="text" className="form-control" id="name" name="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Ingresar nombre" />
                                </div>
                                <div className="col-sm-12 col-lg-10 mb-lg-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">E-mail</label>
                                    <input required type="email" className="form-control" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="name@example.com" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="mb-3 mt-2">
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                                        <textarea required className="form-control no-resize" id="mensaje" name="mensaje" value={mensaje} onChange={(e)=>setMensaje(e.target.value)} rows="3"></textarea>
                                    </div>
                                </div>
                                <div className="col-12 text-lg-end text-center">
                                    <button className="btn btn-primary my-2 w-auto mx-auto fw-bold" >Enviar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

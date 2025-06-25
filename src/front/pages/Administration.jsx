import { useEffect, useState } from "react"
import collection from "../services/collection"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { ReportCard } from "../components/ReportCard"
import { UserCard } from "../components/UserCard"
import { useNavigate } from "react-router-dom"

export const Administration = () => {

    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()

    function parseDate(date) {

        const utcDate1 = new Date(date);
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",

        };

        return utcDate1.toLocaleString("es-ES", options)
    }

    const loadReports = async () => {
        const resp = await collection.returnAllReports()

        if (resp.error && resp.error == 403)
            navigate("/")
        dispatch({ type: 'reports', payload: resp })
    }

    useEffect(() => {
        loadReports()
        collection.returnAllUsers().then(data => dispatch({ type: 'users', payload: data }))
    }, [])


    return (

        <div className="container rounded-end fontFamily bg-white my-5 p-0">

            <div className="adminStyle shadow rounded-top">
                <h1 className="text-center p-3">Ventana de administración</h1>
                <div className="nav nav-tabs justify-content-center pb-1" id="nav-tab" role="tablist">
                    <button className="nav-link adminStyle active" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"><strong>Reportes</strong></button>
                    <button className="nav-link adminStyle" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><strong>Usuarios</strong></button>
                </div>

            </div>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                    {store.all_reports.length>0 
                    
                    ?
                    
                            store.all_reports?.filter((item,i) => item.is_checked == false).map((item, i) =>

                            
                                    <ReportCard message={item.message} report={item.id} activity={item.info_activity?.name} professional={item.professional?.username} user={item.user?.username} date={parseDate(item.creation_date)} route={i + 1} />
                                
                                
                            )

                    :
                    
                            <h1 className="m-3">No hay reportes</h1>
                    }
                    

                </div>
                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex="0">
                    <div className="row d-flex resizeBox">

                        {store.all_users?.filter((item,i) => item.is_active == true).map((item, i) =>
                            <UserCard navigate={() => navigate("/user/" + item.id)} avatar={"/public/avatar/" + item.avatar_url} username={item.username} name={item.name} surname={item.surname} email={item.email} business={item.professional?.business_name} rating={item.professional?.rating.toFixed(2)} type={item.professional?.type} is_professional={item.is_professional} />
                        )}
                    </div>
                </div>
            </div>


        </div>
    )
}



import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useEffect } from "react"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const { store, dispatch } = useGlobalReducer()

    useEffect(()=>{
        let token = localStorage.getItem("token")
        let username = localStorage.getItem("username")
        let id = localStorage.getItem("id")
        let avatar_url = localStorage.getItem("avatar_url")
        let is_professional = localStorage.getItem("is_professional")
        if(token && username && id && avatar_url && is_professional)
            dispatch({type: "loadUser", payload: {id: id, username: username, avatar_url: avatar_url,is_professional: is_professional}})
    },[])

    return (
        <div className="Page">
            <ScrollToTop>
                <Navbar />
                <main className="PageContent">
                    <Outlet />
                </main>
                <Footer />
            </ScrollToTop>
        </div>
    )
}
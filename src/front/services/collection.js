const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const get_token = () => {
    return "Bearer " + localStorage.getItem("token")
}

const collection = {}

collection.returnActivities = async () => {
    try{
        const resp = await fetch(BACKEND_URL + "api/activities");
        const data = await resp.json();
        return data
    }catch(error){
        console.log(error)
    }
}

collection.checkUser = async (name) => {
    try {
        const resp = await fetch(BACKEND_URL + "api/users/" + name)
        return resp.ok
    } catch (error) {
        console.log(error)
    }
}

collection.getOneUser = async (id) => {
    try {
        const resp = await fetch(BACKEND_URL + "api/users/" + id, {
            headers: {"Authorization": get_token()}
        })
        const data = await resp.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

collection.loginUser = async (userdata) => {
    try{
        const resp = await fetch(BACKEND_URL + "api/login", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
			body: JSON.stringify(userdata)
        })
        
		if(resp.status == 400) throw Error("Missing data")
		else if (resp.status == 401) throw Error("User/Email and Password don't match")
		else if(resp.status == 404) throw Error("User with given credentials couldn't be found")
		else if(!resp.ok) throw Error("Unknown error")

        const data = await resp.json()
        return data

    }catch(error) {
		console.log(error)
		return {success: false, response: error.message}
    }
}

collection.signupUser = async (userdata) => {
    try{
        const resp = await fetch(BACKEND_URL + "api/signup", {
            method: "POST",
			body: userdata
        })
        const data = await resp.json()

		if(resp.status == 400) throw Error("Missing data")
		else if (resp.status == 401) throw Error("User/Email and Password don't match")
		else if(resp.status == 409) throw Error(data.response)
		else if(!resp.ok) throw Error("Unknown error")

        return data

    }catch(error) {
		console.log(error)
		return {success: false, response: error.message}
    }
}

collection.editUser = async (id, userdata) => {
    try{
        const resp = await fetch(BACKEND_URL + "api/users/"+id, {method: "PUT",
            headers: {
                "Content-Type":"application/json",
                "Authorization": get_token()
            }, body: JSON.stringify(userdata)
        })
        const data = await resp.json()

		if(resp.status == 400) throw Error("Missing data")
		else if(resp.status == 409) throw Error(data.error)
		else if(!resp.ok) throw Error("Unknown error")

        return data
    }catch(error) {
		console.log(error)
		return {success: false, response: error.message}
    }
}

collection.getInscriptionsForUser = async (id) => {
    try {
        const resp = await fetch(BACKEND_URL + "api/inscriptions", {
            headers: {"Authorization": get_token()}
        })
        const data = resp.json()
        return data
    } catch (error) {
        
    }
}

collection.search = async (text) => {
    try {
        const resp = await fetch(BACKEND_URL + "api/search/" + text)
        const data = resp.json()

        if(resp.status == 404) throw Error("Results not found")
        else if (!resp.ok) throw Error("Unknown error")

        return data
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

export default collection
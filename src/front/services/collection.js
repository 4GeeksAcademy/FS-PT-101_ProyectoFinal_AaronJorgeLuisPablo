const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const get_token = () => {
  return "Bearer " + localStorage.getItem("token");
};

const collection = {};

collection.returnActivities = async () => {
  try {
    const resp = await fetch(BACKEND_URL + "api/activities");
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

collection.returnActivity = async (id) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/activities/" + id);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

collection.getReviews = async () => {
  try {
    const resp = await fetch(BACKEND_URL + "api/reviews/");
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

collection.checkUser = async (name) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name }),
    });
    return resp.ok;
  } catch (error) {
    console.log(error);
  }
};

collection.getOneUser = async (id) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/users/" + id, {
      headers: { Authorization: get_token() },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

collection.loginUser = async (userdata) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userdata),
    });

    if (resp.status == 400) throw Error("Missing data");
    else if (resp.status == 401)
      throw Error("User/Email and Password don't match");
    else if (resp.status == 404)
      throw Error("User with given credentials couldn't be found");
    else if (!resp.ok) throw Error("Unknown error");

    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { success: false, response: error.message };
  }
};

collection.resetPassword = async (email) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/reset_password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    });
    if (!resp.ok)
      return {
        success: false,
        message: "No se ha encontrado un usuario con este email",
      };
    else return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error desconocido" };
  }
};

collection.changePassword = async (token, password) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ password: password }),
    });
    if (!resp.ok)
      return { success: false, message: "Error al cambiar contraseña" };
    else return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error desconocido" };
  }
};

collection.loginToken = async (token) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/user", {
      headers: { Authorization: get_token() },
    });
    const data = await resp.json();

    if (resp.status == 404) throw Error("Usuario no encontrado");
    return data;
  } catch (error) {
    console.log(error);
    return { success: false, response: error.message };
  }
};

collection.signupUser = async (userdata) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/signup", {
      method: "POST",
      body: userdata,
    });
    const data = await resp.json();
    if (resp.status == 400) throw Error("Missing data");
    else if (resp.status == 409)
      throw Error("El email introducido ya existe en la base de datos");
    else if (!resp.ok) throw Error("Error desconocido");
    return data;
  } catch (error) {
    console.log(error);
    return { success: false, response: error.message };
  }
};

collection.createClient = async (userdata) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/clients", {
      method: "POST",
      headers: { Authorization: get_token() },
      body: userdata,
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { success: false, response: error.message };
  }
};

collection.editUser = async (userdata) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/users", {
      method: "PUT",
      headers: { Authorization: get_token() },
      body: userdata,
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { success: false, response: error.message };
  }
};

collection.createProf = async (userdata) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/professionals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get_token(),
      },
      body: JSON.stringify(userdata),
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { success: false, response: error.message };
  }
};

collection.reportProfessional = async (userdata) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/professionals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get_token(),
      },
      body: JSON.stringify(userdata),
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { success: false, response: error.message };
  }
};

collection.getProfessionalDetails = async (id) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/professionals/" + id);
    const data = resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

collection.getInscriptionsForUser = async () => {
  try {
    const resp = await fetch(BACKEND_URL + "api/inscriptions", {
      headers: { Authorization: get_token() },
    });
    const data = resp.json();
    return data;
  } catch (error) {}
};

collection.search = async (text) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/search/" + text);
    const data = resp.json();

    if (resp.status == 404) throw Error("Results not found");
    else if (!resp.ok) throw Error("Unknown error");

    return data;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

collection.createReport = async (message, prof_id, act_id = null) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get_token(),
      },
      body: JSON.stringify({
        message: message,
        activity_target_id: act_id,
        professional_target_id: prof_id,
      }),
    });
    const data = resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: "No se pudo realizar el reporte" };
  }
};

collection.createReview = async (
  info_activity_id,
  actRating,
  activityMessage,
  prof_id,
  profRating,
  professionalMessage
) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get_token(),
      },
      body: JSON.stringify({
        info_activity_id: info_activity_id,
        activity_rating: actRating,
        activity_message: activityMessage,
        professional_id: prof_id,
        professional_rating: profRating,
        professional_message: professionalMessage,
      }),
    });
    const data = resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: "No se pudo realizar el reporte" };
  }
};

collection.createFav = async (id) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/favs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get_token(),
      },
      body: JSON.stringify({ info_activity_id: id }),
    });
    const data = resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: "No se ha podido crear el favorito" };
  }
};

collection.deleteFav = async (id) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/favs", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: get_token(),
      },
      body: JSON.stringify({ info_activity_id: id }),
    });
    const data = resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: "No se ha podido crear el favorito" };
  }
};

collection.getMyActivities = async () => {
  try {
    const resp = await fetch(BACKEND_URL + "api/myactivities", {
      headers: { Authorization: get_token() },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

collection.createActivity = async (actData) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get_token(),
      },
      body: JSON.stringify(actData),
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: "No se ha poddio crear la actividad" };
  }
};

collection.createInfoActivity = async (actData) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/info_activities", {
      method: "POST",
      headers: {
        Authorization: get_token(),
      },
      body: actData,
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: "No se ha poddio crear la actividad" };
  }
};

collection.returnAllReports = async () => {
  try {
    const resp = await fetch(BACKEND_URL + "api/reports", {
      headers: {
        Authorization: get_token(),
      },
    });
    const data = await resp.json();
    if (resp.status == 403) return { error: 403 };
    else return data;
  } catch (error) {
    console.log(error);
  }
};

collection.returnSingleReport = async (id) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/reports/" + id, {
      headers: {
        Authorization: get_token(),
      },
    });
    const data = await resp.json();
    if (resp.status == 403) return { error: 403 };
    else return data;
  } catch (error) {
    console.log(error);
  }
};

collection.returnAllUsers = async () => {
  try {
    const resp = await fetch(BACKEND_URL + "api/users", {
      headers: {
        Authorization: get_token(),
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

collection.deleteInscription = async (id) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/inscriptions/" + id, {
      method: "DELETE",
      headers: {
        Authorization: get_token(),
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: "No se ha podido borrar la inscripción", response: error };
  }
};

collection.contactEmail = async (name, email, message) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/contacto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, name: name, message: message }),
    });
    if (resp.error) return { error: "No se pudo enviar el correo" };
    else return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Error al enviar el correo" };
  }
};

collection.deleteReport = async (id) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/reports/" + id, {
      method: "DELETE",
      headers: { Authorization: get_token() },
    });
    const data = await resp.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

collection.deleteUser = async (id) => {
  try {
    const resp = await fetch(BACKEND_URL + "api/users/" + id, {
      method: "DELETE",
      headers: { Authorization: get_token() },
    });
    const data = await resp.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default collection;

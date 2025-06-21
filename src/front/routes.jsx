// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Activities } from "./pages/Activities";
import { Activity } from "./pages/Activity";
import { Sport } from "./pages/Sport";
import { Tourism } from "./pages/Tourism";
import { Leisure } from "./pages/Leisure";
import { SobreNosotros } from "./pages/SobreNosotros";
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { CompleteUserForm } from "./pages/CompleteUserForm"
import { NewProfessionalForm } from "./pages/NewProfessionalForm";
import { PersonalSpace } from "./pages/PersonalSpace"
import { DetailsProfessional } from "./pages/DetailsProfessional"
import {Contacto} from "./pages/Contacto"
import { VisionMision } from "./pages/VisionMision"

export const router = createBrowserRouter(
  createRoutesFromElements(
    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
      <Route path="/" element={<Home />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/activities/:id" element={<Activity />} />
      <Route path="/activities/sport" element={<Sport />} />
      <Route path="/activities/tourism" element={<Tourism />} />
      <Route path="/activities/leisure" element={<Leisure />} />
      <Route path="/nosotros" element={<SobreNosotros />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/personalspace" element={<PersonalSpace />} />
      <Route path="/completeuserform/" element={<CompleteUserForm firstTime={true} />} />
      <Route path="/newprofessionalform/" element={<NewProfessionalForm />} />
      <Route path="/edituser/" element={<CompleteUserForm firstTime={false} />} />
      <Route path="/misionyvision" element={<VisionMision />} />
      <Route path="/contacto" element={<Contacto/>} />
      <Route path="/personalspace" element={<PersonalSpace />} />
      <Route path="/detailsprofessional/:id" element={<DetailsProfessional />} />
      <Route path="/sport" element={<Sport /> } />
      <Route path="/leisure" element={<Leisure />} />
      <Route path="/tourism" element={<Tourism />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);



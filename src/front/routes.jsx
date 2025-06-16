// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Activities } from "./pages/Activities";
import { SobreNosotros } from "./pages/SobreNosotros";
import {Login} from "./pages/Login"
import {Signup} from "./pages/Signup"
import {PersonalSpace} from "./pages/PersonalSpace"
import {Inscriptions} from "./pages/Inscriptions"
import { VisionMision } from "./pages/VisionMision";

export const router = createBrowserRouter(
    createRoutesFromElements(
      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        <Route path= "/" element={<Home />} />
        <Route path= "/activities" element={<Activities />} />
        <Route path="/nosotros" element={<SobreNosotros/>} />
        <Route path="/single/:theId" element={ <Single />} />  {/* Dynamic route for single items */}
        <Route path="/demo" element={<Demo />} />
      </Route>
    ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./Pages/Navbar/Navbar";
import Footer from "./Pages/Footer/Footer";
import Home from "./Pages/Home/Home";
import Map from "./Pages/Map/Map";
import Nearby_places from "./Pages/Nearby_places/Nearby_places";
import Place_info from "./Pages/Place_info/Place_info";
import Regional_tourism from "./Pages/Regional_tourism/Regional_tourism";
import Single_city from "./Pages/Single_city/Single_city";
import Tour_direction from "./Pages/Tour_direction/Tour_direction";

const App = () => {
  return (

    <div className="w-full bg-gray-300">

      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/nearby_places" element={<Nearby_places />} />
          <Route path="/place_info" element={<Place_info />} />
          <Route path="/regional_tourism" element={<Regional_tourism />} />
          <Route path="/single_city" element={<Single_city />} />
          <Route path="/tour_direction" element={<Tour_direction />} />
        </Routes>




        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
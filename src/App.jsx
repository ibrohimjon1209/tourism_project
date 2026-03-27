import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./Pages/Navbar/Navbar";
import Footer from "./Pages/Footer/Footer";
import Home from "./Pages/Home/Home";
import InteractiveMap from "./Pages/InteractiveMap/InteractiveMap";
import Nearby_places from "./Pages/Nearby_places/Nearby_places";
import NearbyPlaceDetail from "./Pages/Nearby_places/NearbyPlaceDetail";
import Place_info from "./Pages/Place_info/Place_info";
import Regional_tourism from "./Pages/Regional_tourism/Regional_tourism";
import Single_city from "./Pages/Single_city/Single_city";
import Tour_direction from "./Pages/Tour_direction/Tour_direction";
import TourDirectionDetail from "./Pages/Tour_direction/TourDirectionDetail";
import TouristPlaces from "./Pages/TouristPlaces/TouristPlaces";
import TouristPlaceDetail from "./Pages/TouristPlaces/TouristPlaceDetail";
import ScrollToTop from "./Components/ScrollToTop";

const App = () => {
  return (
    <div className="w-full bg-gray-300 overflow-x-hidden">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<InteractiveMap />} />
          <Route path="/nearby_places" element={<Nearby_places />} />
          <Route path="/nearby_place/:id" element={<NearbyPlaceDetail />} />
          <Route path="/place_info" element={<Place_info />} />
          <Route path="/regional" element={<Regional_tourism />} />
          <Route path="/single_city" element={<Single_city />} />
          <Route path="/tour_direction" element={<Tour_direction />} />
          <Route path="/tour_direction/:id" element={<TourDirectionDetail />} />
          <Route path="/tourist_places" element={<TouristPlaces />} />
          <Route path="/tourist_place/:id" element={<TouristPlaceDetail />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
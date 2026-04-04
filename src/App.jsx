import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./Pages/Navbar/Navbar";
import Footer from "./Pages/Footer/Footer";
import Home from "./Pages/Home/Home";
import InteractiveMap from "./Pages/InteractiveMap/InteractiveMap";
import Nearby_places from "./Pages/Nearby_places/Nearby_places";
import NearbyPlaceDetail from "./Pages/Nearby_places/NearbyPlaceDetail";
import Place_info from "./Pages/Place_info/Place_info";
import Regional_tourism from "./Pages/Regional_tourism/Regional_tourism";
import Single_city from "./Pages/Single_city/Single_city";
import SearchPage from "./Pages/Search/SearchPage";
import Tour_direction from "./Pages/Tour_direction/Tour_direction";
import TourDirectionDetail from "./Pages/Tour_direction/TourDirectionDetail";
import TouristPlaces from "./Pages/TouristPlaces/TouristPlaces";
import TouristPlaceDetail from "./Pages/TouristPlaces/TouristPlaceDetail";
import ScrollToTop from "./Components/ScrollToTop";

const App = () => {
  const [coords, setCoords] = useState(() => {
    const saved = localStorage.getItem('userCoords');
    return saved ? JSON.parse(saved) : null;
  });

  const [isLoadingCoords, setIsLoadingCoords] = useState(!coords);

  const detectLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCoords(newCoords);
          localStorage.setItem('userCoords', JSON.stringify(newCoords));
          setIsLoadingCoords(false);
          console.log("Location detected successfuly:", newCoords);
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Only use default if not already set, but DON'T save default to localStorage
          if (!coords) {
            setCoords({ lat: 41.2995, lng: 69.2401 }); // Tashkent Default
          }
          setIsLoadingCoords(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      if (!coords) {
        setCoords({ lat: 41.2995, lng: 69.2401 }); 
      }
      setIsLoadingCoords(false);
    }
  };

  useEffect(() => {
    if (!coords) {
      detectLocation();
    } else {
      setIsLoadingCoords(false);
    }
  }, []);

  return (
    <div className="w-full bg-gray-300 overflow-x-hidden">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home userCoords={coords} setCoords={setCoords} />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/map" element={<InteractiveMap />} />
          <Route path="/nearby_places" element={<Nearby_places userCoords={coords} setCoords={setCoords} />} />
          <Route path="/nearby_place/:slug" element={<NearbyPlaceDetail />} />
          <Route path="/place_info" element={<Place_info />} />
          <Route path="/regional" element={<Regional_tourism />} />
          <Route path="/regional/:slug" element={<Single_city />} />
          <Route path="/tour_direction" element={<Tour_direction />} />
          <Route path="/tour_direction/:id" element={<TourDirectionDetail />} />
          <Route path="/tourist_places" element={<TouristPlaces />} />
          <Route path="/tourist_place/:slug" element={<TouristPlaceDetail />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
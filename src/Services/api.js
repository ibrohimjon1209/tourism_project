import axiosInstance from './base';

export const mapService = {
  getPlaces: async () => {
    try {
      const response = await axiosInstance.get('/map/places/');
      return response.data;
    } catch (error) {
      console.error('Error fetching map places:', error);
      throw error;
    }
  }
};

export const placesService = {
  getPlaces: async () => {
    try {
      const response = await axiosInstance.get('/places/');
      return response.data;
    } catch (error) {
      console.error('Error fetching all places:', error);
      throw error;
    }
  },
  getPlaceDetail: async (slug) => {
    try {
      const response = await axiosInstance.get(`/places/${slug}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching place detail for ${slug}:`, error);
      throw error;
    }
  },
  getPlaceRoutes: async (slug) => {
    try {
      const response = await axiosInstance.get(`/places/${slug}/routes/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching routes for ${slug}:`, error);
      throw error;
    }
  },
  getNearbyPlaces: async (lat, lng) => {
    try {
      const response = await axiosInstance.get('/places/nearby/', {
        params: { lat, lng }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching nearby places:', error);
      throw error;
    }
  }
};

export const searchService = {
  search: async (q, limit = 10) => {
    try {
      const response = await axiosInstance.get('/search/suggestions/', {
        params: { q, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching search results:', error);
      throw error;
    }
  }
};

export const routeService = {
  getRoutes: async () => {
    try {
      const response = await axiosInstance.get('/routes/');
      return response.data;
    } catch (error) {
      console.error('Error fetching routes:', error);
      throw error;
    }
  },
  getRouteDetail: async (id) => {
    try {
      const response = await axiosInstance.get(`/routes/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching route detail for ${id}:`, error);
      throw error;
    }
  }
};

export const regionService = {
  getRegions: async () => {
    try {
      const response = await axiosInstance.get('/regions/');
      return response.data;
    } catch (error) {
      console.error('Error fetching regions:', error);
      throw error;
    }
  },
  getRegionDetail: async (slug) => {
    try {
      const response = await axiosInstance.get(`/regions/${slug}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching region detail for ${slug}:`, error);
      throw error;
    }
  }
};

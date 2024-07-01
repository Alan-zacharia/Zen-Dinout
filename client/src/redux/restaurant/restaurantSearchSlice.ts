import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { RestaurantType } from '../../types/restaurantTypes';


const initialState = {
  searchQuery: '',
  restaurants: [] as RestaurantType[],
  filteredRestaurants: [] as RestaurantType[],
};

export const fetchRestaurants = createAsyncThunk('restaurants/fetchRestaurants', async () => {
    const response = await axios.get('/api/get-restaurants');
    return response.data.restaurant;
});

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    filterRestaurants: (state) => {
        state.filteredRestaurants = state.restaurants.filter((restaurant) => {
          const searchTerm = state.searchQuery.toLowerCase();
          return restaurant.restaurantName.toLowerCase().includes(searchTerm);
        });
      },
      filterRestaurantsByLocation: (state, action: PayloadAction<number>) => {
        state.filteredRestaurants = state.restaurants.filter((restaurant) => {
          const latitude = restaurant.location.coordinates[1];
          return latitude === action.payload;
        });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurants.fulfilled, (state, action: PayloadAction<RestaurantType[]>) => {
      state.restaurants = action.payload;
    });
  },
});

export const { updateSearchQuery, filterRestaurants , filterRestaurantsByLocation } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;
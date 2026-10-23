import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
// import { PlayerData } from '../../models/playerData.model';

export interface DataState {
  currentCrown: number,
  year: number,
  month: number
}

let initialState: DataState;

if (localStorage.getItem('token')) {
  const decodedToken: { data: DataState } = jwt_decode(localStorage.getItem('token') as string);
  initialState = {
    currentCrown: decodedToken.data.currentCrown,
    year: decodedToken.data.year,
    month: decodedToken.data.month
  };
  console.log('initialState', decodedToken);
} else {
  initialState = {
    currentCrown: 0,
    year: 1,
    month: 1
  };
}

export const dataSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    increaseTime: (state) => {
      if(state.month === 12) {
        state.month = 1;
        state.year += 1;
      } else {
        state.month += 1;
      }
    },
    setCurrentCrown: (state, currentCrown: PayloadAction<number>) => {
      state.currentCrown = currentCrown.payload;
    },
    setYear: (state, year: PayloadAction<number>) => {
      state.year = year.payload;
    },
    setMonth: (state, month: PayloadAction<number>) => {
      state.month = month.payload;
    }
  }
});

export const { increaseTime, setCurrentCrown, setYear, setMonth } = dataSlice.actions;

export default dataSlice.reducer;

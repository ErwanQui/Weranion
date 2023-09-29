import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { PlayerData } from '../../models/playerData.model';

export interface PlayerState {
  firstname: string,
  lastname: string,
  mj: boolean
}

let initialState: PlayerState;

if (localStorage.getItem('token')) {
  const decodedToken: PlayerData = jwt_decode(localStorage.getItem('token') as string);
  initialState = {
    firstname: decodedToken.firstname,
    lastname: decodedToken.lastname,
    mj: decodedToken.mj
  };
} else {
  initialState = {
    firstname: '',
    lastname: '',
    mj: false
  };
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setFirstname: (state, firstname: PayloadAction<string>) => {
      state.firstname = firstname.payload;
    },
    setLastname: (state, lastname: PayloadAction<string>) => {
      state.lastname = lastname.payload;
    },
    setMJ: (state, mj: PayloadAction<boolean>) => {
      state.mj = mj.payload;
    }
  },
});

export const { setFirstname, setLastname, setMJ } = playerSlice.actions;

export default playerSlice.reducer;
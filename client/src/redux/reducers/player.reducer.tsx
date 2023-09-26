import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { PlayerData } from '../../models/playerData.model';

export interface PlayerState {
  firstname: string,
  lastname: string,
  mj: boolean,
  connected: boolean
}

let initialState: PlayerState;

if (localStorage.getItem('token')) {
  const decodedToken: PlayerData = jwt_decode(localStorage.getItem('token') as string);
  initialState = {
    firstname: decodedToken.firstname,
    lastname: decodedToken.lastname,
    mj: decodedToken.mj,
    connected: true
  };
} else {
  initialState = {
    firstname: '',
    lastname: '',
    mj: false,
    connected: false
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
    },
    connectPlayer: (state) => {
      state.connected = true;
    }
  },
});

export const { setFirstname, setLastname, setMJ, connectPlayer } = playerSlice.actions;

export default playerSlice.reducer;
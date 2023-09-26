import { configureStore } from '@reduxjs/toolkit';
import { playerSlice } from './reducers/player.reducer';

const store = configureStore({
  reducer: {
    player: playerSlice.reducer
  }
});

export default store;
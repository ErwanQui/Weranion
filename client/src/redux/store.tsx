import { configureStore } from '@reduxjs/toolkit';
import { playerSlice } from './reducers/player.reducer';
import { dataSlice } from './reducers/data.reducer';

const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
    data: dataSlice.reducer
  }
});

export default store;
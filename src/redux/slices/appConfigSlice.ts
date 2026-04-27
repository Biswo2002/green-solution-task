import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type State = {
  shouldChangeLocation: { val: boolean };
};

const initialState: State = {
  shouldChangeLocation: { val: false },
};

const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setShouldChangeLocation: (state, action: PayloadAction<{ val: boolean }>) => {
      state.shouldChangeLocation = action.payload;
    },
  },
});

export const { setShouldChangeLocation } = appConfigSlice.actions;
export default appConfigSlice.reducer;

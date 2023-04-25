import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  isAdmin: '',
  _id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoginDetails: (state, { payload }) => {
      state.name = payload.name;
      state.email = payload.email;
      state.isAdmin = payload.isAdmin;
      state._id = payload._id;
    },

    setSignOutState: (state) => {
      state.name = null;
      state.email = null;
      state.photo = null;
    },
  },
});

export const { setUserLoginDetails, setSignOutState } = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectIdPhoto = (state) => state.user._id;

export default userSlice.reducer;

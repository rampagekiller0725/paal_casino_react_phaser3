import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface User {
    name: string,
    id: string
}

const initialState: User = {
    name: "",
    id: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
        state.name = action.payload.name;
        state.id = action.payload.id;
    },
  },
});

export const selectUser = (state: RootState) => state.user;

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

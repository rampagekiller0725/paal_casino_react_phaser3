import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface Room {
    id: string,
    name: string,
    connectedPlayers: Array<any>
}

let initialRooms: Room[] = [];
const initialState = {
    rooms: initialRooms,
};

const blackjackSlice = createSlice({
  name: "blackjack",
  initialState,
  reducers: {
    addRoom(state, action) {
      state.rooms.push({
        id: action.payload.id,
        name: action.payload.name,
        connectedPlayers: action.payload.connectedPlayers
      });
    },
    updateRoom(state, action) {
      state.rooms.map((room) => {
        if (room.id === action.payload.id) {
          room.name = action.payload.name;
          room.connectedPlayers = action.payload.connectedPlayers
        }
      })
    },
    removeRoom(state, action) {
      let index = state.rooms.findIndex((room) => room.id === action.payload.id);
      state.rooms.splice(index, 1);
    }
  },
});

export const selectRooms = (state: RootState) => state.blackjack.rooms;

export const { addRoom, updateRoom, removeRoom } = blackjackSlice.actions;

export default blackjackSlice.reducer;

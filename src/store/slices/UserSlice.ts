import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SLICE_NAME, THUNK_NAME } from "../../utils/sliceUtil";

interface IUser {
  name: string;
  role: string;
  id: number;
}

const initialState: IUser = {
  name: "John",
  role: "ADMIN",
  id: 1,
};

export const getUsersThunk = createAsyncThunk(THUNK_NAME.getUser, async () => {
    // const userResponse = await getUsers();
  //   return userResponse.data;
  return "firnadis";
});

const userSlice = createSlice({
  name: SLICE_NAME.userSlice,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersThunk.fulfilled, (state, { payload }) => {
      state.name = payload;
    });
  },
});

const { reducer } = userSlice;
export const selectUser = (state: RootState) => state.user.name;

export default reducer;

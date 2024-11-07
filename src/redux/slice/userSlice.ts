import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Iuser } from "../../utils/Interfaces/Iuser";
import defaultUserList from "../../test/data";
import ILoginData from "../../utils/Interfaces/ILogin";
import { IuserByManager } from "../../utils/Interfaces/IReviewer";

export interface ProjectState {
  userList: Iuser[];
  employeeList:IuserByManager[];
  isAuthenticated: boolean;
  loginData: ILoginData;
  AvatarColor:string;
  title:string;
}

const initialState: ProjectState = {
  userList: [],
  isAuthenticated: false,
  employeeList:[],
  AvatarColor:"black",
  loginData: { username: "", role: "", email: "", userId: 0 },
  title:"Performance Review System",
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUserList: (state, action: PayloadAction<Iuser[]>) => {
      state.userList = [...action.payload];
      return state;
    },
     setEmployeeList: (state, action: PayloadAction<IuserByManager[]>) => {
      state.employeeList = [...action.payload];
      return state;
    },
    setLoggedInUser: (state, action: PayloadAction<{user:ILoginData , AvatarColor:string}>) => {
      state.loginData = action.payload.user;
      state.AvatarColor = action.payload.AvatarColor;
      state.isAuthenticated = true;
      return state;
    },
    logoutUser: (state) => {
      state.loginData = initialState.loginData;
      state.isAuthenticated = false;
      return state;
    }, setTitle: (state,action:PayloadAction<string>) => {
      state.title = action.payload;
      return state;
    },
  },
});

export const { setUserList,setEmployeeList, setLoggedInUser, logoutUser,setTitle } = userSlice.actions;

export default userSlice.reducer;

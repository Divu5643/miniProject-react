import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Iuser } from '../../utils/Interfaces/Iuser'

export interface ProjectState {
userList :Iuser[],
username:string,
role:string,
email:string,
userId:Number
}

const initialState: ProjectState = {
userList:[],
username: 'divyansh',
    role: 'admin',
    email: 'divyansh@bfl.com',
    userId: 1
}

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUserList: (state, action: PayloadAction<Iuser[]>) => {
      console.log(action);
      state.userList = [...action.payload]
      return state
    },  
   
  },
})


export const { setUserList } = userSlice.actions

export default userSlice.reducer
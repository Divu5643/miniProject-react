import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Iuser } from '../../utils/Interfaces/Iuser'

export interface ProjectState {
userList :Iuser[];
}

const initialState: ProjectState = {
userList:[],
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
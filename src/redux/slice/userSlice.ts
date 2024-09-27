import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface ProjectState {
value:Number,
}

const initialState: ProjectState = {
value:0
}

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    AddProject: (state, action: PayloadAction<Number>) => {
      console.log(action);
      state.value = action.payload
      return state
    },
   
  },
})


export const { AddProject } = userSlice.actions

export default userSlice.reducer
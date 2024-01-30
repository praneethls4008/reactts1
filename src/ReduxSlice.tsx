import { createSlice } from "@reduxjs/toolkit"

type initialType ={
    msg:String
}

const initialState: initialType = {
    msg : 'welcome'
}

const reduxSlice = createSlice(
    {
        name: 'reduxSliceState',
        initialState,
        reducers:{
            inc:(state)=>{
                state.msg= state.msg+'1';
            }
        }
    }
)

export const reduxSliceReducer = reduxSlice.reducer;
export const {inc} = reduxSlice.actions;
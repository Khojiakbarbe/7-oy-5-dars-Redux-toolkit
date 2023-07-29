import { createSlice } from "@reduxjs/toolkit";
import { local1 } from "../Local";


export const appSlice = createSlice({
    name: 'translate',
    initialState: {
        words: local1()
    },
    reducers: {
        post: (state, action) => {
            state.words.push(action.payload)
        },
        edit: (state, action) => {
            let current = state.words.find(word => word.id == action.payload.id)
            current.eng = action.payload.eng
            current.uz = action.payload.uz
            current.level = action.payload.level
            current.completed = action.payload.completed
        },
        changeStatus: (state, action) => {
            state.words.map(word => {
                if (word.id == action.payload) {
                    word.completed = !word.completed
                } else {
                    return word
                }
            })
        },
        deleteWord: (state, action) => {
            state.words = state.words.filter(word => word.id != action.payload)
        }
    }
})

export const { post, edit, changeStatus, deleteWord } = appSlice.actions
export const appReducer = appSlice.reducer
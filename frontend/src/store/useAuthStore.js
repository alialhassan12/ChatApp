import { create } from "zustand";

export const useAuthStore=create((set)=>({
    authUser:{name:"ali",_id:123,age:29},
    setName:(newData)=>{
        set((state)=>({
            authUser:{...state.authUser, name:newData}
        }))
    }
}));
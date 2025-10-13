import { create } from "zustand";
import {axiosInstance} from '../lib/axios.js';
import toast from 'react-hot-toast';
import {io} from 'socket.io-client';

const BASE_URL=import.meta.env.MODE === "development"?"http://localhost:3000":"/";

export const useAuthStore=create((set,get)=>({  
    authUser:null,
    isCheckingAuth:true,
    isSigingUp:false,
    isLoggingIn:false,
    socket:null,
    onlineUsers:[],
    
    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get('/auth/check');
            set({authUser:res.data});
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth",error);
            set({authUser:null});
        }finally{
            set({isCheckingAuth:false});
        }
    },
    signup:async(data)=>{
        set({isSigingUp:true});
        try {
            const res=await axiosInstance.post("/auth/signUp",data);
            set({authUser:res.data});
            get().connectSocket();
            toast.success("Account created Successfully");
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally{
            set({isSigingUp:false});
        }
    },
    login:async(data)=>{
        set({isLoggingIn:true});
        try {
            const res=await axiosInstance.post('/auth/login',data);
            set({authUser:res.data});
            get().connectSocket();
            toast.success("Logged In Successfullt");
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally{
            set({isLoggingIn:false});
        }
    },
    logout:async()=>{
        try {
            await axiosInstance.post('/auth/logout');
            set({authUser:null});
            get().disconnectSocket();
            toast.success("Logged Out Successfully");
        } catch (error) {
            toast.error("error logging out");
            console.log("error logging out: ",error);
        }
    },
    updateProfile:async(data)=>{
        try {
            const res=await axiosInstance.put('/auth/updateProfile',data);
            set({authUser:res.data});
            toast.success("Profile updated Successfully");
        } catch (error) {
            console.log("Error updating profile",error);
            toast.error(error.response?.data?.message);
        }
    },
    connectSocket:()=>{
        const {authUser}=get();
        if(!authUser || get().socket?.connected) return;

        const socket=io(BASE_URL,{
            withCredentials:true // this ensures cookies are sent with connection
        });

        socket.connect();

        set({socket});//update socket state after connection

        //listen for online users event

        socket.on("getOnlineUsers",userIds=>{
            set({onlineUsers:userIds});
        });
    },
    disconnectSocket:()=>{
        if(get().socket?.connected) get().socket.disconnect();
    }
    
}));
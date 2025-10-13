import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore=create((set,get)=>({
    allContacts:[],
    chats:[],
    messages:[],
    activeTab:"chats",
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    isSoundEnabled:JSON.parse(localStorage.getItem("isSoundEnabled")) ===true,

    toggleSound:()=>{
        localStorage.setItem("isSoundEnabled",!get().isSoundEnabled);
        set({isSoundEnabled:!get().isSoundEnabled});
    },
    
    setActiveTab:(tab)=>set({activeTab:tab}),
    setSelectedUser:(selectedUser)=>set({selectedUser}),

    getAllContacts:async()=>{
        set({isUsersLoading:true});
        try {
            const res=await axiosInstance.get('/message/contacts');
            set({allContacts:res.data});
        } catch (error) {
            toast.error(error.response?.data?.message)
        } finally{
            set({isUsersLoading:false});
        }
    },

    getChatPartners:async()=>{
        set({isUsersLoading:true});
        try {
            const res=await axiosInstance.get('/message/chats');
            set({chats:res.data});
        } catch (error) {
            toast.error(error.response?.data?.message)
        } finally{
            set({isUsersLoading:false});
        }
    },
    getMessagesByUserId:async(userId)=>{
        set({isMessagesLoading:true});
        try {
            const res=await axiosInstance.get(`/message/${userId}`);
            set({messages:res.data});
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        } finally{
            set({isMessagesLoading:false});
        }
    },

    sendMessage:async(msgData)=>{
        const {selectedUser,messages}=get();
        const {authUser}=useAuthStore.getState();//this how to get states from other store
        
        const tempId=`temp-${Date.now()}`;

        const optimisticMessage={
            _id:tempId,
            senderId:authUser._id,
            receiverId:selectedUser._id,
            text:msgData.text,
            image:msgData.Image,
            createdAt:new Date().toISOString(),
            isOptimistic:true //optional flag to identify optimistic message
        }
        // immediately updating the ui by adding the message
        set({messages:[...messages,optimisticMessage]});
        try {
            const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,msgData);
            set({messages:messages.concat(res.data)});
        } catch (error) {
            set({messages});
            console.log("error sending message",error); 
            toast.error(error.response?.data?.message || "Somthing wrong");
        }
    }
}));
import { useAuthStore } from "../store/useAuthStore";

export default function ChatPage(){
    const{logout}=useAuthStore();
    return(
        <>
        ChatPage
        <button className="z-1" onClick={logout}>logout</button>
        </>
    );
}
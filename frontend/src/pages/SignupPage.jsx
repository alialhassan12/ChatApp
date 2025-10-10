import { useAuthStore } from "../store/useAuthStore";

export default function SignupPage(){
    const {authUser,setName}=useAuthStore()
    return(
        <>
        SignupPage||||
        {authUser.name}
        <button onClick={()=>{
            if(authUser.name == "ali"){
                setName("Batata");
            }else{
                setName("ali")
            }
        }} className="btn btn-primary z-1">
            change name
        </button>
        </>
    );
}
import { resendClient,sender } from "../lib/resend.js";
import {createWelcomeEmailTemplate} from '../emails/emailTemplates.js';

export const welcomeEmail=async(name,email,clientURL)=>{
    const {data,error}=await resendClient.emails.send({
        from:`${sender.name} <${sender.email}>`,
        to:email,
        subject:'Welcome To Chat-it',
        html:createWelcomeEmailTemplate(name,clientURL)
    });
    if(error){
        console.log("ERROR sending email: ",error);
        throw new Error("Faild to send welcome email");
    }
    console.log("Welcome Email sended successfully!",data);
}

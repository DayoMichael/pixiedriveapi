//import { defaultMaxListeners } from "nodemailer/lib/mailer";
//import {mailer} from '../config/mailer.js'
import emailmessage from '../views/mail.js'




import sgMail from '@sendgrid/mail' ;
sgMail.setApiKey("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")

export const controller = {
    post: async (req,res) => {
        const { subject, email, message } = req.body
        //const mail = email("hi", "hello")
        //console.log(mail)
       try {
            const msg = {
                to: email,
                from: "Dayo Michael <abegunde.michael2@gmail.com>",
                subject: subject,
                text: message,
                html: emailmessage(subject, message)
            }
            await sgMail.send(msg)
            console.log(req.body)
            
        } catch (error) {
        
            console.error(error)
            if(error.response){
                console.error(error.response.body)
            }
            
        }
         
        

           /* let user =  await {
                title: req.body.title,
                email: req.body.email,
                message: req.body.message
            }

            
               mailer.welcomeMail(req.body.email, req.body.message)
            
            console.log(req.body);
            console.log(user);
        //} catch (err) {
          //  console.log('email',err)
           //res.status(500).json({
            //error: err
            //})
        //}*/
    } 
    
}
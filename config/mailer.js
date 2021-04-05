import nodemailer from 'nodemailer';
//import hbs from 'nodemailer-express-handlebars';

let transporter = nodemailer.createTransport({
    
    
    service: 'gmail',
    secure: false,
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})
export const mailer = {
    welcomeMail:  async (email, name) =>   transporter.sendMail({
        
        
        from: 'Dayo',
        to: email,
        subject: 'Pixiedrive',
        template: 'welcome',
        context: {
            user: name
        }
    })
}

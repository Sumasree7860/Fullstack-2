const express=require('express');
const bodyParser=require('body-parser');
const nodemailer=require('nodemailer');
const cors=require('cors');

const app=express();
const port=8082;

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'], 
  }));


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'sumasreereddysumasree@gmail.com',
        pass:'Subramany11a1@'
    }
});

app.post('/submit-form',(req,res)=>{
    const {name,email,phoneNumber}=req.body;
    const adminMailOptions={
        from:'sumasreereddysumasree@gmail.com',
        to:'t24542247@gmail.com',
        subject:'Form Submission',
        text:`Name:${name}\n Email:${email}\n Phone Number:${phoneNumber}`

    };

    transporter.sendMail(adminMailOptions,(error,info)=>{
        if(error){
            console.error('Error in sending email to admin:',error);
        }
        else{
            console.log('Email successfully sent to admin',info.response);
        }
    });

    const userMailOptions={
        from:'sumasreereddysumasree@gmail.com',
        to:email,
        subject:'Thank You for your enquiry',
        text:"Thank you for your enquiry. We will get back to you soon...!"
    };

    transporter.sendMail(userMailOptions,(error,info)=>{
        if(error){
            console.error('Error in sending mail to user:',error);
        }
        else{
            console.log('Email sent to user successfully:',info.response);
        }
    });

    res.send('Form submitted successfully...!');

});


app.listen(port,()=>{
    console.log('server is running successfully')
});
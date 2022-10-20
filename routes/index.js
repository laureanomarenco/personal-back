const { Router } = require('express')
const nodemailer = require("nodemailer");
const { GMAIL_PASS, GMAIL_USER } = process.env;

const router = Router()

router.get('/ping', (req, res, next) => {
    try {
        res.send('pong')
    } catch (error) {
        next(err)
    }
})

router.post('/mail', async(req, res, next) => {
    try {
        const { email, text } = req.body;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: GMAIL_USER,
              pass: GMAIL_PASS,
            },
          });
      
          const mailOptions = {
            from: "laureanomarenco@gmail.com",
            to: "laureanomarenco@gmail.com",
            subject: "Desde el portfolio",
            html: `El mail: ${email} mando el siguiente texto: <br/> ${text}`,
          };
      
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) console.log(error);
            else console.log("Email enviado: " + info.response);
          });

    } catch (error) {
        next(err)
    }
})

module.exports = router;
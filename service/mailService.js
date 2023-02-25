import nodemailer from "nodemailer";
class mailService {
  constructor() {
    // family.watch.v2@gmail.com
    // Aezakmi1357.

    this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        service:'gmail',
        auth: {
          user: "family.watch.v2@gmail.com",
          pass: "fmjflmgrfmmfgoms",
        },
      });
    // this.transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: process.env.SMTP_PORT,
    //   secure: false,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASSWORD,
    //   },
    // });
  }

  async sendActivationMail(to,link){
    await this.transporter.sendMail({
        from:process.env.SMTP_USER,
        to: to,
        subject: "Активация аккаунта на "+process.env.API_URL,
        text:'',
        html:`
        <div>
        <h1>Для активации перейдите по ссылке</h1>
        <a href='${link}'>${link}</a>
        </div>
        `
    })
  }
}
export default new  mailService()
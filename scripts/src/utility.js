const { format } = require("date-fns");
const nodemailer = require("nodemailer");

/**
 * This function get the date and return a string in format "yyyy-MM-dd"
 * @param {Date} date
 * return {String}
 */
exports.formatDate = (date) => {
  return format(date, "yyyy-MM-dd");
};

/**
 * date is the day passed to start the month, now if undefined
 * calculate the start and end date for previous month
 * E.g. 2021-01-01 - 2021-02-01
 */
exports.getLastMonthStartEnd = (date = new Date()) => {
  const y = date.getFullYear(),
    m = date.getMonth();

  var firstDay = new Date(y, m, 1);
  var lastDay = new Date(y, m + 1, 1);

  const end = this.formatDate(lastDay);
  const start = this.formatDate(firstDay);

  return { start, end };
};

/**
 * get the milliseconds to sleep
 * @param {number} milliseconds
 * @returns
 */
exports.sleep = async (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

/**
 *  utility function to build the email object
 * @param {array} recipients - list of recipients
 * @param {array} attachments - list of attachments
 * @returns
 */
const buildMail = (recipients, attachments) => {
  const mail = {
    from: '"Cico 🚲 👻" <' + process.env.REACT_APP_MAIL_FROM + ">", // sender address
    to: recipients.join(", "), // list of receivers
    subject: "CiCO - Conta i Ciclisti, dati mensili ✔", // Subject line
    text: `Heilà, 
    
    guarda un po quanti siamo? 
    
    Il tuo amico 
    Cico`, // plain text body

    html: `<h1>Heilà</h1> 
    <p>guarda un po quanti siamo? 
    
    Il tuo amico,<br> 
    <b>Cico</b>

    </p>`, // html body
  };

  if (attachments) {
    mail.attachments = attachments.map((file) => {
      return {
        // filename and content type is derived from path
        path: file,
      };
    });
  }

  return mail;
};

exports.sendMail = (recipients, attachments) => {
  if (!recipients || !recipients.length) {
    console.warn("Sorry the recepients is empty. No mail will be sent");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.REACT_APP_MAIL_USERNAME,
      pass: process.env.REACT_APP_MAIL_PASSWORD,
    },
  });

  this.log(`Sending email to ${recipients}`);

  transporter.sendMail(
    buildMail(recipients, attachments),

    function (error, info) {
      if (error) {
        this.log(error);
      } else {
        this.log(`Email sent: ${info.response}`);
      }
    }
  );
};

/**
 *  gets a text and console.log with time
 * @param {void} text
 */
exports.log = (text) => {
  const time = format(new Date(), "yyyy-MM-dd:HH:mm:ss");
  console.log(`[${time}] ${text}`);
};

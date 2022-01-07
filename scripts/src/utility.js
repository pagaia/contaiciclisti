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
 * @param {array} to - list of recipients
 * @param {array} cc - list of recipients in CC
 * @param {array} bcc - list of recipients in BCC
 * @param {array} files - list of attachments
 * @returns
 */
const buildMail = ({ to, cc, bcc, files }) => {
  const mail = {
    from: '"Cico 🚲 👻" <' + process.env.REACT_APP_MAIL_FROM + ">", // sender address
    to: to.join(", "), // list of receivers
    cc: cc.join(", "), // list of CCs
    bcc: bcc.join(", "),
    subject: "CiCO - Conta i Ciclisti, dati mensili ✔", // Subject line
    text: `Heilà, 

    sai quante persone si muovono a Roma in bici?
    In allegato puoi trovare l'ultimo conteggio riferito al mese scorso dei contatori al momento installati per il progetto CiCO - Conta i Ciclisti. 
    Per lo storico puoi accedere direttamento al repository online https://github.com/pagaia/contaiciclisti/tree/main/scripts/data
    
    Il tuo amico 
    Cico
    
    Ricevi questa email perché hai chiesto espressamente di essere fra i destinatari.
    Se intendi cancellare la tua iscrizione, scrivi a ${process.env.REACT_APP_REPLY_TO}
    `, // plain text body

    html: `<h1>Heilà</h1> 
    <p> 
    sai quante persone si muovono a Roma in bici? <br/>
    In allegato puoi trovare il conteggio orario riferito al mese scorso dei contatori al momento installati per il progetto CiCO - Conta i Ciclisti.<br/>
    Per lo storico puoi accedere direttamento al repository online https://github.com/pagaia/contaiciclisti/tree/main/scripts/data
    </p>
    <br/><br/>
    
    Il tuo amico <br/>
    <b>Cico</b>

    <br/><br/>    
    <small>Ricevi questa email perché hai chiesto espressamente di essere fra i destinatari.
    Se intendi cancellare la tua iscrizione, scrivi a ${process.env.REACT_APP_REPLY_TO}
    </small>
    <br/> 

    </p>` // html body
  };

  if (files) {
    mail.attachments = files.map((file) => {
      return {
        // filename and content type is derived from path
        path: file
      };
    });
  }

  return mail;
};

exports.sendMail = ({ to, cc, bcc, files }) => {
  if (!to || !to.length) {
    console.warn("Sorry the recepients is empty. No mail will be sent");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.REACT_APP_MAIL_USERNAME,
      pass: process.env.REACT_APP_MAIL_PASSWORD
    }
  });

  this.log(`Sending email to ${to}`);
  this.log(`Sending email to ${cc}`);
  this.log(`Sending email to ${bcc}`);

  transporter.sendMail(
    buildMail({ to, cc, bcc, files }),

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

/**
 * this function return yesterday in format yyyy-MM-dd
 */
exports.getYesterday = () => {
  let start = new Date();
  start.setDate(start.getDate() - 1);
  start = this.formatDate(start);
  return start;
};

/**
 * this function return today in format yyyy-MM-dd
 */
 exports.getToday = () => {
  let start = new Date();
  start = this.formatDate(start);
  return start;
};
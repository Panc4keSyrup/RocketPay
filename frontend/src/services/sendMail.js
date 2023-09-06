import emailjs from "@emailjs/browser";

export async function sendEmail(owner_email) {
  if (process.env.REACT_APP_ENABLE_SEND_EMAIL === "true") {
    return await emailjs.send(
      process.env.REACT_APP_EMAIL_SERVICE_ID,
      process.env.REACT_APP_EMAIL_TEMPLATE_ID,
      { 
        url: `${process.env.REACT_APP_HOST}/#/collectible?owner_email`,
        owner_email: owner_email 
      },
      process.env.REACT_APP_EMAIL_PUBLIC_KEY
    );
  }

  return "Skipped email sending";
}
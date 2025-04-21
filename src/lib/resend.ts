import { OrderType } from "@/@types";
import { Resend } from "resend";
import { getDeliveryDisplayDate } from "./date";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendNotifEmail = {
  order: async (data: OrderType) => {
    try {
      await resend.emails.send({
        from: "Jajagare <onboarding@resend.dev>",
        to: "vuctechdev@gmail.com",
        subject: `Nova narudzba - ${data.name}, ${getDeliveryDisplayDate(new Date(data.delivery))}`,
        html: `<p><strong>Ime: </strong> ${data.name}</p>
              <p><strong>Adresa: </strong>${data.address}</p>
              <p><strong>Telefon: </strong>${data.phone} </p>
              <p><strong>Kolicina: </strong>${data.quantity} </p>
              <p><strong>Dostava: </strong>${getDeliveryDisplayDate(new Date(data.delivery))} </p>
              <p><strong>Komentar: </strong> ${data.comment}</p>`,
      });
    } catch (error) {
      console.error(error);
    }
  },
  subscription: async (email: string) => {
    try {
      await resend.emails.send({
        from: "Domaci Proizvodi <kontakt@domaciproizvodi.org>",
        to: "vuctechdev@gmail.com",
        subject: `Nova Subskripcija - ${email}`,
        html: `<p><strong>Email: </strong> ${email}</p>`,
      });
      console.log("Email sent ✅");
    } catch (error) {
      console.error("Failed to send email ❌", error);
    }
  },
};

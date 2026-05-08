import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendResetPasswordEmailParams = {
  email: string;
  resetLink: string;
};

export async function sendResetPasswordEmail({
  email,
  resetLink,
}: SendResetPasswordEmailParams) {
  return await resend.emails.send({
    from: "NibbleTech <hello@mail.nibletech.com>",
    to: email,
    subject: "Reset your Password",
    html: `
      <p>You requested a password reset.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link is valid for 15 minutes.</p>
    `,
  });
}

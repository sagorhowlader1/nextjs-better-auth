import dns from "node:dns";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { Resend } from 'resend';
import { mongodbAdapter } from "better-auth/adapters/mongodb";
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"])
const client = new MongoClient(process.env.MONGO_DB_URL);
const db = client.db("better-auth-db");
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    emailAndPassword: { 
        enabled: true,
        // requireEmailVerification: false,
        sendResetPassword: async({user, url, token}, request) =>{
            void resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: user.email,
                subject: "Reset your password",
                html: `
                <h4>Reset your password</h4>
                Click the link to reset your password: ${url}
                <p>Ignore this email if you haven't requested a password reset.</p>
                `,
            });
        }
    },
    emailVerification: {
        sendVerificationEmail: async({user, url}) => {
            void resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: user.email,
                subject: 'Verify your email address',
                html: `
                <h1>Please Verify your email address</h1>
                Click <a href="${url}">here</a> to verify your email.`,
            })
        },
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        expiresIn: 7*24*3600 // 7 days
    },
    socialProviders: {
        google: {
            clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET
        },
        github: {
            clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET
        }
    },

    database: mongodbAdapter(db, {
        //  Optional: if you don't provide a client, database transactions won't be enabled.
    client
    }),
});
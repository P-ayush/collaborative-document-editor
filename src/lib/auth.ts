import { comparePassword, getUserByEmail } from "@/services/auth.service";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },

            async authorize(credentials) {
                console.log("Authorize called");
                console.log(credentials);

                if (!credentials?.email || !credentials?.password) {
                    console.log("Missing credentials");
                    throw new Error("Email and password are required");
                }

                const user = await getUserByEmail(credentials.email);

                console.log("User from DB:", user);

                if (!user) {
                    console.log("User not found");
                    return null;
                }

                const isPasswordValid = await comparePassword(
                    credentials.password,
                    user.password
                );

                console.log("Password valid:", isPasswordValid);

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
            }
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }

            return session;
        },
    },

    pages: {
        signIn: "/login",
    },

    secret: process.env.NEXTAUTH_SECRET,
};
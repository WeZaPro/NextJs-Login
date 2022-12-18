import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
require("dotenv").config();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        password1: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // const res = await fetch(
        //   "https://mern-api-yp9k.onrender.com/api/signup",
        //   {
        //     method: "POST",
        //     body: JSON.stringify(credentials),
        //     headers: { "Content-Type": "application/json" },
        //   }
        // );

        const res = await fetch(process.env.NEXTAUTH_URL + `/api/signup`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        console.log("date---> ", data);

        if (data.success == true) {
          return data.user;
        }
        return null;
      },
    }),
  ],
});

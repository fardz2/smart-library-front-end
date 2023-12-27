import axios from "axios";
import NextAuth ,{ NextAuthOptions }from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { toast } from "react-toastify";

const authOptions :NextAuthOptions= {
    session:{
        strategy:'jwt'
    },
    secret:'78zFZvyspgAIBXPKdA0AhFqcNWXX16/CEmxFOHU3i9g=',
    providers: [
        CredentialsProvider({
        name: "Email and Password",
        credentials: {
            email: { label: "Email", type: "email", },
            password: { label: "Password"},
        },
        async authorize(credentials) {
            const res = await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
                method: "GET",
              })
      
              const setCookieHeader = res.headers.get("set-cookie")
              // console.log("setCookieHeader", setCookieHeader)
              // you'll find your_site_session key in this console log
      
              const cookies = setCookieHeader?.split(", ")
              // console.log(cookies)
              let sessionKey = null
              let xsrfToken = null
      
              for (const cookie of cookies!) {
                if (cookie.startsWith("laravel_session=")) {
                  sessionKey = cookie.split("=")[1]
                } else if (cookie.startsWith("XSRF-TOKEN=")) {
                  xsrfToken = cookie.split("=")[1]
                }
      
                if (sessionKey && xsrfToken) {
                  break
                }
              }
            const {email,password} = credentials as{
                email:string;
                password:string;
            }
            const data = {
                email: email,
                password: password
            }
            const headers = new Headers({
                Cookie: `laravel_session=${sessionKey}`,
                "Content-Type": "application/json",
              })
      
              if (xsrfToken) {
                headers.append("X-XSRF-TOKEN", xsrfToken)
              }
      
              const options = {
                method: "POST",
                headers,
                body: JSON.stringify(data),
              }
              try {
                // console.log(options)
                const response = await fetch("http://127.0.0.1:8000/api/login", options)
      
                if (response.ok) {
                  const res = await response.json()
                  const resData = res.data;
                  const resRet:any = {
                          id:resData.id,
                          name: resData.name,
                          email: resData.email,
                          role:resData.role.role,
                          accessToken:res.token
                  }
                  console.log("response", resRet)
                  return resRet
                } else {
                
                  // Handle non-successful response here, return an appropriate JSON response.
                 throw new Error("gagal")
                }
              } catch (error) {
                throw new Error("failed")
              }
      
              return null
        },
        
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }:any) {
            if (user) {
                token.user = user
                token.accessToken = user.access_token
            }   
            return token
        },
        async session({ session, token }:any) {
            session.user = token.user
            return session
        },
    },
    pages:{
        signIn:'/login'
    }
    
  
};
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
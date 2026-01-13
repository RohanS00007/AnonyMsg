import { APIError, betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import client  from "@/lib/db"; // your mongodb client
import { admin, createAuthMiddleware, openAPI } from "better-auth/plugins";
import { username } from "better-auth/plugins"
import UserMessageModel from "@/models/UserMsg";
import dbConnect from "@/lib/dbConnect";
 


export const auth = betterAuth({
    database: mongodbAdapter(client.db(process.env.DB_USERNAME as string)),

    user: {
      additionalFields: {
        isCredentialLogin: {
          type: "boolean",
          default: true,
        },
       }
   },

    emailAndPassword: { 
        enabled: true, 
      }, 
    
      advanced: {
        cookies: {
            session_token: {
                name: "AnonMsg_session_token"
            },
        }
    },  

    hooks: {
      before: createAuthMiddleware(async (ctx) => {
          if (ctx.path !== "/sign-up/email") {
              return;
          }
          if (!ctx.body?.email.endsWith("@gmail.com")) {
              throw new APIError("BAD_REQUEST", {
                  message: "Email must end with @gmail.com",
              });
          }
      }),
  },

    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, 
      // 1 day (every 1 day the session expiration is updated
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60 // Cache duration in seconds
        }
    },

    databaseHooks: { 
      user: {
        create: {
          before: async (user) => {
            // Modify user data before creation
            if(user.emailVerified){
              const username = user.email.split("@")[0];
              return { data: { ...user, username} };
            }
            return { data: user }; // Return user even if email not verified
          },
          after: async (user) => {
           try {
            if(user.id){
              // Ensure Mongoose is connected before using the model
              await dbConnect();
              const userId = user.id;
              await UserMessageModel.create({
                userId: userId,
                isAcceptingMessages: true,
                messages: []
            })
              
            }
            
           } catch (error) {
            console.error("UserMessage not initialised:", error)
           }
            
          }
        },
      }

    },

    experimental: {joins: true},




      // social providers for OAuth SignIn & SignUp
    socialProviders: { 
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
        github: { 
          clientId: process.env.GITHUB_CLIENT_ID as string, 
          clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
      },
      plugins: [
        admin(),
        openAPI(),
        username({ 
          minUsernameLength: 8,  
          maxUsernameLength: 20, 
          usernameValidator: (username) => {
            if (username === "admin") {
              return false
            } return true
    }
  }),

] 
});

export type Session = typeof auth.$Infer.Session;

 
 

import connectDatabase from "@/lib/db";
import NextAuth from "next-auth";
import { User } from "@/components/models/user.model";
import github from "next-auth/providers/github";



const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    github({
      clientId: process.env.NEXT_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_GITHUB_CLIENT_SECRET
    })
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({session}:{session:any}) {
      try {
        await connectDatabase();
        if(session.user){
const user=await User.findOne({email:session.user.email});
if(user){
session.user._id=user._id;
return session;
}
else{
  console.log('user not found');
}
        }else{
          console.log('Invalid session');
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async signIn({ account, profile }) {
      if (account?.provider === 'github') {
        try {
          await connectDatabase(); // Connect to MongoDB

          let fullname = profile?.name || profile?.login; // Use login if name is not available

          const user = await User.findOne({ email: profile?.email });

          if (!user) {
            const newUser = await User.create({
              username: profile?.login,
              fullname: fullname,
              email: profile?.email,
              profilephoto: profile?.avatar_url
            });
            await newUser.save();
          }
          return true; // User signed in successfully
        } catch (error) {
          console.error("Error during sign-in:", error);
          throw error; // Throw the error to be caught by NextAuth
        }
      }
      return false; // Sign-in unsuccessful
    }
  }
});

export { handlers, signIn, signOut, auth };

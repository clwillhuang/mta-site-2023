import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname.startsWith("/admin") ||
        req.nextUrl.pathname.startsWith("/api/admin")) {
        return token?.role === "ADMIN";
      } else if (req.nextUrl.pathname.startsWith('/profile')) {
        return !!token;
      } else {
        return true;
      }
    },
  },
})
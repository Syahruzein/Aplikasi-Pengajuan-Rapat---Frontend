export default function ({ isServer, res, query} ) {
    const token = query.token
     if (token) {
       if (isServer) {
         res.setHeader('Set-Cookie', [`accessToken=${token}`]); // Server-side
       } else {
         document.cookie = `accessToken=${token}` // Client-side
       }
     }
}
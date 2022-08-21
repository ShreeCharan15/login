import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import fetchPermissionsFromEmail from '../../../utils/auth/fetchPermissionsFromEmail.ts'
const GOOGLE_AUTHORIZATION_URL =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    prompt: 'consent',
    access_type: 'offline',
    response_type: 'code'
  })

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {
  try {
    const url =
      'https://oauth2.googleapis.com/token?' +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken
      })

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    const perms=await fetchPermissionsFromEmail(token.user,(refreshedTokens.refresh_token ?? token.refreshToken), refreshedTokens.access_token)
    console.log(perms);
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      permissions:perms.permissions,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}

export const authOptions={
  secret: process.env.NEXTAUTH_SECRET,
  pages:{
    signIn: '/auth/signin'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      idToken:true,
      
      
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: GOOGLE_AUTHORIZATION_URL
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      
      if (account && user) {
        const perms=await fetchPermissionsFromEmail(user, account.refresh_token, account.access_token)
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          permissions:perms,
          user
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user = token.user
      session.user.permissions = token.permissions
      session.accessToken = token.accessToken
      session.error = token.error

      return session
    }
  }
}
export default NextAuth(authOptions)

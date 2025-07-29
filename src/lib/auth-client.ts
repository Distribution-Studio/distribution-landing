import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient();

export const { signIn, signOut, signUp, useSession } = authClient;

// Auth client for use in client components
class AuthClient {
  async getSession() {
    try {
      const session = await authClient.getSession();
      return session;
    } catch (error) {
      console.error('Error fetching session:', error);
      return null;
    }
  }
}

export const auth = new AuthClient();

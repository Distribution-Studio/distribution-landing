import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
};

export const getUser = async () => {
  const session = await getSession();
  if (!session?.user) return null;

  // Get full user data from database including custom fields
  const fullUser = await db
    .select({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      bio: user.bio,
      website: user.website,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      customerId: user.customerId,
    })
    .from(user)
    .where(eq(user.id, session.user.id))
    .limit(1);

  return fullUser[0] || null;
};

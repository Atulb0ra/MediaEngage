import { createClerkClient } from "@clerk/backend";

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY
});

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    let clerkUser;
    try {
      clerkUser = await clerk.users.getUser(userId);
    } catch (err) {
      console.error("Clerk lookup failed:", err);
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      username: clerkUser.username || clerkUser.firstName || clerkUser.lastName || null,
      email: clerkUser.emailAddresses?.[0]?.emailAddress || null,
    });

  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

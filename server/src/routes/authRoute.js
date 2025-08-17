const express = require('express');
const { requireAuth, getAuth, clerkClient } = require('@clerk/express');

const router = express.Router();

/**
 * GET /auth/profile (Clerk protected)
 * Returns Clerk user profile
 */
router.get("/profile", requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({ error: "Not authenticated" });
        }

        const user = await clerkClient.users.getUser(userId);

        res.json({
            id: user.id,
            email: user.emailAddresses?.[0]?.emailAddress || null,
            username: user.username || null,
            firstName: user.firstName || null,
            lastName: user.lastName || null,
            imageUrl: user.imageUrl || null,
            createdAt: user.createdAt,
        });
    } catch (error) {
        console.error("❌ Clerk error:", error);
        res.status(500).json({ error: "Failed to fetch user profile" });
    }
});

module.exports = router;

const express = require('express');

let accounts = [];

const router = express.Router();

/**
 * GET /api/user → Get latest user
 */
router.get("/user", (req, res) => {
    if (accounts.length === 0) {
        return res.status(404).json({ message: "No user found" });
    }
    res.json(accounts[accounts.length - 1]);
});


/**
 * POST /api/user → Create account entry (based on Clerk profile)
 */
router.post("/user", (req, res) => {
    const { id, firstName, lastName, imageUrl, createdAt } = req.body;

    const newAccount = {
        id,
        fullname: `${firstName} ${lastName}`,
        description: "lorem lorem lorem",
        imageUrl: imageUrl || null,
        likes: 0,
        followers: 0,
        createdAt,
    };

    // only add if not already exists
    if (!accounts.find(acc => acc.id === id)) {
        accounts.push(newAccount);
    }

    res.status(201).json(newAccount);
});

/**
 * GET /api/accounts → Get all accounts
 */
router.get("/accounts", (req, res) => {
    res.json(accounts);
});

/**
 * PATCH /api/accounts/:id/like → increment likes
 */
router.patch("/accounts/:id/like", (req, res) => {
    const account = accounts.find(acc => acc.id === req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found" });

    account.likes += 1;
    res.json(account);
});

/**
 * PATCH /api/accounts/:id/follow → increment followers
 */
router.patch("/accounts/:id/follow", (req, res) => {
    const account = accounts.find(acc => acc.id === req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found" });

    account.followers += 1;
    res.json(account);
});

module.exports = router; 
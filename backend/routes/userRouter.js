const express = require("express");
const router = express.Router();
const User = require("../models/user");
router.post("/:userId/newcard", async (req, res) => {
  try {
    const { userId } = req.params;
    const { creditCardId } = req.body;
    const user = await User.findOne({
      googleId: userId,
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    console.log("credut card id", user.wallet);

    const cardExists = user.wallet.some(card => card.creditCardId.equals(creditCardId));

    if (cardExists) {
      console.log("card exists");
      return res.status(200).json({ success: false, message: "Card already exists. Try another card." });
    }

    user.wallet.push({
      creditCardId: creditCardId,
    });
    await user.save();

    return res.status(200).json({ success: true, message: "Card added successfully." });
    // user.cards.push(req.body);
    // await user.save();
    // res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add card  " });
  }
});

router.get("/:userId/cards", async (req, res) => {
  const { userId } = req.params;

  try {
    const usersCards = await User.findOne({
      googleId: userId,
    })
      .populate("wallet.creditCardId") // Populate card details
      .exec();

    const returnData = usersCards.wallet.map(card => {
      return {
        abbreviation: card.creditCardId.abbreviation,
        bankName: card.creditCardId.bankName,
        creditCardName: card.creditCardId.creditCardName,
        bonuses: card.creditCardId.bonuses,
        benefits: card.creditCardId.benefits,
        id: card.creditCardId.id,
      };
    });

    return res.status(200).json(returnData);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:userId/card/:creditCardId", async (req, res) => {
  const { userId, creditCardId } = req.params;

  if (!userId || !creditCardId) {
    return res.status(400).json({ message: "no user or credit card found" });
  }

  const result = await User.findOneAndUpdate(
    {
      googleId: userId,
    },
    {
      $pull: {
        wallet: {
          creditCardId: creditCardId,
        },
      },
    }
  );
  if (result) {
    return res.status(200).json({ message: "successflly delted" });
  }
});

module.exports = router;

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

    const cardExists = user.wallet.some(card => card.creditCardId.equals(creditCardId));

    if (cardExists) {
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
        imageUrl: card.creditCardId.imageUrl,
      };
    });

    return res.status(200).json(returnData);
  } catch (err) {
    console.log(err);
  }
});

function helper(wallet, category) {
  console.log("inside helper");
  console.log("wallet", wallet);

  const cardsWithCashback = wallet.map(cardWrapper => {
    console.log("cardWrapper", cardWrapper);
    const card = cardWrapper.creditCardId;
    const highestCashback = card.bonuses
      .filter(bonus => bonus.categories.includes(category))
      .reduce((max, bonus) => (bonus.value > max.value ? bonus : max), {
        value: 0,
      });
    return { ...card.toObject(), highestCashback: highestCashback.value };
  });
  // const sortedCards = wallet.sort((a, b) => {
  //   return (a.creditCardId.bonuses[0].cashback - b.creditCardId.bonuses[0].cashback && a.creditCardId.bonuses[0].cashback - b.creditCardId.bonuses[0].cashback) || a.creditCardId.bonuses[0].cashback - b.creditCardId.bonuses[0].cashback;
  // });
  // console.log("sortedCards", sortedCards);
  return cardsWithCashback;
}
router.get("/:userId/cards/:category", async (req, res) => {
  console.log("inside get user cards by category");
  const { userId, category } = req.params;
  //get uesrs cards
  //filter by category
  //then filter by which gives the highest cashback for the given category
  //from ascending order of cashback
  try {
    const usersWallet = await User.findOne({
      googleId: userId,
    })
      .populate("wallet.creditCardId")
      .exec();

    const filteredCards = usersWallet.wallet.filter(card => card.creditCardId.category.includes(category));
    usersWallet.wallet = filteredCards;
    console.log("usersWallet", usersWallet.wallet);

    // const sortedCards = helper(usersWallet.wallet, category);
    // console.log("sortedCards", cardsWithCashback);
    // usersWallet.wallet = cardsWithCashback;

    // console.log(usersWallet.wallet);
    // const returnData = usersWallet.wallet.map(card => {
    //   return {
    //     abbreviation: card.creditCardId.abbreviation,
    //     bankName: card.creditCardId.bankName,
    //     creditCardName: card.creditCardId.creditCardName,
    //     bonuses: card.creditCardId.bonuses,
    //     benefits: card.creditCardId.benefits,
    //     id: card.creditCardId.id,
    //     imageUrl: card.creditCardId.imageUrl,
    //   };
    // });

    // return res.status(200).json(returnData);
  } catch (err) {
    console.log(err);
  }
  // const { wallet } = usersWallet;
  // const cards = wallet.filter(card => card.creditCardId.category.includes(category));
  // console.log("cards", cards);

  // return res.status(200).json(cards);
  // console.log("category", category);
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

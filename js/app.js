// console.log('window is loaded');
// Object Oriented Programming
// We're going to continue using objects, giving them data and behaviors (methods). They will interact with one another to make our game work!
//
// The basic idea
// You are going to create a simple card game in which a player will be able to battle the autoplayer. The game will deal 3 cards (each of which has a damage value) to the player and three cards to the autoplayer. The player will choose a card, and the computer will randomly choose a card, and whichever's card has the highest value will win the point. A round is finished once this has happened three times.

// Example Play
// There are 18 Pokemon cards in the deck
// Eggbert (the player) is dealt three random cards from the deck
// The computer is dealt three random cards from the deck
// Eggbert chooses a card and plays it! It has a damage of 10.
// The computer randomly chooses a card and plays it! It has a damage of 8.
// Eggbert wins!
// The score is displayed:
//
// Score: Eggbert: 1, Computer: 0
// Rounds Won: Eggbert: 0, Computer: 0
// They do this again two more times. The round ends.
//
// The score is displayed. The rounds won are displayed.
//
// The game object
// For each part, think about:
//// The "UI"
// The user should see the following in the console:
//
// the scoreboard after each round
// the cards in the player's hand
// the cards in the computer's hand
// the cards that are in play
// the winner of each round (or if there was a tie)
// the winner of the game when the game is done
// the final score when the game is done

//////this will be a game object
//has a displayScoreBoard method that takes two players
//has a displayHands method that takes two players
//has a displayCardsInPlay method that takes two cards
//has a showWinner method that displays outcomes of rounds and hands
//has a done method that ends the game, displays the winner and final score
//has a playAgain method that prompts to play again and restarts the game

// What's the best data type for this property? Number? String? Array? object? boolean? Some crazy combination of these).
// Hint/reminder: use a property when you want to "keep track" of something
// Or should you create a method?
// Hint/reminder: use a method when you want to "do" something
// The game should be able to:
// keep a library of all the Pokemon cards that can be played (see the array in the "The Cards" section)
// set cardsArray as deck? good enough
const player1 = {
  name: "Player",
  hand: [],
  points: 0,
  rounds: 0
}

const player2 = {
  name: "Computer",
  hand: [],
  points: 0,
  rounds: 0
}

const game = {
  deck: cards.slice(),
  usedCards: [],
  done: false,

  displayScore: function() {
    console.log(`Score: ${player1.name}: ${player1.points}, ${player2.name}: ${player2.points}`);
    console.log(`Rounds Won: ${player1.name}: ${player1.rounds}, ${player2.name}: ${player2.rounds}`)
  },
  displayHand: function(player) {
    console.log(`${player.name} has the following hand:`)
    for (let i = 0; i < player.hand.length; i++) {
      const card = player.hand[i];
      console.log(card);
    }
  },
  displayDeckLength: function() {
    console.log(`There are ${this.deck.length} cards left in the deck.`)
  },
  displayUsedCards: function() {
    for (let i = 0; i < this.usedCards.length; i++) {
      console.log(this.usedCards[i]);
    }
  },

  // know what cards have been played
  // create two arrays - one of usedCards, populated with pokemon names that have already been selected from the deck.
  // and one of deck, that have not been selected.
  // if chosen, usedCards.push(card[i].name)
  // chooseCard can only select cards whose name is not in usedCards
    // create helper method to check if card is in usedCards - isUsedCard

  // know how many cards are left to be played/dealt doneall
  // use unplayedCards.length

  // automatically deal 3 cards from the library to the player and 3 cards to the computer each round
  // if playerHand.length = 0, dealCards
  // dealCards reads from deck, randomly adding to player and computer hands.
  // adds 3 cards

  pickRandomCard: function(cards) {
    const i = Math.floor(Math.random()*cards.length);
    randomCardArray = cards.splice(i, 1);
    randomCard = randomCardArray[0];
    return randomCard;
  },
  dealCards: function() {
    if (this.deck.length >= 6) {
      console.log("....New deal....")
      for (let i = 0; i < 3; i++) {
        player1.hand.push(this.pickRandomCard(this.deck));
        player2.hand.push(this.pickRandomCard(this.deck));
      }
    } else {
      console.log("Out of cards. Game over.")
      this.done = true;
    }
    },
  chooseCard: function(player) {
    let choice = prompt("Choose a card from your hand by typing a number. For example, if you have three cards in your hand, you could type 1, 2, or 3.");
    console.log(choice, "<----choice");
    console.log(choice > player.hand.length, "<----choice > player.hand.length");
    console.log(isNaN(Number(choice)), "isNaN(Number(choice))");
    if (choice > player.hand.length || isNaN(Number(choice))) {
      console.log("Incorrect entry, try again.")
      return this.chooseCard(player);
    } else {
      const cardArray = player.hand.splice(choice-1, 1);
      const card = cardArray[0];
      return card;
    }
  },
  checkPoints: function(player) {
    if (player.points >= 3) {
      console.log(`${player.name} wins the round. Points reset.`)
      player.rounds++
      player1.points = 0;
      player2.points = 0;
    }
  },
  battle: function(card1, card2) {
    console.log("!!!!!!!!!BATTLE!!!!!!!!")
    console.log(`Player chooses ${card1.name} for ${card1.damage} damage.`);
    console.log(`Computer chooses ${card2.name} for ${card2.damage} damage.`);
    if (card1.damage > card2.damage) {
      console.log(`${card1.name} defeats ${card2.name}. Player wins`)
      player1.points++
    } else if (card1.damage < card2.damage) {
      console.log(`${card2.name} defeats ${card1.name}. Computer wins`)
      player2.points++;
    } else {
      console.log(`${card1.name} and ${card2.name} defeat each other. Player and Computer Tie.`)
    }
    this.usedCards.push(card1);
    this.usedCards.push(card2);
    console.log(`The following cards have been used:`);
    this.displayUsedCards();
  },
  takeTurn: function() {
      if (player1.hand.length < 1) {
        this.dealCards();
        this.displayDeckLength();
      }
      if (!this.done) {
        this.displayHand(player1),
        this.displayHand(player2);
        let card1 = this.chooseCard(player1);
        let card2 = this.pickRandomCard(player2.hand);
        this.battle(card1, card2);
        this.checkPoints(player2);
        this.checkPoints(player1);
        this.displayScore();
        this.checkDone();
      }
  },
  checkDone: function() {
    if (this.done === true) {
      console.log("Out of cards. Game Over.")
    } else { this.takeTurn(); }
  },
}

//tableTop object could have player hands, scores, rounds, cards in play, playedcards
//


// track points for both the player and the computer Note: Points are determined by the following: If the player's card beats the computer's card, the player gets one point (and vice versa). If there is a tie, no one gets a point.
// determine the winner of each play
// if playerCard.strength > computerCard.strength, player.points++.
//else if playerCard.strength < computerCard.strength, computer.points++
// else nada
// displayScoreBoard method, can include both score and rounds


// track rounds
// if player.score >= 3 || computer.score >= 3, game.round++
// track number of rounds won for both player and computer





// The player object
// The player should be able to:
// see their stats: their points and how many rounds they've won.
// see what cards they have been dealt/see what cards are left in their hand
// pick a card from the hand that has been dealt to them (thereby playing this card agaist the computer's card). The round ends once this has happened 3 times.
// receive new cards given to them by the game each round.
// see the cards that they have played in the past.
////// players have points: num and hands: array. they can also have names for fun

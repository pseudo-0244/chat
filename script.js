// Blackjack game logic
let deck = [];
let dealerHand = [];
let playerHand = [];
let dealerScore = 0;
let playerScore = 0;
let gameOver = false;

// Create a deck of cards
function createDeck() {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ value: value, suit: suit });
    }
  }
}

// Shuffle the deck
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Deal a card from the deck
function dealCard() {
  return deck.pop();
}

// Calculate the score of a hand
function calculateScore(hand) {
  let score = 0;
  let hasAce = false;
  for (let card of hand) {
    if (card.value === 'Ace') {
      hasAce = true;
    }
    score += getCardValue(card.value);
  }
  if (hasAce && score + 10 <= 21) {
    score += 10;
  }
  return score;
}

// Get the value of a card
function getCardValue(value) {
  if (['Jack', 'Queen', 'King'].includes(value)) {
    return 10;
  } else if (value === 'Ace') {
    return 1;
  } else {
    return parseInt(value);
  }
}

// Initialize the game
function startGame() {
  deck = [];
  createDeck();
  shuffleDeck();
  dealerHand = [dealCard(), dealCard()];
  playerHand = [dealCard(), dealCard()];
  dealerScore = calculateScore(dealerHand);
  playerScore = calculateScore(playerHand);
  gameOver = false;
  updateUI();
}

// Hit action
function hit() {
  if (!gameOver) {
    playerHand.push(dealCard());
    playerScore = calculateScore(playerHand);
    if (playerScore > 21) {
      gameOver = true;
    }
    updateUI();
  }
}

// Stand action
function stand() {
  if (!gameOver) {
    while (dealerScore < 17) {
      dealerHand.push(dealCard());
      dealerScore = calculateScore(dealerHand);
    }
    gameOver = true;
    updateUI();
  }
}

// Determine the winner
function determineWinner() {
  if (playerScore > 21) {
    return 'Dealer wins!';
  } else if (dealerScore > 21 || playerScore > dealerScore) {
    return 'Player wins!';
  } else if (playerScore < dealerScore) {
    return 'Dealer wins!';
  } else {
    return 'It\'s a tie!';
  }
}

// Update the UI
function updateUI() {
  document.getElementById('dealer-hand').innerHTML = '';
  for (let card of dealerHand) {
    const img = document.createElement('img');
    img.src = `images/${card.value}_of_${card.suit}.png`;
    document.getElementById('dealer-hand').appendChild(img);
  }
  document.getElementById('dealer-score').textContent = dealerScore;

  document.getElementById('player-hand').innerHTML = '';
  for (let card of playerHand) {
    const img = document.createElement('img');
    img.src = `images/${card.value}_of_${card.suit}.png`;
    document.getElementById('player-hand').appendChild(img);
  }
  document.getElementById('player-score').textContent = playerScore;

  if (gameOver) {
    document.getElementById('message').textContent = determineWinner();
  }
}

// Initialize the game
startGame();

// Event listeners for buttons
document.getElementById('hit-button').addEventListener('click', hit);
document.getElementById('stand-button').addEventListener('click', stand);

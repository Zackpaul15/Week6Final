class Player {
    constructor(playerName,) {
        this.playerName = playerName;
        this.playerCards = [];
        this.playerPoints = 0;
    }
}

let player1 = new Player('Zack');
let player2 = new Player('Brian');

//takes suite rank and value to make the cards for the deck
class Card {
    constructor(suite, rank, value) {
        this.suite = suite;
        this.rank = rank;
        this.value = value;
    }
}
//this will make the deck using the Card class as a template
class Deck {
    constructor() {
        this.cards = [];
    }

    createDeck(){
        let suites = ['Clubs','Diamonds','Hearts','Spades'];
        let ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
        let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        for(let z = 0; z < suites.length; z++) {
            for(let i = 0; i < ranks.length; i++) {
                this.cards.push(new Card(suites[z], ranks[i], values[i]));
                
            }
        }
    }

    shuffleDeck() { 
        let deckShuffle = this.cards;
        let i = deckShuffle.length, rand, temp;
        while(--i > 0) {
            rand = Math.floor(Math.random() * (i +1)); 
            temp = deckShuffle[rand]; 
            deckShuffle[rand] = deckShuffle[i];
            deckShuffle[i] = temp;
        } 

    }

    dealDeck() {
        for(let i = 0; i < 52; i+=2) {
            let dealtCard1 = this.cards.pop();
            player1.playerCards.push(dealtCard1);
            let dealtCard2 = this.cards.pop();
            player2.playerCards.push(dealtCard2);
        }
    }
}



class Game {
    constructor() {
        this.Players = [];
    }

    startGame(){
        this.Players.push(player1);
        this.Players.push(player2);
        war.createDeck();
        war.shuffleDeck();
        war.dealDeck();
        this.rounds();
        this.score();
    }
// runs 26 rounds one for the number of cards in each players deck.
    rounds(){
        for (let round = 0; round < 26; round++) { 
			let playedCard1 = player1.playerCards.pop(); 
			let playedCard2 = player2.playerCards.pop(); 
			console.log(`
                        ROUND ${round + 1}: 
                ${player1.playerName} has a ${playedCard1.rank} of ${playedCard1.suite}.
                ${player2.playerName} has a ${playedCard2.rank} of ${playedCard2.suite}.`
                );

			if (playedCard1.value > playedCard2.value) {
				player1.playerPoints += 1;
				player2.playerPoints == 0;
				console.log(`${player1.playerName} is the winner of round ${round + 1}.`);

			} else if (playedCard1.value < playedCard2.value) {
				player1.playerPoints == 0;
				player2.playerPoints += 1;
				console.log(`${player2.playerName} is the winner of round ${round + 1}.`);

			} else if (playedCard1.value == playedCard2.value) {
				player1.playerPoints == 0;
				player2.playerPoints == 0;
				console.log(`Round ${round + 1} is a tie. no points awarded!`);
			}
		}
    }

    score(){
        let player1Final = player1.playerPoints;
		let player2Final = player2.playerPoints;
		console.log(`
            Final Scores are....
            ${player1.playerName} final score is ${player1Final}.
            ${player2.playerName} final score is ${player2Final}.
            `);

		if (player1.playerPoints > player2.playerPoints) {
			console.log(`
            ${player1.playerName} Wins!`);

		} else if (player1.playerPoints < player2.playerPoints) {
			console.log(`
            ${player2.playerName} Wins!`);

		} else {
			console.log("Tied game!");
		}
	}
    
}


let war = new Deck(); 

let start = new Game();
start.startGame();
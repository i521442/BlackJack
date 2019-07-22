const MAX_POINTS = 21;  //Max Points in BlackJack.

class BlackJack {   //The Constructor.
    constructor() {
        this.dealerCards = []; //Dealer Cards.
        this.playerCards = []; //Player Cards.
        this.dealerTurn = false;    //When True, Dealer Plays, Folded Card Unfolds.

        this.state = {  //Object With Game State.
            gameEnded: false,
            dealerWon: false,
            playerBusted: false
        };

        this.newDeck = function () {    //Creates a Clean Deck and Shuffles it.
            let cleanDeck = [];
            let index = 0;

            for(let a = 1; a <= 4; a++){
                for(let b = 1; b <= 13; b++){
                    cleanDeck[index] = new Card(b, this.setSuitString(a));
                    index++;
                }
            }
            return cleanDeck;
        };

        this.shuffle = function(cleanDeck){
            let varSave, randomIndex, integer;

            for(integer = cleanDeck.length - 1;  integer > 0; integer--){
                randomIndex = Math.floor(Math.random() * (integer + 1));
                varSave = cleanDeck[integer];
                cleanDeck[integer] = cleanDeck[randomIndex];
                cleanDeck[randomIndex] = varSave;
            }

            return cleanDeck;
        };

        //Self Made
        this.setSuitString = function(value){
            let suit = "";
            switch(value){
                case 1:
                    suit = "Spades";
                    break;
                case 2:
                    suit = "Diamonds";
                    break;
                case 3:
                    suit = "Clubs";
                    break;
                default:
                    suit = "Hearts";
                    break;
            }
            return suit;
        };

        this.cardDeck = this.shuffle(this.newDeck());   //Deck Cards.
    }

    getDealerCards() {    //Returns Dealer's Cards - New Array(slice).
        return this.dealerCards.slice();
    }

    getPlayerCards() {    //Returns Player's Cards - New Array(slice).
        return this.playerCards.slice();
    }

    setDealerTurn(val) {   //Activates dealerTurn.
        this.dealerTurn = val;
    }

    getCardsValue(cards) {   //Counts the cardDeck's score and returns it.
        let cardUtil = [];  //Utility array to save the cards numbers only.
        for(let a = 0; a < cards.length; a++){
            cardUtil[a] = cards[a].getCardNumber();
        }

        let noAces = cardUtil.filter(function (card) {return card != 1;}); //Array whitout the Aces.
        let figValueFix = noAces.map(function (c) {return c > 10 ? 10 : c;});  //Fixes Figures' Values.
        let scoreSum = figValueFix.reduce(function (scoreSum, value) {return scoreSum + value;}, 0); //Sets cards Score.
        let numAces = cards.length - noAces.length;  //Number of Aces in a deck.

        while (numAces > 0) {
            if (scoreSum + 11 > MAX_POINTS){
                scoreSum += 1;
            }else scoreSum += 11;
            --numAces;
        }
        return scoreSum;
    }

    playerMove() { //Gets cardDeck's next Card Onto playerCards.
        this.playerCards.push(this.cardDeck.shift());
        return this.getGameState();
    }

    dealerMove() {  //Gets cardDeck's next Card Onto dealerCards.
        this.dealerCards.push(this.cardDeck.shift());
        return this.getGameState();
    }

    getGameState() {    //Reviews The State Of The Game.
        let playerPts = this.getCardsValue(this.getPlayerCards());
        let dealerPts = this.getCardsValue(this.getDealerCards());

        let playerWon = playerPts === MAX_POINTS;
        let dealerBusted = this.dealerTurn && (dealerPts > MAX_POINTS);

        this.state.playerBusted = playerPts > MAX_POINTS;
        this.state.dealerWon = this.dealerTurn && (dealerPts > playerPts) && (dealerPts <= MAX_POINTS);
        this.state.gameEnded = playerWon || this.state.playerBusted || this.state.dealerWon || dealerBusted;

        return this.state;
    }


}

//Self Made
class Card{
    constructor(number, suit){
        this.number = number;
        this.suit = suit;
    }

    getCardNumber(){
        return this.number;
    }

    getCardSuit(){
        return this.suit;
    }
}
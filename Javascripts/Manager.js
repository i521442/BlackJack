let game = null;

function debug(an_object) {
    document.getElementById("debug").innerHTML = JSON.stringify(an_object);
}

function initializeButtons() {
    document.getElementById("hit").disabled = false;
    document.getElementById("pass").disabled = false;
    document.getElementById("newGame").disabled = true;
}

function finalizeButtons() {
    document.getElementById("hit").disabled = true;
    document.getElementById("pass").disabled = true;
    document.getElementById("newGame").disabled = false;
}

function newGame() {
    resetCrossCards();
    game = new BlackJack();
    dealerNewCard();
    playerNewCard(); playerNewCard();

    if(game.state.gameEnded) finalizeButtons();
    else initializeButtons();

}

function updatePlayer(state) {
    let playerCards = game.getPlayerCards();
    printPlayerCards(playerCards);
    document.getElementById("gameState").innerHTML = JSON.stringify("Player Has " + game.getCardsValue(playerCards) + " Points.");
    if(state.gameEnded){
        if(state.playerBusted){
            printPlayerCards(playerCards);
            document.getElementById("gameState").innerHTML = JSON.stringify("Player Busted, Dealer Won.");
        }else{
            printPlayerCards(playerCards);
            document.getElementById("gameState").innerHTML = JSON.stringify("Player Won.");
        }
        finalizeButtons();
    }

}

function updateDealer(state){
    let dealerCards = game.getDealerCards();
    if(state.gameEnded) {
        if(state.dealerWon){
            printDealerCards(dealerCards);
            document.getElementById("gameState").innerHTML = JSON.stringify("Dealer Won.");
        }else{
            printDealerCards(dealerCards);
            document.getElementById("gameState").innerHTML = JSON.stringify("Dealer Busted, Player Won.");
        }
        finalizeButtons();
    }
    printDealerCards(dealerCards);
}

//Self Made
function printPlayerCards(cards){
    for(let a = 0; a < cards.length; a++){
        let pathString = "Images/Cards/" + cards[a].getCardSuit() + "_" + cards[a].getCardNumber() + ".png";
        let cardImg = document.getElementById("playerCard" + (a+1) + "");
        cardImg.setAttribute("src", pathString);
    }
}

//Self Made
function printDealerCards(cards){
    for(let a = 0; a < cards.length; a++){
        let pathString = "Images/Cards/" + cards[a].getCardSuit() + "_" + cards[a].getCardNumber() + ".png";
        let cardImg = document.getElementById("dealerCard" + (a+1) + "");
        cardImg.setAttribute("src", pathString);
    }
}

//Self Made
function resetCrossCards(){
    for(let a = 0; a < 5; a++){
        let pathString = "Images/Cards/Cross.png";
        let dealerCards = document.getElementById("dealerCard" + (a+1) + "");
        let playerCards = document.getElementById("playerCard" + (a+1) + "");
        dealerCards.setAttribute("src", pathString);
        playerCards.setAttribute("src", pathString);
    }
}


function playerNewCard() {
    let state = game.playerMove();
    updatePlayer(state);
    return state;
}

function dealerNewCard() {
    let state = game.dealerMove();
    updateDealer(state);
    return state;
}

function dealerFinish() {
    game.setDealerTurn(true);
    let state = game.getGameState();
    do{dealerNewCard();}while(!state.gameEnded);
}


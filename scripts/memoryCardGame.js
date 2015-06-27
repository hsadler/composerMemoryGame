$(document).ready(function() {

  ////// GAMEBOARD SETUP CODE ///////

  // initial card image
  var initCard = "http://i.imgur.com/IiwRxCo.jpg";

  //add class to table datas: "gameCard"
  $('#gameBoard').find('td').addClass("gameCard");

  //add flip div html to table datas
  $('.gameCard').html('<div class="flip-container"><div class="flipper"><div class="card-front"></div><div class="card-back"></div></div></div>');

  //save audio location
  var composerAudio = document.getElementById("composerAudio");

  // declare variables
  var turn = 1;
  var playerTotalTurns = 0;
  var firstCardLoc = 0;
  var secondCardLoc = 0;
  var firstCardName = "";
  var secondCardName = "";
  var firstCardObj = {};
  var secondCardObj = {};
  var cardsFound = 0;
  var win = false;

  function initializeGameVariables() {
    turn = 1;
    playerTotalTurns = 0;
    firstCardLoc = 0;
    secondCardLoc = 0;
    firstCardName = "";
    secondCardName = "";
    firstCardObj = {};
    secondCardObj = {};
    cardsFound = 0;
    win = false;
  }

  // for card hide timing and force user to wait
  var timeoutID;
  var waitForGame = false;

  function waitForGameFalse() {
    waitForGame = false;
  }

  // 18 pairs of cards to be used on the board
  var memoryCardDeck = [
    {
      cardImg: 'http://i.imgur.com/QCrrHXrs.jpg',
      cardName: 'Pyotr Ilyich Tchaikovsky',
      cardWiki: 'http://en.wikipedia.org/wiki/Pyotr_Ilyich_Tchaikovsky',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/2/2d/Tchaikovsky%2C_Pyotr_Ilyich_-_Twelve_Pieces_for_piano%2C_Opus_40_%28extract%29.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/QCrrHXrs.jpg',
      cardName: 'Pyotr Ilyich Tchaikovsky',
      cardWiki: 'http://en.wikipedia.org/wiki/Pyotr_Ilyich_Tchaikovsky',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/2/2d/Tchaikovsky%2C_Pyotr_Ilyich_-_Twelve_Pieces_for_piano%2C_Opus_40_%28extract%29.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/exw1xths.jpg',
      cardName: 'Edward Elgar',
      cardWiki: 'http://en.wikipedia.org/wiki/Edward_Elgar',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/e/e4/Pomp_and_circumstances_No._1.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/exw1xths.jpg',
      cardName: 'Edward Elgar',
      cardWiki: 'http://en.wikipedia.org/wiki/Edward_Elgar',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/e/e4/Pomp_and_circumstances_No._1.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/WIuaMjjs.jpg',
      cardName: 'Johannes Brahms',
      cardWiki: 'http://en.wikipedia.org/wiki/Johannes_Brahms',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/7/75/Brahms-waltz01.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/WIuaMjjs.jpg',
      cardName: 'Johannes Brahms',
      cardWiki: 'http://en.wikipedia.org/wiki/Johannes_Brahms',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/7/75/Brahms-waltz01.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/URAu3s3s.jpg',
      cardName: 'Richard Wagner',
      cardWiki: 'http://en.wikipedia.org/wiki/Richard_Wagner',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/7/73/Richard_Wagner_-_Tristan_und_Isolde_-_Vorspiel.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/URAu3s3s.jpg',
      cardName: 'Richard Wagner',
      cardWiki: 'http://en.wikipedia.org/wiki/Richard_Wagner',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/7/73/Richard_Wagner_-_Tristan_und_Isolde_-_Vorspiel.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/Fj971cJs.jpg',
      cardName: 'Giuseppe Verdi',
      cardWiki: 'http://en.wikipedia.org/wiki/Giuseppe_Verdi',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/5/5a/La_Donna_E_Mobile_Rigoletto.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/Fj971cJs.jpg',
      cardName: 'Giuseppe Verdi',
      cardWiki: 'http://en.wikipedia.org/wiki/Giuseppe_Verdi',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/5/5a/La_Donna_E_Mobile_Rigoletto.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/HqAl3Tos.jpg',
      cardName: 'Wolfgang Amadeus Mozart',
      cardWiki: 'http://en.wikipedia.org/wiki/Wolfgang_Amadeus_Mozart',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/9/99/Wolfgang_Amadeus_Mozart_-_Symphony_40_g-moll_-_1._Molto_allegro.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/HqAl3Tos.jpg',
      cardName: 'Wolfgang Amadeus Mozart',
      cardWiki: 'http://en.wikipedia.org/wiki/Wolfgang_Amadeus_Mozart',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/9/99/Wolfgang_Amadeus_Mozart_-_Symphony_40_g-moll_-_1._Molto_allegro.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/mqC1jxJs.jpg',
      cardName: 'Frédéric Chopin',
      cardWiki: 'http://en.wikipedia.org/wiki/Fr%C3%A9d%C3%A9ric_Chopin',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/d/d8/Chopin_Prelude_Op_28_N_15_Giorgi_Latsabidze_performs.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/mqC1jxJs.jpg',
      cardName: 'Frédéric Chopin',
      cardWiki: 'http://en.wikipedia.org/wiki/Fr%C3%A9d%C3%A9ric_Chopin',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/d/d8/Chopin_Prelude_Op_28_N_15_Giorgi_Latsabidze_performs.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/HJ5CD92s.jpg',
      cardName: 'Ludwig van Beethoven',
      cardWiki: 'http://en.wikipedia.org/wiki/Ludwig_van_Beethoven',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/e/eb/Beethoven_Moonlight_1st_movement.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/HJ5CD92s.jpg',
      cardName: 'Ludwig van Beethoven',
      cardWiki: 'http://en.wikipedia.org/wiki/Ludwig_van_Beethoven',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/e/eb/Beethoven_Moonlight_1st_movement.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/CPGPMK6s.jpg',
      cardName: 'Claudio Monteverdi',
      cardWiki: 'http://en.wikipedia.org/wiki/Claudio_Monteverdi',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/3/3d/Orfeo_-_Toccata.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/CPGPMK6s.jpg',
      cardName: 'Claudio Monteverdi',
      cardWiki: 'http://en.wikipedia.org/wiki/Claudio_Monteverdi',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/3/3d/Orfeo_-_Toccata.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/iKNMyf2s.jpg',
      cardName: 'Joseph Haydn',
      cardWiki: 'http://en.wikipedia.org/wiki/Joseph_Haydn',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/1/12/The_Clock.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/iKNMyf2s.jpg',
      cardName: 'Joseph Haydn',
      cardWiki: 'http://en.wikipedia.org/wiki/Joseph_Haydn',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/1/12/The_Clock.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/UjcGnLMs.jpg',
      cardName: 'George Frideric Handel',
      cardWiki: 'http://en.wikipedia.org/wiki/George_Frideric_Handel',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/c/ce/Handel_-_messiah_-_44_hallelujah.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/UjcGnLMs.jpg',
      cardName: 'George Frideric Handel',
      cardWiki: 'http://en.wikipedia.org/wiki/George_Frideric_Handel',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/c/ce/Handel_-_messiah_-_44_hallelujah.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/ZLzrqGes.jpg',
      cardName: 'Antonín Dvořák',
      cardWiki: 'http://en.wikipedia.org/wiki/Anton%C3%ADn_Dvo%C5%99%C3%A1k',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/0/01/Dvo%C5%99%C3%A1k_-_Romance_Op._75_No._2.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/ZLzrqGes.jpg',
      cardName: 'Antonín Dvořák',
      cardWiki: 'http://en.wikipedia.org/wiki/Anton%C3%ADn_Dvo%C5%99%C3%A1k',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/0/01/Dvo%C5%99%C3%A1k_-_Romance_Op._75_No._2.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/J5qT07vs.jpg',
      cardName: 'Johann Sebastian Bach',
      cardWiki: 'http://en.wikipedia.org/wiki/Johann_Sebastian_Bach',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/d/d6/Brandenburg_No4-1_BWV1049.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/J5qT07vs.jpg',
      cardName: 'Johann Sebastian Bach',
      cardWiki: 'http://en.wikipedia.org/wiki/Johann_Sebastian_Bach',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/d/d6/Brandenburg_No4-1_BWV1049.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/5IXhtyes.jpg',
      cardName: 'Sergei Rachmaninoff',
      cardWiki: 'http://en.wikipedia.org/wiki/Sergei_Rachmaninoff',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/en/2/2c/Rachmaninoff_-_Vocalise_transcribed_for_Violin_and_Piano.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/5IXhtyes.jpg',
      cardName: 'Sergei Rachmaninoff',
      cardWiki: 'http://en.wikipedia.org/wiki/Sergei_Rachmaninoff',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/en/2/2c/Rachmaninoff_-_Vocalise_transcribed_for_Violin_and_Piano.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/NBQHe2ws.jpg',
      cardName: 'Gustav Mahler',
      cardWiki: 'http://en.wikipedia.org/wiki/Gustav_Mahler',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/d/d8/Mahler_Symphony_No_6_Andante_Moderato.ogg'
    },
    {
      cardImg: 'http://i.imgur.com/NBQHe2ws.jpg',
      cardName: 'Gustav Mahler',
      cardWiki: 'http://en.wikipedia.org/wiki/Gustav_Mahler',
      cardAudio: 'http://upload.wikimedia.org/wikipedia/commons/d/d8/Mahler_Symphony_No_6_Andante_Moderato.ogg'
    }
  ];

  var cardsInDeck = memoryCardDeck.length; //length for loops

  function addMemDeckParams () {
    var cardTypeCounter = 1;
    for (i = 0; i < cardsInDeck; i++) {
      memoryCardDeck[i].cardWiki += "?printable=yes";
      memoryCardDeck[i].cardLoc = 0;
      memoryCardDeck[i].cardType = cardTypeCounter;
      if ( (i + 2) % 2 !== 0 ) {
        cardTypeCounter++;
      }
    }
  }
  addMemDeckParams();

  //console.log(memoryCardDeck);

  //set param cardFound to false
  function setCardFoundFalse () {
    for (i = 0; i < cardsInDeck; i++) {
      memoryCardDeck[i].cardFound = false;
    }
  }

  /////// GAME START CODE ///////

  //shuffle array method added to Array prototype
  //shuffle with myArrayHere.shuffle();
  Array.prototype.shuffle = function (){
      var i = this.length, j, temp;
      if ( i === 0 ) return;
      while ( --i ) {
          j = Math.floor( Math.random() * ( i + 1 ) );
          temp = this[i];
          this[i] = this[j];
          this[j] = temp;
      }
  };

  // set card locations in object array, set data-card in html, set IDs of flipping divs
  function setCardData() {
    var cardID = "";
    for(i = 0; i < cardsInDeck; i++) { //setting card locations here..
      cardID = "#card" + (i + 1);
      memoryCardDeck[i].cardLoc = (i + 1); //setting card location
      $(cardID).data("card", (i + 1)); //setting html "data-card" here..
      $(cardID).find('.card-front').attr('id', "cardFront" + (i + 1)); //setting flipping div IDs here..
      $(cardID).find('.card-back').attr('id', "cardBack" + (i + 1));
    }
  }

  //set question mark image card fronts
  function setCardImagesFront() {
    $('.card-front').css("background-image", "url(" + initCard + ")");
  }
  setCardImagesFront();

  function setCardImagesBack() {
    var cardFrontID = "";
    var cardImage = "";
    for(i = 0; i < cardsInDeck; i++) {
      cardFrontID = "#cardBack" + (i + 1);
      cardImage = memoryCardDeck[i].cardImg;
      $(cardFrontID).css("background-image", "url(" + cardImage + ")");
    }
  }

  function showAllCards () {
    $('.flip-container').addClass('flip');
  }

  function hideAllCards() {
    $('.flip-container').removeClass('flip');
  }

  function initHeaderInfo () {
    $('#gameEndOverlay').addClass('hide');
    $('#restartWrapper').removeClass('hide');
    $('#composerHeaderHider').removeClass("hide");
    $('#gameStartOverlay').addClass('hide');
    $('#composerHeaderSubhead').html("&nbsp;");
    $('#composerName').html("Find the Composers!");
    $('#learnMoreWrapper').addClass("hide");
    $('#turnCounterWrapper').removeClass("hide");
    $('#turnCounter').html("turn: " + (playerTotalTurns + 1) );
  }

  ///////////// main game start function ///////////////
  function newGame() {
    waitForGame = true;

    memoryCardDeck.shuffle(); //shuffle deck

    initializeGameVariables(); //initialize variables

    initHeaderInfo(); // set header info

    setCardData(); //set card data

    setCardFoundFalse(); //initialize "cardFound" boolean parameter

    hideAllCards(); //hide cards

    timeoutID = window.setTimeout(setCardImagesBack, 200); //initialize card images (wait till cards hidden)
    setCardImagesFront();

    timeoutID = window.setTimeout(showAllCards, 500); //show all cards, then hide
    timeoutID = window.setTimeout(hideAllCards, 1500);
    timeoutID = window.setTimeout(waitForGameFalse, 1510);
  }


  ////// GAME PLAY CODE ///////

  // turn function
  function nextTurn() {
    if (turn === 1) {
      turn = 2;
    }
    else if (turn === 2) {
      turn = 1;
    }
  }

  //display card image
  function showHideCardImage (cardObj, showOrHide) {
    var cardID = "#card" + cardObj.cardLoc;
    var cardImage = cardObj.cardImg;
    if (showOrHide === "show"){
      $(cardID).find('.flip-container').addClass('flip');
    }
    else if (showOrHide === "hide") {
      $(cardID).find('.flip-container').removeClass('flip');
    }
  }

  //hide cards after wrong guess
  function hideWrongCards(firstCardObject, secondCardObject) {
    showHideCardImage (firstCardObject, "hide");
    showHideCardImage (secondCardObject, "hide");
  }

  function hideCards () {
    hideWrongCards(firstCardObj, secondCardObj);
  }

  //show composer info after correct guess
  function showComposerHeaderInfo () {
    $('#composerHeaderHider').removeClass("hide");
    $('#composerHeaderSubhead').html("you found...");
    $('#composerName').html(memoryCardDeck[secondCardLoc - 1].cardName);
    $('#learnMoreWrapper').removeClass("hide");
  }

  //preload "learn more" info
  function preloadComposerInfo () {
    $('#composerNameInfo').html(secondCardObj.cardName);
    $('#composerAudio').attr('src', secondCardObj.cardAudio);
    $('#composerIframe').attr('src', secondCardObj.cardWiki);
  }

  //learn more button function
  function showComposerOverlayInfo () {
    $('#composerHeaderHider').addClass("hide");
    $('#composerInfoOverlay').removeClass("hide");
    $('#restartWrapper').addClass('hide');
    composerAudio.play(); //autoplay audio
  }

  //close composer info
  function closeComposerInfo () {
    $('#composerInfoOverlay').addClass('hide');
    $('#composerHeaderHider').removeClass("hide");
    $('#restartWrapper').removeClass('hide');
    composerAudio.pause(); //stop audio
    composerAudio.currentTime = 0;
  }

  //check match
  function checkCardMatch (cardObj) {
    if (turn === 1) {
      firstCardLoc = $(cardObj).data('card');
      firstCardName = memoryCardDeck[firstCardLoc - 1].cardName;

      //save first card as object
      firstCardObj = memoryCardDeck[firstCardLoc - 1];

      //show first card...
      showHideCardImage(firstCardObj, "show");
      console.log("First Card Selection: " + firstCardName + "(" + firstCardLoc + ")");

      nextTurn();
      console.log("Turn: " + turn);
    }

    else if (turn === 2) {
      secondCardLoc = $(cardObj).data('card');
      secondCardName = memoryCardDeck[secondCardLoc - 1].cardName;

      //save second card as object
      secondCardObj = memoryCardDeck[secondCardLoc - 1];

      //show second card...
      showHideCardImage(secondCardObj, "show");
      console.log("Second Card Selection: " + secondCardName + "(" + secondCardLoc + ")");

      //probably don't need this "cardFound" check...
      if (memoryCardDeck[firstCardLoc - 1].cardFound === true ||
         memoryCardDeck[secondCardLoc - 1].cardFound === true ) {
         console.log("One or both of these cards has already been found..");
      }

      else if (firstCardLoc === secondCardLoc) {
        console.log("You picked the same card, dork!");
      }

      else if (firstCardName === secondCardName && firstCardLoc != secondCardLoc) {
        console.log("You Found a Match!");

        //show composer info
        showComposerHeaderInfo();

        //loads composer info for when "learn more" button is clicked
        preloadComposerInfo();

        //set "cardFound" booleans to true
        memoryCardDeck[firstCardLoc - 1].cardFound = true;
        memoryCardDeck[secondCardLoc - 1].cardFound = true;

        //add to variable "cardsFound"
        cardsFound += 1;
        console.log("Cards Found: " + cardsFound);

        nextTurn();
        //console.log("Turn: " + turn);
      }
      else {
        console.log("Not a Match... Try Again.");
        waitForGame = true;
        timeoutID = window.setTimeout(hideCards, 1000); // hide card images after delay
        timeoutID = window.setTimeout(waitForGameFalse, 1000);
        nextTurn();
        //console.log("Turn: " + turn);
      }
      playerTotalTurns++;
      $('#turnCounter').html("turn: " + (playerTotalTurns + 1) );
    }
  }

  function checkWin() {
    if((cardsFound * 2) != cardsInDeck){
      return;
    }
    else {
      for (i = 0; i < 10; i++){
        console.log("You've cleared the game!!!");
      }
      $('#gameEndOverlay').removeClass("hide");
      $('#composerHeaderHider').addClass("hide");
      //tell how many turns to complete game..
      $('#endGameTurnMessage').html("Completed in " + playerTotalTurns + " turns!");
      $('#turnCounterWrapper').addClass("hide");
    }
  }

  //evaluate the turn on card click
  $('.gameCard').click(function () {
    if (waitForGame === true) {
      console.log("You need to WAIT!");
    }
    else {
      var cardObj = this;
      var cardLocation = $(cardObj).data('card');
      var currentCardObj = memoryCardDeck[cardLocation -1];

      if (currentCardObj.cardFound === true) {
        console.log("Card already found!");
        console.log("Turn: " + turn);
      }
      else {
        checkCardMatch(cardObj);
      }
    }
    checkWin();
  });

  $('#composerLearnMore').on('click', function() {
    showComposerOverlayInfo();
  });

  $('#restartGameLink').on('click', function() {
    newGame();
  });

  $('#newGameButton').on('click', function() {
    newGame();
  });

});

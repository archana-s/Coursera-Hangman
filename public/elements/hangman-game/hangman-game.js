Polymer('hangman-game', {

  publish: {
    'game_state': null,
    'letterClickEvent': 'hangman:LetterClicked'
  },

  observe: {
    'game_state': 'checkGameStatus'
  },

  ready: function() {
    this.bindEvents();
    this.$.gameIO.style.display = "none";
    this.gameEnding = "";
  },

  bindEvents: function() {
    var self = this;
    this.addEventListener(this.letterClickEvent, function(evt){
      self.letterPressed(evt.detail.letter);
    });
  },

  resetGameControls: function() {
    this.$.gameIO.style.display = "block";
    this.gameEnding = "";
    this.$.trialsAvail.style.visibility = "visible";
    this.$.keyboard.resetKeyboard();
    this.$.keyboard.style.visibility = "visible";
  },

  startGame: function() {
    this.$.gameStarter.url = "/startGame";
    this.$.gameStarter.go();
    this.resetGameControls();
  },

  gameStartData: function(response) {
    this.game_state = response.detail.response;
    this.$.startGameBtn.disabled = true;
    this.$.startGameBtn.label = "Playing ...";
  },

  gameGuessed: function(response) {
    this.game_state = response.detail.response;
  },

  letterPressed: function(letter) {
    this.$.gameGuessing.params = '{"guess":"' + letter + '", "key":"' + this.game_state.game_key + '"}';
    this.$.gameGuessing.url = "/guessGame";
    this.$.gameGuessing.go();
  },

  checkGameStatus: function() {
    this.updateNumTrials();
    var stateNow = this.game_state.state.toLowerCase();
    if (stateNow === "lost" || stateNow === "won") {
      this.endGameSetUp();
      if(stateNow === "lost") this.gameEnding = "You've Lost";
      else if(stateNow === "won") this.gameEnding = "Congratulations! You've Won";
    }
  },

  updateNumTrials: function() {
    // convert the text to numeral and +1
    this.game_state.numeral_trials = parseInt(this.game_state.num_tries_left, 10) + 1;
  },

  endGameSetUp: function() {
    this.$.startGameBtn.disabled = false;
    this.$.startGameBtn.label = "Start New Game";
    this.$.keyboard.style.visibility = "hidden";
    this.$.trialsAvail.style.visibility = "hidden";
  }

});

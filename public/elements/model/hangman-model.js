Polymer('hangman-model', {

  publish: {
    'game_state': null
  },

  ready: function() {
    this.startGame();
  },

  startGame: function() {
    this.$.gameStarter.url = "/startGame";
    this.$.gameStarter.go();
  },

  gameStartData: function(response) {
    this.game_state = response.detail.response;
    console.log(this.game_state);
  },

});

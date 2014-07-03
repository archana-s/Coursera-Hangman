Polymer('letter-keyboard', {
  chosenLetter: null,
  clickEvent: null,

  ready: function() {
    this.buildKeyboard();
  },

  buildKeyboard: function() {
    var start = "a", end = "z";
    var letterArray = [];
    for(var i = start.charCodeAt(0); i <= end.charCodeAt(0); i++) {
       letterArray.push({"key": eval("String.fromCharCode(" + i + ")")});
    }
    this.$.keyboard.model = {"model": letterArray};
  },

  keyPressed: function(evt) {
    this.chosenLetter = evt.target.label;
    this.fire(this.clickEvent, {"letter": this.chosenLetter});
    evt.target.disabled = true;
  },

  resetKeyboard: function() {
    var letterBtns = this.$.board.getElementsByTagName("paper-button");
    for (var i=0; i<letterBtns.length; i++) {
      letterBtns[i].disabled = false;
    }
  }
});

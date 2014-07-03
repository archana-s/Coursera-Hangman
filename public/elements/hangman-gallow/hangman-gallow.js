(function(){

  var START_OPACITY = 0.1;
  var END_OPACITY = 1;

  Polymer('hangman-gallow', {

    publish: {
      num_tries_left: null
    },

    observe : {
      'num_tries_left': 'killMan'
    },

    ready: function(){
      this.aliveMan();
    },

    aliveMan: function() {
      this.$.manBody.style.opacity = START_OPACITY;
      this.$.manHead.style.opacity = START_OPACITY;
      this.$.manLHand.style.opacity = START_OPACITY;
      this.$.manRHand.style.opacity = START_OPACITY;
      this.$.manLLeg.style.opacity = START_OPACITY;
      this.$.manRLeg.style.opacity = START_OPACITY;
    },

    killMan: function() {
      switch(this.num_tries_left) {
      case "-1":
          this.$.manRHand.style.opacity = END_OPACITY;
          break;
        case "0":
          this.$.manLHand.style.opacity = END_OPACITY;
          break;
        case "1":
          this.$.manLLeg.style.opacity = END_OPACITY;
          break;
        case "2":
          this.$.manRLeg.style.opacity = END_OPACITY;
          break;
        case "3":
          this.$.manBody.style.opacity = END_OPACITY;
          break;
        case "4":
          this.$.manHead.style.opacity = END_OPACITY;
          break;
        case "5":
          this.aliveMan();
          break;
        default:
          this.aliveMan();
          break;
      }

    }


  });

})();

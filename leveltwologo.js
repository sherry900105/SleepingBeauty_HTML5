BasicGame.LevelTwoLogo = function (game) {
    //  Our main menu
    this.game = game;
};
BasicGame.LevelTwoLogo.prototype = {
    create: function () {
        "use strict";
        var image = this.game.add.image(0, 0, 'levelFinalLogo');
        this.game.time.events.add(Phaser.Timer.SECOND * 1, this.start, this)
    },

    update: function() {
        "use strict";
    },
    
    start: function () {
        "use strict";
        this.game.state.start('Game2');
    }
};

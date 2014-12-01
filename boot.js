var BasicGame = {};

BasicGame.Boot = function (game) {

};


BasicGame.Boot.prototype = {

    preload: function () {
        this.load.image('preloaderBar', 'assets/pics/preloader-bar.png');
        this.load.image('preloaderBack','assets/pics/preloader-backGround.png');
    },

    create: function () {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //      this.scale.minWidth = 480;
    //      this.scale.minHeight = 480;
    //      this.scale.maxWidth = 800;
    //      this.scale.maxHeight = 800;
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
            this.scale.setScreenSize(true);
        } else {
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 800x600"
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      //      this.scale.minWidth = 480;
      //      this.scale.minHeight = 480;
      //      this.scale.maxWidth = 800;
      //      this.scale.maxHeight = 800;
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
            this.scale.setScreenSize(true);
        }
        this.state.start('Preloader');

    }

};

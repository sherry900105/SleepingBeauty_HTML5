var emitter;

BasicGame.MainMenu = function (game) {
    "use strict";
    this.game = game;
};

BasicGame.MainMenu.prototype = {
    create: function () {
        "use strict";

        this.game.add.sprite(0, 0, 'mainmenu');
        
        var emitter = this.game.add.emitter(this.game.world.centerX, -32, 480);
        emitter.width = this.game.world.width * 1.5;
        emitter.makeParticles('snowflake');

        emitter.minParticleScale = 0.05;
        emitter.maxParticleScale = 1;
        emitter.gravity = 0;
        emitter.setYSpeed(20, 100);

        emitter.minRotation = 0;
        emitter.maxRotation = 40;

        emitter.start(false, 14000, 20);
        
        var button = this.game.add.button(750, 580, 'button-play', function(){
            this.game.state.start('LevelOneLogo');
        });
        
        button.anchor.setTo(0.5, 0.5);
        this.bindButtonHover(button);

        var credits = this.game.add.button(750, 680, 'button-credits', function(){
            this.game.state.start('Credits');
        });
        credits.anchor.setTo(0.5, 0.5);
        this.bindButtonHover(credits);
        
    },

    bindButtonHover: function(button) {
        "use strict";

        button.events.onInputOver.add(this.animateButtonIn, this);
        button.events.onInputOut.add(this.animateButtonOut, this);
    },

    animateButtonIn: function(button) {
        "use strict";

        this.game.add.tween(button.scale).to(
            { x: 1.05, y: 1.05 },
            150,
            Phaser.Easing.Back.Out,
            true,
            0,
            false
        ).start();
    },

    animateButtonOut: function(button) {
        "use strict";

        this.game.add.tween(button.scale).to(
            { x: 1, y: 1 },
            150,
            Phaser.Easing.Back.Out,
            true,
            0,
            false
        ).start();
    }
};


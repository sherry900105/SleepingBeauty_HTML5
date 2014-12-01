var emitter;

BasicGame.Credits = function (game) {
    "use strict";
    this.game = game;
};

BasicGame.Credits.prototype = {
    preload: function() {},

    create: function () {
        "use strict";

        this.game.add.sprite(0, 0, 'credits-background');
        
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
        
        var button = this.game.add.button(710, 650, 'button-back', function(){
            this.game.state.start('mainmenu');
        });
        
        button.anchor.setTo(0.5, 0.5);
        this.bindButtonHover(button);
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

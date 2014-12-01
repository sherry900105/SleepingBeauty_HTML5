
BasicGame.Preloader = function (game) {
    this.preloadBar = null;
};
 
BasicGame.Preloader.prototype = {

    preload: function () {
        this.stage.backgroundColor = '#161415';
        this.add.sprite(112, 0, 'preloaderBack');
        this.preloadBar = this.add.sprite(112, 0, 'preloaderBar');

        this.load.setPreloadSprite(this.preloadBar);
        
        this.load.audio('game-music', 'assets/music/game-music.mp3');
        this.load.audio('game-music2', 'assets/music/game-music2.mp3');
        this.load.audio('menu-music', 'assets/music/menu-music.mp3');
        this.load.audio('hit', 'assets/music/hit.mp3');
        this.load.audio('levelup', 'assets/music/levelup.mp3');     
        this.load.audio('blood', 'assets/music/blood.mp3');
        this.load.audio('lose', 'assets/music/lose.mp3');
        this.load.audio('key', 'assets/music/key.mp3');
        this.load.audio('gate', 'assets/music/gate.wav');

        this.load.image('alading', 'assets/pics/alading.png');
        this.load.image('sword1','assets/pics/sword1.png');
        this.load.image('sword2','assets/pics/sword2.png');
        this.load.image('sword3','assets/pics/sword3.png');
        this.load.image('shield1','assets/pics/shield1.png');
        this.load.image('shield2','assets/pics/shield2.png');
        this.load.image('shield3','assets/pics/shield3.png');
        this.load.image('button_alading', 'assets/pics/button.png');
        
        this.load.image('restartButton', 'assets/pics/restart.png');
        this.load.image('backmenu', 'assets/pics/backmenu.png');

        this.load.image('bloodBar','assets/pics/bloodbar.png');
        this.load.image('exBar','assets/pics/exBar.png');
        this.load.image('bloodBarBack', 'assets/pics/bloodBarBack.png');
        this.load.image('bubble', 'assets/pics/bubble.png');

        this.load.image('levelOneBg', 'assets/pics/levelOneBg.png');
        this.load.tilemap('level1map', 'assets/json/_LevelOne.json', null, Phaser.Tilemap.TILED_JSON);
        
        this.load.image('tilemap_lv2', 'assets/pics/tilemap_lv2.png');
        this.load.tilemap('level2map', 'assets/json/_LevelTwo.json', null, Phaser.Tilemap.TILED_JSON);
        
        
        this.load.image('boss_1','assets/pics/boss_1.png');
        this.load.image('boss_2','assets/pics/boss_2.png');
        this.load.image('boss_3','assets/pics/boss_3.png');
        this.load.image('boss_4','assets/pics/boss_4.png');
        this.load.image('boss_5','assets/pics/boss_5.png');
        this.load.image('boss_6','assets/pics/boss_6.png');
        this.load.image('npc_1','assets/pics/npc_1.png');
        this.load.image('npc_2','assets/pics/npc_2.png');
        this.load.image('npc_3','assets/pics/npc_3.png');
        this.load.image('npc_4','assets/pics/npc_4.png');
        this.load.image('npc_6','assets/pics/npc_6.png');
        this.load.image('npc_7','assets/pics/npc_7.png');
        this.load.image('npc_8','assets/pics/npc_8.png');
        
        this.load.image('bloodBag1', 'assets/pics/bloodBag1.png');
        this.load.image('bloodBag2', 'assets/pics/bloodBag2.png');
        
        this.load.image('conversation','assets/pics/conversation.png');
        this.load.image('conversation2','assets/pics/conversation2.png');
        
        this.load.image('door','assets/pics/door.png');
        this.load.image('lockedlogo', 'assets/pics/lockedlogo.png');
        this.load.image('youlose','assets/pics/youlose.png');

        this.load.image('key1','assets/pics/key1.png');
        this.load.image('key2','assets/pics/key2.png');
        this.load.image('key3','assets/pics/key3.png');
        this.load.image('key4','assets/pics/key4.png');
        this.load.image('key1icon','assets/pics/key1icon.png');
        this.load.image('key2icon','assets/pics/key2icon.png');
        this.load.image('key3icon','assets/pics/key3icon.png');
        this.load.image('key4icon','assets/pics/key4icon.png');

        this.load.image('blueClose', 'assets/pics/blueClose.png');
        this.load.image('yellowClose', 'assets/pics/yellowClose.png');
        this.load.image('redClose', 'assets/pics/redClose.png');
        this.load.image('exitClose', 'assets/pics/exitClose.png');

        this.game.load.spritesheet('spark', 'assets/pics/Spark.png', 120, 120, 5);
        this.game.load.spritesheet('biu', 'assets/pics/biu.png', 120, 120, 5);
        this.game.load.spritesheet('eating', 'assets/pics/eating600x600.png', 600, 600, 6);

        this.game.load.image('levelup', 'assets/pics/levelup.png');    
        this.game.load.image('headbg', 'assets/pics/headbg.png');
        this.game.load.image('headbg2', 'assets/pics/headbg2.png'); 

        this.load.spritesheet('player','assets/pics/player.png',46, 70);
        // ---- Story ---- //
        this.load.image('title','assets/backgrounds/title.png');
        this.load.image('intro-1','assets/backgrounds/1.png');
        this.load.image('intro-2','assets/backgrounds/2.png');
        this.load.image('intro-3','assets/backgrounds/3.png');
        this.load.image('intro-4','assets/backgrounds/4.png');
        this.load.image('intro-5','assets/backgrounds/5.png');
        this.load.image('intro-6','assets/backgrounds/6.png');
        this.load.image('intro-7','assets/backgrounds/7.png');
        this.load.image('intro-8','assets/backgrounds/8.png');
        this.load.image('intro-9','assets/backgrounds/9.png');
        this.load.image('gotyou','assets/backgrounds/gotyou.png');
        
        this.load.image('credits-background','assets/backgrounds/credits-background.png');
        this.game.load.spritesheet('snowflake','assets/backgrounds/snowflake.png',15,14);
        
        this.load.image('levelOneLogo','assets/backgrounds/levelOneLogo.png');
        this.load.image('levelFinalLogo','assets/backgrounds/levelFinalLogo.png');
        
        this.load.image('leveloneboss', 'assets/pics/leveloneboss.png');
        this.load.image('levelonebossdead', 'assets/pics/levelonebossdead.png');
        this.load.image('leveltwoboss', 'assets/pics/leveltwoboss.png');
        this.load.image('leveltwobossdead', 'assets/pics/leveltwobossdead.png');
        this.load.image('princess', 'assets/pics/princess.png');

        this.load.image('mainmenu','assets/backgrounds/mainmenu.png');
        this.load.image('button','assets/buttons/background.png');
        this.load.image('button-back','assets/buttons/back.png');
        this.load.image('button-check','assets/buttons/check.png');
        this.load.image('button-credits','assets/buttons/credits.png');
        this.load.spritesheet('button-skip','assets/buttons/arrow.png', 100, 50, 3);
        this.load.image('button-play','assets/buttons/play.png');
        
        this.load.script('gray', 'Gray.js');
    },

    create: function () {  
        this.state.start('intro');
    }
};

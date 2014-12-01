window.onload = function() {

    //  Create your Phaser game and inject it into the gameContainer div.
    var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'gameContainer');

    //  Add your game states 

    game.state.add('Boot', BasicGame.Boot);
    game.state.add('Preloader', BasicGame.Preloader);
    game.state.add('mainmenu', BasicGame.MainMenu);
    game.state.add('Game', BasicGame.Game);
    game.state.add('Game2', BasicGame.Game2);
    game.state.add('EndGame', BasicGame.EndGame);
    game.state.add('intro', BasicGame.Intro);
    game.state.add('LevelOneLogo', BasicGame.LevelOneLogo);
    game.state.add('LevelTwoLogo', BasicGame.LevelTwoLogo);
    game.state.add('Credits', BasicGame.Credits);
    game.state.add('happyending', BasicGame.happyending); 

    //  Now start from one state (usually Boot)
    game.state.start('Boot');

};

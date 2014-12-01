BasicGame.happyending = function (game) {
    "use strict";
    this.game = game;
};
var font = { mainFont: '"disney"' };
var content2 = [
    "",
    "The princess is lying on the bed, she is so beautiful.\n\I walk to the bed and kiss her.\n\Then I got killed by her smelly mouth......THE END......",
];
var index = 0;
var line = '';
var music;

BasicGame.happyending.prototype = {
    preload: function() {},
    
    create: function () {
        music.stop();      
        this.ending = this.game.add.sound('ending');
        this.ending.play();
        
        this.game.add.sprite(0, 60, 'gotyou');
        this.text = this.game.add.text(32, 600, '', { font: '30pt' +  font.mainFont, fill: '#ffffff'});
        
        this.skipbtn = this.game.add.button(660, 6, 'backtomenu', function(){
            this.game.state.start('mainmenu');
        }, this, 2, 1, 0);
        
        this.nextLine();
    },
    
    updateLine: function() {
        if (line.length < content2[index].length) {
            line = content2[index].substr(0, line.length + 1);
            this.text.setText(line);
        }
    },

    nextLine: function() {
        index++;
        if (index < content2.length) {
            line = '';
            this.game.time.events.repeat(80, content2[index].length + 1, this.updateLine, this);
        }
        
    }
};

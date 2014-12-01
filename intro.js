BasicGame.Intro = function (game) {

    //  Our main menu
    this.game = game;
};

var intro1;
var intro2;
var intro3;
var nextButton;
var introScreens = [];
var font = {
    mainFont: '"disney"'
};
var music;

var content = [
    " ",
    "Once upon a time, there was an ancient kingdom. The King and Queen \n\live Leisurely and Peacefully. But they were eager to have a child......",
    "Day after day, they prayed for having a baby. The God has finally \n\ been touched by their devotion, and made their dream come true......",
    "Fairies use their magic to bless the little pretty princess. \n\Every thing goes very well......",
    "But there was a lonely Dark Witch, she jealoused the beauty of the \n\princess, she hated the princess been concerned by the whole country......",
    "One night, she sneaked into the Palace and destroyed all the tributes.\n\She left a curse, if princess touch the spindle, she will fall asleep.\n\Forever......",
    "The King burned all the spindles in the country, commanded no one tells.\n\But he forgot the very one left in the Palace's tower......",
    "Time flies, the princess grown up, one day she found the spindle.\n\The curiosity made her touch the spindle.\n\The curse occured......",
    "The Dark Witch brought the princess back to the castle.\n\She planted heavy guards and sealed her soul......",
    "After years, A knight decided to rescue the pricess.\n\He loaded his faith and the love to the princess,\n\embarked on the dangerous journey......"
];

var index = 0;
var line = '';

BasicGame.Intro.prototype = {
    create: function () {
        "use strict";
        this.game.stage.backgroundColor = '#000000';
        
        this.skipbtn = this.game.add.button(890, 6, 'button-skip', function(){
            this.game.state.start('mainmenu');
        }, this, 2, 1, 0);
        
        var intro9 = this.game.add.sprite(0, 60, 'intro-9');
        var intro8 = this.game.add.sprite(0, 60, 'intro-8');
        var intro7 = this.game.add.sprite(0, 60, 'intro-7');
        var intro6 = this.game.add.sprite(0, 60, 'intro-6');
        var intro5 = this.game.add.sprite(0, 60, 'intro-5');
        var intro4 = this.game.add.sprite(0, 60, 'intro-4');
        var intro3 = this.game.add.sprite(0, 60, 'intro-3');
        var intro2 = this.game.add.sprite(0, 60, 'intro-2');
        var intro1 = this.game.add.sprite(0, 60, 'intro-1');
        var title = this.game.add.sprite(0, 60, 'title');
        
        intro9.inputEnabled = true;
        intro8.inputEnabled = true;
        intro7.inputEnabled = true;
        intro6.inputEnabled = true;
        intro5.inputEnabled = true;
        intro4.inputEnabled = true;
        intro3.inputEnabled = true;
        intro2.inputEnabled = true;
        intro1.inputEnabled = true;
        title.inputEnabled = true;

        intro9.events.onInputDown.add(this.nextSlide, this);
        intro8.events.onInputDown.add(this.nextSlide, this);
        intro7.events.onInputDown.add(this.nextSlide, this);
        intro6.events.onInputDown.add(this.nextSlide, this);
        intro5.events.onInputDown.add(this.nextSlide, this);
        intro4.events.onInputDown.add(this.nextSlide, this);
        intro3.events.onInputDown.add(this.nextSlide, this);
        intro2.events.onInputDown.add(this.nextSlide, this);
        intro1.events.onInputDown.add(this.nextSlide, this);
        title.events.onInputDown.add(this.nextSlide, this);

        introScreens = [title, intro1, intro2, intro3, intro4, intro5, intro6, intro7, intro8, intro9];
        music = this.game.add.audio('menu-music',1,true);                        
        music.play('',0,1,true);
        
        this.text = this.game.add.text(32, 620, '', { font: '30pt' +  font.mainFont, fill: '#ffffff'});
    },

    update: function() {
        "use strict";

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
            this.showMenu();
        }
    },

    nextSlide: function() {
        "use strict";

        if (introScreens.length > 1) {
            var nextScene = introScreens.shift();

            this.game.add.tween(nextScene)
                .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None)
                .start();
            this.nextLine();
        } else {
            this.showMenu();
        }

        if (line.length < content[index - 1].length)
        {
            line = content[index].substr(0, line.length + 1);
            // text.text = line;
            this.text.setText(line);
        }
        
    },

    updateLine: function() {
        if (line.length < content[index].length) {
            line = content[index].substr(0, line.length + 1);
            // text.text = line;
            this.text.setText(line);
        }
    },

    nextLine: function() {
        index++;
        if (index < content.length) {
            line = '';
            this.game.time.events.repeat(80, content[index].length + 1, this.updateLine, this);
        }
    },


    showMenu: function () {
        "use strict";

        this.game.state.start('mainmenu');
    }
};

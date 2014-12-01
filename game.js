var counter = 0;
var worldHeight = 768;
var worldWidth = 1024;
var music;

BasicGame.Game = function (game) {
    this.background;
    this.player;
    this.cursor;
    this.blockedlayer;
    this.bloodBar;
    this.player_currentBlood = 500;
    this.player_blood = 500;
    this.player_experience = 300;
    this.player_currentEx = 0;
    this.player_level = 1;
    this.player_attack = 500;
    this.player_defense = 300;
    this.npcNum = 1;
    this.shieldNum = 0;
    this.swordNum = 0;
    this.aladingNum = 0;
    this.key1value = 0, this.key2value = 0, this.key3value = 0, this.key4value = 0;
    this.key1label, this.key2label, this.key3label, this.key4label;
    this.key1label2, this.key2label2, this.key3label2, this.key4label2;
    
};
  


BasicGame.Game.prototype = {
    
    preload: function(){},
  
    create: function () {
        this.block = false;
        this.hitboss = false;
        this.player_currentBlood = 500;
        this.player_blood = 500;
        this.player_experience = 300;
        this.player_currentEx = 0;
        this.player_level = 1;
        this.player_attack = 500;
        this.player_defense = 300;
        this.npcNum = 1;
        this.shieldNum = 0;
        this.swordNum = 0;
        this.aladingNum = 0;
        music.stop();
        music = this.game.add.audio('game-music',1,true);                        
        music.play('',0,1,true);
                
        var screenShake = this.game.plugins.add(Phaser.Plugin.ScreenShake);
        this.game.plugins.screenShake = screenShake;
        // ---- Load TileMap assets ----//
        this.map = this.game.add.tilemap('level1map');
        this.map.addTilesetImage('levelOneBg', 'levelOneBg');
        this.map.addTilesetImage('boss_1', 'boss_1');
        this.map.addTilesetImage('boss_2', 'boss_2');
        this.map.addTilesetImage('npc_1', 'npc_1');
        this.map.addTilesetImage('npc_2', 'npc_2');
        this.map.addTilesetImage('boss_3', 'boss_3');
        this.map.addTilesetImage('conversation', 'conversation');
        this.map.addTilesetImage('door', 'door');
        
        this.map.addTilesetImage('bloodBag1', 'bloodBag1');
        this.map.addTilesetImage('bloodBag2', 'bloodBag2');
        // ---- Load animation assets ----//
        this.game.load.spritesheet('spark', 'assets/pics/Spark.png', 120, 120, 5);
        this.game.load.spritesheet('biu', 'assets/pics/biu.png', 120, 120, 5);
        this.game.load.spritesheet('eating', 'assets/pics/eating600x600.png', 600, 600, 6);
        this.game.load.image('levelup', 'assets/pics/levelup.png');
        

        
        // ---- Load Tilemap Layer ----//
        this.backgroundlayer = this.map.createLayer('floor');
        this.blockedlayer = this.map.createLayer('wall');
        this.map.setCollisionBetween(1, 2000, true, 'wall');
        this.blockedlayer.resizeWorld(); 
        
        // ---- Creat objects from tilemap ----//
        this.createNpcs();
        this.createbloodBags();
        this.createBoss();
        this.createConversation();
        this.createDoor();
        this.createAlading();
        this.createSwordsnShields();
        // ------------------------------------//
        this.headbg = this.game.add.image(0,25,'headbg');
        this.headbg.anchor.setTo(0, 0.5);
        this.headbg.fixedToCamera = true;
        

        
        // ---- Add Player ----//
        this.player = this.game.add.sprite(15, 2240, 'player');
        this.player.anchor.setTo(0, 0);
        this.game.physics.arcade.enable(this.player);
        this.game.camera.follow(this.player);
        
        // ---- Player Animations ----//
        this.player.animations.add("move_left", [19, 20, 21, 22, 23, 24], 10, true);
        this.player.animations.add("stand_left", [17], true);
        this.player.animations.add("move_right", [10, 11, 12, 13, 14, 15], 10, true);
        this.player.animations.add("stand_right", [25], true);
        this.player.animations.add("move_up", [28, 29, 30, 31, 32, 33], 10, true);
        this.player.animations.add("stand_up", [3], true);
        this.player.animations.add("move_down",[0, 1, 2, 3, 4, 5, 6], 10, true);
        this.player.animations.add("stand_down", [7], true);
        this.player.body.collideWorldBounds = true;
        // ---------------------------//

        // ---- Load bloodbar, expBar ----//
        this.barBack = this.game.add.sprite(180, 50, 'bloodBarBack');
        this.bloodBar = this.game.add.sprite(80, 50, 'bloodBar');
        this.bloodBar.anchor.setTo(0, 0.5);
        this.barBack.anchor.setTo(0.5, 0.5);
        this.barBack.fixedToCamera = true;
        this.bloodBar.fixedToCamera = true;

        this.barBack2 = this.game.add.sprite(460, 50, 'bloodBarBack');
        this.exBar = this.game.add.sprite(360, 50, 'exBar');
        this.exBar.anchor.setTo(0, 0.5);
        this.barBack2.anchor.setTo(0.5, 0.5);
        this.barBack2.fixedToCamera = true;
        this.exBar.fixedToCamera = true;
        this.exBar.scale.x = 0;

        this.blood_label = this.add.text(180, 55, "500/500", { font: "12px Elephant", fill: "#422a00" });
        this.blood_label.anchor.setTo(0.5, 0.5);
        this.blood_label.fixedToCamera = true;

        this.ex_label = this.add.text(460, 55, "0/300", { font: "12px Elephant", fill: "#422a00" });
        this.ex_label.anchor.setTo(0.5, 0.5);
        this.ex_label.fixedToCamera = true;

        this.levelLabel = this.add.text(650, 55, this.player_level, { font: "25px Elephant", fill: "#422a00" });
        this.levelLabel.anchor.setTo(0, 0.5);
        this.levelLabel.fixedToCamera = true;

        this.attackLabel = this.add.text(770, 55, this.player_attack, { font: "25px Elephant", fill: "#422a00" });
        this.attackLabel.anchor.setTo(0, 0.5);
        this.attackLabel.fixedToCamera = true;

        this.defenseLabel = this.add.text(922, 55,this.player_defense, { font: "25px Elephant", fill: "#422a00" });
        this.defenseLabel.anchor.setTo(0, 0.5);
        this.defenseLabel.fixedToCamera = true;
        
        this.lockedlogo = this.game.add.image(2200,100,'lockedlogo');
        this.lockedlogo.anchor.setTo(0, 0.5);

	this.game.add.tween(this.lockedlogo).to({ y:25 }, 4000, null, true, 0, Number.MAX_VALUE, true);
        
        
        
        // -------------------------------------------------//
        
        this.cursor = this.game.input.keyboard.createCursorKeys();
        
        
        // ---- Add Group of Spark, Biu, Eating Animations ----//
        this.spark = this.game.add.group();
        for (var i = 0; i < 10; i++){
            var explosionAnimation = this.spark.create(0, 0, 'spark', [0], false);
            explosionAnimation.anchor.setTo(0.5, 0.5);
            explosionAnimation.animations.add('spark');
        }  

        this.biu = this.game.add.group();
        for (var i = 0; i < 10; i++){
            var explosionAnimation = this.biu.create(0, 0, 'biu', [0], false);
            explosionAnimation.anchor.setTo(0.5, 0.5);
            explosionAnimation.animations.add('biu');
        }
        
        this.eating = this.game.add.group();
        for (var i = 0; i < 6; i++){
            var explosionAnimation = this.eating.create(worldWidth/2 - 300, worldHeight/2, 'eating', [0], false);
            explosionAnimation.anchor.setTo(0, 0.5);
            explosionAnimation.animations.add('eating');
            explosionAnimation.fixedToCamera = true;
        }
        // ---- Add Group of Spark, Biu, Eating Animations ----//
        
        
        for(var i = 0; i < this.npc.length; i++){
            var one_item = this.npc.getAt(i);
            var tween = this.game.add.tween(one_item).to({ x: one_item.body.x - 10 }, 1000, Phaser.Easing.Linear.None)
            .to({ x: one_item.body.x+10 }, 1000, Phaser.Easing.Linear.None)
            .loop()
            .start();
	}
      
  },
  
    update: function () {
        this.game.physics.arcade.collide(this.player, this.blockedlayer);
        this.game.physics.arcade.overlap(this.player, this.npc, this.collectNpc, null, this);
        this.game.physics.arcade.overlap(this.player, this.bloodBag1, this.collectbloodBag1, null, this);
        this.game.physics.arcade.overlap(this.player, this.bloodBag2, this.collectbloodBag2, null, this);
        this.game.physics.arcade.overlap(this.player, this.boss, this.collectBoss, null, this);
        this.game.physics.arcade.overlap(this.player, this.conversation, this.collectConversation, null, this);
        this.game.physics.arcade.overlap(this.player, this.door, this.collectDoor, null, this);
        this.game.physics.arcade.overlap(this.player, this.alading, this.collectAlading, null, this);
        this.game.physics.arcade.overlap(this.player, this.swords, this.collectSwords, null, this);
        this.game.physics.arcade.overlap(this.player, this.shields, this.collectShields, null, this);

        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 0;
        // ---- Control Player ----//
        if(this.cursor.up.isDown && this.block == false) {
            this.player.body.velocity.y -= 400;
            this.player.play('move_up');    
        }

        else if(this.cursor.down.isDown && this.block == false) {
            this.player.body.velocity.y += 400;
            this.player.play('move_down');    
        }

        else if(this.cursor.left.isDown && this.block == false) {
            this.player.body.velocity.x -= 400;
            this.player.play('move_left'); 
        }

        else if(this.cursor.right.isDown && this.block == false) {
            this.player.body.velocity.x += 400;
            this.player.play('move_right');
        }
    },
    
    createNpcs: function() {
        // ---- Create NPC Object ----//
        this.npc = this.game.add.group();
        this.npc.enableBody = true;  
        result = this.findObjectsByType('npc', this.map, 'ObjectLayer');
        result.forEach(function(element){
            this.createFromTiledObject(element, this.npc);
        }, this);
    },

    createbloodBags: function() {
      // ---- Create bloodbags Objects ----//
        this.bloodBag1 = this.game.add.group();
        this.bloodBag1.enableBody = true;
        this.map.createFromObjects('ObjectLayer', 151, 'bloodBag1', 0, true, false, this.bloodBag1);

        this.bloodBag2 = this.game.add.group();
        this.bloodBag2.enableBody = true;
        this.map.createFromObjects('ObjectLayer', 150, 'bloodBag2', 0, true, false, this.bloodBag2);
    },
    createBoss: function() {
        // ---- Create Boss Object ----//
        this.boss = this.game.add.group();
        this.boss.enableBody = true;   
        result = this.findObjectsByType('boss', this.map, 'ObjectLayer');
        result.forEach(function(element){
            this.createFromTiledObject(element, this.boss);
        }, this);
    },
    
    createConversation: function() {
        // ---- Create Boss Object ----//
        this.conversation = this.game.add.group();
        this.conversation.enableBody = true;   
        result = this.findObjectsByType('conversation', this.map, 'ObjectLayer');
        result.forEach(function(element){
            this.createFromTiledObject(element, this.conversation);
        }, this);
    },
    
    createDoor: function() {
        // ---- Create Boss Object ----//
        this.door = this.game.add.group();
        this.door.enableBody = true;   
        result = this.findObjectsByType('door', this.map, 'ObjectLayer');
        result.forEach(function(element){
            this.createFromTiledObject(element, this.door);
        }, this);
    },
    
    createAlading: function() {
        // ---- Create Alading ----//
        this.alading = this.game.add.group();
        this.alading.enableBody = true;
        this.map.createFromObjects('Alading',152, 'alading',0, true, false, this.alading);
    },

    createSwordsnShields: function(){
        // ---- Create Swords n Shields ----//
        this.swords = this.game.add.group();
        this.swords.enableBody = true;
        this.map.createFromObjects('SwordnShield',156, 'sword1', 0, true, false, this.swords);
        this.map.createFromObjects('SwordnShield',157, 'sword2', 0, true, false, this.swords);
        this.map.createFromObjects('SwordnShield',158, 'sword3', 0, true, false, this.swords);

        this.shields = this.game.add.group();
        this.shields.enableBody = true;
        this.map.createFromObjects('SwordnShield',153, 'shield1', 0, true, false, this.shields);
        this.map.createFromObjects('SwordnShield',154, 'shield2', 0, true, false, this.shields);
        this.map.createFromObjects('SwordnShield',155, 'shield3', 0, true, false, this.shields);

    },

    findObjectsByType: function(type, map, layer) {
        // ---- Find Objects From Tilemap by type ----//
        var result = new Array();
        map.objects[layer].forEach(function(element){
            if(element.properties.type === type) {
                element.y -= map.tileHeight;
                result.push(element);
            }      
        });
        return result;
    },

    createFromTiledObject: function(element, group) {
        // ---- Creat elements  ----//
        var sprite = group.create(element.x, element.y, element.properties.sprite);
        Object.keys(element.properties).forEach(function(key){
            sprite[key] = element.properties[key];
        });
    },

    collectNpc: function(player, collectable) {
        
        switch(this.npcNum){
            case 1:
                this.enermy_attack = 400;
                this.enermy_defense = 100;
                this.enermy_blood = 100;
                break;
            case 2:
                this.enermy_attack = 450;
                this.enermy_defense = 150;
                this.enermy_blood = 150;
                break;
            case 3:
                this.enermy_attack = 500;
                this.enermy_defense = 200;
                this.enermy_blood = 200;
                break;
            case 4:
                this.enermy_attack = 600;
                this.enermy_defense = 400;
                this.enermy_blood = 600;
                break;
            case 5:
                this.enermy_attack = 700;
                this.enermy_defense = 500;
                this.enermy_blood = 300;
                break;
            case 6:
                this.enermy_attack = 900;
                this.enermy_defense = 500;
                this.enermy_blood = 100;
                break;
            case 7:
                this.enermy_attack = 1000;
                this.enermy_defense = 500;
                this.enermy_blood = 300;
                break;
            case 8:
                this.enermy_attack = 1200;
                this.enermy_defense = 200;
                this.enermy_blood = 500;
                break;
            case 9:
                this.enermy_attack = 1000;
                this.enermy_defense = 800;
                this.enermy_blood = 800;
                break;
            case 10:
                this.enermy_attack = 1200;
                this.enermy_defense = 600;
                this.enermy_blood = 700;
                break;
            case 11:
                this.enermy_attack = 1400;
                this.enermy_defense = 800;
                this.enermy_blood = 800;
                break;
            case 12:
                this.enermy_attack = 1500;
                this.enermy_defense = 1000;
                this.enermy_blood = 1000;
                break;
            case 13:
                this.enermy_attack = 1900;
                this.enermy_defense = 1400;
                this.enermy_blood = 400;
                break;
            case 14:
                this.enermy_attack = 1500;
                this.enermy_defense = 1800;
                this.enermy_blood = 1300;
                break;
            case 15:
                this.enermy_attack = 1900;
                this.enermy_defense = 1600;
                this.enermy_blood = 1500;
                break;
            case 16:
                this.enermy_attack = 2300;
                this.enermy_defense = 2000;
                this.enermy_blood = 2000;
                break;
            case 17:
                this.enermy_attack = 2500;
                this.enermy_defense = 2100;
                this.enermy_blood = 2000;
                break;
            case 18:
                this.enermy_attack = 2700;
                this.enermy_defense = 1800;
                this.enermy_blood = 1200;
                break;
            case 19:
                this.enermy_attack = 3400;
                this.enermy_defense = 2000;
                this.enermy_blood = 500;
                break;
            case 20:
                this.enermy_attack = 3400;
                this.enermy_defense = 2000;
                this.enermy_blood = 800;
                break;
            case 21:
                this.enermy_attack = 3400;
                this.enermy_defense = 2000;
                this.enermy_blood = 800;
                break;
        }
        this.enermy_currentBlood = this.enermy_blood;
        
        while(this.player_currentBlood>0 && this.enermy_currentBlood>0 && (this.enermy_attack > this.player_defense || this.player_attack > this.enermy_defense)){
            if(this.enermy_attack > this.player_defense){
                this.player_currentBlood -= (this.enermy_attack - this.player_defense);
            }
            if(this.player_attack > this.enermy_defense){   
                this.enermy_currentBlood -= (this.player_attack - this.enermy_defense);
            }
            
        }
        this.player_currentEx += 100;

        if(this.player_currentBlood>0 && this.player_currentBlood<=this.player_blood){
        }else if(this.player_currentBlood<=0){
            this.endGame();
            this.player_currentBlood = 0;
            //gameover 
        }else if(this.player_currentBlood>this.player_blood){
            this.player_currentBlood = this.player_blood;
        }

        if(this.player_currentEx >= this.player_experience){
            this.block = true;
            this.game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                this.block = false;
            }, this);
            this.player_currentEx = 0;
            this.player_level ++;

            switch(this.player_level){
                case 2:
                    this.player_attack += 100;
                    this.player_defense += 100;
                    this.player_blood += 250;
                    break;
                case 3:
                    this.player_attack += 100;
                    this.player_defense += 100;
                    this.player_blood += 250;
                    break;
                case 4:
                    this.player_attack += 200;
                    this.player_defense += 200;
                    this.player_blood += 250;
                    break;
                case 5:
                    this.player_attack += 200;
                    this.player_defense += 200;
                    this.player_blood += 250;
                    break;
                case 6:
                    this.player_attack += 300;
                    this.player_defense += 300;
                    this.player_blood += 250;
                    break;
                case 7:
                    this.player_attack += 300;
                    this.player_defense += 300;
                    this.player_blood += 250;
                    break;
                case 8:
                    this.player_attack += 300;
                    this.player_defense += 300;
                    this.player_blood += 250;
                    break;
                default:
                    break;
            }

            // ----Show levelup logo and attack defense---- //
            this.levelup = this.game.add.sprite(worldWidth/2 - 300, worldHeight/2, 'levelup');
            this.levelup.anchor.setTo(0, 0.5);
            this.levelup.fixedToCamera = true;
            this.game.time.events.loop(Phaser.Timer.SECOND * 1.5, this.updatelevellogo, this);           
            
            this.levelUp = this.game.add.sound('levelup');
            this.levelUp.play();

            this.level = this.add.text(worldWidth/2 - 120, worldHeight/2 + 50, this.player_level, { font: "56px Elephant", fill: "#422a00" });
            this.level.anchor.setTo(0, 0.5);
            this.level.fixedToCamera = true;
            this.game.time.events.loop(Phaser.Timer.SECOND * 1.5, this.updatelevel, this);

            var levelupstyle = { font: "28px Elephant",fill: "#422a00"};
            this.attack = this.add.text(worldWidth/2 + 30, worldHeight/2 + 20, this.player_attack, levelupstyle);
            this.attack.anchor.setTo(0, 0.5);
            this.attack.fixedToCamera = true;
            this.game.time.events.loop(Phaser.Timer.SECOND * 1.5, this.updateattack, this);

            this.defense = this.add.text(worldWidth/2 + 30, worldHeight/2 + 140, this.player_defense, levelupstyle);
            this.defense.anchor.setTo(0, 0.5);
            this.defense.fixedToCamera = true;
            this.game.time.events.loop(Phaser.Timer.SECOND * 1.5, this.updatedefense, this);
        }
        
        this.bloodBar.scale.x = this.player_currentBlood/this.player_blood;
        this.blood_label.setText(this.player_currentBlood+"/"+this.player_blood);

        
        this.exBar.scale.x = this.player_currentEx/this.player_experience;
        this.bloodBar.scale.x = this.player_currentBlood/this.player_blood;
        this.blood_label.setText(this.player_currentBlood+"/"+this.player_blood);
        this.ex_label.setText(this.player_currentEx+"/"+this.player_experience);

        var style = { font: "28px Elephant",fill: "#000000"};

        this.levelLabel.setText(this.player_level, style);
        this.attackLabel.setText(this.player_attack, style);
        this.defenseLabel.setText(this.player_defense, style);

        this.npcNum++;
        collectable.destroy();
        
        this.enemyDead = this.game.add.sound('hit');
        this.enemyDead.play();
        
        this.game.plugins.screenShake.start(20);

        var explosionAnimation = this.biu.getFirstExists(false);
        explosionAnimation.reset(collectable.x + 40, collectable.y + 40);
        explosionAnimation.play('biu', 25, false, true);
    },

    updatelevellogo: function(){
        counter ++;
        this.levelup.visible = false; 
    },

    updatelevel: function(){
        counter ++;
        this.level.visible = false; 
    },

    updateattack: function(){
        counter ++;
        this.attack.visible = false; 
    },

    updatedefense: function(){
        counter ++;
        this.defense.visible = false; 
    },

    updateConversation: function(){
        this.block = false;
        this.conversationText.visible = false; 
    },
    
    updatebossdead: function(){
        this.bossdeadText.visible = false; 
    },

    updateDoor: function(){
        this.doorText.visible = false; 
    },

    collectShields: function(player, collectable){
        this.shieldNum++;
        switch(this.shieldNum){
            case 1:
                this.player_defense +=200;
                break;
            case 2:
                this.player_defense += 300;
                break;
            case 3:
                this.player_defense += 300;
                break;
            default:
                break;
        }
        var style = { font: "28px Elephant",fill: "#000000"};
        this.defenseLabel.setText(this.player_defense, style);
        collectable.destroy();
    },

    collectAlading: function(player, collectable){
        this.block = true;
        this.aladingNum++;
        var bl, at, de;
        switch(this.aladingNum){
            case 1:
                bl = 200;
                at = 200;
                de = 200;
                break;
            case 2:
                bl = 200;
                at = 200;
                de = 200;
                break;
            case 3:
                bl = 200;
                at = 200;
                de = 200;
                break;
            case 4:
                bl = 200;
                at = 200;
                de = 200;
                break;
            case 5:
                bl = 200;
                at = 200;
                de = 200;
                break;
            case 6:
                bl = 1000;
                at = 400;
                de = 400;
                break;    
            case 7:
                bl = 1000;
                at = 500;
                de = 500;
                break;
            default:
                bl = 200;
                at = 200;
                de = 200;
                break;
        }
        var button_Attack, button_Defense, button_Blood;
        var blLabel, atLabel, deLabel;
        button_Attack = this.game.add.button(480, 300, 'button_alading', function(){
            this.block = false;
            this.player_attack += at;
            button_Attack.destroy();
            button_Defense.destroy();
            button_Blood.destroy();
            blLabel.destroy();
            atLabel.destroy();
            deLabel.destroy();
            
            var style = { font: "28px Elephant",fill: "#000000"};
            this.attackLabel.setText(this.player_attack, style);
            this.defenseLabel.setText(this.player_defense, style);
            if(this.player_currentBlood > 0 && this.player_currentBlood <= this.player_blood){

            }else if(this.player_currentBlood <= 0){
                this.player_currentBlood = 0; 
            }else if(this.player_currentBlood > this.player_blood){
                this.player_currentBlood = this.player_blood;
            }
            this.bloodBar.scale.x = this.player_currentBlood / this.player_blood;
            this.blood_label.setText(this.player_currentBlood + "/" + this.player_blood); 
        },this,2,1,0);
        
        button_Defense = this.game.add.button(480, 400, 'button_alading', function(){
            this.block = false;
            this.player_defense += de;
            button_Attack.destroy();
            button_Defense.destroy();
            button_Blood.destroy();
            blLabel.destroy();
            atLabel.destroy();
            deLabel.destroy();
           
            var style = { font: "28px Elephant",fill: "#000000"};
            this.attackLabel.setText(this.player_attack, style);
            this.defenseLabel.setText(this.player_defense, style);
            if(this.player_currentBlood > 0 && this.player_currentBlood <= this.player_blood){

            }else if(this.player_currentBlood <= 0){
                this.player_currentBlood = 0; 
            }else if(this.player_currentBlood > this.player_blood){
                this.player_currentBlood = this.player_blood;
            }
            this.bloodBar.scale.x = this.player_currentBlood / this.player_blood;
            this.blood_label.setText(this.player_currentBlood + "/" + this.player_blood); 
        },this,2,1,0);
        
        button_Blood = this.game.add.button(480, 500, 'button_alading', function(){
            this.block = false;
            this.player_currentBlood += bl;
            button_Attack.destroy();
            button_Defense.destroy();
            button_Blood.destroy();
            blLabel.destroy();
            atLabel.destroy();
            deLabel.destroy();
            
            var style = { font: "28px Elephant",fill: "#000000"};
            this.attackLabel.setText(this.player_attack, style);
            this.defenseLabel.setText(this.player_defense, style);
            if(this.player_currentBlood > 0 && this.player_currentBlood <= this.player_blood){

            }else if(this.player_currentBlood <= 0){
                this.player_currentBlood = 0; 
            }else if(this.player_currentBlood > this.player_blood){
                this.player_currentBlood = this.player_blood;
            }
            this.bloodBar.scale.x = this.player_currentBlood / this.player_blood;
            this.blood_label.setText(this.player_currentBlood + "/" + this.player_blood); 
        },this,2,1,0);
        
        button_Attack.anchor.setTo(0.5, 0.5);
        button_Defense.anchor.setTo(0.5, 0.5);
        button_Blood.anchor.setTo(0.5, 0.5);
        button_Attack.fixedToCamera = true;
        button_Defense.fixedToCamera = true;
        button_Blood.fixedToCamera = true;
        
        atLabel = this.add.text(480, 300, "ADD ATTACK   " + at, { font: "25px Elephant", fill: "#422a00" });
        deLabel = this.add.text(480, 400, "ADD DEFENSE  " + de, { font: "25px Elephant", fill: "#422a00" });
        blLabel = this.add.text(480, 500, "ADD BLOOD    " + bl, { font: "25px Elephant", fill: "#422a00" });
        atLabel.anchor.setTo(0.5, 0.5);
        deLabel.anchor.setTo(0.5, 0.5);
        blLabel.anchor.setTo(0.5, 0.5);
        atLabel.fixedToCamera = true;
        deLabel.fixedToCamera = true;
        blLabel.fixedToCamera = true;
        
        collectable.destroy();
    },

    collectSwords: function(player, collectable){
        this.swordNum++;
        switch(this.swordNum){
            case 1:
                this.player_attack +=200;
                break;
            case 2:
                this.player_attack += 200;
                break;
            case 3:
                this.player_attack += 300;
                break;
            default:
                break;
        }
        var style = { font: "28px Elephant",fill: "#000000"};
        this.attackLabel.setText(this.player_attack, style);
        collectable.destroy();
    },

    collectbloodBag1: function(player, collectable) {
        this.block = true;
        this.game.time.events.add(Phaser.Timer.SECOND * 1, function(){
            this.block = false;
        }, this);
        this.player_currentBlood += 100;

        if(this.player_currentBlood > 0 && this.player_currentBlood <= this.player_blood){

        }else if(this.player_currentBlood <= 0){
            this.player_currentBlood = 0; 
        }else if(this.player_currentBlood > this.player_blood){
            this.player_currentBlood = this.player_blood;
        }
        this.bloodBar.scale.x = this.player_currentBlood / this.player_blood;
        this.blood_label.setText(this.player_currentBlood + "/" + this.player_blood); 

        collectable.destroy();
        var explosionAnimation = this.spark.getFirstExists(false);
        explosionAnimation.reset(collectable.x + 40, collectable.y + 40);
        explosionAnimation.play('spark', 25, false, true);

        var eatAnimation = this.eating.getFirstExists(false);
        eatAnimation.reset(0, 0);
        eatAnimation.play('eating', 10, false, true);
        
        this.healUp = this.game.add.sound('blood');
        this.healUp.play();
    },

    collectbloodBag2: function(player, collectable) {
        this.block = true;
        this.game.time.events.add(Phaser.Timer.SECOND * 1, function(){
            this.block = false;
        }, this);
        this.player_currentBlood += 200;

        if(this.player_currentBlood > 0 && this.player_currentBlood <= this.player_blood){

        }else if(this.player_currentBlood <= 0){
            this.player_currentBlood = 0; 
        }else if(this.player_currentBlood > this.player_blood){
            this.player_currentBlood = this.player_blood;
        }
        this.bloodBar.scale.x = this.player_currentBlood / this.player_blood;
        this.blood_label.setText(this.player_currentBlood + "/" + this.player_blood); 

        collectable.destroy();
        var explosionAnimation = this.spark.getFirstExists(false);
        explosionAnimation.reset(collectable.x + 40, collectable.y + 40);
        explosionAnimation.play('spark', 25, false, true);

        var eatAnimation = this.eating.getFirstExists(false);
        eatAnimation.reset(0, 0);
        eatAnimation.play('eating', 10, false, true);
        
        this.healUp = this.game.add.sound('blood');
        this.healUp.play();
    },

    collectBoss: function(player, collectable) {
        this.enermy_attack = 2600;
        this.enermy_defense = 3000;
        this.enermy_blood = 2000;
        
        this.enermy_currentBlood = this.enermy_blood;
        
        while(this.player_currentBlood>0 && this.enermy_currentBlood>0 && (this.enermy_attack > this.player_defense || this.player_attack > this.enermy_defense)){
            if(this.enermy_attack > this.player_defense){
                this.player_currentBlood -= (this.enermy_attack - this.player_defense);
            }
            if(this.player_attack > this.enermy_defense){   
                this.enermy_currentBlood -= (this.player_attack - this.enermy_defense);
            }
            
        }
        this.player_currentEx += 100;

        if(this.player_currentBlood>0 && this.player_currentBlood<=this.player_blood){
        }else if(this.player_currentBlood<=0){
            this.endGame();
            this.player_currentBlood = 0;
            //gameover 
        }else if(this.player_currentBlood>this.player_blood){
            this.player_currentBlood = this.player_blood;
        }

        
        this.bloodBar.scale.x = this.player_currentBlood/this.player_blood;
        this.blood_label.setText(this.player_currentBlood+"/"+this.player_blood);

        
        this.exBar.scale.x = this.player_currentEx/this.player_experience;
        this.bloodBar.scale.x = this.player_currentBlood/this.player_blood;
        this.blood_label.setText(this.player_currentBlood+"/"+this.player_blood);
        this.ex_label.setText(this.player_currentEx+"/"+this.player_experience);

        var style = { font: "28px Elephant",fill: "#000000"};

        this.levelLabel.setText(this.player_level, style);
        this.attackLabel.setText(this.player_attack, style);
        this.defenseLabel.setText(this.player_defense, style);

        this.npcNum++;
        collectable.destroy();
        
        this.bossdeadText = this.add.image(0, 675, 'levelonebossdead');
        this.bossdeadText.anchor.setTo(0, 0.5);
        this.bossdeadText.fixedToCamera = true;
        this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.updatebossdead, this);
        
//        music = this.game.add.audio('hit',1,true);                        
//        music.play('',0,1,true);
//        music.stop();
        
        this.game.plugins.screenShake.start(20);

        var explosionAnimation = this.biu.getFirstExists(false);
        explosionAnimation.reset(collectable.x + 40, collectable.y + 40);
        explosionAnimation.play('biu', 25, false, true);
        
        this.hitboss = true;
        
        this.lockedlogo.visible = false; 
        collectable.destroy();
        
        this.enemyDead = this.game.add.sound('hit');
        this.enemyDead.play();
    },
    
    collectConversation: function(player, collectable) {
        
        this.conversationText = this.add.image(0, 675, 'leveloneboss');
        this.conversationText.anchor.setTo(0, 0.5);
        this.conversationText.fixedToCamera = true;
        this.block = true;
        this.game.time.events.loop(Phaser.Timer.SECOND * 2, function(){
            this.block = false;
            this.conversationText.visible = false;
        }, this);
        collectable.destroy();
    },
    
    collectDoor: function(player, collectable) {
        if(this.hitboss === true){
            this.state.start('LevelTwoLogo');
            collectable.destroy();
        }      
    },
    
    endGame: function () {
        this.block = true;
        var gray = this.game.add.filter('Gray');
        this.player.filters = [gray];
        this.backgroundlayer.filters = [gray];
        this.blockedlayer.filters = [gray];
        this.npc.filters = [gray];
        this.boss.filters = [gray];
        this.bloodBag1.filters = [gray];
        this.bloodBag2.filters = [gray];
        this.alading.filters = [gray];
        this.swords.filters = [gray];
        this.shields.filters = [gray];
        this.headbg.filters = [gray];
//        this.game.paused = true;
        
        this.lose = this.game.add.image(132,130,'youlose');
        this.lose.fixedToCamera = true;
        music.stop();
        this.losegame = this.game.add.sound('lose');
        this.losegame.play();
//        music = this.game.add.audio('lose',1,true);                        
//        music.play('',0,1,true);
        
        this.restartButton = this.game.add.button(700, 512, 'restartButton', this.startGame,this, 2,1,0);
        this.restartButton.anchor.setTo(0.5, 0.5);
        this.restartButton.fixedToCamera = true;
        
        this.restartButton = this.game.add.button(350, 512, 'backmenu', this.backtomenu,this, 2,1,0);
        this.restartButton.anchor.setTo(0.5, 0.5);
        this.restartButton.fixedToCamera = true;
    },
    startGame: function () {
        this.game.state.start('LevelOneLogo');
    },
    backtomenu: function () {
        this.state.start('mainmenu');
    }
    
    
};

Phaser.Plugin.ScreenShake = function (game, parent) {
    Phaser.Plugin.call(this, game, parent);
    this.screenShakes = 0;
    this.shakedAt = 0;
};

Phaser.Plugin.ScreenShake.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.ScreenShake.prototype.constructor = Phaser.Plugin.ScreenShake;

Phaser.Plugin.ScreenShake.prototype.start = function (count) {
    if(this.game.time.now - this.shakedAt < 200) {
        return;
    }
    this.shakedAt = this.game.time.now;
    this.screenShakes = count;

    if (window.navigator && window.navigator.vibrate) {
      navigator.vibrate(count*10);
    }
  };

Phaser.Plugin.ScreenShake.prototype.postUpdate = function () {
    if (this.screenShakes > 0) {
      this.screenShakes--;
      var amt = this.screenShakes * 0.5;
      if (this.screenShakes % 2) {
        this.game.camera.y += amt;
      }
      else {
        this.game.camera.y -= amt;
      }
      this.game.camera.displayObject.position.y = -this.game.camera.view.y;
    }
}; 

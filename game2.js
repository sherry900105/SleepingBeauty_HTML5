var counter = 0;
var worldHeight = 768;
var worldWidth = 1024;
var hitboss = false;

BasicGame.Game2 = function (game) {
    this.background;
    this.player;
    this.cursor;
    this.blockedlayer;
    this.bloodBar;
    this.player_currentBlood = 2250;
    this.player_blood = 2250;
    this.player_experience = 300;
    this.player_currentEx = 0;
    this.player_level = 8;
    this.player_attack = 3100;
    this.player_defense = 3700;
    this.key1value = 0, this.key2value = 0, this.key3value = 0, this.key4value = 0;
    this.key1label, this.key2label, this.key3label, this.key4label;
    this.key1label2, this.key2label2, this.key3label2, this.key4label2;
    this.npcNum = 0;
};
  


BasicGame.Game2.prototype = {
    
    preload: function(){},
  
    create: function () {
        this.block = false;
        this.background;
        this.player;
        this.cursor;
        this.blockedlayer;
        this.bloodBar;
        this.player_currentBlood = 2250;
        this.player_blood = 2250;
        this.player_experience = 300;
        this.player_currentEx = 0;
        this.player_level = 8;
        this.player_attack = 3100;
        this.player_defense = 3700;
        this.key1value = 0, this.key2value = 0, this.key3value = 0, this.key4value = 0;
        this.key1label, this.key2label, this.key3label, this.key4label;
        this.key1label2, this.key2label2, this.key3label2, this.key4label2;
        this.npcNum = 1;
        
        music.stop();
        music = this.game.add.audio('game-music2',1,true);                        
        music.play('',0,1,true);
        
        var screenShake = this.game.plugins.add(Phaser.Plugin.ScreenShake);
        this.game.plugins.screenShake = screenShake;
        // ---- Load TileMap assets ----//
        this.map = this.game.add.tilemap('level2map');
        this.map.addTilesetImage('tilemap_lv2', 'tilemap_lv2');
        
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
        this.createAlading();
        this.createbloodBags();
        this.createBoss();
        this.createConversation1();
        this.createConversation2();
        this.createPrincess();
        this.createDoornKey();
        // ------------------------------------//
        this.headbg = this.game.add.image(0,25,'headbg');
        this.headbg.anchor.setTo(0, 0.5);
        this.headbg.fixedToCamera = true;
        
        
        // ---- Add Player ----//
        this.player = this.game.add.sprite(2260, 2230, 'player');
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

        this.blood_label = this.add.text(180, 55, "2250/2250", { font: "12px Elephant", fill: "#422a00" });
        this.blood_label.anchor.setTo(0.5, 0.5);
        this.blood_label.fixedToCamera = true;

        this.ex_label = this.add.text(460, 55, "0/100", { font: "12px Elephant", fill: "#422a00" });
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
        //doors and keys
        this.game.physics.arcade.overlap(this.player, this.blueKeys, this.collectBlue, null, this);
        this.game.physics.arcade.overlap(this.player, this.yellowKeys, this.collectYellow, null, this);
        this.game.physics.arcade.overlap(this.player, this.redKeys, this.collectRed, null, this);
        this.game.physics.arcade.overlap(this.player, this.exitKeys, this.collectExit, null, this);
        this.game.physics.arcade.overlap(this.player, this.exitDoor, this.collectExitDoor, null, this);
        this.game.physics.arcade.overlap(this.player, this.blueDoor, this.collectBlueDoor, null, this);
        this.game.physics.arcade.overlap(this.player, this.redDoor, this.collectRedDoor, null, this);
        this.game.physics.arcade.overlap(this.player, this.yellowDoor, this.collectYellowDoor, null, this);

        //  ---- NPC, BOSS, PRINCESS ----   //
        this.game.physics.arcade.overlap(this.player, this.npc, this.collectNpc, null, this);
        this.game.physics.arcade.overlap(this.player, this.bloodBag1, this.collectbloodBag1, null, this);
        this.game.physics.arcade.overlap(this.player, this.bloodBag2, this.collectbloodBag2, null, this);
        this.game.physics.arcade.overlap(this.player, this.alading, this.collectAlading, null, this);
        this.game.physics.arcade.overlap(this.player, this.boss, this.collectBoss, null, this);
        this.game.physics.arcade.overlap(this.player, this.princess, this.collectPrincess, null, this);
        this.game.physics.arcade.overlap(this.player, this.conversation1, this.collectConversation1, null, this);
        this.game.physics.arcade.overlap(this.player, this.conversation2, this.collectConversation2, null, this);
        this.game.physics.arcade.overlap(this.player, this.door, this.collectDoor, null, this);

        //update Keyicons
        this.key1label.setText(" "+this.key1value);
        this.key2label.setText(" "+this.key2value);
        this.key3label.setText(" "+this.key3value);
        this.key4label.setText(" "+this.key4value);

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
        this.map.createFromObjects('ObjectLayer', 52, 'boss_5', 0, true, false, this.npc);
        this.map.createFromObjects('ObjectLayer', 53, 'boss_6', 0, true, false, this.npc);
        this.map.createFromObjects('ObjectLayer', 54, 'npc_3', 0, true, false, this.npc);
        this.map.createFromObjects('ObjectLayer', 55, 'npc_4', 0, true, false, this.npc);
        this.map.createFromObjects('ObjectLayer', 56, 'npc_6', 0, true, false, this.npc);
        this.map.createFromObjects('ObjectLayer', 57, 'npc_7', 0, true, false, this.npc);
    },

    createbloodBags: function() {
      // ---- Create bloodbags Objects ----//
        // ---- Create bloodbags Objects ----//
        this.bloodBag1 = this.game.add.group();
        this.bloodBag1.enableBody = true;
        this.map.createFromObjects('ObjectLayer', 58, 'bloodBag1', 0, true, false, this.bloodBag1);

        this.bloodBag2 = this.game.add.group();
        this.bloodBag2.enableBody = true;
        this.map.createFromObjects('ObjectLayer', 59, 'bloodBag2', 0, true, false, this.bloodBag2);
    },

    createAlading: function() {
        // ---- Create Alading ----//
        this.alading = this.game.add.group();
        this.alading.enableBody = true;
        this.map.createFromObjects('ObjectLayer',69, 'alading',0, true, false, this.alading);
    },

    createBoss: function() {
        // ---- Create Boss Object ----//
        this.boss = this.game.add.group();
        this.boss.enableBody = true;   
        this.map.createFromObjects('ObjectLayer', 51, 'boss_4', 0, true, false, this.boss);
    },
    
    createPrincess: function() {
        // ---- Create Boss Object ----//
        this.princess = this.game.add.group();
        this.princess.enableBody = true;   
        this.map.createFromObjects('ObjectLayer', 60, 'npc_8', 0, true, false, this.princess);
    },
    
    
    createConversation1: function() {
        // ---- Create Boss Object ----//
        this.conversation1 = this.game.add.group();
        this.conversation1.enableBody = true;   
        result = this.findObjectsByType('conversation', this.map, 'ObjectLayer');
        result.forEach(function(element){
            this.createFromTiledObject(element, this.conversation1);
        }, this);
    },
    createConversation2: function() {
        // ---- Create Boss Object ----//
        this.conversation2 = this.game.add.group();
        this.conversation2.enableBody = true;   
        result = this.findObjectsByType('conversation2', this.map, 'ObjectLayer');
        result.forEach(function(element){
            this.createFromTiledObject(element, this.conversation2);
        }, this);
    },
    
    createDoornKey: function() {
        // ---- Create Doors n Keys Object ----//
        this.blueDoor = this.game.add.group();
        this.blueDoor.enableBody = true;
        this.redDoor = this.game.add.group();
        this.redDoor.enableBody = true;
        this.yellowDoor = this.game.add.group();
        this.yellowDoor.enableBody = true;
        this.exitDoor = this.game.add.group();
        this.exitDoor.enableBody = true;

        this.blueKeys = this.game.add.group();
        this.blueKeys.enableBody = true;
        this.redKeys = this.game.add.group();
        this.redKeys.enableBody = true;
        this.yellowKeys = this.game.add.group();
        this.yellowKeys.enableBody = true;
        this.exitKeys = this.game.add.group();
        this.exitKeys.enableBody = true;

        this.map.createFromObjects('ObjectLayer', 61, 'blueClose', 0, true, false, this.blueDoor);
        this.map.createFromObjects('ObjectLayer', 62, 'yellowClose', 0, true, false, this.yellowDoor);
        this.map.createFromObjects('ObjectLayer', 63, 'redClose', 0, true, false, this.redDoor);
        this.map.createFromObjects('ObjectLayer', 67, 'exitClose', 0, true, false, this.exitDoor);

        this.map.createFromObjects('ObjectLayer', 64, 'key1', 0, true, false, this.blueKeys);
        this.map.createFromObjects('ObjectLayer', 65, 'key2', 0, true, false, this.yellowKeys);
        this.map.createFromObjects('ObjectLayer', 66, 'key3', 0, true, false, this.redKeys);
        this.map.createFromObjects('ObjectLayer', 68, 'key4', 0, true, false, this.exitKeys);

        this.blueDoor.forEach(function(item) {
          item.body.immovable = true;
        }, this);
        this.redDoor.forEach(function(item) {
          item.body.immovable = true;
        }, this);
        this.yellowDoor.forEach(function(item) {
          item.body.immovable = true;
        }, this);
        this.exitDoor.forEach(function(item) {
          item.body.immovable = true;
        }, this);

        //create keys labels
        this.game.add.sprite(600, 70, 'key1icon').fixedToCamera = true;
        this.game.add.sprite(700, 70, 'key2icon').fixedToCamera = true;
        this.game.add.sprite(800, 70, 'key3icon').fixedToCamera = true;
        this.game.add.sprite(900, 70, 'key4icon').fixedToCamera = true;
        this.key1label = this.add.text(650, 71, "  0", { font: "30px Elephant", fill: "#dfdfdf" });
        this.key2label = this.add.text(750, 71, "  0", { font: "30px Elephant", fill: "#dfdfdf" });
        this.key3label = this.add.text(850, 71, "  0", { font: "30px Elephant", fill: "#dfdfdf" });
        this.key4label = this.add.text(950, 71, "  0", { font: "30px Elephant", fill: "#dfdfdf" });
        this.key1label.fixedToCamera = true;
        this.key2label.fixedToCamera = true;
        this.key3label.fixedToCamera = true;
        this.key4label.fixedToCamera = true;
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
                this.enermy_attack = 3800;
                this.enermy_defense = 2600;
                this.enermy_blood = 3000;
                break;
            case 2:
                this.enermy_attack = 3800;
                this.enermy_defense = 2800;
                this.enermy_blood = 3000;
                break;
            case 3:
                this.enermy_attack = 3600;
                this.enermy_defense = 3200;
                this.enermy_blood = 3500;
                break;
            case 4:
                this.enermy_attack = 4100;
                this.enermy_defense = 3200;
                this.enermy_blood = 3000;
                break;
            case 5:
                this.enermy_attack = 3800;
                this.enermy_defense = 3800;
                this.enermy_blood = 3800;
                break;
            case 6:
                this.enermy_attack = 4200;
                this.enermy_defense = 3600;
                this.enermy_blood = 1600;
                break;
            case 7:
                this.enermy_attack = 4400;
                this.enermy_defense = 4000;
                this.enermy_blood = 3000;
                break;
            case 8:
                this.enermy_attack = 4500;
                this.enermy_defense = 4000;
                this.enermy_blood = 4000;
                break;
            case 9:
                this.enermy_attack = 4700;
                this.enermy_defense = 4000;
                this.enermy_blood = 3600;
                break;
            case 10:
                this.enermy_attack = 4800;
                this.enermy_defense = 4800;
                this.enermy_blood = 4000;
                break;
            case 11:
                this.enermy_attack = 5000;
                this.enermy_defense = 4400;
                this.enermy_blood = 2000;
                break;
            case 12:
                this.enermy_attack = 5100;
                this.enermy_defense = 4800;
                this.enermy_blood = 4000;
                break;
            case 13:
                this.enermy_attack = 5400;
                this.enermy_defense = 4000;
                this.enermy_blood = 4500;
                break;
            case 14:
                this.enermy_attack = 5100;
                this.enermy_defense = 4000;
                this.enermy_blood = 4000;
                break;
            case 15:
                this.enermy_attack = 5300;
                this.enermy_defense = 4300;
                this.enermy_blood = 3000;
                break;
            case 16:
                this.enermy_attack = 5400;
                this.enermy_defense = 5000;
                this.enermy_blood = 5000;
                break;
            case 17:
                this.enermy_attack = 5600;
                this.enermy_defense = 4900;
                this.enermy_blood = 5400;
                break;
            case 18:
                this.enermy_attack = 5400;
                this.enermy_defense = 5000;
                this.enermy_blood = 5000;
                break;
            case 19:
                this.enermy_attack = 5900;
                this.enermy_defense = 4600;
                this.enermy_blood = 5400;
                break;
            case 20:
                this.enermy_attack = 5900;
                this.enermy_defense = 4600;
                this.enermy_blood = 5400;
                break;
            case 21:
                this.enermy_attack = 5700;
                this.enermy_defense = 5000;
                this.enermy_blood = 5000;
                break;
        }

        console.log(this.enermy_attack, this.enermy_defense, this.player_attack, this.player_defense);
        this.enermy_currentBlood = this.enermy_blood;
        
        while(this.player_currentBlood>0 && this.enermy_currentBlood>0 && (this.enermy_attack > this.player_defense || this.player_attack > this.enermy_defense)){
            if(this.enermy_attack > this.player_defense){
                this.player_currentBlood -= (this.enermy_attack - this.player_defense);
            }
            if(this.player_attack > this.enermy_defense){   
                this.enermy_currentBlood -= (this.player_attack - this.enermy_defense);
            }
            
        }
        if(this.enermy_attack <= this.player_defense && this.player_attack <= this.enermy_defense){
            this.endGame();
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
            if(this.player_level != 12){
                this.player_blood += 250;
                this.player_attack += 300;
                this.player_defense += 300;

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

    collectbloodBag1: function(player, collectable) {
        this.block = true;
            this.game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                this.block = false;
            }, this);
        this.player_currentBlood += 300;

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
        this.player_currentBlood += 500;

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

    collectAlading: function(player, collectable){
        this.block = true;
        this.aladingNum++;
        var bl = 500, at = 300, de = 300;
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
    updateConversation1: function(){
        this.conversationText1.visible = false; 
    },
    updateConversation2: function(){
        this.conversationText2.visible = false; 
    },
    updateDoor: function(){
        this.doorText.visible = false; 
    },
    
    collectBoss: function(player, collectable) {
      this.enermy_attack = 6300;
        this.enermy_defense = 5500;
        this.enermy_blood = 5500;
        
        this.enermy_currentBlood = this.enermy_blood;
        
        while(this.player_currentBlood>0 && this.enermy_currentBlood>0 && (this.enermy_attack > this.player_defense || this.player_attack > this.enermy_defense)){
            if(this.enermy_attack > this.player_defense){
                this.player_currentBlood -= (this.enermy_attack - this.player_defense);
            }
            if(this.player_attack > this.enermy_defense){   
                this.enermy_currentBlood -= (this.player_attack - this.enermy_defense);
            }
            
        }
        if(this.enermy_attack <= this.player_defense && this.player_attack <= this.enermy_defense){
            this.endGame();
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
        
        this.bossdeadText = this.add.image(0, 675, 'leveltwobossdead');
        this.bossdeadText.anchor.setTo(0, 0.5);
        this.bossdeadText.fixedToCamera = true;
        this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.updatebossdead, this);
        
        music = this.game.add.audio('hit',1,true);                        
        music.play('',0,1,true);
        music.stop();
        
        this.game.plugins.screenShake.start(20);

        var explosionAnimation = this.biu.getFirstExists(false);
        explosionAnimation.reset(collectable.x + 40, collectable.y + 40);
        explosionAnimation.play('biu', 25, false, true);
        
        this.hitboss = true;
        
        collectable.destroy();
    },
    collectPrincess: function(player, collectable) {
         this.state.start('happyending');
    },
    
    updatebossdead: function(){
        this.bossdeadText.visible = false; 
    },
    
    collectConversation1: function(player, collectable) {
        this.block = true;
            this.game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                this.block = false;
            }, this);
        this.conversationText1 = this.add.image(0, 675, 'leveltwoboss');
        this.conversationText1.anchor.setTo(0, 0.5);
        this.conversationText1.fixedToCamera = true;
        this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.updateConversation1, this);
        collectable.destroy();
    },
    collectConversation2: function(player, collectable) {
        this.block = true;
            this.game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                this.block = false;
            }, this);
        this.conversationText2 = this.add.image(0, 675, 'princess');
        this.conversationText2.anchor.setTo(0, 0.5);
        this.conversationText2.fixedToCamera = true;
        this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.updateConversation2, this);
        collectable.destroy();
    },
    
    collectBlueDoor: function(player, collectable) {
        if(this.key1value > 0){
          this.key1value--;
          collectable.destroy();
          this.opendoor = this.game.add.sound('gate');
          this.opendoor.play();
        }else{
          this.game.physics.arcade.collide(player, collectable);
        }
    },

    collectYellowDoor: function(player, collectable) {
        if(this.key2value > 0){
          this.key2value--;
          collectable.destroy();
          this.opendoor = this.game.add.sound('gate');
          this.opendoor.play();
        }else{
          this.game.physics.arcade.collide(player, collectable);
        }
    },

    collectRedDoor: function(player, collectable) {
        if(this.key3value > 0){
          this.key3value--;
          collectable.destroy();
          this.opendoor = this.game.add.sound('gate');
          this.opendoor.play();
        }else{
          this.game.physics.arcade.collide(player, collectable);
        }
    },

    collectExitDoor: function(player, collectable) {
        if(this.key4value > 0){
          this.key4value--;
          collectable.destroy();
        }else{
          this.game.physics.arcade.collide(player, collectable);
        }
    },

    collectBlue: function(player, collectable) {
        this.key1value++;

        //remove sprite
        collectable.destroy();
        
        this.getkey = this.game.add.sound('key');
        this.getkey.play();
    },

    collectYellow: function(player, collectable) {
        this.key2value++;
        //remove sprite
        collectable.destroy();
        
        this.getkey = this.game.add.sound('key');
        this.getkey.play();
    },

    collectRed: function(player, collectable) {
        this.key3value++;
        
        //remove sprite
        collectable.destroy();
        
        this.getkey = this.game.add.sound('key');
        this.getkey.play();
    },

    collectExit: function(player, collectable) {
        this.key4value++;
        
        //remove sprite
        collectable.destroy();
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
        this.headbg.filters = [gray];
        this.princess.filters = [gray];
        
        this.blueDoor.filters = [gray];
        this.redDoor.filters = [gray];
        this.yellowDoor.filters = [gray];
        this.exitDoor.filters = [gray];

        this.blueKeys.filters = [gray];
        this.redKeys.filters = [gray];
        this.yellowKeys.filters = [gray];
        this.exitKeys.filters = [gray];
        
        this.lose = this.game.add.image(132,130,'youlose');
        this.lose.fixedToCamera = true;
        
        this.restartButton = this.game.add.button(700, 512, 'restartButton', this.startGame,this, 2,1,0);
        this.restartButton.anchor.setTo(0.5, 0.5);
        this.restartButton.fixedToCamera = true;
        
        this.restartButton = this.game.add.button(350, 512, 'backmenu', this.backtomenu,this, 2,1,0);
        this.restartButton.anchor.setTo(0.5, 0.5);
        this.restartButton.fixedToCamera = true;
    },
    startGame: function () {
        this.state.start('Game2');
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

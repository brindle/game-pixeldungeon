// create player
// set player stats
// name=player1, lvl=1, hp=10 atk=1
// setup first stage
  // change stage id to stage 1
// create monster level1
// show player1 actions menu
// get player choice
// run choice (attack / defend /inventory)
// decide what monster will do
// compare player atk to monster def
// lower monster hp from remainder if
// repeat until monster or player is dead
// if monster dies, play effect and remove
// show confirmation player won
// display loot won
// add loot to player inventory and next button
// display stage-select
// player choose route A / B etc
// send option to stage select
// check if option requires key
// check if player has key in inventory - if so allow option.
// SET CURRENT STAGE

// ? can a player go back or only forward?
// ? how do they win. limited dungeon?
// ? difficulty curve by room or floor?
// ? inventory too hard? get basic battle done first
// inventory items do things on battle field
// must always provide one route out even if got no keys

// // BEGIN CODE
// function Character(type, name, lvl, hp, sp, atk, def, spd) {
//   this.type = "fighter";
//   this.name = name;
//   this.lvl  = lvl;
//   this.hp   = hp;
//   this.sp   = sp;
//   this.atk  = atk;
//   this.def  = def;
//   this.spd  = spd;
//   this.spc  = [];
//   this.inv  = [];
//   this.alive = function() {
//     return this.hp > 0; 
//   };
//   this.addSpecial = function(name, type, damange) {
//     var move = {
//       name: name,
//       type: type,
//       damange: damage
//     }
//     this.spc.push(move);
//   }
// }

// new Character()

// debugger


// create player and set stats
// ? constructor in future?
var player = {};
player.name = "Jeff";
player.type = "Fighter";
player.lvl = 1;
player.hp = 10;
player.sp = 10;
player.atk = 3;
player.def = 1;
player.spd = 1;
player.spc = [];
player.inv = [];
player.exp = 100;
player.alive = function() {return player.hp > 0 };

console.log(player.spc);
// create monster and set stats
// ? constructor based on type / level?
var monster = {};
monster.name = "";
monster.type = "";
monster.lvl = 0;
monster.hp = 0;
monster.sp = 0;
monster.atk = 0;
monster.def = 0;
monster.spd = 0;
monster.spc = [""];
monster.inv = [];
monster.exp = 100;
monster.alive = function() {return stageMonster.hp > 0 };

// create current stage monster used in stageSetup
var stageMonster = {};
stageMonster.name = "";
stageMonster.type = "";
stageMonster.lvl = 1;
stageMonster.hp = 10;
stageMonster.sp = 10;
stageMonster.atk = 1;
stageMonster.def = 1;
stageMonster.spd = 1;
stageMonster.spc = {};
stageMonster.inv = [];
stageMonster.exp = 1;
stageMonster.alive = function() {return stageMonster.hp > 0 };


// stageMonster.spc["spook"];

var monsterRat = {};
monsterRat.name = "Ratty";
monsterRat.type = "Rat";
monsterRat.lvl = 1;
monsterRat.hp = 5;
monsterRat.sp = 10;
monsterRat.atk = 2;
monsterRat.def = 1;
monsterRat.spd = 1;
monsterRat.spc = [{"bite" : stageMonster.atk * 2, "kill" : 100}];
monsterRat.inv = [];
monsterRat.exp = 10;

var monsterGhost = {};
monsterGhost.name = "Boo";
monsterGhost.type = "Ghost";
monsterGhost.lvl = 2;
monsterGhost.hp = 10;
monsterGhost.sp = 10;
monsterGhost.atk = 3;
monsterGhost.def = 1;
monsterGhost.spd = 1;
monsterGhost.exp = 20;
monsterGhost.spc = [{"spook" : stageMonster.atk * 2, "kill" : 100}];
monsterGhost.inv = [];

var monsterSkeleton = {};
monsterSkeleton.name = "Skelly";
monsterSkeleton.type = "Skeleton";
monsterSkeleton.lvl = 2;
monsterSkeleton.hp = 10;
monsterSkeleton.sp = 10;
monsterSkeleton.atk = 1;
monsterSkeleton.def = 1;
monsterSkeleton.spd = 1;
monsterSkeleton.exp = 30;
monsterSkeleton.spc = [{"bash" : stageMonster.atk * 2, "kill" : 100}];
monsterSkeleton.inv = [];

var monsterBlob = {};
monsterBlob.name = "Gloopy";
monsterBlob.type = "Blob";
monsterBlob.lvl = 4;
monsterBlob.hp = 20;
monsterBlob.sp = 10;
monsterBlob.atk = 3;
monsterBlob.def = 2;
monsterBlob.spd = 1;
monsterBlob.exp = 40;
monsterBlob.spc = [{"squidge" : stageMonster.atk * 3, "kill" : 100}]
monsterBlob.inv = [];

// !!! UNDEAD BOSS
// starts off with -hp need to heal it to kill it.
// if healed over 1hp turns into an alive creature
// then can be killed normally

// SPRITE VARIABLES

var spriteDisplay = $("#display");
var spriteStage = $("#stage");
var spritePlayer1 = $("player1");
var spriteMonster1 = $("monster1");
var spritePlayer1Menu = $("#player1-menu");
var spritePlayer1MenuSpc = $("#player1-menu-spc");
var spritePlayer1MenuInv = $("#player1-inventory");

// setup player buttons
var btnPlayer1 = {};
btnPlayer1.atk = $("#btn-p1-atk");
btnPlayer1.def = $("#btn-p1-def");
btnPlayer1.spc = $("#btn-p1-spc");
btnPlayer1.inv = $("#btn-p1-inv");



// STAGE SETUP

var currentStage = 1;

var stageSetup = function(currentStage) {
  hideThis(spritePlayer1Menu);
  // change stage background to current stage
  $("#stage").removeClass("stage").addClass("stage"+currentStage);
  // stop any music playing
  soundManager.stopAll();
  // change stage background music to

  // soundManager.play('stage'+currentStage);
  // setup monster relative to stage
  switch(currentStage) {
    case 1:
    var stageMonster = monsterRat;
    break;
    case 2:
    var stageMonster = monsterGhost;
    break;
    case 3:
    var stageMonster = monsterSkeleton;
    break;
    case 4:
    var stageMonster = monsterBlob;
    break;
    default:
    var stageMonster = monsterDefault;
  }

  monsterSetup(stageMonster);

  $("#player1").removeAttr('class');
  $("#player1").addClass("walk");
  $("#player1").animate({left: '-200px'},1);
  $("#player1").animate({left: '+=200px'},2000);
  
  setTimeout(function(){
    $("#player1").removeAttr('class');
    $("#player1").addClass("default");
  }, 2000)

  setTimeout(function(){
    showThis(spritePlayer1Menu);
  }, 2000)

}

stageSetup.stageOver = function(){
  // go to next level after 3 seconds
  setTimeout(stageSetup.nextStage, 3000)
}

stageSetup.nextStage = function(){
  nextStageNumber = currentStage + 1;
  stageSetup(nextStageNumber);
}


// INVENTORY ITEMS

var itemRedPotion = function() {player.hp+=5};
var itemGreenPotion = function() {player.sp+=5};
var btn = {};
// ITEM BUTTONS
btn.redPotion = $(".redPotion");
btn.greenPotion = $(".redPotion");
// SPECIAL BUTTONS
btn.doubleStrike = $(".doubleStrike");
btn.holySword = $(".holySword");

var spcDoubleStrike = function() { alert("DoubleStrike")/* player turn x2 -2sp*/};
var spcHolySword = function() {/* player turn x2 -2sp*/};

// PLAYER SETUP

function playerSetup() {
  // setup player stats
  $('#player1').addClass('default');
  // update player stats on stage
  updatePlayerStats();
  $('#btn-p1-sp1').html( player.spc[0] );


  //player.inv["RedPotion"] = itemRedPotion;
  //player.inv["BluePotion"] = itemBluePotion;



  //player.inv2.push({"RedPotion":itemRedPotion});
  // call all inventory
  // player.inv
  // player.inv["RedPotion"].call() to run

  //player.spc.push({"DoubleStrike":spcDoubleStrike});
  // call all inventory
  // player.inv
  // player.inv["RedPotion"].call() to run

  addItemToPlayer("redPotion", itemRedPotion);
  addItemToPlayer("greenPotion", itemGreenPotion);
  addSpecialToPlayer("doubleStrike", spcDoubleStrike);
  addSpecialToPlayer("holySword", spcHolySword);
}

var addItemToPlayer = function (itemName, funcItemName) {
  var h = {};
  h[itemName] = funcItemName;
  player.inv.push(h);
  var buttonToAdd = "<button class="+itemName+"></button>";

  $("#player1-inv").append(buttonToAdd);
}

var addItemToMonster = function (nameOfMonster, itemName, itemItemName) {
  var h = {};
  h[itemName] = funcItemName;
  nameOfMonster.inv.push(h);
}

var addSpecialToPlayer = function (specialName, spcSpecialName) {
  var h = {};
  h[specialName] = spcSpecialName;
  player.spc.push(h);

  var specialToAdd = "<button class="+specialName+"></button>";
  $("#player1-menu-spc").append(specialToAdd);
}


// MONSTER SETUP

function monsterSetup(monsterName) {
  stageMonster = monsterName;
  console.log(monsterName);
  // update monster class on stage
  $('#monster1').addClass(stageMonster.type);
  updateMonsterStats();
  updateDisplay("You encounter a "+stageMonster.name)
}


// HIDE + SHOW

// function to hide using css class
function hideThis(thingToHide) {
  $(thingToHide).addClass('hidden');
  console.log(thingToHide)
}
// function to remove hide using css class
function showThis(thingToShow) {
  $(thingToShow).removeClass('hidden');
}


// DISPLAY

function updateDisplay(messageToDisplay) {
  // clear display
  hideThis(spriteDisplay);
  spriteDisplay.html("");

  // wait a short period then update with new message
  var displayWait = function() {
    //Due to closures, outputVar will be populated
    spriteDisplay.html(messageToDisplay);
    showThis(spriteDisplay);
  };
  // Will call function in local scope
  setTimeout(displayWait, 100);
}


// WAIT

function waitFor(timeToWait) {
  var howLong = timeToWait;
  var pleaseWait = function() {
  //Due to closures, outputVar will be populated
  console.log(timeToWait);
};
  //Will call function in local scope
  setTimeout(pleaseWait, howLong);
}


function changeSprite(spriteToChange, classToChange) {
  // remove all classes on player
  $(spriteToChange).removeClass()
  // change class to classToChange
  $(spriteToChange).addClass(classToChange)
}



// BATTLE FUNCTIONS

// setup current battle variable
var currentBattle = {};
currentBattle.playerPriority = null;
currentBattle.currentTurn = null;
currentBattle.running = false;
currentBattle.round = 0;
currentBattle.monsterStatus = "normal";
currentBattle.playerStatus = "normal";

// see if player goes first vs their speed to monster - same gives random choice
function playerPriority() {
  if (player.spd > monster.spd) {
    currentBattle.playerPriority = true;
  } else if (player.spd < monster.spd) {
    currentBattle.playerPriority = false;
  } else if (player.spd == monster.spd) {
    currentBattle.playerPriority = true;
    // var randomSpd = Math.ceil(Math.random() * 2);
    //     switch(randomSpd){
    //         case 1:
    //             currentBattle.playerPriority = true;
    //             break;
    //         case 2:
    //             currentBattle.playerPriority = false;
    //             break;
  } 
}


// Player1 attacks
btnPlayer1.atk.on("click", function(){

  currentBattle.round++;
  // hide player buttons during attack
  hideThis(spritePlayer1Menu);

  // check if player is faster than monster
  // if player faster continue.

  // PLAYER ATTACK ANIMATION
  playerTurn.attack();

  // Monster dead?
  if (stageMonster.hp > 0) {
    // No.
    

    setTimeout(function(){
      monsterTurn.attack();
    }, 1000)
  } else if (stageMonster.hp <= 0) {
    // Yes.
    // v2 / Add loot?
    // v3 / Level select?

    // display you won the battle message
    hideThis(spritePlayer1Menu);
    //monster dead show animation
    setTimeout(monsterDead, 1000)

    stageSetup.stageOver();
  }
});

var updateMonsterStats = function() {
  $('.monster1-hp').html( stageMonster.hp + ' hp' );
  $('.monster1-name').html( stageMonster.name );
  $('.monster1-lvl').html('lvl ' + stageMonster.lvl );
  $('.monster1-hp').html( stageMonster.hp + ' hp' );
  $('.monster1-atk').html( stageMonster.atk + ' atk' );
  $('.monster1-def').html( stageMonster.def + ' def' );
  $('#btn-m1-sp1').html( stageMonster.spc[0] );
}
var updatePlayerStats = function() {
  $('.player1-name').html( player.name );
  $('.player1-lvl').html('lvl ' + player.lvl );
  $('.player1-hp').html( player.hp + ' hp' );
  $('.player1-atk').html( player.atk + ' atk' );
  $('.player1-def').html( player.def + ' def' );
}

var playerTurn = function() {
}
playerTurn.attack = function() {
  // attack monster
  updateDisplay(player.name+" attacks!");
  changeSprite("#player1", "attack");
  $("#player1").animate({left: '+=150px'}, function(){
    // play attack sound
    playSound('soundPlayerAttack');

    // enemy hit animation
    $("#monster1").animate({right: '-=10px'},50);
    $("#monster1").animate({right: '+=10px'},50);
    $("#monster1").animate({right: '-=10px'},50);
    $("#monster1").animate({right: '+=10px'},50);

    // animate player back to original point + update display
    $("#player1").animate({left: '-=150px'}, function(){

      changeSprite("#player1", "default");
      updateMonsterStats();
      // show player buttons when animation is finished 
      // showThis(spritePlayer1Menu);
    });
  });

  // calc new monster hp
  var damageGiven = player.atk - stageMonster.def;
  var oldHP = stageMonster.hp;
  var newHP = oldHP - damageGiven;
  stageMonster.hp = newHP;
  // show damage given
  updateDisplay(stageMonster.name+" took "+damageGiven+" damage!");
}

playerTurn.defend = function() {
  // change current stance to defend for duration of monster go
}
playerTurn.attack = function() {
  //
}
playerTurn.useItem = function() {
  //
}
playerTurn.useSpecial = function() {
  //
}

var monsterTurn = function() {
  //
  // if monster health is below 3 defend
  // if health is below 5 use special 
}

monsterTurn.attack = function() {
  // play MONSTER attack animation
  updateDisplay(monster.name+" attacks!");
  changeSprite("#monster1", stageMonster.type+" attack");
  $("#monster1").animate({right: '+=150px'}, function(){
    // play attack sound
    playSound('sound'+stageMonster.type+'Attack');

    // enemy hit animation
    $("#player1").animate({left: '-=10px'},50);
    $("#player1").animate({left: '+=10px'},50);
    $("#player1").animate({left: '-=10px'},50);
    $("#player1").animate({left: '+=10px'},50);

    // animate monster back to original point + update display
    $("#monster1").animate({right: '-=150px'}, function(){

      changeSprite("#monster1", stageMonster.type+"");
      // show player buttons when animation is finished 
      showThis(spritePlayer1Menu);
      updatePlayerStats();
    });
  });

  // attack player
  var damageGiven = stageMonster.atk - player.def;
  var oldHP = player.hp;
  var newHP = oldHP - damageGiven;
  player.hp = newHP;

  updateDisplay(player.name+" took "+damageGiven+" damage!");

  if (player.hp > 0) {
    // No. Player lives on!

  } else if (player.hp <= 0) {
    // Yes. Player died.
    // Hide buttons!
    //monster dead show animation
    setTimeout(playerDead, 1000)

  }

}

var monsterDead = function(){
  $("#monster1").animate({top: '+=40px'},50);
  changeSprite("#monster1", "dead");
  $("#monster1").animate({top: '-=40px'},50);
  updateDisplay(player.name+" killed "+stageMonster.name);
}

var playerDead = function(){
  // $("#player1").animate({top: '+=40px'},50);
  changeSprite("#player1", "dead");
  // $("#player1").animate({top: '-=40px'},50);
  stopSound("all");
  playSound("soundPlayerDead");
  setTimeout(function(){
    playSound("gameover");
  }, 1000)
  hideThis(spritePlayer1Menu);
  updateDisplay(stageMonster.name+" killed "+player.name);
}



var playSound = function(sound){
  soundManager.play(sound);
}

var stopSound = function(soundToStop){
  if (sound = "all") {
    soundManager.stopAll();
  }
  else {
    // sound must come in as string ""
    soundManager.stop(soundToStop);
  }
}


// GAME SETUP

function gameSetup() {
  stageSetup(1);
  playerSetup();
  showThis(spriteStage);
  // startBattle();
}


// setup sound - run game after all sound files are loaded
soundManager.setup({ url: '/swf/', flashVersion: 9, onready: function() {
  
  // SM2 has loaded, API ready to use e.g., createSound() etc.
  soundManager.createSound({id:'stage1', url:'./sound/music-ericskiff/1.mp3'
  })
  soundManager.createSound({id:'stage2', url:'./sound/music-ericskiff/2-DigitalNative.mp3'
  })
  soundManager.createSound({id:'gameover', url:'./sound/music-ericskiff/0-Prologue.mp3'
  })

  soundManager.createSound({id:'soundPlayerAttack', url:'./sound/nes-samples/nes-05-05.wav'
  })

  soundManager.createSound({id:'soundGhostAttack', url:'./sound/nes-samples/nes-15-07.wav'
  })

  soundManager.createSound({id:'soundRatAttack', url:'./sound/nes-samples/nes-14-14.wav'
  })

  soundManager.createSound({id:'soundPlayerDead', url:'./sound/nes-samples/nes-15-01.wav'
  })
  // function to ready sprites for smooth anim?

  // sounds loaded run game
  gameSetup();
}
})



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

// BEGIN CODE

// create player and set stats
// ? constructor in future?
var player = {};
player.name = "Jeff";
player.type = "fighter";
player.lvl = 1;
player.hp = 10;
player.sp = 10;
player.atk = 1;
player.def = 1;
player.spd = 1;
player.spc = ["double strike"];
player.inv = [];
player.alive = function() {return player.hp > 0 };

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
monster.alive = function() {return monster.hp > 0 };

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
stageMonster.spc = [""];
stageMonster.inv = [];
stageMonster.alive = function() {return stageMonster.hp > 0 };

var monsterRat = {};
monsterRat.name = "ratty";
monsterRat.type = "rat";
monsterRat.lvl = 1;
monsterRat.hp = 5;
monsterRat.sp = 10;
monsterRat.atk = 1;
monsterRat.def = 1;
monsterRat.spd = 1;
monsterRat.spc = ["bite"];
monsterRat.inv = [];
monster.alive = function() {return monsterRat.hp > 0 };

var monsterGhost = {};
monsterGhost.name = "Ghost";
monsterGhost.type = "ghost";
monsterGhost.lvl = 2;
monsterGhost.hp = 10;
monsterGhost.sp = 10;
monsterGhost.atk = 1;
monsterGhost.def = 1;
monsterGhost.spd = 1;
monsterGhost.spc = ["spook"];
monsterGhost.inv = [];
monster.alive = function() {return monsterGhost.hp > 0 };

// get some elements we want to quickly hide and show like menus
var spriteDisplay = $("#display");
var spriteStage = $("#stage");
var spritePlayer1 = $("player1");
var spriteMonster1 = $("monster1");
var spritePlayer1Menu = $("#player1-menu");
var spritePlayer1MenuSpc = $("#player1-menu-spc");
var spritePlayer1MenuInv = $("#player1-inventory");

// setup current battle variable
var currentBattle = {};
currentBattle.playerPriority = null;
currentBattle.currentTurn = null;
currentBattle.running = false;

// setup player buttons
var btnPlayer1 = {};
btnPlayer1.atk = $("#btn-p1-atk");
btnPlayer1.def = $("#btn-p1-def");
btnPlayer1.spc = $("#btn-p1-spc");
btnPlayer1.inv = $("#btn-p1-inv");

var currentStage = 1;

function gameSetup() {
  stageSetup(1);
  playerSetup();
  showThis(spriteStage);
  // startBattle();
}


function stageSetup(currentStage) {
// change stage background to current stage
$("#stage").removeClass("stage").addClass("stage"+currentStage);
// stop any music playing
soundManager.stopAll();
// change stage background music to
soundManager.play('stage'+currentStage);
// setup monster relative to stage


switch(currentStage) {
    case 1:
        var stageMonster = monsterRat;
        break;
    case 2:
        var stageMonster = monsterGhost;
        break;
    default:
        var stageMonster = monsterDefault;
        }

monsterSetup(stageMonster);

}


function playerSetup() {
  // setup player stats
  $('#player1').addClass('default');
  // update player stats on stage
  $('.player1-name').html( player.name );
  $('.player1-lvl').html('lvl ' + player.lvl );
  $('.player1-hp').html( player.hp + ' hp' );
  $('.player1-atk').html( player.atk + ' atk' );
  $('.player1-def').html( player.def + ' def' );
  $('#btn-p1-sp1').html( player.spc[0] );
}


function monsterSetup(monsterName) {
  stageMonster = monsterName;
  console.log(monsterName);
  // update monster class on stage
  $('#monster1').addClass(stageMonster.type);
  // update monster stats on stage
  $('.monster1-name').html( stageMonster.name );
  $('.monster1-lvl').html('lvl ' + stageMonster.lvl );
  $('.monster1-hp').html( stageMonster.hp + ' hp' );
  $('.monster1-atk').html( stageMonster.atk + ' atk' );
  $('.monster1-def').html( stageMonster.def + ' def' );
  $('#btn-m1-sp1').html( stageMonster.spc[0] );

  updateDisplay("You encounter a "+stageMonster.name)
}


// function to hide using css class
function hideThis(thingToHide) {
  $(thingToHide).addClass('hidden');
  console.log(thingToHide)
}
// function to remove hide using css class
function showThis(thingToShow) {
  $(thingToShow).removeClass('hidden');
}


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
    //Will call function in local scope
    setTimeout(displayWait, 100);
}


  function waitFor(timeToWait) {
    var pleaseWait = function() {
    //Due to closures, outputVar will be populated
    console.log(timeToWait);
  };
  //Will call function in local scope
  setTimeout(pleaseWait, timeToWait);
}


function changeSprite(spriteToChange, classToChange) {
  // remove all classes on player
  $(spriteToChange).removeClass()
  // change class to classToChange
  $(spriteToChange).addClass(classToChange)
}


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

  // hide player buttons during attack
  hideThis(spritePlayer1Menu);

  // check if player is faster than monster
  // if player faster continue.

  // play attack animation
  updateDisplay(player.name+" attacks!");

  changeSprite("#player1", "attack");
  $("#player1").animate({left: '+=150px'}, function(){
    // play attack sound

    // enemy hit animation
    $("#monster1").animate({right: '-=10px'},50);
    $("#monster1").animate({right: '+=10px'},50);
    $("#monster1").animate({right: '-=10px'},50);
    $("#monster1").animate({right: '+=10px'},50);

    // animate player back to original point + update display
    $("#player1").animate({left: '-=150px'}, function(){
      changeSprite("#player1", "default");
      updateDisplay(stageMonster.name+" took "+player.atk+" damage!");

      // show player buttons when animation is finished 
      showThis(spritePlayer1Menu);
    });
  });

  // calc new monster hp
  var oldHP = stageMonster.hp;
  var damageGiven = player.atk;
  var newHP = oldHP - damageGiven;
  stageMonster.hp = newHP;

  // update monster stats
  $('.monster1-hp').html( stageMonster.hp + ' hp' );

  //check monster is dead
  if (stageMonster.hp > 0) {
    // run monster turn
    // if monster health is below 3 defend
    // if health is below 5 use special 
  } else if (stageMonster.hp <= 0) {

    // display you won the battle message
    
    hideThis(spritePlayer1Menu);
    //monster dead show animation

    setTimeout(monsterDead, 1000)

    //go to next level

    // nextStage = currentStage + 1;
    // stageSetup(nextStage);
    setTimeout(nextStage, 3000)

  }
});

var monsterDead = function(){
  $("#monster1").animate({top: '+=40px'},50);
  changeSprite("#monster1", "dead");
  $("#monster1").animate({top: '-=40px'},50);
  updateDisplay(player.name+" killed "+stageMonster.name);
}

var nextStage = function(){
  nextStageNo = currentStage + 1;
  stageSetup(nextStageNo);
}

// setup sound - run game after all sound files are loaded
soundManager.setup({ url: '/swf/', flashVersion: 9, onready: function() {
      // SM2 has loaded, API ready to use e.g., createSound() etc.
      soundManager.createSound({id:'stage1', url:'./sound/music-ericskiff/1.mp3'
    })
      soundManager.createSound({id:'stage2', url:'./sound/music-ericskiff/2-DigitalNative.mp3'
    })
      gameSetup();
    }

  })



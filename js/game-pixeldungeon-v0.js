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
monster.name = "ratty";
monster.type = "rat";
monster.lvl = 1;
monster.hp = 10;
monster.sp = 10;
monster.atk = 1;
monster.def = 1;
monster.spd = 1;
monster.spc = ["bite"];
monster.inv = [];
monster.alive = function() {return monster.hp > 0 };

console.log(player);
console.log(monster);

var currentStage = 1;

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

// Player1 attacks
btnPlayer1.atk.on("click", function(){

  // hide player buttons
  hideThis(spritePlayer1Menu);

  // check if player is faster than monster
  // if player faster continue.

  // if attack succeeds PLAY ANIM 
  updateDisplay(player.name+" attacks!");

  changeSprite("#player1", "attack");
  $("#player1").animate({left: '+=150px'}, function(){
    // play sound

    // enemy hit animation
    $("#monster1").animate({right: '-=10px'},50);
    $("#monster1").animate({right: '+=10px'},50);
    $("#monster1").animate({right: '-=10px'},50);
    $("#monster1").animate({right: '+=10px'},50);

    // take off atk from enemy hitpoints

    $("#player1").animate({left: '-=150px'}, function(){
      changeSprite("#player1", "default");
      updateDisplay(monster.name+" took "+player.atk+" damage!");

      // show buttons after
      showThis(spritePlayer1Menu);
    });
  });

  // calc new monster hp
  var oldHP = monster.hp;
  var damageGiven = player.atk;
  var newHP = oldHP - damageGiven;
  monster.hp = newHP;

  // update monster stats
  $('.monster1-hp').html( monster.hp + ' hp' );

  //check monster is dead
  if (monster.alive() === true) {
    // run monster turn
    // if monster health is below 3 defend
    // if health is below 5 use special 
  } else if (monster.alive() === false) {
    
    // display you won the battle message
    
    hideThis(spritePlayer1Menu);
    //monster dead show animation

    $("#monster1").animate({top: '+=40px'},50);
    changeSprite("#monster1", "dead");
    $("#monster1").animate({top: '-=40px'},50);
    updateDisplay(player.name+" killed "+monster.name);
    //go to next level
  }
  

});

function gameSetup() {
  stageSetup(1);
  playerSetup();
  monsterSetup();
  showThis(spriteStage);
  updateDisplay("You encounter a RAT.")
  // startBattle();
}

function stageSetup(currentStage) {
// change stage background to current stage
$("#stage").removeClass("stage").addClass("stage"+currentStage);
// stop any music playing
soundManager.stopAll();
// change stage background music to
soundManager.play('stage'+currentStage);
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

function monsterSetup(monsterType, monsterLvl) {
  // update monster class on stage
  $('#monster1').addClass('rat');
  // update monster stats on stage
  $('.monster1-name').html( monster.name );
  $('.monster1-lvl').html('lvl ' + monster.lvl );
  $('.monster1-hp').html( monster.hp + ' hp' );
  $('.monster1-atk').html( monster.atk + ' atk' );
  $('.monster1-def').html( monster.def + ' def' );
  $('#btn-m1-sp1').html( monster.spc[0] );
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



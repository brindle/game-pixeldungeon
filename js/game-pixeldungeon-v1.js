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


// PLAYER VARIABLES
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

// MONSTER VARIABLES
// create monster and set stats
// ? constructor based on type / level?
var monster = {};
monster.name = "";
monster.type = "";
monster.lvl = 0;
monster.maxhp = 0;
monster.hp = 0;
monster.maxsp = 0;
monster.sp = 0;
monster.atk = 0;
monster.def = 0;
monster.spd = 0;
monster.spc = [""];
monster.inv = [];
monster.exp = 100;
monster.alive = function() {return stageMonster.hp > 0 };

// CURRENT STAGE MONSTER USED IN STAGE SETUP
var stageMonster = {};
stageMonster.name = "";
stageMonster.type = "";
stageMonster.lvl = 1;
stageMonster.maxhp = 10;
stageMonster.hp = 10;
stageMonster.maxsp = 10;
stageMonster.sp = 10;
stageMonster.atk = 1;
stageMonster.def = 1;
stageMonster.spd = 1;
stageMonster.spc = {};
stageMonster.inv = [];
stageMonster.exp = 1;
stageMonster.alive = function() {return stageMonster.hp > 0 };

var monsterRat = {};
monsterRat.name = "Ratty";
monsterRat.type = "Rat";
monsterRat.lvl = 1;
monsterRat.maxhp = 10;
monsterRat.hp = 5;
monsterRat.sphp = 20;
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
monsterGhost.maxhp = 10;
monsterGhost.hp = 10;
monsterGhost.maxsp = 10;
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
monsterSkeleton.maxhp = 10;
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
monsterBlob.maxhp = 20;
monsterBlob.hp = 20;
monsterBlob.maxsp = 10;
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

// SPRITES
var spriteDisplay = $("#display");
var spriteDisplay2 = $("#display2");
var spriteStage = $("#stage");
var spritePlayer1 = $("player1");
var spriteMonster1 = $("monster1");
var spritePlayer1Menu = $("#player1-menu");
var spritePlayer1MenuSpc = $("#player1-menu-spc");
var spritePlayer1MenuInv = $("#player1-inv");
var spriteEffect = $("#effect");

// PLAYER BUTTONS
var btn = {};
btn.playerAtk = $("#btn-p1-atk");
btn.playerDef = $("#btn-p1-def");
btn.playerSpc = $("#btn-p1-spc");
btn.playerInv = $("#btn-p1-inv");

// ITEM BUTTONS
btn.redPotion = $(".redPotion");
btn.greenPotion = $(".greenPotion");

// SPECIAL BUTTONS
btn.doubleStrike = $(".doubleStrike");
btn.holySword = $(".holySword");

// INVENTORY ITEMS
var itemRedPotion = function() {player.hp+=5};
var itemGreenPotion = function() {player.sp+=5};

// SPECIAL ATTACKS
var spcDoubleStrike = function() {};
var spcHolySword = function() {/* player turn x2 -2sp*/};


// STAGE SETUP
var currentStage = 1;

var stageSetup = function(currentStage) {

  // HIDE PLAYER MENU
  hideMenus();

  // CHANGE STAGE BACKGROUND
  $("#stage").removeClass("stage").addClass("stage"+currentStage);
  
  // STOP ALL SOUND AND LOAD STAGE MUSIC
  soundManager.stopAll();
  soundManager.play('stage'+currentStage);
  
  // CHANGE STAGE MONSTER
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

  // ADD STAGE MONSTER TO STAGE
  monsterSetup(stageMonster);

  // ANIM / PLAYER WALK ON STAGE
  $("#player1").removeAttr('class');
  $("#player1").addClass("walk");
  $("#player1").animate({left: '-200px'},1);
  $("#player1").animate({left: '+=200px'},2000);
  setTimeout(function(){
    $("#player1").removeAttr('class');
    $("#player1").addClass("default");
  }, 2000)
  setTimeout(function(){

    // SHOW PLAYER MENU
    showThis(spritePlayer1Menu);
  }, 2000)

}

stageSetup.stageOver = function(){
  // RESET BATTLE ROUND
  currentBattle.round=0;

  // NEXT LEVEL AFTER 3 SECONDS
  setTimeout(stageSetup.nextStage, 3000)
}

stageSetup.nextStage = function(){
  nextStageNumber = currentStage + 1;
  stageSetup(nextStageNumber);
}


// PLAYER SETUP

function playerSetup() {
  
  // setup player stats
  $('#player1').addClass('default');
  updatePlayerStats();

  // update player stats on stage
  $('#btn-p1-sp1').html( player.spc[0] );

  // add starting items to player 
  addItemToPlayer("redPotion", itemRedPotion);
  addItemToPlayer("greenPotion", itemGreenPotion);

  // add starting specials to player 
  addSpecialToPlayer("doubleStrike", spcDoubleStrike);
  addSpecialToPlayer("holySword", spcHolySword);
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


// ADD ITEM TO PLAYER

var addItemToPlayer = function (itemName, funcItemName) {
  // push item to player inventory
  var h = {};
  h[itemName] = funcItemName;
  player.inv.push(h);
  //  add item button to stage
  // var buttonToAdd = "<button class="+itemName+"></button>";
  // $("#player1-inv").append(buttonToAdd);
  $("."+itemName).removeClass('hidden');
}


// ADD ITEM TO MONSTER

var addItemToMonster = function (nameOfMonster, itemName, itemItemName) {
  // push item to monster inventory
  var h = {};
  h[itemName] = funcItemName;
  nameOfMonster.inv.push(h);
}


// ADD SPECIAL TO PLAYER

var addSpecialToPlayer = function (specialName, spcSpecialName) {
  // push item to player inventory
  var h = {};
  h[specialName] = spcSpecialName;
  player.spc.push(h);

  // SHOW HIDDEN BUTTON

  $("."+specialName).removeClass('hidden');

  // *** push special buttons to stage
  // var specialToAdd = "<button class="+specialName+"></button>";
  // $("#player1-menu-spc").append(specialToAdd);

}

// HIDE + SHOW

// function to hide using css class
function hideThis(thingToHide) {
  $(thingToHide).addClass('hidden');
  console.log(thingToHide);
}
// function to remove hide using css class
function showThis(thingToShow) {
  $(thingToShow).removeClass('hidden');
}


// DISPLAY

function updateDisplay(messageToDisplay) {
  // clear display

  if (messageToDisplay == "default") {
    // wait a short period then update with new message
    var displayWait = function() {
      //Due to closures, outputVar will be populated
      spriteDisplay.html("You encounter a "+stageMonster.name);
      showThis(spriteDisplay);
    };
    // Will call function in local scope
    setTimeout(displayWait, 100);
  } else {
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
}

function updateDisplay2(messageToDisplay) {
  // clear display

  if (messageToDisplay == "default") {
    // wait a short period then update with new message
    var displayWait = function() {
      //Due to closures, outputVar will be populated
      
      hideThis(spriteDisplay2);
    };
    // Will call function in local scope
    setTimeout(displayWait, 1);
  } else if (messageToDisplay == "none") {
    spriteDisplay2.html("");
    hideThis(spriteDisplay2);
    showThis(spriteDisplay);
  } else {
  hideThis(spriteDisplay2);
  spriteDisplay2.html("");

  // wait a short period then update with new message
  var displayWait = function() {
    //Due to closures, outputVar will be populated
    spriteDisplay2.html(messageToDisplay);
    showThis(spriteDisplay2);
  };
  // Will call function in local scope
  setTimeout(displayWait, 1);
  }
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


// CHANGE SPRITE

function changeSprite(spriteToChange, classToChange) {
  // remove all classes on player
  $(spriteToChange).removeClass();
  // change class to classToChange
  $(spriteToChange).addClass(classToChange);
}


// UPDATE STATS

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
  $('.player1-sp').html( player.sp + ' sp' );
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
  hideMenus();
  updateDisplay(stageMonster.name+" killed "+player.name);
}

var monsterTurn = function() {
  //
  // if monster health is below 3 defend
  // if monster health is below 50% of max hp use special
  var halfMonsterHP = stageMonster.maxhp / 2;
  var halfMonsterHPRounded = Math.round(halfMonsterHP);
  if (stageMonster.hp < halfMonsterHPRounded) {
    if (monster.sp <= 5) {
      // has at least 5. all specials are 5.
      // use special atack.
      monsterTurn.special();
    } else {
      // monster is below half hp but has no sp
       monsterTurn.attack();
    }
  } else {
    // monster is above half hp so just attacks
    monsterTurn.attack();
  }
}

monsterTurn.special = function() {
 
alert("hello");

};

monsterTurn.attack = function() {
  
  // UPDATE DISPLAY WITH MONSTER ATTACKS
  updateDisplay(monster.name+" attacks!");

  // CHANGE MONSTER SPRITE TO ATTACK CSS
  changeSprite("#monster1", stageMonster.type+" attack");

  // ANIMATE MONSTER ATTACK TOWARDS PLAYER
  $("#monster1").animate({right: '+=150px'}, function(){
    
    // PLAY MONSTER ATTACK SOUND
    playSound('sound'+stageMonster.type+'Attack');

    // ANIMATE PLAYER HIT
    $("#player1").animate({left: '-=10px'},50);
    $("#player1").animate({left: '+=10px'},50);
    $("#player1").animate({left: '-=10px'},50);
    $("#player1").animate({left: '+=10px'},50);

    // ANIMATE MONSTER BACK TO START POSITON
    $("#monster1").animate({right: '-=150px'}, function(){

      // CHANGE MONSTER SPRITE TO DEFAULT AFTER ATTACK
      changeSprite("#monster1", stageMonster.type+"");

      // SHOW PLAYER BUTTONS
      showThis(spritePlayer1Menu);

      // UPDATE STATS AFTER ATTACK
      updatePlayerStats();
    });
  });

  // CALCULATE DAMAGE TO PLAYER
  var damageGiven = stageMonster.atk - player.def;
  var oldHP = player.hp;
  var newHP = oldHP - damageGiven;
  player.hp = newHP;

  // UPDATE DISPLAY WITH DAMAGE
  updateDisplay(player.name+" took "+damageGiven+" damage!");
  setTimeout(function(){
    updateDisplay("default")
  }, 1100)

  if (player.hp > 0) {
    // PLAYER LIVES CONTINUE
  } else if (player.hp <= 0) {
    setTimeout(playerDead, 1000)
  }
}

playerAttack = function() {

  // UPDATE DISPLAY WITH PLAYER ATTACKS
  updateDisplay(player.name+" attacks!");

  // CHANGE PLAYER SPRITE TO ATTACK CSS
  changeSprite("#player1", "attack");

  // ANIMATE PLAYER ATTACK TO MONSTER
  $("#player1").animate({left: '+=150px'}, function(){

    // PLAY PLAYER ATTACK SOUND
    playSound('soundPlayerAttack');

    // ANIMATE MONSTER HIT
    $("#monster1").animate({right: '-=10px'},50);
    $("#monster1").animate({right: '+=10px'},50);
    $("#monster1").animate({right: '-=10px'},50);
    $("#monster1").animate({right: '+=10px'},50);

    // ANIMATE PLAYER BACK TO DEFAULT POSITION
    $("#player1").animate({left: '-=150px'}, function(){

      // CHANGE PLAYER SPRITE TO DEFAULT
      changeSprite("#player1", "default");

      // UPDATE MONSTER STATS
      updateMonsterStats();
    });
  });

  // CALCULATE MONSTER HP AFTER ATTACK
  var damageGiven = player.atk - stageMonster.def;
  var oldHP = stageMonster.hp;
  var newHP = oldHP - damageGiven;
  stageMonster.hp = newHP;

  // DISPLAY DAMAGE GIVEN
  updateDisplay(stageMonster.name+" took "+damageGiven+" damage!");
}

playerAttack.useHolySword = function() {

  // UPDATE DISPLAY WITH PLAYER ATTACKS
  updateDisplay(player.name+" attacks!");

  // CHANGE PLAYER SPRITE TO ATTACK CSS
  changeSprite("#player1", "useHolySword");
  changeSprite("#effect", "effectHolySword");

  // ANIMATE PLAYER ATTACK TO MONSTER
  $("#player1").animate({left: '+=150px'}, function(){
    
    // PLAY PLAYER ATTACK SOUND
    playSound('soundPlayerAttack');

    // ANIMATE MONSTER HIT
    $("#monster1").animate({right: '-=10px'},50);
    $("#monster1").animate({right: '+=10px'},50);
    $("#monster1").animate({right: '-=10px'},50);
    $("#monster1").animate({right: '+=10px'},50);

    // ANIMATE PLAYER BACK TO DEFAULT POSITION
    $("#player1").animate({left: '-=150px'}, function(){

      // CHANGE PLAYER SPRITE TO DEFAULT
      changeSprite("#player1", "default");
      changeSprite("#effect", "default");
      // ANIMATE EFFECT ON
      


      // ANIMATE EFFECT OFF
      setTimeout(function(){
        // hideThis(spriteEffect);
      }, 1000)

      // UPDATE MONSTER STATS
      updateMonsterStats();
    });
  });

  // CALCULATE MONSTER HP AFTER ATTACK
  var damageGiven = player.atk - stageMonster.def;
  var oldHP = stageMonster.hp;
  var newHP = oldHP - damageGiven;
  stageMonster.hp = newHP;

  // DISPLAY DAMAGE GIVEN
  updateDisplay(stageMonster.name+" took "+damageGiven+" damage!");
}


// ------------------------ PLAYER BUTTONS ---------------------- //

// PLAYER BUTTON = ATTACK


// btn.playerAtk.hover(updateDisplay("attack"), updateDisplay("default"));

btn.playerAtk.on('mouseover', function(){
  updateDisplay2("attack <span>"+player.atk+" atk</span>");
});
btn.playerAtk.on('mouseout', function(){
  updateDisplay2("none");
});
btn.playerAtk.on("click", function(){

  // HIDE BUTTONS
  hideMenus();
  // check if player is faster than monster
  // if player faster continue.

  // PLAYER ATTACK ANIMATION
  playerAttack();

  // Monster dead?
  if (stageMonster.hp > 0) {
    // No.
    setTimeout(function(){
      monsterTurn();
    }, 1000)

    currentBattle.round++;

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

// PLAYER BUTTON = DEFEND

// btn.playerAtk.on('mouseover', function(){
//   updateDisplay("DEFEND ");
// });
// btn.playerAtk.on('mouseout', function(){
//   updateDisplay("default");
// });

btn.playerDef.on('mouseover', function(){
  updateDisplay2("Defend + Heal <span>+4HP -2SP</span>");
});
btn.playerDef.on('mouseout', function(){
  updateDisplay2("none");
});
btn.playerDef.on("click", function(){

  hideMenus();
  if (player.sp < 5) {

    updateDisplay2("You don't have enough SP!");

  } else {
  // hide player buttons during attack
  

  // UPDATE DISPLAY WITH PLAYER DEFENDS
  updateDisplay(player.name+" defends!");

  // CHANGE PLAYER SPRITE TO DEFEND CSS
  changeSprite("#player1", "defend");
  // changeSprite("#effect", "effectHolySword");
 
    // PLAY PLAYER ATTACK SOUND
    playSound('soundPlayerDefend');

      // // CHANGE PLAYER SPRITE TO DEFAULT AFTER SET TIME
      setTimeout(function(){
        
      }, 1000)

  // ADD 3 TO PLAYER HP. REMOVE 3 SP.
  var healHP = 4;
  var costSP = 2;
  player.hp += healHP;
  player.sp -= costSP;

  // !!! HEAL IN RELATION TO DEF STAT

  // DISPLAY DAMAGE GIVEN
  updateDisplay(player.name+" healed "+healHP+" HP!");

  updatePlayerStats();
}
  // Monster dead?
  if (stageMonster.hp > 0) {
    // No.
    setTimeout(function(){

      monsterTurn.attack();
    }, 2000);

    

    setTimeout(function(){

    changeSprite("#player1", "default");
    changeSprite("#effect", "default");
    }, 3000);

    currentBattle.round++;

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

// PLAYER BUTTON = SPECIAL

btn.playerSpc.on('mouseover', function(){
  updateDisplay2("Special Attack <span>cost SP!</span>");
});
btn.playerSpc.on('mouseout', function(){
  updateDisplay2("none");
});

var playerSpcOpen = false;

btn.playerSpc.on("click", function(){

  if (playerSpcOpen == false) {
  // HIDE INVENTORY MENU
  hideThis(spritePlayer1MenuInv);
  showThis(spritePlayer1MenuSpc);
  playerSpcOpen = true;
  playerInvOpen = false;
  // SHOW SPECIAL MENU
  } else if (playerSpcOpen == true) {
    hideThis(spritePlayer1MenuSpc);
    playerSpcOpen = false;
  }

});

// PLAYER BUTTON = INVENTORY

btn.playerInv.on('mouseover', function(){
  updateDisplay2("Inventory <span>Instant + No cost</span>");
});
btn.playerInv.on('mouseout', function(){
  updateDisplay2("none");
});

var playerInvOpen = false;

btn.playerInv.on("click", function(){

  if (playerInvOpen == false) {
  // HIDE INVENTORY MENU
  hideThis(spritePlayer1MenuSpc);
  showThis(spritePlayer1MenuInv);
  playerInvOpen = true;
  playerSpcOpen = false
  // SHOW SPECIAL MENU
  } else if (playerInvOpen == true) {
    hideThis(spritePlayer1MenuInv);
    playerInvOpen = false;
  }

});

function hideMenus() {
  hideThis(spritePlayer1Menu);
  hideThis(spritePlayer1MenuSpc);
  hideThis(spritePlayer1MenuInv);
  playerInvOpen = false;
  playerSpcOpen = false;
}


// ITEM BUTTON = REDPOTION
btn.redPotion.on('mouseover', function(){
  updateDisplay2("RedPotion <span>Recover 10HP</span>");
});
btn.redPotion.on('mouseout', function(){
  updateDisplay2("none");
});
btn.redPotion.on("click", function(){
// hide player buttons during attack
hideMenus();

// UPDATE DISPLAY WITH PLAYER DEFENDS
updateDisplay(player.name+" used Red Potion!");

// CHANGE PLAYER SPRITE TO DEFEND CSS
changeSprite("#player1", "useRedPotion");
// changeSprite("#effect", "effectHolySword");

  // PLAY PLAYER ATTACK SOUND
  playSound('soundPlayerDrink');

    // // CHANGE PLAYER SPRITE TO DEFAULT AFTER SET TIME
    setTimeout(function(){
      changeSprite("#player1", "default");
      changeSprite("#effect", "default");
      hideThis(btn.redPotion)
      showThis(spritePlayer1Menu);
    }, 1000)

// ADD 3 TO PLAYER HP. REMOVE 3 SP.
var healHP = 10;
// var costSP = 2;
player.hp += healHP;
// player.sp -= costSP;

// !!! HEAL IN RELATION TO DEF STAT

// DISPLAY DAMAGE GIVEN
updateDisplay(player.name+" healed "+healHP+" HP!");

updatePlayerStats();

});

// ITEM BUTTON = REDPOTION
btn.greenPotion.on('mouseover', function(){
  updateDisplay2("Green Potion <span>Recover 10SP</span>");
});
btn.greenPotion.on('mouseout', function(){
  updateDisplay2("none");
});

btn.greenPotion.on("click", function(){
// hide player buttons during attack
hideMenus();

// UPDATE DISPLAY WITH PLAYER DEFENDS
updateDisplay(player.name+" used Green Potion!");

// CHANGE PLAYER SPRITE TO DEFEND CSS
changeSprite("#player1", "useGreenPotion");
// changeSprite("#effect", "effectHolySword");

  // PLAY PLAYER ATTACK SOUND
  playSound('soundPlayerDrink');

    // // CHANGE PLAYER SPRITE TO DEFAULT AFTER SET TIME
    setTimeout(function(){
      changeSprite("#player1", "default");
      changeSprite("#effect", "default");
      hideThis(btn.greenPotion)
      showThis(spritePlayer1Menu);
    }, 1000)

// ADD 3 TO PLAYER HP. REMOVE 3 SP.
var healSP = 10;
// var costSP = 2;
player.sp += healSP;
// player.sp -= costSP;

// !!! HEAL IN RELATION TO DEF STAT

// DISPLAY DAMAGE GIVEN
updateDisplay(player.name+" gained "+healSP+" SP!");

updatePlayerStats();

});

// PLAYER BUTTON = DOUBLESTRIKE
btn.doubleStrike.on('mouseover', function(){
  updateDisplay2("Double Strike <span>5SP</span>");
});
btn.doubleStrike.on('mouseout', function(){
  updateDisplay2("none");
});
btn.doubleStrike.on("click", function(){
  hideMenus();
  if (player.sp < 5) {
    updateDisplay2("You don't have enough SP!");
  } else {
    // hide player menus during attack
    

    // check if player is faster than monster
    // if player faster continue.

    // PLAYER ATTACK ANIMATION
    playerAttack();
    setTimeout(playerAttack, 1000);

    // REMOVE SP + UPDATE DISPLAY
    player.sp-=5;
    updatePlayerStats();
  }
  // Monster dead?
  if (stageMonster.hp > 0) {
    // No.
    setTimeout(function(){
      monsterTurn.attack();
    }, 2000)

    currentBattle.round++;

  } else if (stageMonster.hp <= 0) {

    // reset battle round to 0 for;
    
    //monster dead show animation
    setTimeout(monsterDead, 1000)
    stageSetup.stageOver();
  }
});

// SPECIAL BUTTON = HOLY SWORD

btn.holySword.on('mouseover', function(){
  updateDisplay2("Holy Sword <span>(Hates bones!) 3SP</span>");
});
btn.holySword.on('mouseout', function(){
  updateDisplay2("none");
});
btn.holySword.on("click", function(){
  if (player.sp < 3) {
    updateDisplay2("You don't have enough SP!");
  } else {
  // HIDE BUTTONS
  hideMenus();
  // check if player is faster than monster
  // if player faster continue.

  // PLAYER ATTACK ANIMATION
  playerAttack.useHolySword();

  // REMOVE SP + UPDATE DISPLAY
  player.sp-=3;
  updatePlayerStats();
  }
  // Monster dead?
  if (stageMonster.hp > 0) {
    // No.
    setTimeout(function(){
      monsterTurn.attack();
    }, 1000)

    currentBattle.round++;

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


// ------------------ END PLAYER BUTTONS ------------------ //



// SOUND CONTROLS

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



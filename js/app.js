soundManager.url = 'swf/soundmanager2.swf';

var $button1 = $("#play1");
var $button2 = $("#play2");
var $button3 = $("#play3");
var $button4 = $("#play4");
var $button5 = $("#play5");
var $button6 = $("#play6");
var $button7 = $("#play7");
var $button8 = $("#play8");
var $button9 = $("#play9");
var $button10 = $("#play10");
var $button11 = $("#play11");
var $button12 = $("#play12");
var $button13 = $("#play13");
var $button14 = $("#play14");
var $button15 = $("#play15");
var $button16 = $("#play16");

$button1.on("click", function(){
  soundManager.createSound({
    id:'button1', url:'./sounds/daftpunk/work_it.wav',
  });
  soundManager.play('button1') 
});

$button2.on("click", function(){
  soundManager.createSound({
    id:'button2', url:'./sounds/daftpunk/make_it.wav',
  });
  soundManager.play('button2') 
});

$button3.on("click", function(){
  soundManager.createSound({
    id:'button3', url:'./sounds/daftpunk/do_it.wav',
  });
  soundManager.play('button3') 
});

$button4.on("click", function(){
  soundManager.createSound({
    id:'button4', url:'./sounds/daftpunk/makes_us.wav',
  });
  soundManager.play('button4') 
});

$button5.on("click", function(){
  soundManager.createSound({
    id:'button5', url:'./sounds/daftpunk/harder.wav',
  });
  soundManager.play('button5') 
});

$button6.on("click", function(){
  soundManager.createSound({
    id:'button6', url:'./sounds/daftpunk/better.wav',
  });
  soundManager.play('button6') 
});

$button7.on("click", function(){
  soundManager.createSound({
    id:'button7', url:'./sounds/daftpunk/faster.wav',
  });
  soundManager.play('button7') 
});

$button8.on("click", function(){
  soundManager.createSound({
    id:'button8', url:'./sounds/daftpunk/stronger.wav',
  });
  soundManager.play('button8') 
});

$button9.on("click", function(){
  soundManager.createSound({
    id:'button9', url:'./sounds/daftpunk/more_than.wav',
  });
  soundManager.play('button9') 
});

$button10.on("click", function(){
  soundManager.createSound({
    id:'button10', url:'./sounds/daftpunk/hour.wav',
  });
  soundManager.play('button10') 
});

$button11.on("click", function(){
  soundManager.createSound({
    id:'button11', url:'./sounds/daftpunk/our.wav',
  });
  soundManager.play('button11') 
});

$button12.on("click", function(){
  soundManager.createSound({
    id:'button12', url:'./sounds/daftpunk/never.wav',
  });
  soundManager.play('button12') 
});

$button13.on("click", function(){
  soundManager.createSound({
    id:'button13', url:'./sounds/daftpunk/ever.wav',
  });
  soundManager.play('button13') 
});

$button14.on("click", function(){
  soundManager.createSound({
    id:'button14', url:'./sounds/daftpunk/after.wav',
  });
  soundManager.play('button14') 
});

$button15.on("click", function(){
  soundManager.createSound({
    id:'button15', url:'./sounds/daftpunk/work_is.wav',
  });
  soundManager.play('button15') 
});

$button16.on("click", function(){
  soundManager.createSound({
    id:'button16', url:'./sounds/daftpunk/over.wav',
  });
  soundManager.play('button16') 
});

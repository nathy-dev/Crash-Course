//canvas
const cvs = document.getElementById("mycanvas");
const ctx = cvs.getContext("2d");

//game state/control variables
let frames = 0;
const state = {
    current : 0,
    getReady : 0,
    game : 1,
    over : 2,
}

//create sprite sheets
const sprite = new Image();
sprite.src = "sprite.png";

const sprite2 = new Image ();
sprite2.src = "sprite2.png";


//game state control, listens for clicks to change state
cvs.addEventListener("click", function(evt){
    switch(state.current){
        case state.getReady:
            state.current = state.game;
            break;
        case state.over:
            jake.y = cvs.height - 110;
            state.current = state.getReady;
            score.reset();
            break;
    }
});

//input control mapping
document.addEventListener('keyup', (e) => {
    if(state.current != state.game) return;
    if(e.code === "KeyA" ) jake.jump();
    if(e.code === "KeyG") jake.leap();
    if(e.code === "KeyD") jake.slide();

})

//title page image
const getReady = {
    sX : 48,
    sY : 275,
    w : 240,
    h : 150,
    x : cvs.width/2 - 120,
    y : 55,
  //draws title page to canvas  
    draw: function(){
        if(state.current == state.getReady){
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
    
}
//Instruction Banner image
const Instructions = {
    sX : 88,
    sY : 3,
    w : 443,
    h : 56,
    x : cvs.width/2 - 443/2,
    y : 5,
 //draws instruction banner   
    draw: function(){
        if(state.current === state.getReady){
            ctx.drawImage(sprite2, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
    
}

//Game Over Screen
const gameOver = {
    sX : 338,
    sY : 340,
    w : 280,
    h : 82,
    x : cvs.width/2 - 140,
    y : 60,
    
    draw: function(){
        if(state.current == state.over){
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);   
        }
    }
    
}



//background
const bg = {
    sX : 344,
    sY : 10,
    w : 389,
    h : 350,
    x : 0,
    y : cvs.height - 235,

    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }
}

//foreground
const fg = {
    sX: 344,
    sY: 230,
    w: 410,
    h: 90,
    x: 0,
    y: cvs.height - 90,

    dx: 2,

    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    },

    update: function(){
       if(state.current != state.over){
            this.x = (this.x - this.dx)%(this.w/2);
        }
    }
}
//PROTAGONIST
const jake = {
    //loops through array of source coordinates to changes images
    animation : [
        {sX : 55, sY: 31}, 
        {sX : 55, sY: 31}, 
        {sX : 85, sY: 31}, 
        {sX : 85, sY: 31},
    ],
    //locational constants
    x : 80,
    y : cvs.height - 110,
    w : 25,
    h : 46,

    //determines current action
    isJumping: false,
    isLeaping: false,
    isSliding: false,

    jumpVelocity : 0,
    jumpMax : 15,
    gravity : 1.8,
    jmpAnimation: false,

    leapVelocity : 0,
    leapMax : 7,
    leapAnimation: false,

    slideCount: 0,
    slideMax : 7,
    slideAnimation: false,

    jmpImage : {
        sX : 180,
        sY : 31,
        w: 35,
        h : 40,
    },


    leapImage : {
        sX : 144,
        sY : 19,
        w: 35,
        h : 45,
    },

    slideImage : {
        sX : 218,
        sY : 47,
        w : 44,
        h : 30,
    },

    overImage : {
        sX : 268,
        sY : 55,
        w : 50,
        h : 22,
    },
   

    frame : 0,

    draw : function(){
        let jake = this.animation[this.frame];
        
        ctx.save();
        ctx.translate(this.x, this.y);
        if(state.current === state.over){
            this.y =cvs.height - 85;
            ctx.drawImage(sprite, this.overImage.sX, this.overImage.sY, this.overImage.w, this.overImage.h,- this.w/2, - this.h/2, this.overImage.w, this.overImage.h);
        } else{
            if(this.isJumping){
              ctx.drawImage(sprite, this.jmpImage.sX, this.jmpImage.sY, this.jmpImage.w, this.jmpImage.h,- this.w/2, - this.h/2, this.jmpImage.w, this.jmpImage.h);
            }
              if(this.isLeaping){
                 ctx.drawImage(sprite, this.leapImage.sX, this.leapImage.sY, this.leapImage.w, this.leapImage.h,- this.w/2, - this.h/2, this.leapImage.w, this.leapImage.h);
             }
            if(this.isSliding){
              ctx.drawImage(sprite, this.slideImage.sX, this.slideImage.sY, this.slideImage.w, this.slideImage.h,- this.w/2, - this.h/2, this.slideImage.w, this.slideImage.h);
            }
           
            if(!this.isJumping && !this.isLeaping && !this.isSliding){
             ctx.drawImage(sprite, jake.sX, jake.sY, this.w, this.h,- this.w/2, - this.h/2, this.w, this.h)};
         }
        ctx.restore();
    },
    
    
    update: function(){
        // IF THE GAME STATE IS GET READY STATE, THEN JAKE RUNS SLOW
        this.period = state.current == state.getReady ? 10 : 5;
        // WE INCREMENT THE FRAME BY 1, EACH PERIOD
        this.frame += frames%this.period == 0 ? 1 : 0;
        // FRAME GOES FROM 0 To 4, THEN AGAIN TO 0
        this.frame = this.frame%this.animation.length;
        
        if(this.isJumping) {
            
            this.y -= 10;
            this.jumpVelocity -= .8;
            if(this.jumpVelocity <= 0){
                this.isJumping = false;  
            }
        }
        if (this.y < (cvs.height -110)){
            this.y += this.gravity;
            if(this.y >= (cvs.height -110)) {
                this.jmpAnimation = false;
     
            }
        } 
        if(this.isLeaping) {
            
            this.y -= 5;
            this.leapVelocity -= 0.1;
            if(this.leapVelocity <= 0){
                this.isLeaping = false;  
            }
        }
        if (this.y < (cvs.height -110)){
            this.y += this.gravity;
            if(this.y >= (cvs.height -110)) {
                this.leapAnimation = false;
            }
        } 
        if(this.isSliding) {
            this.y = (cvs.height - 95);
            this.slideCount -= 0.1;
            if(this.slideCount <= 0){
                this.y = (cvs.height - 110);
                this.isSliding = false; 
                this.slideAnimation = false; 
            }
        }

        if(this.y >= cvs.height -110) {
            this.jmpAnimation = false;
            this.leapAnimation = false;
        }

    
        
    },

    jump: function(){
         this.jmpAnimation = true;
          this.isJumping = true;
          this.jumpVelocity = this.jumpMax;
         this.jumpAvailble = false;
    },

    leap: function(){
        this.leapAnimation = true;
        this.isLeaping = true;
        this.leapVelocity = this.leapMax;
        this.leapAvailble = false;
    },

    slide: function(){
        this.slideAnimation = true;
        this.isSliding = true;
        this.slideCount = this.slideMax;
        this.slideAvailble = false;

    },

    speedReset : function(){
        this.speed = 0;
    },
    


}
//bad guys
const baddies = {
    baddieLineUp : [],

    draw : function(){
        for(let i  = 0; i < this.baddieLineUp.length; i++){
            let currentEnemy = this.baddieLineUp[i];
             ctx.drawImage(sprite, currentEnemy.sX, currentEnemy.sY, currentEnemy.w, currentEnemy.h, currentEnemy.x, currentEnemy.y, currentEnemy.w, currentEnemy.h);   
            
             }
         

    },


    update: function(){
        if(state.current !== state.game) {
        this.reset();
         return;
        };
        if(frames%100 == 0){
            let spawnRate = Math.floor(Math.random() * 5);
            if(spawnRate == 1){
                this.baddieLineUp.push({ //moose
                    sX : 93,
                    sY : 86,
                    w : 108,
                    h : 101,
                    x : cvs.width,
                    y : cvs.height - 185,
                    enemyID : "moose",

            
                });
            } 
            else if(spawnRate == 2){
                this.baddieLineUp.push({ //attorney
                    sX : 14,
                    sY: 90,
                    w: 30,
                    h: 45,
                    x: cvs.width,
                    y: cvs.height - 128,
                    enemyID : "attorney",
                });
            }
            else if (spawnRate == 3){
                this.baddieLineUp.push({ //car
                    sX : 197,
                    sY: 126,
                    w: 136,
                    h: 65,
                    x: cvs.width,
                    y: cvs.height - 135,
                    enemyID : "car",
            
                });
            }

        }
            
       
        for(let i = 0; i < this.baddieLineUp.length; i++){
            let currentEnemy = this.baddieLineUp[i];
            
            // CORRECT INPUT DETECTION
        
            if(jake.x == currentEnemy.x){
                if(currentEnemy.enemyID === "moose" && !jake.slideAnimation) {
                    state.current = state.over;
                }if(currentEnemy.enemyID === "car" && !jake.leapAnimation) {
                    state.current = state.over;
                }if(currentEnemy.enemyID === "attorney" && !jake.jmpAnimation) {
                        state.current = state.over;
                }
          
            }
            
            // MOVE ENEMY TO LEFT
            currentEnemy.x -= 2;
            
            // if the enemies go beyond canvas, we delete them from the array
            if(currentEnemy.x + 120 <= 0){
                this.baddieLineUp.shift();
                score.value += 1;
                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best", score.best);
            }
        }
    },

    reset : function(){
        this.baddieLineUp = [];
    }

}

// SCORE
const score= {
    best : parseInt(localStorage.getItem("best")) || 0,
    value : 0,
    
    draw : function(){
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";
        
        if(state.current == state.game){
            ctx.lineWidth = 2;
            ctx.font = "35px Teko";
            ctx.fillText(this.value, cvs.width/2, 50);
            ctx.strokeText(this.value, cvs.width/2, 50);
            
        }else if(state.current == state.over){
            // SCORE VALUE
            ctx.font = "25px Teko";
            ctx.fillText("Current Score : ", 175, 180);
            ctx.strokeText("Current Score : ", 175, 180);
            ctx.fillText(this.value, 375, 180);
            ctx.strokeText(this.value, 375, 180);
            // BEST SCORE
            ctx.fillText("Best Score : ", 175, 211);
            ctx.strokeText("Best Score : ", 175, 211);
            ctx.fillText(this.best, 375, 211);
            ctx.strokeText(this.best, 375, 211);
        }
    },
    
    reset : function(){
        this.value = 0;
    }
}

//draw function 
function draw(){
    ctx.fillStyle = "#beedec";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    
    bg.draw();
    fg.draw();
    jake.draw();
    baddies.draw();
    getReady.draw();
    gameOver.draw();
    Instructions.draw();
    score.draw();
}

//update function
function update () {
    jake.update();
    fg.update();
    baddies.update();
    
}

//game loop
function loop(){
    update();
    draw();
    frames++;
  
    requestAnimationFrame(loop);
}
loop();


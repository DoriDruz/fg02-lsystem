function Point(x,y){
  this.x = x;
  this.y = y;
}
function pressButtonOne(){
  var stepChoise = document.getElementById("txt0").value;
  var pressAngle = document.getElementById("txt1").value;
  var pressTurnAngle = document.getElementById("txt2").value;
  var pressRule = document.getElementById("txt3").value;
  var pressNewRule = document.getElementById("txt4").value;
  if(isNaN(parseInt(stepChoise)) == false && isNaN(parseInt(pressAngle)) == false && isNaN(parseInt(pressTurnAngle)) == false){
    return parseString(parseInt(stepChoise),Math.PI/parseInt(pressAngle), Math.PI/parseInt(pressTurnAngle), pressRule, pressNewRule);
  }
}
function parseString(pressStep, pressAngle, pressTurnAngle, pressRule, pressNewRule){
  var rule = pressRule; //"F";
  var newRule = pressNewRule; //"-F+F+[+F-F-]-[-F+F+F]";
  var step = pressStep;
  var startPoint = new Point(50, 400);
  //var drawArray = [];
  for(var i = 0; i <= step; i++){
    console.log("Step " + i);
    //console.log(rule);
    //drawArray.length = 0;
    draw(rule);
    rule = rule.replace(/F/g,newRule)
    nextPoint = startPoint;
    //console.log(drawArray.length);
    //draw(drawArray, startPoint);
  }
}
function draw(rule){
  var stepLength = 10;
  var startPoint = new Point(50, 400);
  var nextPoint = startPoint;
  var newPoint;
  var pressAngle = document.getElementById("txt1").value;
  var pressTurnAngle = document.getElementById("txt2").value;
  var angle = pressAngle; //-Math.PI/3;
  var turnAngle = pressTurnAngle; //Math.PI/8;
  var savePositionsX = [];
  var savePositionsY = [];
  var saveAngle = [];
  var canvas = document.getElementById("cvs"),
  ctx = canvas.getContext('2d');
  ctx.fillStyle="#9999ff";
  ctx.beginPath();
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.moveTo(startPoint.x, startPoint.y);
  for(var j = 0; j < rule.length; j++){
    console.log(rule[j]);
      switch (rule[j]){
        case 'F':
          newPoint = new Point(nextPoint.x + (stepLength)*Math.cos(angle), nextPoint.y + (stepLength)*Math.sin(angle));
          //drawArray.push(newPoint);
          ctx.lineTo(newPoint.x, newPoint.y);
          nextPoint = newPoint;
          break;
        case '-':
          angle += turnAngle;
          break;
        case '+':
          angle -=turnAngle;
          break;
        case '[':
          savePositionsX.push(nextPoint.x);
          savePositionsY.push(nextPoint.y);
          saveAngle.push(angle);
          break;
        case ']':
          nextPoint.x = savePositionsX.pop();
          nextPoint.y = savePositionsY.pop();
          angle = saveAngle.pop();
          //drawArray.push("move");
          //drawArray.push(nextPoint);
          ctx.moveTo(nextPoint.x, nextPoint.y)
          break;
        default:
          console.log("Something goes wrong");
          break;
      }
    }
    ctx.stroke();
    savePositionsX = [];
    savePositionsY = [];
    saveAngle = [];
}
/*function draw(array,startPoint){

  var drawPoint = new Point(0,0);
  while(array.length != 0){
    console.log(array[0]);
    drawPoint = array.shift();
    if(drawPoint == "move"){
        drawPoint = array.shift();
        ctx.moveTo(drawPoint.x, drawPoint.y);
    }
    else{
      ctx.lineTo(drawPoint.x, drawPoint.y);
    }
  }
}*/

var nsq=6;
var colors=randColor(nsq);
var sqSelect=document.querySelectorAll(".square");
var rgbChanger=document.getElementById("colorDisplay");
var pickedColor=colors[pkColor()];
var msgDisp=document.querySelector("#message");
var headd=document.getElementsByTagName("h1")[0];
var modeButtons=document.querySelectorAll(".mode");
init();
function init(){
for(var i=0;i<modeButtons.length;i++){
	modeButtons[i].addEventListener("click",function(){
     modeButtons[0].classList.remove("selected");
     modeButtons[1].classList.remove("selected");
     this.classList.add("selected");
     this.textContent==="Easy" ? nsq=3 :nsq=6;
     reseet();
	});
}

}
function reseet(){
   colors=randColor(nsq);
   pickedColor=colors[pkColor()];
   rgbChanger.textContent=pickedColor;
   msgDisp.textContent="";
   for(var i=0;i<sqSelect.length;i++){
    if(colors[i]){
    	sqSelect[i].style.display="block";
		sqSelect[i].style.backgroundColor=colors[i];}
		else{
			sqSelect[i].style.display="none";
		} 
	
}
	headd.style.backgroundColor="steelblue";
	rest.textContent="New Colors";
}
//easy.addEventListener("click",function(){
 //easy.classList.add("selected");
  //hard.classList.remove("selected");
  //nsq=3;
 // colors=randColor(nsq);
   //pickedColor=colors[pkColor()];
   //rgbChanger.textContent=pickedColor;
   //for(var i=0;i<sqSelect.length;i++){
	//if(colors[i]){

	//	sqSelect[i].style.backgroundColor=colors[i];}
	//	else{
	//		sqSelect[i].style.display="none";
	//	}
	//}
//});
//hard.addEventListener("click",function(){
  //easy.classList.remove("selected");
  //hard.classList.add("selected");
  //nsq=6;
  //colors=randColor(nsq);
   //pickedColor=colors[pkColor()];
   //rgbChanger.textContent=pickedColor;
   //for(var i=0;i<sqSelect.length;i++){

	//	sqSelect[i].style.backgroundColor=colors[i];
	//	sqSelect[i].style.display="block";
	//}
//});
rgbChanger.textContent=pickedColor;
var rest=document.getElementById("reset");
rest.addEventListener("click",function(){
	reseet();
   //colors=randColor(nsq);
   //pickedColor=colors[pkColor()];
   //rgbChanger.textContent=pickedColor;
   //msgDisp.textContent="";
   //for(var i=0;i<sqSelect.length;i++){
	//sqSelect[i].style.backgroundColor=colors[i];}
	//headd.style.backgroundColor="steelblue";
	//this.textContent="New Colors";
});
for(var i=0;i<sqSelect.length;i++){
	sqSelect[i].style.backgroundColor=colors[i];
	sqSelect[i].addEventListener("click",function(){
     var clickedColor=this.style.backgroundColor;
     if(clickedColor===pickedColor){
     	msgDisp.textContent="Correct";
     	rest.textContent="Play Again";
       colorChanger(clickedColor);
       headd.style.backgroundColor=clickedColor;
     }
     else{
     	this.style.backgroundColor="#232323";
        msgDisp.textContent="Try Again";
     }
	});
}
function colorChanger(col){
	for(var i=0;i<sqSelect.length;i++){
		sqSelect[i].style.backgroundColor=col;
	}
}
function pkColor() {
	var ran=Math.floor(Math.random()*colors.length);
	return ran;
}
function randColor(num){
	var arr=[];
    for(var i=0;i<num;i++){
     arr.push(genRandColor());
    } 
	return arr;
}
function genRandColor(){
	var r=Math.floor(Math.random()*256);
	var g=Math.floor(Math.random()*256);
	var b=Math.floor(Math.random()*256);
	return "rgb("+r+", "+g+", "+b+")";
}
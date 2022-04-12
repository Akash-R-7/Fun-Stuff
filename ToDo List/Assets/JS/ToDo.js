//Checking off
$("ul").on("click","li",function(){
 $(this).toggleClass("completed");
});
//Deleting
$("ul").on("click","span",function(e){
  $(this).parent().fadeOut(500,function(){
  	$(this).remove();});  
  e.stopPropagation();
});
//Accepting
$("input[type='text']").keypress(function(e){
 if(e.which===13){
 	var newText=$(this).val();
 	$(this).val("");
 	//create new list
 	$("ul").append("<li><span><i class='fa fa-trash'></i></span>"+newText+"</li>");
 }
});
$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
})
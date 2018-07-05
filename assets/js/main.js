var $window = $(window);

$(document).ready(function(){

  $(".title-text").fitText(1, {minFontSize: '30px'});

  if ($window.scrollTop() > 400){
    $("#header").addClass("bg-black");
  }

  $window.scroll(function(){
    if ($(this).scrollTop() <= 400){
      $("#header").removeClass("bg-black");
    } else {
      $("#header").addClass("bg-black");
    }
  });
});

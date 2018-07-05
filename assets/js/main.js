
var $window = $(window);

$(document).ready(function(){
  if ($window.scrollTop() > 200){
    $("#header").addClass("bg-black");
  }

  $window.scroll(function(){
    if ($(this).scrollTop() <= 200){
      $("#header").removeClass("bg-black");
    } else {
      $("#header").addClass("bg-black");
    }
  });

  var title = new Typed('#title', {
    strings: ['Hello World, I\'m Terry Wang'],
    showCursor: false,
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 1500,
    smartBackspace: false,
    loop: false
  })

  var identity;
  setTimeout(() => {
    identity = new Typed('#identity', {
      strings: ['Student @ UWaterloo.', 'Passionate Coder.', 'Full-Stack Developer.', 'Mobile Developer.' ],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1500,
      smartBackspace: false,
      loop: true
    });
  }, 3000);
});

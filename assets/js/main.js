var $window = $(window);

$(document).ready(function() {
  // navbar
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
  //---

  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 1000, "easeInOutQuint", function(){
        window.location.hash = hash;
      });
    }
  });

  // typed

  var identity = new Typed('#identity', {
      strings: ['&nbsp', 'Student @ UWaterloo.', 'Passionate Coder.', 'Full-Stack Developer.', 'Mobile Developer.' ],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1500,
      smartBackspace: false,
      loop: true
    });
  //---
});

var $window = $(window);

$(document).ready(function() {
  // navbar

  if ($window.scrollTop() > 200){
    $("#header").addClass("bg-black");
  }

  var toggle = false;
  $window.scroll(function() {
    if ($(this).scrollTop() <= 200 && !toggle){
      $("#header").removeClass("bg-black");
    } else {
      $("#header").addClass("bg-black");
    }
  });

  $('.navbar-toggler').click(function() {
    if ($window.scrollTop() <= 200 && toggle) {
      $("#header").removeClass("bg-black");
    } else {
      $("#header").addClass("bg-black");
    }
    toggle = !toggle;
  })

  if ($window.width() < 768) {
    $(".nav-item").removeClass("ml-2");
    $(".nav-link").addClass("pl-3");
  } else {
    $(".nav-item").addClass("ml-2");
    $(".nav-link").removeClass("pl-3");
  }

  $window.resize(function() {
    if ($window.width() < 768) {
      $(".nav-item").removeClass("ml-2");
      $(".nav-link").addClass("pl-3");
    } else {
      $(".nav-item").addClass("ml-2");
      $(".nav-link").removeClass("pl-3");
    }
  })
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
      strings: ['&nbsp', 'Student @ UWaterloo.', 'Passionate Coder.', 'Full-Stack Developer.', 'Software Developer.', 'Mobile Developer.' ],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1500,
      smartBackspace: false,
      loop: true
    });
  //---
});

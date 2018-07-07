var $window = $(window);

$(document).ready(function() {
  // navbar + gotoTop

  if ($window.scrollTop() > 200){
    $("#header").addClass("bg-black");
  }

  var expTopPos = $('#experience').position().top - $window.height() / 2;

  if ($window.scrollTop() >= expTopPos) {
    $(".goto-top-button").fadeIn(500);
  }

  var toggle = false;
  $window.scroll(function() {
    if ($(this).scrollTop() <= 200 && !toggle){
      $("#header").removeClass("bg-black");
    } else {
      $("#header").addClass("bg-black");
    }
    if ($(this).scrollTop() >= expTopPos) {
      $(".goto-top-button").fadeIn(500);
    } else {
      $(".goto-top-button").fadeOut(500);
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

  // company direct

  $(".exp-CMDI").on('click', function() {
    window.location.href="http://www.cmdi.chinamobile.com/";
  });

  $(".exp-Finastra").on('click', function() {
    window.location.href="https://www.finastra.com/";
  });

  //---

  // project direct

  $("#project-MrSchedule").on('click', function() {
    window.location.href="https://github.com/wtyanan/Mr.Schedule";
  });

  $("#project-Tetris").on('click', function() {
    window.location.href="https://github.com/wtyanan/Tetris";
  });

  $("#project-KWCSSA").on('click', function() {
    window.location.href="https://github.com/wtyanan/KWCSSACalendar";
  });

  $("#project-UWMilestone").on('click', function() {
    window.location.href="https://github.com/wtyanan/UWMilestone";
  });

  $("#project-FMHelper").on('click', function() {
    window.location.href="https://github.com/wtyanan/FMHelper";
  });

  //---

  // contact direct

  $("#contact-github").on('click', function() {
    window.location.href="https://github.com/wtyanan";
  });

  $("#contact-email").on('click', function() {
    window.location.href="mailto:terrywang@tianyu.ninja";
  });

  $("#contact-linkedin").on('click', function() {
    window.location.href="https://www.linkedin.com/in/wtyanan/";
  });

  //---

  $("#contact-form").submit(function (e) {
      e.preventDefault();

      const name = $("#name").val();
      const email = $("#email").val();
      const msg = $("#msg").val();
      var data = { name, email, msg };
      var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!re.test(String(email).toLowerCase())){
        $('#email').attr("placeholder","Please enter a valid E-mail");
        $("#email").val("")
        $("#email").addClass("invalid-input");
      } else {
        $("#contact-inputs").fadeOut(500);
        $('#contact-loading').delay(501).fadeIn(500);
        $.ajax({
          type: "POST",
          url: "/contact",
          data: data,
          dataType: "json",
          success: (data) => {
            $("#contact-loading").delay(300).fadeOut(500);
            if (data.success) {
              $(".contact-thank").delay(900).fadeIn(500);
            } else {
              $(".contact-fail").delay(1800).fadeIn(500);
            }
          }
        });
      }
    });

});

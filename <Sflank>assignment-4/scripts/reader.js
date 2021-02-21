$(document).ready(function () {
    zoom_index=1;//zoom for +/-
    graphical_zoom=1;
    $("body").css("position", "relative");
    $("body").css("left", "0px");
    $("body").css("top", "0px");
    $(document).keydown(function (ev) {//regular zoom
        if(ev.keyCode ==189 && zoom_index>.2){//zoom  out with - or shift -
            zoom_index = zoom_index - 0.1;//decreases the zoom index by 10%
            document.body.style.zoom=zoom_index;

        }
        else if (ev.keyCode== 187 ) {//zoom in with + or shift+
            zoom_index = zoom_index + 0.1;//increases the zoom index by 10%
            document.body.style.zoom=zoom_index;
        }
        else {
        }
    });

    $(document).keydown(function (e) {
       if (e.ctrlKey && e.keyCode == 187) {//control and + will graphically zoom in
           graphical_zoom = graphical_zoom + 0.1;//adjust zoom in 10%
           $("body").css("transform", "scale(" + graphical_zoom + ")");//graphical zoom in
           $('body').css('width', $("body").width() * graphical_zoom);
           $('body').css('left', $("body").width() * 0.5*Math.abs(1-graphical_zoom));
           $('body').css('top', $("body").height() * 0.5*Math.abs(1-graphical_zoom) + "px");


       }
       else if (e.ctrlKey && e.keyCode == 189 &&graphical_zoom>0.2) {//control and - will graphically zoom in
           graphical_zoom=graphical_zoom-0.1;//adjust zoom out 10%
           $("body").css("transform", "scale("+graphical_zoom+")");//graphical zoom out
           $('body').css('width', $("body").width() * graphical_zoom);
           $('body').css('top', $("body").height() * 0.5*(graphical_zoom-1));
           $('body').css('left', $("body").width() * 0.5*(graphical_zoom-1));


       }
       else{}
    });



    $(document).mousemove(function (event) {
        if ($(document).width() > $(window).width()) {
            var width = $(window).width();//gets width of window
            var x_position = event.clientX;//gets xposition of mouse
            var right_distance = width - x_position;//right side of screen
            if (right_distance- x_position < 100 ) {//move to the right
                if(x_position>right_distance){
                    window.scroll({// taken from https://developer.mozilla.org/en-US/docs/Web/API/Window/scroll
                        left:$(document).width()*1.1,//move right 1000
                        behavior: 'smooth'//animate
                    });
                }


            }
            else if (x_position <= 100) {
                window.scroll({//move to the left
                    left:graphical_zoom-1,//move left
                    behavior: 'smooth'//animate
            });
            }
            else {}
        }
    });



        $("*:not(body)").hover(
            function(ev) {
                $(".refactor").removeClass(".refactor");
                $(this).addClass("refactor");
                ev.stopPropagation();
                $(document).keydown(function (e) {
                    if (e.keyCode == 0 || e.keyCode == 32) {
                        e.preventDefault();//taken from: https://stackoverflow.com/
                        // questions/22559830/html-prevent-space-bar-from-scrolling-page
                        $("#mydiv").remove();
                        $(".refactor").append($("<div id='mydiv'>" + $(".refactor").text() + "</div>"));

                    }
                    else if (e.keyCode == 27) {
                      //  $(this).removeClass(".refactor");
                        $("#mydiv").remove();

                    }
                });
                },

                function (ev) {
                    $(this).removeClass("refactor");
                    $(".refactor").removeClass("refactor")
                });

});



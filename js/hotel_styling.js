$(document).ready(function(){
   /* utility function for
    window resize Event
    Code from this StackOverflow answer: http://stackoverflow.com/a/4541963/34155*/
    var waitForFinalEvent = (function () {
        var timers = {};
        return function (callback, ms, uniqueId) {
            if (!uniqueId) {
                uniqueId = "failedID";
            }
            if (timers.uniqueId) {
                clearTimeout(timers.uniqueId);
            }
            timers.uniqueId = setTimeout(callback, ms);
        };
    })();
    
    //variable for the table element
    var hoteltable = $('#hoteltable').DataTable();
    
    /* events to be triggered
    when the "hotel" table is rendered*/
    hoteltable.on('draw.dt', function(){
        //establish the height of the slide div
        //and the slide div's overlay
        //on table render
        if ($(window).width() > 640){
            /*if window width is greater than 640 pixels
            then the width:height ratio is around 3:1 */
            $('.owl-hotel-1-slide').css(
                {
                    'height': ($('.owl-hotel-1-slide').width()/3.047619047619048) + 'px'
                }

            );
            /*if window width is greater than 640 pixels
            make the overlay occupy only about half
            of the area of the slide div
            with slight margins */
            $('.owl-hotel-1-slide-overlay-player').css(
                {
                    'width': (($('.owl-hotel-1-slide').width()/2) - 10) + 'px',
                    'height': (($('.owl-hotel-1-slide').width()/3.047619047619048) - 10) + 'px',
                    'top': '5px',
                    'right': '5px',
                    'background-color': 'rgba(255, 255, 255, 0.5)'
                }
            );
            if ($('#owl-hotel-1 li').length < 1){
                console.log('The list has ' + $('#owl-hotel-1 li').length + ' items');
            } else {
                $('.owl-hotel-1-slide').each(function(){
                    var thisImgSrc = $(this).data('imgsrc');
                    $(this).css(
                        {
                            'background-image': 'url("images/' + thisImgSrc + '-medium.jpg")',
                            'background-size': 'cover' 
                        }
                    );
                });
            }
            
        } else if ($(window).width() <= 640) {
            /*if window width is less than or equal to 640 pixels
            then the width:height ratio is around 1.75:1 */
            $('.owl-hotel-1-slide').css(
                {
                    'height': ($('.owl-hotel-1-slide').width()/1.777777777778) + 'px'
                }

            );
            /*if window width is less than or equal to 640 pixels
            make the overlay occupy
            the whole slide div area */
            $('.owl-hotel-1-slide-overlay-player').css(
                {
                    'width': $('.owl-hotel-1-slide').width() + 'px',
                    'height': ($('.owl-hotel-1-slide').width()/1.777777777778) + 'px',
                    'top': '0px',
                    'right': '0px',
                    'background-color': 'rgba(255, 255, 255, 0.25)'
                }
            );
            if ($('#owl-hotel-1 li').length < 1){
                console.log('The list has ' + $('#owl-hotel-1 li').length + ' items');
            } else {
                $('.owl-hotel-1-slide').each(function(){
                    var thisImgSrc = $(this).data('imgsrc');
                    $(this).css(
                        {
                            'background-image': 'url("images/' + thisImgSrc + '-mobile.jpg")',
                            'background-size': 'cover' 
                        }
                    );
                });
            }
        }
       
        
        //establish the height of the slide div
        //and the slide div's overlay
        //on browser resize
        $(window).resize(function(){
            waitForFinalEvent(function(){
                if ($(window).width() > 640){
                    /* on browser resize,
                    if window width is greater than 640 pixels
                    then the width:height ratio is around 3:1 */
                    $('.owl-hotel-1-slide').css(
                        {
                            'height': ($('.owl-hotel-1-slide').width()/3.047619047619048) + 'px'
                        }
                    );
                    /* on browser resize,
                    if window width is greater than 640 pixels
                    make the overlay occupy only about half
                    of the area of the slide div
                    with slight margins */
                    $('.owl-hotel-1-slide-overlay-player').css(
                        {
                            'width': (($('.owl-hotel-1-slide').width()/2) - 10) + 'px',
                            'height': (($('.owl-hotel-1-slide').width()/3.047619047619048) - 10) + 'px',
                            'top': '5px',
                            'right': '5px',
                            'background-color': 'rgba(255, 255, 255, 0.5)'
                        }
                    );
                    if ($('#owl-hotel-1 li').length < 1){
                        console.log('The list has ' + $('#owl-hotel-1 li').length + ' items');
                    } else {
                         $('.owl-hotel-1-slide').each(function(){
                            var thisImgSrc = $(this).data('imgsrc');
                            $(this).css(
                                {
                                    'background-image': 'url("images/' + thisImgSrc + '-medium.jpg")',
                                    'background-size': 'cover' 
                                }
                            );
                        });
                    }
                } else if ($(window).width() <= 640) {
                    /* on browser resize,
                    if window width is less than or equal to 640 pixels
                    then the width:height ratio is around 1.75:1 */
                    $('.owl-hotel-1-slide').css(
                        {
                            'height': ($('.owl-hotel-1-slide').width()/1.777777777778) + 'px'
                        }

                    );
                    /* on browser resize,
                    if window width is less than or equal to 640 pixels
                    make the overlay occupy
                    the whole slide div area */
                    $('.owl-hotel-1-slide-overlay-player').css(
                        {
                            'width': $('.owl-hotel-1-slide').width() + 'px',
                            'height': ($('.owl-hotel-1-slide').width()/1.777777777778) + 'px',
                            'top': '0px',
                            'right': '0px',
                            'background-color': 'rgba(255, 255, 255, 0.25)'
                        }
                    );
                    if ($('#owl-hotel-1 li').length < 1){
                        console.log('The list has ' + $('#owl-hotel-1 li').length + ' items');
                    } else {
                        $('.owl-hotel-1-slide').each(function(){
                            var thisImgSrc = $(this).data('imgsrc');
                            $(this).css(
                                {
                                    'background-image': 'url("images/' + thisImgSrc + '-mobile.jpg")',
                                    'background-size': 'cover' 
                                }
                            );
                        });
                    }
                    
                }
                
            }, 500, 'owl-hotel-1-slide-resize');
        });
    });

});
$(document).ready(function(){
    
    /* 
    * utility function for
    * window resize Event
    * Code from this StackOverflow answer: http://stackoverflow.com/a/4541963/34155
    */
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
    
    //assign "hoteltable" dataTable API instance
    var hoteltable = $('#hoteltable').DataTable();
    
    //initialize hotel-1 slick slider
    $('#hotel-1').slick({
        slide: 'li',
        fade: true
    });
    
    //initialize hotel-2 slick slider
    $('#hotel-2').slick({
        slide: 'li',
        fade: true
    });
    
    /*
    * START
    * variables and behaviours
    * of the progress bar
    */

    var time = 5, 
        percentTime,
        tick,
        paused;
    
    //in the function below,
    //assign a false bool to the 'paused' var
    function doProgressBar(){
        paused = false;
        percentTime = 0;
        
        //set the 'tick' variable
        //to a recurring 'incrementBarLength' function
        tick = setInterval(incrementBarLength, 10);
    }

    function incrementBarLength(){
        
        //make sure that this function
        //checks whether 'paused' is false
        if (paused === false){
            percentTime += 1/time;
            $('#progressBar').css({
                width: percentTime + '%' 
            });
            
            //make sure that this function
            //checks whether 'paused' is false
            if (percentTime >= 100 && paused === false){
                clearAllIntervals();
                $('#hotel-1').slick('slickNext');
            }    
        }
    }
    
    //explicitly declare a 'slideMoved' function
    //to make other code below
    //more comprehensible
    function slideMoved(){
        clearAllIntervals();
    }
    
    //very hacky
    //brute force code
    //from "http://www.sitepoint.com/clear-setinterval-knowing-id/"
    function clearAllIntervals(){
        for(i=0; i<9999; i++){
            window.clearInterval(i);
        }
    }
    
    
    //mouseover event pauses the
    //progress bar
    $('#hotel-1').on('mouseover', function(){
        paused = true;
    });
    
    //and mouseout event resumes the
    //progress bar
    $('#hotel-1').on('mouseout', function(){
        paused = false;
    });

    /*
    * END
    * variables and behaviours
    * of the progress bar
    */
    
    /*
    * START
    * Item to be added to
    * the hotel-1 slider
    * if the hoteltable
    * does not contain data
    * (i.e., Null search results)
    */
    var hotel_1_error_li = '<li class="hotel-1-empty">Sorry, no results found.  Please try again.</li>';
    
    function nullProgressBar(){
        clearAllIntervals();
        $('#progressBar').css({
            width: 0 + '%' 
        });
    }
   
    /*
    * END
    * Item to be added to
    * the hotel-1 slider
    * if the hoteltable
    * does not contain data
    * (i.e., Null search results)
    */
    
    
    /*
    * BEGIN action on every table re-draw
    */
    hoteltable.on('draw.dt', function(){
        
        //very hacky
        //brute force code
        //from "http://www.sitepoint.com/clear-setinterval-knowing-id/"
        for(i=0; i<100; i++){
            window.clearInterval(i);
        }
        
        //set an empty variable
        //later to be assigned
        //the index of hotel-1 current slide
        var currentHotel1Slide;
        
        //set an empty variable
        //later to be assigned
        //the index of hotel-1 current slide
        //before resize
        var hotel1SlideBeforeResize;
        
        //set an empty variable
        //later to be assigned
        //the data of each
        //individual row of the hoteltable
        var rowData;
        
        /*
        * START
        * Assemble hotel-2 slider
        */
        
        
        /*
        * END
        * Assemble hotel-2 slider
        */
        
        /*
        * on initial load of table,
        * populate hotel-1 
        * with slide sizes dependent on browser width
        */
        if ($(window).width() > 640) {
            
            //remove hotel-1 slick carousel items
            //to refresh the list
            while($('#hotel-1 li').length > 0){
                $('#hotel-1').slick('slickRemove', false);
            }
            
            //if the hoteltable has no errors
            if ($('#hoteltable tbody tr td.dataTables_empty').length < 1){
                
                $('#hoteltable tbody tr').each(function(){
                    var thisRow = $(this);
                    //get the data (json data source) from each row
                    rowData = hoteltable.row(thisRow).data();

                    //add the relevant data to hotel-1 slick
                    //one list item at a time
                    if (typeof(rowData) != 'undefined'){
                        var hotel_1_li_item = '<li>';
                            hotel_1_li_item += '<div class="hotel-1-slide" data-video_id="' + rowData.image.video_id + '">';
                            //use the "medium" jpg for screen sizes above 640px
                                hotel_1_li_item += '<img src="images/' + rowData.image.src + '-medium.jpg" width="100%" height="100%" />';
                                hotel_1_li_item += '<div class="hotel-1-slide-overlay-player" data-video_id="' + rowData.image.video_id + '">';
                                    hotel_1_li_item += '<button class="play-button">';
                                        hotel_1_li_item += 'Play Video';
                                    hotel_1_li_item += '</button>';
                                hotel_1_li_item += '</div>';
                            hotel_1_li_item += '</div>';
                        hotel_1_li_item += '</li>';
                        $('#hotel-1').slick('slickAdd', hotel_1_li_item, false);
                    }
                });
                
                currentHotelSlide = $('#hotel-1').slick('slickCurrentSlide');
                
                doProgressBar();
                
                $('#hotel-1').on('afterChange', function(event, slick, currentSlide){
                    if ($('.hotel-1-slide-overlay-player.player-activated').length > 0){
                        $('.hotel-1-slide-overlay-player.player-activated').contents().replaceWith('<button class="play-button">Play Video</button>');
                        $('.hotel-1-slide-overlay-player.player-activated').removeClass('player-activated');
                    }
                    slideMoved();
                    doProgressBar();
                    
                    playBtnAction();
                });
                
            } else {
                //put error slide
                $('#hotel-1').slick('slickAdd', hotel_1_error_li, false);
                nullProgressBar();
            }
        } else if ($(window).width() <= 640) {
            
            //remove hotel-1 slick carousel items
            //to refresh the list
            while($('#hotel-1 li').length > 0){
                $('#hotel-1').slick('slickRemove', false);
            }
            
            //if the hoteltable has no errors
            if ($('#hoteltable tbody tr td.dataTables_empty').length < 1){
                
                $('#hoteltable tbody tr').each(function(){
                    var thisRow = $(this);
                    //get the data (json data source) from each row
                    rowData = hoteltable.row(thisRow).data();

                    //add the relevant data to hotel-1 slick
                    //one list item at a time
                    if (typeof(rowData) != 'undefined'){
                        var hotel_1_li_item = '<li>';
                            hotel_1_li_item += '<div class="hotel-1-slide" data-video_id="' + rowData.image.video_id + '">';
                            //use the "mobile" jpg for screen sizes <= 640px
                                hotel_1_li_item += '<img src="images/' + rowData.image.src + '-mobile.jpg" width="100%" height="100%" />';
                                hotel_1_li_item += '<div class="hotel-1-slide-overlay-player" data-video_id="' + rowData.image.video_id + '">';
                                    hotel_1_li_item += '<button class="play-button">';
                                        hotel_1_li_item += 'Play Video';
                                    hotel_1_li_item += '</button>';
                                hotel_1_li_item += '</div>';
                            hotel_1_li_item += '</div>';
                        hotel_1_li_item += '</li>';
                        $('#hotel-1').slick('slickAdd', hotel_1_li_item, false);
                    }
                });
                
                currentHotelSlide = $('#hotel-1').slick('slickCurrentSlide');
                
                doProgressBar();
                
                $('#hotel-1').on('afterChange', function(event, slick, currentSlide){
                    if ($('.hotel-1-slide-overlay-player.player-activated').length > 0){
                        $('.hotel-1-slide-overlay-player.player-activated').contents().replaceWith('<button class="play-button">Play Video</button>');
                        $('.hotel-1-slide-overlay-player.player-activated').removeClass('player-activated');
                    }
                    slideMoved();
                    doProgressBar();
                    
                    playBtnAction();
                });
    
            } else {
                //put error slide
                $('#hotel-1').slick('slickAdd', hotel_1_error_li, false);
                nullProgressBar();
            }
        }
        
        /*
        * on window resize,
        * populate hotel-1 
        * with slide sizes dependent on browser width
        */
        
        $(window).resize(function(){
            
            waitForFinalEvent(function(){
                
                
                if ($(window).width() > 640) {
                    //on browser resize,
                    //window width is greater than 640px
                    if ($('#hoteltable tbody tr td.dataTables_empty').length < 1){
                        
                        //get the index of
                        //the currently loaded slide
                        //before browser resize
                        hotel1SlideBeforeResize = $('#hotel-1').slick('slickCurrentSlide');
                        
                        //remove hotel-1 slick carousel items
                        //to refresh the list
                        while($('#hotel-1 li').length > 0){
                            $('#hotel-1').slick('slickRemove', false);
                        }
                        
                        $('#hoteltable tbody tr').each(function(){
                            var thisRow = $(this);
                            //get the data (json data source) from each row
                            rowData = hoteltable.row(thisRow).data();

                            //add the relevant data to hotel-1 slick
                            //one list item at a time
                            if (typeof(rowData) != 'undefined'){
                                var hotel_1_li_item = '<li>';
                                    hotel_1_li_item += '<div class="hotel-1-slide" data-video_id="' + rowData.image.video_id + '">';
                                    //use the "medium" jpg for screen sizes above 640px
                                        hotel_1_li_item += '<img src="images/' + rowData.image.src + '-medium.jpg" width="100%" height="100%" />';
                                        hotel_1_li_item += '<div class="hotel-1-slide-overlay-player" data-video_id="' + rowData.image.video_id + '">';
                                            hotel_1_li_item += '<button class="play-button">';
                                                hotel_1_li_item += 'Play Video';
                                            hotel_1_li_item += '</button>';
                                        hotel_1_li_item += '</div>';
                                    hotel_1_li_item += '</div>';
                                hotel_1_li_item += '</li>';
                                $('#hotel-1').slick('slickAdd', hotel_1_li_item, false);
                            }
                        });
                        
                        //instantly go to the slide
                        //that was active
                        //before the resize
                        if (hotel1SlideBeforeResize != 0){
                            $('#hotel-1').slick('slickGoTo', hotel1SlideBeforeResize, true);
                            slideMoved();
                            doProgressBar();
                            playBtnAction();
                            
                            $('#hotel-1').on('afterChange', function(event, slick, currentSlide){
                                if ($('.hotel-1-slide-overlay-player.player-activated').length > 0){
                                    $('.hotel-1-slide-overlay-player.player-activated').contents().replaceWith('<button class="play-button">Play Video</button>');
                                    $('.hotel-1-slide-overlay-player.player-activated').removeClass('player-activated');
                                }
                                slideMoved();
                                doProgressBar();

                                playBtnAction();
                            });
                        } else {
                            doProgressBar();
                            playBtnAction();
                            
                            $('#hotel-1').on('afterChange', function(event, slick, currentSlide){
                                if ($('.hotel-1-slide-overlay-player.player-activated').length > 0){
                                    $('.hotel-1-slide-overlay-player.player-activated').contents().replaceWith('<button class="play-button">Play Video</button>');
                                    $('.hotel-1-slide-overlay-player.player-activated').removeClass('player-activated');
                                }
                                slideMoved();
                                doProgressBar();

                                playBtnAction();
                            });
                        }
                    } else {
                        //put error slide
                        $('#hotel-1').slick('slickAdd', hotel_1_error_li, false);
                        nullProgressBar();
                    } 
                } else if ($(window).width() <= 640) {
                    //on browser resize,
                    //window width is <= 640px
                    if ($('#hoteltable tbody tr td.dataTables_empty').length < 1){
                        
                        //get the index of
                        //the currently loaded slide
                        //before browser resize
                        hotel1SlideBeforeResize = $('#hotel-1').slick('slickCurrentSlide');
                        
                        //remove hotel-1 slick carousel items
                        //to refresh the list
                        while($('#hotel-1 li').length > 0){
                            $('#hotel-1').slick('slickRemove', false);
                        }
                        
                        $('#hoteltable tbody tr').each(function(){
                            var thisRow = $(this);
                            //get the data (json data source) from each row
                            rowData = hoteltable.row(thisRow).data();

                            //add the relevant data to hotel-1 slick
                            //one list item at a time
                            if (typeof(rowData) != 'undefined'){
                                var hotel_1_li_item = '<li>';
                                    hotel_1_li_item += '<div class="hotel-1-slide" data-video_id="' + rowData.image.video_id + '">';
                                    //use the "mobile" jpg for screen sizes <= 640px
                                        hotel_1_li_item += '<img src="images/' + rowData.image.src + '-mobile.jpg" width="100%" height="100%" />';
                                        hotel_1_li_item += '<div class="hotel-1-slide-overlay-player" data-video_id="' + rowData.image.video_id + '">';
                                            hotel_1_li_item += '<button class="play-button">';
                                                hotel_1_li_item += 'Play Video';
                                            hotel_1_li_item += '</button>';
                                        hotel_1_li_item += '</div>';
                                    hotel_1_li_item += '</div>';
                                hotel_1_li_item += '</li>';
                                $('#hotel-1').slick('slickAdd', hotel_1_li_item, false);
                            }
                        });
                        
                        //instantly go to the slide
                        //that was active
                        //before the resize
                        if (hotel1SlideBeforeResize != 0){
                            $('#hotel-1').slick('slickGoTo', hotel1SlideBeforeResize, true);
                            slideMoved();
                            doProgressBar();
                            playBtnAction();
                            
                            $('#hotel-1').on('afterChange', function(event, slick, currentSlide){
                                if ($('.hotel-1-slide-overlay-player.player-activated').length > 0){
                                    $('.hotel-1-slide-overlay-player.player-activated').contents().replaceWith('<button class="play-button">Play Video</button>');
                                    $('.hotel-1-slide-overlay-player.player-activated').removeClass('player-activated');
                                }
                                slideMoved();
                                doProgressBar();

                                playBtnAction();
                            });
                        } else {
                            doProgressBar();
                            playBtnAction();
                            
                            $('#hotel-1').on('afterChange', function(event, slick, currentSlide){
                                if ($('.hotel-1-slide-overlay-player.player-activated').length > 0){
                                    $('.hotel-1-slide-overlay-player.player-activated').contents().replaceWith('<button class="play-button">Play Video</button>');
                                    $('.hotel-1-slide-overlay-player.player-activated').removeClass('player-activated');
                                }
                                slideMoved();
                                doProgressBar();

                                playBtnAction();
                            });
                        }
                        
                    } else {
                        //put error slide
                        $('#hotel-1').slick('slickAdd', hotel_1_error_li, false);
                        nullProgressBar();
                    } 
                }
            }, 500, 'slickResize');
            
        });
        
        /*
        * START
        * behaviour of play button
        * on the player area
        * of each slide
        */
        
        var playBtnAction = (function(){
            return function(){
                $('#hotel-1 .play-button').each(function(){
                    var playButton = $(this);

                    playButton.click(function(){
                        clearAllIntervals();
                        paused = true;
                        playButton.parent('div').addClass('player-activated');
                        var video_id = playButton.parent('div').data('video_id');
                        playButton.replaceWith('<iframe id="ytplayer" type="text/html" width="100%" height="100%" src="http://www.youtube.com/embed/' + video_id + '?autoplay=1&rel=0&controls=2&rel=0 frameborder="0"/>');
                    });
                });
            }
        })();
        
        playBtnAction();
        
        
        /*
        * END
        * behaviour of play button
        * on the player area
        * of each slide
        */

    });
    /*
     *END action on every table re-draw
    */  

});
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
    
    /*
    * START
    * variables and behaviours
    * of the progress bar
    */

    var time = 5, 
        percentTime,
        tick;

    function doProgressBar(){
        percentTime = 0;
        tick = setInterval(incrementBarLength, 10);
    }

    function incrementBarLength(){
        percentTime += 1/time;
        $('#progressBar').css({
            width: percentTime + '%' 
        });
        if (percentTime >= 100){
            clearAllIntervals();
            $('#hotel-1').slick('slickNext');
        }
    }

    function slideMoved(){
        clearAllIntervals();
    }
    
    //very hacky
    //brute force code
    //from "http://www.sitepoint.com/clear-setinterval-knowing-id/"
    function clearAllIntervals(){
        for(i=0; i<100; i++){
            window.clearInterval(i);
        }
    }

    /*
    * END
    * variables and behaviours
    * of the progress bar
    */
    
    
    /*
     *BEGIN action on every table re-draw
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
                                hotel_1_li_item += '<div class="hotel-1-slide-overlay-player">';
                                hotel_1_li_item += '</div>';
                            hotel_1_li_item += '</div>';
                        hotel_1_li_item += '</li>';
                        $('#hotel-1').slick('slickAdd', hotel_1_li_item, false);
                    }
                });
                
                currentHotelSlide = $('#hotel-1').slick('slickCurrentSlide');
                
                doProgressBar();
                
                $('#hotel-1').on('afterChange', function(event, slick, currentSlide){
                    slideMoved();
                    doProgressBar();
                });
                
            } else {
                //put error slide
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
                                hotel_1_li_item += '<div class="hotel-1-slide-overlay-player">';
                                hotel_1_li_item += '</div>';
                            hotel_1_li_item += '</div>';
                        hotel_1_li_item += '</li>';
                        $('#hotel-1').slick('slickAdd', hotel_1_li_item, false);
                    }
                });
                
                currentHotelSlide = $('#hotel-1').slick('slickCurrentSlide');
                
                doProgressBar();
                
                $('#hotel-1').on('afterChange', function(event, slick, currentSlide){
                    slideMoved();
                    doProgressBar();
                });
    
            } else {
                //put error slide
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
                                        hotel_1_li_item += '<div class="hotel-1-slide-overlay-player">';
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
                        } else {
                            doProgressBar();
                        }
                    } else {
                        //put error slide
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
                                        hotel_1_li_item += '<div class="hotel-1-slide-overlay-player">';
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
                        } else {
                            doProgressBar();
                        }
                        
                    } else {
                        //put error slide
                    } 
                }
            }, 500, 'slickResize');
            
            
        });

    });
    /*
     *END action on every table re-draw
    */  

});
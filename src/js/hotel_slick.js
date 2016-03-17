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
        fade: true,
        autoplay: true,
        autoplaySpeed: 6000,
        pauseOnHover: false
    });
    
    //initialize hotel-2 slick slider
    $('#hotel-2').slick({
        slide: 'li',
        slidesToShow: 5,
        slidesToScroll: 1,
        lazyLoad: 'progressive'
    });
    
    /*
    * START
    * Item to be added to
    * the hotel-1 slider
    * if the hoteltable
    * does not contain data
    * (i.e., Null search results)
    */
    function appendHotel1ErrorSlide(){
        var hotel_1_error_li = '<li class="hotel-1-empty">Sorry, no results found.  Please try again.</li>';
        //put error slide
        $('#hotel-1').slick('slickAdd', hotel_1_error_li, false);
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
    * START
    * function for populating
    * an error-free hotel-2 slider
    */
    function hotel2SlideItem (rowData, index_data) {
       //add this data to each hotel-2 li
        var hotel_2_li_item = '<li data-index_position="' + index_data + '">';
        hotel_2_li_item += '<div class="hotel-2-slide">';
        hotel_2_li_item +='<img src="images/' + rowData.image.src + '-small.jpg" width="100%" height="100%" alt="' + rowData.image.src + '"></div>';
        hotel_2_li_item += '<h6>';
        hotel_2_li_item += rowData.name;
        hotel_2_li_item += '</h6>';
        hotel_2_li_item += '<p>(';
        hotel_2_li_item += rowData.category.category_filter;
        hotel_2_li_item += ')</p>';
        hotel_2_li_item += '</li>';
        return hotel_2_li_item;
    }
    /*
    * END
    * function for populating
    * an error-free hotel-2 slider
    */
    
    
    /*
    * BEGIN action on every table re-draw
    */
    hoteltable.on('draw.dt', function(){
        
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
        //remove hotel-2 slick carousel items
        //to refresh the list
        while($('#hotel-2 li').length > 0){
            $('#hotel-2').slick('slickRemove', false);
        }

        /*
        * populate hotel-2
        * if the hoteltable is also
        * populated with items
        */
        if ($('#hoteltable tbody tr td.dataTables_empty').length < 1 ){
            
            //instantiate a variable
            //that increments by one
            //per iteration
            var hotel_1_index_position = 0;
            
            $('#hoteltable tbody tr').each(function(){
                var thisRow = $(this);
                
                //get the data (json data source) from each row
                rowData = hoteltable.row(thisRow).data();
                
                //per row iteration,
                //increment index_position by 1
                hotel_1_index_position++;
                
                //add the relevant data to the owl-carousel bottom list
                //one list item at a time
                if (typeof(rowData) != 'undefined'){
                    var hotel_2_li_item = hotel2SlideItem (rowData, hotel_1_index_position);
                    $('#hotel-2').slick('slickAdd', hotel_2_li_item, false);
                }
            });
            
            $('#hotel-2 li').click(function () {
                var hotel1IndxPos = $(this).data('index_position');
                $('#hotel-1').slick('slickGoTo', hotel1IndxPos - 1);
            });
        }
        /*
        * END
        * Assemble hotel-2 slider
        */

        /*
        * START
        * Assemble hotel-1 slider
        */
        if ($(window).width() > 640) {
            
            //remove hotel-1 slick carousel items
            //to refresh the list
            while($('#hotel-1 li').length > 0){
                $('#hotel-1').slick('slickRemove', false);
            }
            
            if ($('#hoteltable tbody tr td.dataTables_empty').length >= 1) {
                appendHotel1ErrorSlide();
            }
            
            //if the hoteltable has no errors
            else if ($('#hoteltable tbody tr td.dataTables_empty').length < 1) {
                populateHotel1 ('medium');
                setOverlayCss('large');
                $('#hotel-1').slick('slickPlay');
                currentHotelSlide = $('#hotel-1').slick('slickCurrentSlide');
                toggleInfo();
                tableScrollUpBtnAxn ();
                slickHotel1PlayBtnAxn();
                $('#hotel-1').on('afterChange', function (event, slick, currentSlide) {
                    $('#hotel-2').slick('slickGoTo', currentSlide);
                    restoreInfoBtnToggle();
                    returnSlickHotel1PlayButton();
                    slickHotel1PlayBtnAxn();
                });
            }
        } else if ($(window).width() <= 640) {
             //remove hotel-1 slick carousel items
            //to refresh the list
            while($('#hotel-1 li').length > 0){
                $('#hotel-1').slick('slickRemove', false);
            }
            
            if ($('#hoteltable tbody tr td.dataTables_empty').length >= 1) {
                appendHotel1ErrorSlide();
            }
            //if the hoteltable has no errors
            else if ($('#hoteltable tbody tr td.dataTables_empty').length < 1) {
                populateHotel1 ('mobile');
                setOverlayCss('small');
                $('#hotel-1').slick('slickPlay');
                currentHotelSlide = $('#hotel-1').slick('slickCurrentSlide');
                toggleInfo();
                tableScrollUpBtnAxn ();
                slickHotel1PlayBtnAxn();
                $('#hotel-1').on('afterChange', function (event, slick, currentSlide) {
                    $('#hotel-2').slick('slickGoTo', currentSlide);
                    restoreInfoBtnToggle();
                    returnSlickHotel1PlayButton();
                    slickHotel1PlayBtnAxn();
                });
            }
        }
        /*
        * END
        * Assemble hotel-1 slider
        */
        
        /*
        * on window resize,
        * populate hotel-1 
        * with slide sizes dependent on browser width
        */
        $(window).resize(function () {
            waitForFinalEvent (onSlickResized, 250, 'slickResize');    
        });
    });
    /*
    *END action on every table re-draw
    */
    
    /*
    * START
    * function that populates
    * the hotel-1 slider
    * based on browser width
    */
    function populateHotel1 (width) {
        
        switch (width) {
            
            case 'medium':  var infoIndex = 0;
                            
                            $('#hoteltable tbody tr').each(function(){
                                var thisRow = $(this);
                                //get the data (json data source) from each row
                                rowData = hoteltable.row(thisRow).data();
                                
                                //add the relevant data to bxslider hotel-1
                                //one list item at a time
                                if (typeof(rowData) != 'undefined'){
                                    
                                    infoIndex++;
                                    
                                    var hotel_1_li_item = '<li>';
                                        hotel_1_li_item += '<div class="hotel-1-slide">';
                                            //add a "more info" button
                                            hotel_1_li_item += '<button class="toggle-info show-info" data-info_index="' + infoIndex + '">Show Info</button>';
                                            hotel_1_li_item += '<button class="toggle-info hide-info" data-info_index="' + infoIndex + '">Hide Info</button>';
                                            //use the "medium" jpg for screen sizes above 640px
                                            hotel_1_li_item += '<img src="images/' + rowData.image.src + '-medium.jpg" width="100%" height="100%" alt="' + rowData.image.src + '"/>';
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
            break;
            case 'mobile':  var infoIndex = 0;  
                
                            $('#hoteltable tbody tr').each(function(){
                                var thisRow = $(this);
                                //get the data (json data source) from each row
                                rowData = hoteltable.row(thisRow).data();

                                //add the relevant data to bxslider hotel-1
                                //one list item at a time
                                if (typeof(rowData) != 'undefined'){
                                    
                                    infoIndex++;
                                    
                                    var hotel_1_li_item = '<li>';
                                        hotel_1_li_item += '<div class="hotel-1-slide">';
                                            //use the "mobile" jpg for screen sizes equal to or less than 640px
                                            hotel_1_li_item += '<img src="images/' + rowData.image.src + '-mobile.jpg" width="100%" height="100%" alt="' + rowData.image.src + '"/>';
                                                hotel_1_li_item += '<div class="hotel-1-slide-overlay-player" data-video_id="' + rowData.image.video_id + '">';
                                                    hotel_1_li_item += '<button class="play-button">';
                                                        hotel_1_li_item += 'Play Video';
                                                    hotel_1_li_item += '</button>';
                                                hotel_1_li_item += '</div>';
                                                hotel_1_li_item += '<button class="toggle-info show-info" data-info_index="' + infoIndex + '">Show Info</button>';
                                                hotel_1_li_item += '<button class="toggle-info hide-info" data-info_index="' + infoIndex + '">Hide Info</button>';
                                        hotel_1_li_item += '</div>';
                                        //add a "more info" button
                                    hotel_1_li_item += '</li>';
                                    $('#hotel-1').slick('slickAdd', hotel_1_li_item, false);
                                }
                            });
            break;
            default:
            break;
        }
    }
    /*
    * END
    * function that populates
    * the hotel-1 slider
    * based on browser width
    */
    
    /*
    * START
    * function that sets the styling
    * of the slide overlay player
    */
    function setOverlayCss(width){
        
        switch (width) {
            case 'large':   $('.hotel-1-slide-overlay-player').css(
                                {
                                    'width': (($('.hotel-1-slide').width()/2) - 10) + 'px',
                                    'height': (($('.hotel-1-slide').width()/3.047619047619048) - 10) + 'px',
                                    'top': '5px',
                                    'right': '5px',
                                    'background-color': 'rgba(255, 255, 255, 0.5)'
                                }
                            );
            break;
            case 'small':   $('.hotel-1-slide-overlay-player').css(
                                {
                                    'width': $('.hotel-1-slide').width() + 'px',
                                    'height': ($('.hotel-1-slide').width()/1.777777777778) + 'px',
                                    'top': '0px',
                                    'right': '0px',
                                    'background-color': 'rgba(255, 255, 255, 0.25)'
                                }
                            );
            break;
            default:
            break;
        } 
    }
    /*
    * END
    * function that sets the styling
    * of the slide overlay player
    */
    
    /*
    * START
    * functions for
    * the behaviour of
    * the "show info" and "hide info" buttons
    */
    function toggleInfo(){
        $('#hotel-1 .hide-info').hide();
        
        var btnIndex;
        
        $('#hotel-1 .show-info').click(function () {
            $('#hotel-1').slick('slickPause');
            btnIndex = ($(this).data('info_index') - 1);
            $('#hoteldesclist li').eq(btnIndex).show();
            $(this).hide();
            $(this).siblings('.hide-info').show();
        });
        
        $('#hotel-1 .hide-info').click(function () {
            btnIndex = ($(this).data('info_index') - 1);
            $('#hoteldesclist li').eq(btnIndex).hide();
            $(this).hide();
            $(this).siblings('.show-info').show();
        });
    }
    
    function restoreInfoBtnToggle(){
        $('#hotel-1').slick('slickPlay');
        $('#hoteldesclist li').filter(':visible').hide();
        $('#hotel-1 .toggle-info.hide-info').filter(':visible').hide();
        $('#hotel-1 .toggle-info.show-info').filter(':hidden').show();
    }
    /*
    * END
    * functions for
    * the behaviour of
    * the "show info" and "hide info" buttons
    */
    
    /*
    * START
    * function that replaces
    * the player button
    * with an iframe
    * in IE browsers
    */
	function slickHotel1PlayBtnAxn(){
        
        $('#hotel-1 .play-button').click(function() {
            
            $('#hotel-1').slick('slickPause');
            
            var video_id = $(this).parent('div').data('video_id');
            
            $(this).replaceWith('<iframe id="ytplayer" type="text/html" width="100%" height="100%" src="http://www.youtube.com/embed/' + video_id + '?autoplay=1&rel=0&controls=2&rel=0 frameborder="0"/>');
        
        });
        
    }
    /*
    * END
    * function that replaces
    * the player button
    * with an iframe
    * in IE browsers
    */
    
    /*
    * START
    * function that replaces
    * any iframes
    * with a player button
    */
    function returnSlickHotel1PlayButton(){
        var playButton = '<button class="play-button">Play Video</button>';
        var playerParent = $('#hotel-1 iframe');
        if ( playerParent.length > 0 ){
            playerParent.replaceWith(playButton);
            $('#hotel-1').slick('slickPlay');
        }
    }
    /*
    * END
    * function that replaces
    * any iframes
    * with a player button
    */
    
    
    /*
    * START
    * callback function
    * invoked after 
    * browser window is resized
    */
    function onSlickResized () {
        if ($(window).width() > 640) {
            
            //get the index of
            //the currently loaded slide
            //before browser resize
            hotel1SlideBeforeResize = $('#hotel-1').slick('slickCurrentSlide');
            
            //remove hotel-1 slick carousel items
            //to refresh the list
            while($('#hotel-1 li').length > 0){
                $('#hotel-1').slick('slickRemove', false);
            }
            
            if ($('#hoteltable tbody tr td.dataTables_empty').length >= 1) {
                appendHotel1ErrorSlide();
            }
            
            //if the hoteltable has no errors
            else if ($('#hoteltable tbody tr td.dataTables_empty').length < 1) {
                populateHotel1 ('medium');
                setOverlayCss('large');
                
                //if the previously displayed slide
                //before resize is not the first slide,
                //instantly go to the slide
                //that was active
                //before the resize
                if (hotel1SlideBeforeResize != 0){
                    $('#hotel-1').slick('slickGoTo', hotel1SlideBeforeResize, true);    
                }
               
                currentHotelSlide = $('#hotel-1').slick('slickCurrentSlide');
                
                restoreInfoBtnToggle();
                returnSlickHotel1PlayButton();
                
                $('#hotel-1').slick('slickPlay');
                
                toggleInfo();
                tableScrollUpBtnAxn ();
                slickHotel1PlayBtnAxn();
                $('#hotel-1').on('afterChange', function (event, slick, currentSlide) {
                    $('#hotel-2').slick('slickGoTo', currentSlide);
                    restoreInfoBtnToggle();
                    returnSlickHotel1PlayButton();
                    slickHotel1PlayBtnAxn();
                });
            }
            
        } else if ($(window).width() <= 640) {
            
            //get the index of
            //the currently loaded slide
            //before browser resize
            hotel1SlideBeforeResize = $('#hotel-1').slick('slickCurrentSlide');
            
            //remove hotel-1 slick carousel items
            //to refresh the list
            while($('#hotel-1 li').length > 0){
                $('#hotel-1').slick('slickRemove', false);
            }
            
            if ($('#hoteltable tbody tr td.dataTables_empty').length >= 1) {
                appendHotel1ErrorSlide();
            }
            
            //if the hoteltable has no errors
            else if ($('#hoteltable tbody tr td.dataTables_empty').length < 1) {
                populateHotel1 ('mobile');
                setOverlayCss('small');
                
                //if the previously displayed slide
                //before resize is not the first slide,
                //instantly go to the slide
                //that was active
                //before the resize
                if (hotel1SlideBeforeResize != 0){
                    $('#hotel-1').slick('slickGoTo', hotel1SlideBeforeResize, true);    
                }
               
                currentHotelSlide = $('#hotel-1').slick('slickCurrentSlide');
                
                restoreInfoBtnToggle();
                returnSlickHotel1PlayButton();
                
                $('#hotel-1').slick('slickPlay');
                
                toggleInfo();
                tableScrollUpBtnAxn ();
                slickHotel1PlayBtnAxn();
                $('#hotel-1').on('afterChange', function (event, slick, currentSlide) {
                    $('#hotel-2').slick('slickGoTo', currentSlide);
                    restoreInfoBtnToggle();
                    returnSlickHotel1PlayButton();
                    slickHotel1PlayBtnAxn();
                });
            }
        }
    }
    /*
    * END
    * callback function
    * invoked after 
    * browser window is resized
    */
    
    /*
    * START
    * function that controls
    * the behaviour of
    * the player buttons
    * on the "hoteltable" table
    */   
    function tableScrollUpBtnAxn () {
        $('#hoteltable .scrollUp-button').click(function(){
            var tableScrollUpBtn = $(this);
            var hotel1IndexPos = (tableScrollUpBtn.data('index_position') - 1);
            
            //make the hotel-1 bxslider
            //move to specified index position
            $('#hotel-1').slick('slickGoTo', hotel1IndexPos);
            
            //animate the document
            //to scroll up
            //to the hotel-1 slider
            $('html, body').animate({
                scrollTop: $('#hotel-1-container').offset().top 
            },10);
        });
    }
    /*
    * END
    * function that controls
    * the behaviour of
    * the player buttons
    * on the "hoteltable" table
    */
});
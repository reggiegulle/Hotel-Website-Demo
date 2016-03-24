$(document).ready(function () {
    
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
    
    
    /*
    * START
    * utility function for
    * detecting if
    * the browser is IE
    * Code from Codepen:
    * http://codepen.io/gapcode/pen/vEJNZN
    * from Mario (Co-founder of http://gizmocraft.com )
    */
    
    /*
    * detect IE
    * returns version of IE or false, if browser is not Internet Explorer
    */
    function detectIE() {
        var ua = window.navigator.userAgent;

        // Test values; Uncomment to check result …

        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

        // IE 12 / Spartan
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

        // Edge (IE 12+)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
		var edgeNotif = 'edgeTrue';
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            //return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
			return edgeNotif;
        }

        // other browser
        return false;
    }
    
	
	//if < IE Edge, yesIE === @number n
	//if = IE Edge, yesIE === @string 'edgeTrue'
	//if != IE, yesIE === false
    var yesIE = detectIE();

    /*
    * END
    * utility function for
    * detecting if
    * the browser is IE
    * Code from Codepen:
    * http://codepen.io/gapcode/pen/vEJNZN
    * from Mario (Co-founder of http://gizmocraft.com )
    */
    
    /*
    * START
    * Item to be added to
    * the hotel-1 slider
    * if the hoteltable
    * does not contain data
    * (i.e., Null search results)
    */
    function appendHotel1ErrorSlide (slider) {
        
        switch (slider) {
            // if it's a non-IE browser    
            case 'bxslider':
                //remove items from upper bxslider ("ul hotel-1")
                //and lower bxslider ("ul hotel-2")
                //right after each rendering of the table
                while($('#hotel-1 li').length > 0){
                    $('#hotel-1').empty();
                }
                
                var hotel_1_error_li_item = '<li class="no_results">';
                    hotel_1_error_li_item += '<p>';
                        hotel_1_error_li_item += 'Sorry, no search results found.  Please try again.';
                    hotel_1_error_li_item += '</p>';
                hotel_1_error_li_item += '</li>';
                //put error slide
                //in the hotel-1 bxslider
                $('#hotel-1').append(hotel_1_error_li_item);
                
                //reload the hotel-1 bxslider
                bxslider_hotel_1.reloadSlider({
                    mode: 'fade',
                    pager: false
                });

                clearAllIntervals();

                $('#progressBar').css({
                   'width': 0 + '%' 
                });
            break;
            // if it's an IE browser
            case 'slick':
                var hotel_1_error_li_item = '<li class="no_results">';
                    hotel_1_error_li_item += '<p>';
                        hotel_1_error_li_item += 'Sorry, no search results found.  Please try again.';
                    hotel_1_error_li_item += '</p>';
                hotel_1_error_li_item += '</li>';
                //put error slide
                //in the hotel-1 slick slider
                $('#hotel-1').slick('slickAdd', hotel_1_error_li_item, false);
            break;
            default:
            break;
        }
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
    * function that populates
    * the hotel-1 slider
    * based on browser width
    * and slider type
    */
    function populateHotel1 (width, slider) {

        switch (width) {

            case 'medium':  var infoIndex = 0;
                            
                            //remove items from upper bxslider ("ul hotel-1")
                            //and lower bxslider ("ul hotel-2")
                            //right after each rendering of the table
                            while($('#hotel-1 li').length > 0){
                                $('#hotel-1').empty();
                            }

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
                                    if (slider === 'bxslider') {
                                        $('#hotel-1').append(hotel_1_li_item);   
                                    }
                                    else if (slider == 'slick') {
                                        $('#hotel-1').slick('slickAdd', hotel_1_li_item, false);
                                    }
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
                                    if (slider === 'bxslider') {
                                        $('#hotel-1').append(hotel_1_li_item);   
                                    }
                                    else if (slider == 'slick') {
                                        $('#hotel-1').slick('slickAdd', hotel_1_li_item, false);
                                    }
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
    * and slider type
    */
    
    /*
    * START
    * function that sets the styling
    * of the slide overlay player
    * for both bxslider and slick
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
    * for both bxslider and slick
    */
    
    /*
    * START
    * no results reload function
    * strictly for hotel-2 bxslider
    * non-IE browser
    */
    function noResultsReloadHotel2Bxslider () {
         while($('#hotel-2 li').length > 0){
            $('#hotel-2').empty();
        }

        bxslider_hotel_2.reloadSlider({
            pager: false
        });

    }
    /*
    * END
    * no results reload function
    * strictly for hotel-2 bxslider
    * non-IE browser
    */
    
    /*
    * START
    * function for populating
    * an error-free hotel-2 slider
    */
    function assembleHotel2SlideItem (rowData, index_data) {
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
    * START
    * functions for
    * the behaviour of
    * the "show info" and "hide info" buttons
    */
    function toggleInfo(slider){
        $('#hotel-1 .hide-info').hide();

        var btnIndex;

        if (slider === 'bxslider') {
            $('#hotel-1 .show-info').click(function () {
                clearAllIntervals();
                paused = true;
                btnIndex = ($(this).data('info_index') - 1);
                $('#hoteldesclist li').eq(btnIndex).show();
                $(this).hide();
                $(this).siblings('.hide-info').show();
            });    
        }
        else if (slider === 'slick') {
            $('#hotel-1 .show-info').click(function () {
                $('#hotel-1').slick('slickPause');
                btnIndex = ($(this).data('info_index') - 1);
                $('#hoteldesclist li').eq(btnIndex).show();
                $(this).hide();
                $(this).siblings('.hide-info').show();
            });    
        }


        $('#hotel-1 .hide-info').click(function () {
            btnIndex = ($(this).data('info_index') - 1);
            $('#hoteldesclist li').eq(btnIndex).hide();
            $(this).hide();
            $(this).siblings('.show-info').show();
        });
    }

    function restoreInfoBtnToggle (slider) {
        if (slider === 'bxslider') {
            $('#hoteldesclist li').filter(':visible').hide();
            $('#hotel-1 .toggle-info.hide-info').filter(':visible').hide();
            $('#hotel-1 .toggle-info.show-info').filter(':hidden').show();    
        }
        else if (slider === 'slick') {
            $('#hotel-1').slick('slickPlay');
            $('#hoteldesclist li').filter(':visible').hide();
            $('#hotel-1 .toggle-info.hide-info').filter(':visible').hide();
            $('#hotel-1 .toggle-info.show-info').filter(':hidden').show();    
        }
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
    */
    function sliderPlayBtnAxn (slider) {
        $('#hotel-1 .play-button').click(function() {
            if (slider === 'bxslider') {
                clearAllIntervals();
                paused = true;
            }
            else if (slider === 'slick') {
                $('#hotel-1').slick('slickPause');    
            }

            var video_id = $(this).parent('div').data('video_id');

            $(this).replaceWith('<iframe id="ytplayer" type="text/html" width="100%" height="100%" src="http://www.youtube.com/embed/' + video_id + '?autoplay=1&rel=0&controls=2&rel=0 frameborder="0"/>');

        });
    }
    /*
    * END
    * function that replaces
    * the player button
    * with an iframe
    */
    
    /*
    * START
    * function that controls
    * the behaviour of
    * the player buttons
    * on the "hoteltable" table
    */   
    function tableScrollUpBtnAxn (slider) {
        $('#hoteltable .scrollUp-button').click(function(){
            var tableScrollUpBtn = $(this);
            var hotel1IndexPos = (tableScrollUpBtn.data('index_position') - 1);
            
            if (slider === 'bxslider') {
                //make the hotel-1 bxslider
                //move to specified index position
                bxslider_hotel_1.goToSlide(hotel1IndexPos);    
            }
            else if (slider === 'slick') {
                //make the hotel-1 slick slider
                //move to specified index position
                $('#hotel-1').slick('slickGoTo', hotel1IndexPos);    
            }

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
    
    /*
    * START
    * function that replaces
    * any iframes
    * with a player button
    */
    function returnPlayButton (slider) {
        switch (slider) {
            case 'bxslider':    var playButton = '<button class="play-button">Play Video</button>';
                                var playerParent = $('#hotel-1 iframe');
                                if ( playerParent.length > 0 ){
                                    playerParent.replaceWith(playButton);
                                }  
            break;
            case 'slick':       var playButton = '<button class="play-button">Play Video</button>';
                                var playerParent = $('#hotel-1 iframe');
                                if ( playerParent.length > 0 ){
                                    playerParent.replaceWith(playButton);
                                    $('#hotel-1').slick('slickPlay');
                                }
            break;
            default:
            break;
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
    * function for
    * behaviour of
    * hotel-1 bxslider
    * when the window
    * is resized
    * only for non-IE browsers
    */
    function hotel1BxsliderResizeAxn (currentHotel1Index, screenType, cssOverlaySize) {
        //remove items from upper bxslider ("ul hotel-1")
        //right after browser resize
        while($('#hotel-1 li').length > 0){
            $('#hotel-1').empty();
        }
        
        if ($('#hoteltable tbody tr td.dataTables_empty').length >= 1 ) {
            appendHotel1ErrorSlide ('bxslider');
        }
        else if ($('#hoteltable tbody tr td.dataTables_empty').length < 1 ) {
            populateHotel1 (screenType, 'bxslider');
            //reload the bxslider
            bxslider_hotel_1.reloadSlider({
                mode: 'fade',
                pager: false,
                onSliderLoad: function (currentIndex) {
                        setOverlayCss(cssOverlaySize);
                        doProgressBar();

                        $('#hotel-2-container a.bx-prev, #hotel-2-container a.bx-next').on('mouseover', function(){
                            paused = true;
                        });
                        $('#hotel-2-container a.bx-prev, #hotel-2-container a.bx-next').on('mouseout', function(){
                            paused = false;
                        });

                        if (currentHotel1Index < 1) {
                            bxslider_hotel_2.goToSlide(0);
                            $('#hotel-1 li:eq(0)').click(function(){
                                bxslider_hotel_2.goToSlide(0);
                                lengIncrement = 0;
                            });
                        } else if (currentHotel1Index >= 1){	     
                            bxslider_hotel_1.goToSlide(currentHotel1Index);
                            bxslider_hotel_2.goToSlide(currentHotel1Index);
                        }

                        toggleInfo('bxslider');
                        sliderPlayBtnAxn('bxslider');
                        tableScrollUpBtnAxn('bxslider');
                    },
                onSlideBefore: function () {
                        restoreInfoBtnToggle('bxslider')
                    },
                onSlideAfter: function ($slideElement, oldIndex, newIndex) {
                        returnPlayButton('bxslider');    
                        currentHotel1Index = newIndex;
                        bxslider_hotel_2.goToSlide(newIndex);
                        doProgressBar();

                        $slideElement.click(function(){
                            lengIncrement = 0;
                        });
                        sliderPlayBtnAxn('bxslider');
                        tableScrollUpBtnAxn('bxslider');
                    }

            });
        }
        
    }
    /*
    * END
    * function for
    * behaviour of
    * hotel-1 bxslider
    * when the window
    * is resized
    * only for non-IE browsers
    */
    
    /*
    * START
    * function for
    * behaviour of
    * hotel-1 slick slider
    * when the window
    * is resized
    * only for IE browsers
    */
    function hotel1SlickSliderResizeAxn (screenType, cssOverlaySize, currentHotelSlide) {
        //get the index of
        //the currently loaded slide
        //before browser resize
        var hotel1SlideBeforeResize = $('#hotel-1').slick('slickCurrentSlide');
        
        //remove hotel-1 slick carousel items
        //to refresh the list
        while($('#hotel-1 li').length > 0){
            $('#hotel-1').slick('slickRemove', false);
        }
        
        if ($('#hoteltable tbody tr td.dataTables_empty').length >= 1) {
            appendHotel1ErrorSlide ('slick');
        }
        //if the hoteltable has no errors
        else if ($('#hoteltable tbody tr td.dataTables_empty').length < 1) {
            populateHotel1 (screenType, 'slick');
            setOverlayCss (cssOverlaySize); 
            
            //if the previously displayed slide
            //before resize is not the first slide,
            //instantly go to the slide
            //that was active
            //before the resize
            if (hotel1SlideBeforeResize != 0){
                $('#hotel-1').slick('slickGoTo', hotel1SlideBeforeResize, true);    
            }
            
            currentHotelSlide = $('#hotel-1').slick('slickCurrentSlide');
            
            restoreInfoBtnToggle('slick');
            returnPlayButton('slick');

            $('#hotel-1').slick('slickPlay');
            
            toggleInfo('slick');
            tableScrollUpBtnAxn ('slick');
            sliderPlayBtnAxn('slick');
            
            $('#hotel-1').on('afterChange', function (event, slick, currentSlide) {
                $('#hotel-2').slick('slickGoTo', currentSlide);
                
                restoreInfoBtnToggle('slick');
                returnPlayButton('slick');
                sliderPlayBtnAxn('slick');
            });
        }
    }
    /*
    * END
    * function for
    * behaviour of
    * hotel-1 slick slider
    * when the window
    * is resized
    * only for IE browsers
    */
    
    if ( yesIE === false ) {
        
        //assign "hoteltable" dataTable API instance
        var hoteltable = $('#hoteltable').DataTable();
        
        //initalize bx-slider for hotel-1
        var bxslider_hotel_1 = $('#hotel-1').bxSlider({
            mode: 'fade',
            pager: false
        });

        //initalize bx-slider for hotel-2
        var bxslider_hotel_2 = $('#hotel-2').bxSlider({
            pager: false
        });

        /*
        * START
        * function for building
        * the progress Bar 
        * and determining its behaviour
        * strictly for non-IE browsers
        */

        //very hacky
        //brute force code
        //from "http://www.sitepoint.com/clear-setinterval-knowing-id/"
        function clearAllIntervals(){
            for(i=0; i<9999; i++){
                window.clearInterval(i);
            }
        }

        var time = 7,
        lengIncrement,
        tick,
        paused;

        function doProgressBar(){
            clearAllIntervals();
            lengIncrement = 0;
            paused = false;
            tick = setInterval(barIncrement, 10);

        }

        function barIncrement(){
            if (paused === false){
                lengIncrement += 1/time;
                $('#progressBar').css({
                   'width': lengIncrement + '%' 
                });

                if (lengIncrement >= 100){
                    clearAllIntervals();
                    bxslider_hotel_1.goToNextSlide();
                }
            }
        }

        $('#hotel-1, #hotel-2').on('mouseover', function(){
           paused = true; 
        });


        $('#hotel-1, #hotel-2').on('mouseout', function(){
           paused = false; 
        });
        /*
        * END
        * function for building
        * the progress Bar 
        * and determining its behaviour
        * strictly for non-IE browsers
        */

        /*
        * START
        * function that executes
        * after each rendering
        * of the "hoteltable" table element
        * if yesIE === false
        */
        hoteltable.on('draw.dt',function(){

            clearAllIntervals();
            
            //set an empty variable
            //later to be assigned
            //the index of hotel-1 current slide
            var currentHotel1Index;
            
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
                $('#hotel-2').empty();
            }
            /*
            populate hotel-2 bxslider
            */
            if ($('#hoteltable tbody tr td.dataTables_empty').length >= 1 ){
                /*
                * depopulate hotel-2
                * if the hoteltable is also
                * not populated with items
                */
                noResultsReloadHotel2Bxslider();

            } 
            
            else if ($('#hoteltable tbody tr td.dataTables_empty').length < 1 ){
                
                /*
                * populate hotel-2
                * if the hoteltable is also
                * populated with items
                */
                
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
                        var hotel_2_li_item = assembleHotel2SlideItem(rowData, hotel_1_index_position);
                        $('#hotel-2').append(hotel_2_li_item);
                    }
                });

                //reload hotel-2 bxslider
                bxslider_hotel_2.reloadSlider({
                    minSlides: 2,
                    maxSlides: 6,
                    slideWidth: 170,
                    slideMargin: 10,
                    moveSlides: 1,
                    pager: false,
                    onSliderLoad: function(){
                        $('#hotel-2 li').click(function(){
                            var hotel1IndxPos = $(this).data('index_position');
                            //make bxslider_hotel_1
                            //go to the slide 
                            //specified by the index_position data
                            bxslider_hotel_1.goToSlide(hotel1IndxPos - 1);
                        });
                    }
                });

            }
            /*
            * END
            * Assemble hotel-2 slider
            */

            /*
            populate hotel-1 bxslider
            */
            if ($(window).width() > 640) {

                if ($('#hoteltable tbody tr td.dataTables_empty').length >= 1 ){

                    appendHotel1ErrorSlide ('bxslider');

                } else if ($('#hoteltable tbody tr td.dataTables_empty').length < 1 ) {
                    
                    //remove items from upper bxslider ("ul hotel-1")
                    //and lower bxslider ("ul hotel-2")
                    //right after each rendering of the table
                    while($('#hotel-1 li').length > 0){
                        $('#hotel-1').empty();
                    }
                    
                    populateHotel1('medium', 'bxslider');

                    //reload the bxslider
                    bxslider_hotel_1.reloadSlider({
                        mode: 'fade',
                        pager: false,
                        onSliderLoad: function () {

                                //if window width is greater than 640 pixels
                                //make the overlay occupy only about half
                                //of the area of the slide div
                                //with slight margins
                                setOverlayCss('large');

                                doProgressBar();

                                $('#hotel-2-container a.bx-prev, #hotel-2-container a.bx-next').on('mouseover', function(){
                                    paused = true;
                                });
                                $('#hotel-2-container a.bx-prev, #hotel-2-container a.bx-next').on('mouseout', function(){
                                    paused = false;
                                });
                                $('#hotel-1 li:eq(0)').click(function(){
                                    bxslider_hotel_2.goToSlide(0);
                                    lengIncrement = 0;
                                });

                                /*
                                * START
                                * function for
                                * the behaviour of
                                * the "show info" and "hide info" buttons
                                */
                                toggleInfo('bxslider');
                                /*
                                * END
                                * function for
                                * the behaviour of
                                * the "show info" and "hide info" buttons
                                */

                                /*
                                * START
                                * function that replaces
                                * the player button
                                * with an iframe
                                */
                                sliderPlayBtnAxn('bxslider');
                                /*
                                * END
                                * function that replaces
                                * the player button
                                * with an iframe
                                */

                                /*
                                * START
                                * function that controls
                                * the behaviour of
                                * the player buttons
                                * on the "hoteltable" table
                                */
                                tableScrollUpBtnAxn('bxslider');
                                /*
                                * END
                                * function that controls
                                * the behaviour of
                                * the player buttons
                                * on the "hoteltable" table
                                */

                            },
                        onSlideBefore: function () {
                                /*
                                * START
                                * functions for
                                * the behaviour of
                                * the "show info" and "hide info" buttons
                                */
                                restoreInfoBtnToggle('bxslider');
                                /*
                                * END
                                * functions for
                                * the behaviour of
                                * the "show info" and "hide info" buttons
                                */
                            },
                        onSlideAfter: function ($slideElement, oldIndex, newIndex) {
                                returnPlayButton('bxslider');    
                                currentHotel1Index = newIndex;
                                bxslider_hotel_2.goToSlide(newIndex);
                                doProgressBar();

                                $slideElement.click(function(){
                                    lengIncrement = 0;
                                });

                                /*
                                * START
                                * function that replaces
                                * the player button
                                * with an iframe
                                */
                                sliderPlayBtnAxn('bxslider');
                                /*
                                * END
                                * function that replaces
                                * the player button
                                * with an iframe
                                */

                                /*
                                * START
                                * function that controls
                                * the behaviour of
                                * the player buttons
                                * on the "hoteltable" table
                                */
                                tableScrollUpBtnAxn('bxslider');
                                /*
                                * END
                                * function that controls
                                * the behaviour of
                                * the player buttons
                                * on the "hoteltable" table
                                */

                            }                
                    });

                }


            } else if ($(window).width() <= 640) {

                if ($('#hoteltable tbody tr td.dataTables_empty').length >= 1 ){

                    appendHotel1ErrorSlide ('bxslider');

                } else if ($('#hoteltable tbody tr td.dataTables_empty').length < 1 ) {
                    
                    //remove items from upper bxslider ("ul hotel-1")
                    //and lower bxslider ("ul hotel-2")
                    //right after each rendering of the table
                    while($('#hotel-1 li').length > 0){
                        $('#hotel-1').empty();
                    }

                    populateHotel1('mobile', 'bxslider');

                    //reload the bxslider
                    bxslider_hotel_1.reloadSlider({
                        mode: 'fade',
                        pager: false,
                        onSliderLoad: function(){

                                setOverlayCss('small');

                                doProgressBar();

                                $('#hotel-2-container a.bx-prev, #hotel-2-container a.bx-next').on('mouseover', function(){
                                    paused = true;
                                });
                                $('#hotel-2-container a.bx-prev, #hotel-2-container a.bx-next').on('mouseout', function(){
                                    paused = false;
                                });
                                $('#hotel-1 li:eq(0)').click(function(){
                                    bxslider_hotel_2.goToSlide(0);
                                    lengIncrement = 0;
                                });

                                /*
                                * START
                                * function for
                                * the behaviour of
                                * the "show info" and "hide info" buttons
                                */
                                toggleInfo('bxslider');
                                /*
                                * END
                                * function for
                                * the behaviour of
                                * the "show info" and "hide info" buttons
                                */

                                /*
                                * START
                                * function that replaces
                                * the player button
                                * with an iframe
                                */
                                sliderPlayBtnAxn('bxslider');
                                /*
                                * END
                                * function that replaces
                                * the player button
                                * with an iframe
                                */

                                /*
                                * START
                                * function that controls
                                * the behaviour of
                                * the player buttons
                                * on the "hoteltable" table
                                */
                                tableScrollUpBtnAxn('bxslider');
                                /*
                                * END
                                * function that controls
                                * the behaviour of
                                * the player buttons
                                * on the "hoteltable" table
                                */

                            },
                        onSlideBefore: function () {
                                /*
                                * START
                                * functions for
                                * the behaviour of
                                * the "show info" and "hide info" buttons
                                */
                                restoreInfoBtnToggle('bxslider');
                                /*
                                * END
                                * functions for
                                * the behaviour of
                                * the "show info" and "hide info" buttons
                                */
                            },
                        onSlideAfter: function($slideElement, oldIndex, newIndex){
                                returnPlayButton('bxslider');    
                                currentHotel1Index = newIndex;
                                bxslider_hotel_2.goToSlide(newIndex);
                                doProgressBar();

                                $slideElement.click(function(){
                                    lengIncrement = 0;
                                });

                                /*
                                * START
                                * function that replaces
                                * the player button
                                * with an iframe
                                */
                                sliderPlayBtnAxn('bxslider');
                                /*
                                * END
                                * function that replaces
                                * the player button
                                * with an iframe
                                */

                                /*
                                * START
                                * function that controls
                                * the behaviour of
                                * the player buttons
                                * on the "hoteltable" table
                                */
                                tableScrollUpBtnAxn('bxslider');
                                /*
                                * END
                                * function that controls
                                * the behaviour of
                                * the player buttons
                                * on the "hoteltable" table
                                */

                            }                
                    });

                }

            } 

            /*
            * START
            * load contents of hotel-1 bxslider
            * depending on browser width
            * on browser resize
            */
            $(window).resize(function(){

                waitForFinalEvent(function(){

                    if ($(window).width() > 640) {
                        //function hotel1BxsliderResizeAxn (currentHotel1Index, screenType, cssOverlaySize)
                        hotel1BxsliderResizeAxn (currentHotel1Index, 'medium', 'large');
                    } 
                    
                    else if ($(window).width() <= 640) {
                        //function hotel1BxsliderResizeAxn (currentHotel1Index, screenType, cssOverlaySize)
                        hotel1BxsliderResizeAxn (currentHotel1Index, 'mobile', 'small');
                    }
                }, 250, 'hotel-1-slide-resize');
            });
            /*
            * END
            * load contents of hotel-1 bxslider
            * depending on browser width
            * on browser resize
            */
        });
        /*
        * END
        * function that executes
        * after each rendering
        * of the "hoteltable" table element
        * if yesIE === false
        */ 
    }
    
    else {
        
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

        hoteltable.on('draw.dt', function () {
            
            //set an empty variable
            //later to be assigned
            //the index of hotel-1 current slide
            var currentHotel1Slide;

            //set an empty variable
            //later to be assigned
            //the index of hotel-1 current slide
            //before resize
            //var hotel1SlideBeforeResize;

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
                        var hotel_2_li_item = assembleHotel2SlideItem (rowData, hotel_1_index_position);
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
                    appendHotel1ErrorSlide ('slick');
                }
                else if ($('#hoteltable tbody tr td.dataTables_empty').length < 1) {
                    populateHotel1 ('medium', 'slick');
                    setOverlayCss('large');
                    $('#hotel-1').slick('slickPlay');
                    currentHotelSlide = $('#hotel-1').slick('slickCurrentSlide');
                    toggleInfo('slick');
                    tableScrollUpBtnAxn ('slick');
                    sliderPlayBtnAxn('slick');
                    $('#hotel-1').on('afterChange', function (event, slick, currentSlide) {
                        $('#hotel-2').slick('slickGoTo', currentSlide);
                        restoreInfoBtnToggle('slick');
                        returnPlayButton('slick');
                        sliderPlayBtnAxn('slick');
                    }); 
                }
            }
            else if ($(window).width() <= 640) {
                //remove hotel-1 slick carousel items
                //to refresh the list
                while($('#hotel-1 li').length > 0){
                    $('#hotel-1').slick('slickRemove', false);
                }

                if ($('#hoteltable tbody tr td.dataTables_empty').length >= 1) {
                    appendHotel1ErrorSlide ('slick');
                }
                //if the hoteltable has no errors
                else if ($('#hoteltable tbody tr td.dataTables_empty').length < 1) {
                    populateHotel1 ('mobile', 'slick');
                    setOverlayCss('small');
                    $('#hotel-1').slick('slickPlay');
                    currentHotelSlide = $('#hotel-1').slick('slickCurrentSlide');
                    toggleInfo('slick');
                    tableScrollUpBtnAxn ('slick');
                    sliderPlayBtnAxn('slick');
                    $('#hotel-1').on('afterChange', function (event, slick, currentSlide) {
                        $('#hotel-2').slick('slickGoTo', currentSlide);
                        restoreInfoBtnToggle('slick');
                        returnPlayButton('slick');
                        sliderPlayBtnAxn('slick');
                    });
                }
            }
            /*
            * END
            * Assemble hotel-1 slider
            */
            
            /*
            * START
            * load contents of hotel-1 bxslider
            * depending on browser width
            * on browser resize
            */
            $(window).resize(function(){

                waitForFinalEvent(function(){

                    if ($(window).width() > 640) {
                        //function hotel1SlickSliderResizeAxn (screenType, cssOverlaySize, currentHotelSlide)
                        hotel1SlickSliderResizeAxn ('medium', 'large', currentHotel1Slide);
                    } 
                    
                    else if ($(window).width() <= 640) {
                        //function hotel1SlickSliderResizeAxn (screenType, cssOverlaySize, currentHotelSlide)
                        hotel1SlickSliderResizeAxn ('mobile', 'small', currentHotel1Slide);   
                    }
                }, 250, 'hotel-1-slide-resize');
            });
            /*
            * END
            * load contents of hotel-1 bxslider
            * depending on browser width
            * on browser resize
            */
        });
    }
});
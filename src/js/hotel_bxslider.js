$(document).ready(function(){
    
   /* utility function for
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
    */

    //very hacky
    //brute force code
    //from "http://www.sitepoint.com/clear-setinterval-knowing-id/"
    function clearAllIntervals(){
        for(i=0; i<9999; i++){
            window.clearInterval(i);
        }
    }

    var time = 5,
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
    */
    
    
    var hoteltable = $('#hoteltable').DataTable();
    
    /*
    * START
    * function that executes
    * after each rendering
    * of the "hoteltable" table element
    */
    
    
    
    hoteltable.on('draw.dt',function(){
        
        clearAllIntervals();
        
        
        
                   
        //remove items from upper bxslider ("ul hotel-1")
        //and lower bxslider ("ul hotel-2")
        //right after each rendering of the table
        while($('#hotel-1 li').length > 0){
            $('#hotel-1').empty();
        }
        
        while($('#hotel-2 li').length > 0){
            $('#hotel-2').empty();
        }

        var currentHotel1Index;
        
        var rowData;
        
        
        
        /*
        populate hotel-2 bxslider
        */
        
        //instantiate a variable
        //that increments by one
        //per iteration
        var index_position = 0;
        
        $('#hoteltable tbody tr').each(function(){
            
            var thisRow = $(this);
            //get the data (json data source) from each row
            rowData = hoteltable.row(thisRow).data();
            
            //add the relevant data to the owl-carousel bottom list
            //one list item at a time
            if (typeof(rowData) != 'undefined'){
                
                //per row iteration,
                //increment index_position by 1
                index_position++;
                //add this data to each hotel-2 li
                var hotel_2_li_item = '<li data-index_position="' + index_position + '">';
                hotel_2_li_item += '<div class="hotel-2-slide">';
                hotel_2_li_item +='<img src="images/' + rowData.image.src + '-small.jpg" width="100%" height="100%" alt="' + rowData.image.src + '" data-video_id="' + rowData.image.video_id + '"></div>';
                hotel_2_li_item += '<h6>';
                hotel_2_li_item += rowData.name;
                hotel_2_li_item += '</h6>';
                hotel_2_li_item += '<p>(';
                hotel_2_li_item += rowData.category.category_filter;
                hotel_2_li_item += ')</p>';
                hotel_2_li_item += '</li>';
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
        
        
        
       
        
        /*
        populate hotel-1 bxslider
        */
        if ($(window).width() > 640) {         
            $('#hoteltable tbody tr').each(function(){
                var thisRow = $(this);
                //get the data (json data source) from each row
                rowData = hoteltable.row(thisRow).data();
                
                //add the relevant data to bxslider hotel-1
                //one list item at a time
                if (typeof(rowData) != 'undefined'){
                    var hotel_1_li_item = '<li>';
                        hotel_1_li_item += '<div class="hotel-1-slide" data-video_id="' + rowData.image.video_id + '">';
                        //use the "medium" jpg for screen sizes above 640px
                            hotel_1_li_item += '<img src="images/' + rowData.image.src + '-medium.jpg" width="100%" height="100%" />';
                            hotel_1_li_item += '<div class="hotel-1-slide-overlay-player">';
                                hotel_1_li_item += '<button class="play-button">';
                                    hotel_1_li_item += 'Play Video';
                                hotel_1_li_item += '</button>';
                            hotel_1_li_item += '</div>';
                        hotel_1_li_item += '</div>';
                    hotel_1_li_item += '</li>';
                    $('#hotel-1').append(hotel_1_li_item);
                }
            });
            
            //reload the bxslider
            bxslider_hotel_1.reloadSlider({
                mode: 'fade',
                pager: false,
                onSliderLoad: function(){
                        
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
                            lengIncrement = 0;
                            bxslider_hotel_2.goToSlide(0);
                        }); 
                    },
                onSlideAfter: function($slideElement, oldIndex, newIndex){
                    
                        currentHotel1Index = newIndex;
                    
                        bxslider_hotel_2.goToSlide(newIndex);
                        lengIncrement = 0;
                        doProgressBar();
                        $slideElement.click(function(){
                            lengIncrement = 0;
                        }); 
                    }                
            });
            
           
            
            
        } else if ($(window).width() <= 640) {
            
            $('#hoteltable tbody tr').each(function(){
                var thisRow = $(this);
                //get the data (json data source) from each row
                rowData = hoteltable.row(thisRow).data();
                
                //add the relevant data to bxslider hotel-1
                //one list item at a time
                if (typeof(rowData) != 'undefined'){
                    var hotel_1_li_item = '<li>';
                        hotel_1_li_item += '<div class="hotel-1-slide" data-video_id="' + rowData.image.video_id + '">';
                        //use the "mobile" jpg for screen sizes equal to or less than 640px
                            hotel_1_li_item += '<img src="images/' + rowData.image.src + '-mobile.jpg" width="100%" height="100%" />';
                            hotel_1_li_item += '<div class="hotel-1-slide-overlay-player">';
                                hotel_1_li_item += '<button class="play-button">';
                                    hotel_1_li_item += 'Play Video';
                                hotel_1_li_item += '</button>';
                            hotel_1_li_item += '</div>';
                        hotel_1_li_item += '</div>';
                    hotel_1_li_item += '</li>';
                    $('#hotel-1').append(hotel_1_li_item);
                }
            });
            
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
                    },
                onSlideAfter: function($slideElement, oldIndex, newIndex){
                    
                        currentHotel1Index = newIndex;
                    
                        bxslider_hotel_2.goToSlide(newIndex);
                        lengIncrement = 0;
                        doProgressBar();
                        $slideElement.click(function(){
                            lengIncrement = 0;
                        }); 
                    }                
            });
        }
        
        /*
        modify contents of hotel-1 bxslider
        depending on browser width
        on browser resize
        */
        $(window).resize(function(){
            
            waitForFinalEvent(function(){
                
                if ($(window).width() > 640) {
                    
                    //remove items from upper bxslider ("ul hotel-1")
                    //right after browser resize
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
                            var hotel_1_li_item = '<li>';
                                hotel_1_li_item += '<div class="hotel-1-slide" data-video_id="' + rowData.image.video_id + '">';
                                //use the "medium" jpg for screen sizes above 640px
                                    hotel_1_li_item += '<img src="images/' + rowData.image.src + '-medium.jpg" width="100%" height="100%" />';
                                    hotel_1_li_item += '<div class="hotel-1-slide-overlay-player">';
                                        hotel_1_li_item += '<button class="play-button">';
                                            hotel_1_li_item += 'Play Video';
                                        hotel_1_li_item += '</button>';
                                    hotel_1_li_item += '</div>';
                                hotel_1_li_item += '</div>';
                            hotel_1_li_item += '</li>';
                            $('#hotel-1').append(hotel_1_li_item);
                        }
                    });
            
                    //reload the bxslider
                    bxslider_hotel_1.reloadSlider({
                        mode: 'fade',
                        pager: false,
                        onSliderLoad: function(){
                            
                                setOverlayCss('large');
                                
                                doProgressBar();
                            
                                $('#hotel-2-container a.bx-prev, #hotel-2-container a.bx-next').on('mouseover', function(){
                                    paused = true;
                                });
                                $('#hotel-2-container a.bx-prev, #hotel-2-container a.bx-next').on('mouseout', function(){
                                    paused = false;
                                });
                            
                                if (currentHotel1Index < 1) {
                                    bxslider_hotel_2.goToSlide(0);
                                } else if (currentHotel1Index >= 1){
                                    bxslider_hotel_1.goToSlide(currentHotel1Index);
                                    bxslider_hotel_2.goToSlide(currentHotel1Index);
                                }
                            
                                
                            },
                        onSlideAfter: function($slideElement, oldIndex, newIndex){
                            currentHotel1Index = newIndex;
                            bxslider_hotel_2.goToSlide(newIndex);
                            lengIncrement = 0;
                            doProgressBar();
                            $slideElement.click(function(){
                                lengIncrement = 0;
                            }); 
                        }                        
                    });
                    
                   
                    
                    
                } else if ($(window).width() <= 640) {
                    
                    //remove items from upper bxslider ("ul hotel-1")
                    //right after browser resize
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
                            var hotel_1_li_item = '<li>';
                                hotel_1_li_item += '<div class="hotel-1-slide" data-video_id="' + rowData.image.video_id + '">';
                                //use the "mobile" jpg for screen sizes equal to or less than 640px
                                    hotel_1_li_item += '<img src="images/' + rowData.image.src + '-mobile.jpg" width="100%" height="100%" />';
                                    hotel_1_li_item += '<div class="hotel-1-slide-overlay-player">';
                                        hotel_1_li_item += '<button class="play-button">';
                                            hotel_1_li_item += 'Play Video';
                                        hotel_1_li_item += '</button>';
                                    hotel_1_li_item += '</div>';
                                hotel_1_li_item += '</div>';
                            hotel_1_li_item += '</li>';
                            $('#hotel-1').append(hotel_1_li_item);
                        }
                    });
                    
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
                                
                                if (currentHotel1Index < 1) {
                                    bxslider_hotel_2.goToSlide(0);
                                } else if (currentHotel1Index >= 1){
                                    bxslider_hotel_1.goToSlide(currentHotel1Index);
                                    bxslider_hotel_2.goToSlide(currentHotel1Index);
                                }
                            },
                        onSlideAfter: function($slideElement, oldIndex, newIndex){
                                bxslider_hotel_2.goToSlide(newIndex);
                                lengIncrement = 0;
                                doProgressBar();
                                $slideElement.click(function(){
                                    lengIncrement = 0;
                                }); 
                            }                         
                    }); 
                    
                }
            }, 500, 'hotel-1-slide-resize');
        });
        
	})
    
    /*
    * END
    * function that executes
    * after each rendering
    * of the "hoteltable" table element
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

});
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

    var time = 7,
    lengIncrement,
    tick;

    //the code below
    //forms the basis for
    //creating the movement of
    //the slide bar
    function doIncrement(){
        clearAllIntervals();
        lengIncrement = 0
        tick = setInterval(barIncrement, 1000);

    }

    function barIncrement(){
        lengIncrement += 1; 
        console.log('The length Increment is: ' + lengIncrement);
    }

   /* $('#hotel-1').on('slideMoved', function(){
       console.log('Slide has moved'); 
    });*/

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

        
        var rowData;
        
       
        
        /*
        populate hotel-2 bxslider
        */
        $('#hoteltable tbody tr').each(function(){
            var thisRow = $(this);
            //get the data (json data source) from each row
            rowData = hoteltable.row(thisRow).data();
            //add the relevant data to the owl-carousel bottom list
            //one list item at a time
            if (typeof(rowData) != 'undefined'){
                var hotel_2_li_item = '<li>';
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
            pager: false
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
                        //doIncrement();
                    },
                onSlideAfter: function(){
                        //doIncrement();
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
                            hotel_1_li_item += '</div>';
                        hotel_1_li_item += '</div>';
                    hotel_1_li_item += '</li>';
                    $('#hotel-1').append(hotel_1_li_item);
                }
            });
            
            //reload hotel-1 bxslider
            bxslider_hotel_1.reloadSlider({
                mode: 'fade',
                pager: false
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
                                    hotel_1_li_item += '</div>';
                                hotel_1_li_item += '</div>';
                            hotel_1_li_item += '</li>';
                            $('#hotel-1').append(hotel_1_li_item);
                        }
                    });
            
                    //reload hotel-1 bxslider
                    bxslider_hotel_1.reloadSlider({
                        mode: 'fade',
                        pager: false
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
                                    hotel_1_li_item += '</div>';
                                hotel_1_li_item += '</div>';
                            hotel_1_li_item += '</li>';
                            $('#hotel-1').append(hotel_1_li_item);
                        }
                    });
            
                    //reload hotel-1 bxslider
                    bxslider_hotel_1.reloadSlider({
                        mode: 'fade',
                        pager: false
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

});
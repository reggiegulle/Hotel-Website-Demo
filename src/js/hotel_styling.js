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
    
    /* 
    events to be triggered
    when the "hotel" table is rendered
    */
    hoteltable.on('draw.dt', function(){
        //establish the height of 
        //the slide div's overlay
        //on table render
        if ($(window).width() > 640){
            
            //if the hoteltable has no errors
            if ($('#hoteltable tbody tr td.dataTables_empty').length < 1){
                
                //if window width is greater than 640 pixels
                //make the overlay occupy only about half
                //of the area of the slide div
                //with slight margins

                $('.hotel-1-slide-overlay-player').css(
                    {
                        'width': (($('.hotel-1-slide').width()/2) - 10) + 'px',
                        'height': (($('.hotel-1-slide').width()/3.047619047619048) - 10) + 'px',
                        'top': '5px',
                        'right': '5px',
                        'background-color': 'rgba(255, 255, 255, 0.5)'
                    }
                );
            
            } else {
                //css of the error slide
            }
            
        } else if ($(window).width() <= 640) {
            
            //if the hoteltable has no errors
            if ($('#hoteltable tbody tr td.dataTables_empty').length < 1){
                //if window width is less than or equal to 640 pixels
                //make the overlay occupy
                //the whole slide div area
                $('.hotel-1-slide-overlay-player').css(
                    {
                        'width': $('.hotel-1-slide').width() + 'px',
                        'height': ($('.hotel-1-slide').width()/1.777777777778) + 'px',
                        'top': '0px',
                        'right': '0px',
                        'background-color': 'rgba(255, 255, 255, 0.25)'
                    }
                );
            } else {
                //css of the error slide
            }
        }
       
        
        //establish the height of the slide div
        //and the slide div's overlay
        //on browser resize
        $(window).resize(function(){
            
            waitForFinalEvent(function(){
                //establish the height of 
                //the slide div's overlay
                //on window resize
                if ($(window).width() > 640){
                    
                    //if the hoteltable has no errors
                    if ($('#hoteltable tbody tr td.dataTables_empty').length < 1){
                        
                        //on browser resize,
                        //if window width is greater than 640 pixels
                        //make the overlay occupy only about half
                        //of the area of the slide div
                        //with slight margins

                        $('.hotel-1-slide-overlay-player').css(
                            {
                                'width': (($('.hotel-1-slide').width()/2) - 10) + 'px',
                                'height': (($('.hotel-1-slide').width()/3.047619047619048) - 10) + 'px',
                                'top': '5px',
                                'right': '5px',
                                'background-color': 'rgba(255, 255, 255, 0.5)'
                            }
                        );
                        
                    } else {
                      //css of the error slide  
                    }
                    
                    
                } else if ($(window).width() <= 640) {
                    
                    //if the hoteltable has no errors
                    if ($('#hoteltable tbody tr td.dataTables_empty').length < 1){
                        
                        //on browser resize,
                        //if window width is less than or equal to 640 pixels
                        //make the overlay occupy
                        //the whole slide div area 
                        $('.hotel-1-slide-overlay-player').css(
                            {
                                'width': $('.hotel-1-slide').width() + 'px',
                                'height': ($('.hotel-1-slide').width()/1.777777777778) + 'px',
                                'top': '0px',
                                'right': '0px',
                                'background-color': 'rgba(255, 255, 255, 0.25)'
                            }
                        );
                        
                    } else {
                        //css of the error slide
                    }
                }
                
            }, 500, 'owl-hotel-1-slide-resize');
        });
    });

});
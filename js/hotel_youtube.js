$(document).ready(function(){
    
    var hoteltable = $('#hoteltable').DataTable();
    
    hoteltable.on('draw.dt', function(){
        
        /*
        assign a "true" bool value
        to the "owl_hotel_1_playing" variable
        corresponding to the "autoPlay:on" of owl-hotel-1
        */
        var owl_hotel_1_playing = true;
        
        //behaviour for recognising status of overlay player
        if ($('#owl-hotel-1 li').length != 0){
            
            /*
            the block below is a special block
            for stopping the first slide from autoplaying
            the FIRST TIME that the owl-hotel-1 initializes
            if the "Play Video" button is pressed
            */
            $('#owl-hotel-1 li div.owl-hotel-1-slide-overlay-player:eq(0) button').click(function(){
                var video_id = $(this).parent('div').data('video_id');
                //check value of var owl_hotel_1_playing bool
                if(owl_hotel_1_playing === true){
                    /*
                    if value is true,
                    change it to "false"
                    */
                    owl_hotel_1_playing = false;
                    //then stop owl-hotel-1 autoplay
                    $('#owl-hotel-1').trigger('owl.stop');
                }
                /*
                replace the "Play Video" button
                with an iframe YouTube embedded player
                */
                $(this).parent('div').addClass('player-activated').html('<iframe id="ytplayer" type="text/html" width="100%" height="100%" src="http://www.youtube.com/embed/' + video_id + '?autoplay=1&rel=0&controls=2&rel=0 frameborder="0"/>');
            }); 
            
            /*
            clicking on the specified items below
            will restore the owl-hotel-1 autoplay feature 
            */
            $('#owl-hotel-1.owl-theme .owl-controls .owl-buttons div, #owl-hotel-2 li').click(function(){
                //check value of var owl_hotel_1_playing bool
                if (owl_hotel_1_playing === false){
                    /*
                    if value is false,
                    change it to "true"
                    */
                    owl_hotel_1_playing = true;
                    //then resume owl-hotel-1 autoplay
                    $('#owl-hotel-1').trigger('owl.play', 6000);
                }
            }); 
            /*
            a custom event 'allowPlayerActivation'
            enables changing the content
            of each owl-hotel-1-overlay dynamically
            ----referenced in hotel.js 'function sycnPosition'
            */
            $('#owl-hotel-1').on('allowPlayerActivation', function(){
                $('#owl-hotel-1 li div.owl-hotel-1-slide-overlay-player').each(function(){
                    if($(this).hasClass('player-activated')){
                        $(this).removeClass('player-activated');
                        /*
                        replace the iframe YouTube embed
                        with the default content of "Play Video" button
                        */
                        $(this).html('<button class="play-button">Play Video</button>');
                    }
                });
                
                $('#owl-hotel-1 li div.owl-hotel-1-slide-overlay-player button').each(function(){
                    var video_id = $(this).parent('div').data('video_id');
                    $(this).click(function(){
                        ///check value of var owl_hotel_1_playing bool
                        if(owl_hotel_1_playing = true){
                            /*
                            if value is true,
                            change it to "false"
                            */
                            owl_hotel_1_playing = false;
                            //then stop owl-hotel-1 autoplay
                            $('#owl-hotel-1').trigger('owl.stop');
                        }
                        /*
                        replace the "Play Video" button
                        with an iframe YouTube embedded player
                        */
                        $(this).parent('div').addClass('player-activated').html('<iframe id="ytplayer" type="text/html" width="100%" height="100%" src="http://www.youtube.com/embed/' + video_id + '?autoplay=1&rel=0&controls=2&rel=0 frameborder="0"/>'); 
                    });  
                }); 
            });
        }
    });  
});
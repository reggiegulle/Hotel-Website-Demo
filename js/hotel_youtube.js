$(document).ready(function(){
    
    var hoteltable = $('#hoteltable').DataTable();
    
    hoteltable.on('draw.dt', function(){
        
        var owl_hotel_1_playing = true;
        
        
        //behaviour for recognising status of overlay player
        if ($('#owl-hotel-1 li').length != 0){
            
            /*
            the block below is a special block
            for stopping the first slide from autoplaying
            the FIRST TIME that the owl-hotel-1 initializes
            */
            $('#owl-hotel-1 li div.owl-hotel-1-slide-overlay-player:eq(0) button').click(function(){
                console.log(owl_hotel_1_playing + ' - status of owl hotel 1 playing');
                var video_id = $(this).parent('div').data('video_id');
                //then stop owl-hotel-1 autoplay
                if(owl_hotel_1_playing = true){
                    owl_hotel_1_playing = false;
                    console.log(owl_hotel_1_playing + ' - status of owl hotel 1 playing');
                    $('#owl-hotel-1').trigger('owl.stop');
                }
                $(this).parent('div').addClass('player-activated').html('<iframe id="ytplayer" type="text/html" width="100%" height="100%" src="http://www.youtube.com/embed/' + video_id + '?autoplay=1&rel=0&controls=2&rel=0 frameborder="0"/>');
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
                        $(this).html('<button class="play-button">Play Video</button>');
                    }
                });
                
                $('#owl-hotel-1 li div.owl-hotel-1-slide-overlay-player button').each(function(){
                    var video_id = $(this).parent('div').data('video_id');
                    $(this).click(function(){
                        console.log(owl_hotel_1_playing + ' - status of owl hotel 1 playing');
                        //then stop owl-hotel-1 autoplay
                        if(owl_hotel_1_playing = true){
                            owl_hotel_1_playing = false;
                            console.log(owl_hotel_1_playing + ' - status of owl hotel 1 playing');
                            $('#owl-hotel-1').trigger('owl.stop');
                        }
                        $(this).parent('div').addClass('player-activated').html('<iframe id="ytplayer" type="text/html" width="100%" height="100%" src="http://www.youtube.com/embed/' + video_id + '?autoplay=1&rel=0&controls=2&rel=0 frameborder="0"/>'); 
                    });  
                });   
            });
            
            /*
            behaviour for recognising status of overlay player
            before a custom event 'allowPlayerActivation' is triggered
            */
            $('#owl-hotel-1 li div.owl-hotel-1-slide-overlay-player button').each(function(){
                var video_id = $(this).parent('div').data('video_id');
                $(this).click(function(){
                    $(this).parent('div').addClass('player-activated').html('<iframe id="ytplayer" type="text/html" width="100%" height="100%" src="http://www.youtube.com/embed/' + video_id + '?autoplay=1&rel=0&controls=2&origin=http://example.com" frameborder="0"/>');
                }); 
            }); 
        } else if ($('#owl-hotel-1 li').length = 0){
            console.log('Owl-hotel-1 has ' + $('#owl-hotel-1 li').length + ' items');
        }
        
        
    });  
});
$(document).ready(function(){
    
    var player;
    
    var hoteltable = $('#hoteltable').DataTable();
    
    hoteltable.on('draw.dt', function(){
        //behaviour for recognising status of overlay player
        if ($('#owl-hotel-1 li').length != 0){
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
                    $(this).click(function(){
                        $(this).parent('div').addClass('player-activated').html('<div id="player"></div>');
                    }); 
                });
            });
            
            /*
            behaviour for recognising status of overlay player
            before a custom event 'allowPlayerActivation' is triggered
            */
            $('#owl-hotel-1 li div.owl-hotel-1-slide-overlay-player button').each(function(){
                $(this).click(function(){
                    $(this).parent('div').addClass('player-activated').html('<div id="player"></div>');
                }); 
            }); 
        } else if ($('#owl-hotel-1 li').length = 0){
            console.log('Owl-hotel-1 has ' + $('#owl-hotel-1 li').length + ' items');
        }
        
        
    });  
});
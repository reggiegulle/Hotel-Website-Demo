$(document).ready(function(){
    
    var player;
    
    var hoteltable = $('#hoteltable').DataTable();
    
    hoteltable.on('draw.dt', function(){
        //behaviour for recognising status of overlay player
        if ($('#owl-hotel-1 li').length != 0){
            $('#owl-hotel-1 li div.owl-hotel-1-slide-overlay-player button').each(function(){
               $(this).click(function(){
                   $(this).parent('div').addClass('player-activated').html('<div id="player"></div>');
               }); 
            });
        } else if ($('#owl-hotel-1 li').length = 0){
            console.log('Owl-hotel-1 has ' + $('#owl-hotel-1 li').length + ' items');
        }
        
         
        
        function onYouTubeIframeAPIReady(){
            player = new YT.Player("player", {
                height: "100%",
                width: "100%",
                videoId: "",
                playerVars: {
                        "autohide": 1,
                        "controls": 2,
                        "enablejsapi": 1,
                        "iv_load_policy": 3,
                        "modestbranding": 1,   
                        "playsinline": 1,
                        "rel": 0,
                        "showinfo": 0
                    }/*,
                events:{
                        "onReady":onPlayerReady,
                        "onStateChange":onPlayerStateChange
                    }*/
            });
        }
        
        
    });  
});
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
	* if yesIE === false
    */
    if (yesIE === false) {
		
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
        
			/*
			* START
			* error screen function
			*/
			
			function appendErrorScreenHotel1(){
				 while($('#hotel-1 li').length > 0){
					$('#hotel-1').empty();
				}

				var hotel_1_li_item = '<li class="no_results">';
					hotel_1_li_item += '<p>';
						hotel_1_li_item += 'Sorry, no search results found.  Please try again.';
					hotel_1_li_item += '</p>';
				hotel_1_li_item += '</li>';
				$('#hotel-1').append(hotel_1_li_item);

				bxslider_hotel_1.reloadSlider({
					mode: 'fade',
					pager: false
				});

				clearAllIntervals();

				$('#progressBar').css({
				   'width': 0 + '%' 
				});
				
			}
			
			function appendErrorScreenHotel2(){
				 while($('#hotel-2 li').length > 0){
					$('#hotel-2').empty();
				}

				bxslider_hotel_2.reloadSlider({
					mode: 'fade',
					pager: false
				});
				
			}
			/*
			* END
			* error screen function
			*/
        
			var currentHotel1Index;

			var rowData;

			/*
			populate hotel-2 bxslider
			*/

			if ($('#hoteltable tbody tr td.dataTables_empty').length >= 1 ){
				
				appendErrorScreenHotel2();
            
			} else if ($('#hoteltable tbody tr td.dataTables_empty').length < 1 ){
            
				//instantiate a variable
				//that increments by one
				//per iteration
				var hotel_1_index_position = 0;
            
				$('#hoteltable tbody tr').each(function(){

					var thisRow = $(this);
					//get the data (json data source) from each row
					rowData = hoteltable.row(thisRow).data();

					//add the relevant data to the owl-carousel bottom list
					//one list item at a time
					if (typeof(rowData) != 'undefined'){

						//per row iteration,
						//increment index_position by 1
						hotel_1_index_position++;
						//add this data to each hotel-2 li
						var hotel_2_li_item = '<li data-index_position="' + hotel_1_index_position + '">';
						hotel_2_li_item += '<div class="hotel-2-slide">';
						hotel_2_li_item +='<img src="images/' + rowData.image.src + '-small.jpg" width="100%" height="100%" alt="' + rowData.image.src + '"></div>';
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
            
			}


			/*
			populate hotel-1 bxslider
			*/
			if ($(window).width() > 640) {
				
				if ($('#hoteltable tbody tr td.dataTables_empty').length >= 1 ){
					
					appendErrorScreenHotel1();
					
				} else if ($('#hoteltable tbody tr td.dataTables_empty').length < 1 ) {
				
					populateHotel1('medium');

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
                                toggleInfo();
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
								bxsliderPlayBtnAxn();
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
                                tableScrollUpBtnAxn();
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
                                restoreInfoBtnToggle();
                                /*
                                * END
                                * functions for
                                * the behaviour of
                                * the "show info" and "hide info" buttons
                                */
                            },
						onSlideAfter: function ($slideElement, oldIndex, newIndex) {
								returnPlayButton();    
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
								bxsliderPlayBtnAxn();
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
                                tableScrollUpBtnAxn();
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
					
					appendErrorScreenHotel1();
                
				} else if ($('#hoteltable tbody tr td.dataTables_empty').length < 1 ) {
                
					populateHotel1('mobile');
                    
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
                                toggleInfo();
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
								bxsliderPlayBtnAxn();
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
                                tableScrollUpBtnAxn();
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
                                restoreInfoBtnToggle();
                                /*
                                * END
                                * functions for
                                * the behaviour of
                                * the "show info" and "hide info" buttons
                                */
                            },
						onSlideAfter: function($slideElement, oldIndex, newIndex){
								returnPlayButton();    
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
								bxsliderPlayBtnAxn();
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
                                tableScrollUpBtnAxn();
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
						
						if ($('#hoteltable tbody tr td.dataTables_empty').length >= 1 ) {
						
							appendErrorScreenHotel1();

						} else if ($('#hoteltable tbody tr td.dataTables_empty').length < 1 ) {

							populateHotel1('medium');

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
                                    
                                        /*
                                        * START
                                        * functions for
                                        * the behaviour of
                                        * the "show info" and "hide info" buttons
                                        */
                                        restoreInfoBtnToggle();
                                        /*
                                        * END
                                        * functions for
                                        * the behaviour of
                                        * the "show info" and "hide info" buttons
                                        */

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
                                    
                                        /*
                                        * START
                                        * function for
                                        * the behaviour of
                                        * the "show info" and "hide info" buttons
                                        */
                                        toggleInfo();
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
                                        bxsliderPlayBtnAxn();
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
                                        tableScrollUpBtnAxn();
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
                                        restoreInfoBtnToggle();
                                        /*
                                        * END
                                        * functions for
                                        * the behaviour of
                                        * the "show info" and "hide info" buttons
                                        */
                                    },   
								onSlideAfter: function($slideElement, oldIndex, newIndex){
									returnPlayButton();    
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
                                    bxsliderPlayBtnAxn();
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
                                    tableScrollUpBtnAxn();
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

						//remove items from upper bxslider ("ul hotel-1")
						//right after browser resize
						while($('#hotel-1 li').length > 0){
							$('#hotel-1').empty();
						}
						
						if ($('#hoteltable tbody tr td.dataTables_empty').length >= 1 ) {
							
							appendErrorScreenHotel1();
							
						} else if ($('#hoteltable tbody tr td.dataTables_empty').length < 1 ) {
							
							populateHotel1('mobile');

							//reload the bxslider
							bxslider_hotel_1.reloadSlider({
								mode: 'fade',
								pager: false,
								onSliderLoad: function(){

										setOverlayCss('small');
                                    
                                        /*
                                        * START
                                        * functions for
                                        * the behaviour of
                                        * the "show info" and "hide info" buttons
                                        */
                                        restoreInfoBtnToggle();
                                        /*
                                        * END
                                        * functions for
                                        * the behaviour of
                                        * the "show info" and "hide info" buttons
                                        */

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
                                    
                                        /*
                                        * START
                                        * function for
                                        * the behaviour of
                                        * the "show info" and "hide info" buttons
                                        */
                                        toggleInfo();
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
                                        bxsliderPlayBtnAxn();
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
                                        tableScrollUpBtnAxn();
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
                                        restoreInfoBtnToggle();
                                        /*
                                        * END
                                        * functions for
                                        * the behaviour of
                                        * the "show info" and "hide info" buttons
                                        */
                                    },
								onSlideAfter: function($slideElement, oldIndex, newIndex){
										returnPlayButton();    
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
                                        bxsliderPlayBtnAxn();
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
                                        tableScrollUpBtnAxn();
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
				}, 500, 'hotel-1-slide-resize');
			});
		});
        
		/*
		* END
		* function that executes
		* after each rendering
		* of the "hoteltable" table element
		*/
	}
    /*
    * END
    * function that executes
    * after each rendering
    * of the "hoteltable" table element
	* if yesIE === false
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
                
                            while ($('#mobile-info-buttons-container button').length > 0) {
                                $('#mobile-info-buttons-container button').remove();
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
                                    $('#hotel-1').append(hotel_1_li_item);
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
                                            //add a "more info" button
                                            hotel_1_li_item += '<button class="toggle-info show-info" data-info_index="' + infoIndex + '">Show Info</button>';
                                            hotel_1_li_item += '<button class="toggle-info hide-info" data-info_index="' + infoIndex + '">Hide Info</button>';
                                            //use the "mobile" jpg for screen sizes equal to or less than 640px
                                            hotel_1_li_item += '<img src="images/' + rowData.image.src + '-mobile.jpg" width="100%" height="100%" alt="' + rowData.image.src + '"/>';
                                                hotel_1_li_item += '<div class="hotel-1-slide-overlay-player" data-video_id="' + rowData.image.video_id + '">';
                                                    hotel_1_li_item += '<button class="play-button">';
                                                        hotel_1_li_item += 'Play Video';
                                                    hotel_1_li_item += '</button>';
                                                hotel_1_li_item += '</div>';
                                        hotel_1_li_item += '</div>';
                                    hotel_1_li_item += '</li>';
                                    $('#hotel-1').append(hotel_1_li_item);
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
            
            clearAllIntervals();
            paused = true;
            
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
    */
	function bxsliderPlayBtnAxn(){
        
        $('#hotel-1 .play-button').click(function() {

            clearAllIntervals();
            paused = true;
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
    * function that replaces
    * any iframes
    * with a player button
    */
    function returnPlayButton(){
        var playButton = '<button class="play-button">Play Video</button>';
        var playerParent = $('#hotel-1 iframe');
        if ( playerParent.length > 0 ){
            playerParent.replaceWith(playButton);
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
    * function that controls
    * the behaviour of
    * the player buttons
    * on the "hoteltable" table
    */
    
   
    
    function tableScrollUpBtnAxn(){
        $('#hoteltable .scrollUp-button').click(function(){
            var tableScrollUpBtn = $(this);
            var hotel1IndexPos = (tableScrollUpBtn.data('index_position') - 1);
            
            //make the hotel-1 bxslider
            //move to specified index position
            bxslider_hotel_1.goToSlide(hotel1IndexPos);
            
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
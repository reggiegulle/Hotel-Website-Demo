/*
Javascript for Hotels Web Template
*/

$(document).ready(function(){
	
	//clear the searchbox
	$("#customSearch").val("");
	
	//set height of the video-container
	$("#video-container").css({
		"height":($("#video-container").width() * 0.5625) + "px",
	});
	
	$(window).resize(function(){
		$("#video-container").css({
			"height":($("#video-container").width() * 0.5625) + "px"
		});
	});
	
	//set the style of the
	//owlhotel li img
	/*$("#owlhotel li img").css({
		"height":($("#owlhotel li img").width() * 0.5625) + "px"
	});
	
	$(window).resize(function(){
		$("#owlhotel li img").css({
			"height":($("#owlhotel li img").width() * 0.5625) + "px"
		});
	});*/

	
	
	//initialize DataTables with capital "D"
	var hoteltable = $("#hoteltable").DataTable({
		"ajax":"01.page.hotel.json",
		"dom": "lrt",
		"scrollY": "400px",
		"scrollCollapse": true,
		"paging": false,
		"info": true,
		"autoWidth":false,
		"columnDefs":[
				{"orderable": false, "targets":[3, 5]},
				{"className": "none", "targets":[0, 1, 5]},
				{"className": "all", "targets":[2, 3]}
			],
		"drawCallback": function(settings){
			populatelists();
			}
	});
	
	//initialize "yadcf" column filter
	yadcf.init(hoteltable,[{
		column_number: 1,
		filter_type: "select",
		data: [{value: "01.Room.", label: "Room Type"},{value:"02.Restaurant.", label: "Dining Options"},{value:"03.Facilities.", label: "Facilities and Services"},{value:"04.Sydney-Attractions.", label: "Sydney Attractions"}],
		column_data_type: "text",
		filter_container_id: "category-filter",
		filter_default_label: "Show All"
		
	}]);
	

	
	function populatelists(){
	//drawCallback function start
	
		
		
		
		
		
		//declare hoteltable variable
		var hoteltable = $("#hoteltable").DataTable();
		
		
		//add the necessary classes to owlhotel
		var owlhotel = $("#owlhotel").addClass("owl-carousel");
		var owlhotel = $("#owlhotel").addClass("owl-theme");
		
		
		//add the necessary classes to bannerpos
		var bannerpos = $("#bannerpos").addClass("owl-carousel");
		var bannerpos = $("#bannerpos").addClass("owl-theme");
		
		//create the owlhotel owlCarousel instance
		owlhotel.owlCarousel();
		//create the bannerpos owlCarousel instance
		bannerpos.owlCarousel();
		
		
		//destroy the owlhotel owlCarousel instance
		owlhotel.data("owlCarousel").destroy();
		$("#owlhotel").removeClass("owl-carousel");
		$("#owlhotel").removeClass("owl-theme");
		$("#owlhotel").empty();
		
		
		
		//destroy the bannerpos owlCarousel instance
		bannerpos.data("owlCarousel").destroy();
		$("#bannerpos").removeClass("owl-carousel");
		$("#bannerpos").removeClass("owl-theme");
		$("#bannerpos").empty();
		
		
		//empty the hoteldesclist ul
		$("#hoteldesclist").empty();
		
		
		//adopt each img data-video into each parent tr
		$("#hoteltable tbody tr td img").each(function(){
			var datavideoid = $(this).data("videoid");
			$(this).closest("tr").attr({
				"data-videoid": datavideoid
			});
		});
		
		
		$("#hoteltable tbody tr").each(function(){
		//declare behavior for each hoteltable tr
		//function start
		
			//declare the hoteltable variable
			var hoteltable = $("#hoteltable").DataTable();
			
			
			
			
			//assign the hoteltable data to variables
			var trindex = $(this).index();
			var trvideoid = $(this).data("videoid");
			
			//get the index of the rows
			//based on their table ordering,
			//not the html rendering
			var trposindex = hoteltable.row(this).index();
			//console.log(trposindex);
			
			//get image from raw data
			var trimgdat = hoteltable.cell(this,3).data();
			//console.log(trimgdat);
			
			//get name from raw data
			var trnamedat = hoteltable.cell(this,2).data();
			//console.log(trnamedat);
			
			//get price from raw data
			var trpricedat = hoteltable.cell(this,4).data();
			//console.log(trpricedat);
			
			//get description from raw data
			var trdescdat = hoteltable.cell(this,5).data();
			
			
			/* console log the index of each row
			console.log("The index for this row is " + trindex); */ 
			
			//adopt the trindex into the tr html
			$(this).attr({
				"data-index":trindex
			});
			
			
			//create li items for owlhotel
			var owlhotelliitem = $("<li class=\"owlowlhotelliitem\">");
			
			//insert trindex into the owlhotel li item
			owlhotelliitem.attr({
				"data-index":trindex,
				"data-videoid":trvideoid,
				"data-pos": trposindex
			});
			
			
			//function for adding content to the owlhotel li item
			function addowllitext(){
				//create a string variable
				var owllitext = "";
				
				
				
				
				//add elements to the variable
				//add the image data to the li item
				owllitext += trimgdat;
				
				//add the name data to the li item
				owllitext += "<p>" + trnamedat + "</p>";
				
				//output the string
				return owllitext;
			}
			

			//create the var associated with value
			//returned by function addowllitext
			var owlhotelliitemtext = addowllitext();
			
			
			//append the variable to the owlhotel li item
			owlhotelliitem.append(owlhotelliitemtext);
			
			//add the owlhotel li item to the list
			$("#owlhotel").append(owlhotelliitem);
			
			
			
			//create li items for desclist
			var hoteldescliitem = $("<li>");
			
			//insert trindex into the hoteldesclist li item
			hoteldescliitem.attr({
				"data-index":trindex,
				"data-pos":trposindex
			});
			
			//function for adding content to the hoteldesclist li item
			function adddesclitext(){
				//create a string variable
				var desclitext = "";
				
				//add elements to the variable
				
				//add the name data to the li item
				desclitext += "<h3>" + trnamedat + "</h3>";
				
				//add the image data to the li item
				desclitext += trimgdat;
				
				//add the price data to the li item
				desclitext += "<h4>" + trpricedat + "</h4>";
				
				//add the description data to the li item
				desclitext += "<p>" + trdescdat + "</p>";
				
				//output the string
				return desclitext;
			}
			
			//returned by function adddesclitext
			var hoteldescliitemtext = adddesclitext();
			
			
			//append the variable to the owlhotel li item
			hoteldescliitem.append(hoteldescliitemtext);
			
			
			//add the owlhotel li item to the list
			$("#hoteldesclist").append(hoteldescliitem);
			

		//function end
		});
		
		
		
		//add special annotations
		//to desclist items
		$("#hoteldesclist li").each(function(){
		
			$(this).addClass("group");
		
			//get the necessary data
			//and assign to variables
			var desclidatpos = $(this).data("pos");
			var desclih4 = $(this).find("h4");
			var desclih4htm = desclih4.html();
			
			//create for loop to isolate
			//the room items
			//based on data-pos
			for(a=2; a<9; a++){
				if(desclidatpos == a){
					function desclirmprc(){
					
						//convert object into string variable
						var desclirmprcedit = "";
						
						desclirmprcedit += "<div id=\"descprice\"><p class=\"block\">from</p><h4>" + desclih4htm + "</h4><p class=\"block\">per night.</p><p class=\"inlineblock\">Approximate price only; may vary. <br/>Please contact us to confirm exact pricing.</p><div>";
						
						//return a string value
						return desclirmprcedit;
					}
					
					var desclirmprc = desclirmprc();
					
					//console.log(desclirmprc);
					
					//replace the old h4
					//with the new html string
					desclih4.replaceWith(desclirmprc);
				}
			}
			
			//create for loop to isolate
			//the restaurant items
			//based on data-pos
			for(b=10; b<15; b++){
				if(desclidatpos == b){
					function desclirestprc(){
					
						//convert object into string variable
						var desclirestprcedit = "";
						
						desclirestprcedit += "<div id=\"descprice\"><p class=\"block\">from</p><h4>" + desclih4htm + "</h4><p class=\"block\">per person.</p><p class=\"inlineblock\">Approximate price only; may vary.<br />Please contact us to confirm exact pricing. Reservation fees may apply.</p></div>";
						
						//return a string value
						return desclirestprcedit;
					}
					
					var desclirestprc = desclirestprc();
					
					//console.log(desclirmprc);
					
					//replace the old h4
					//with the new html string
					desclih4.replaceWith(desclirestprc);
				}
			}
		});
		
		
		
		//add the owlCarouel classes again
		var owlhotel = $("#owlhotel").addClass("owl-carousel");
		var owlhotel = $("#owlhotel").addClass("owl-theme");
		
		//reinitialize owlCarousel
		owlhotel.owlCarousel({
			items: 4,
			itemsDesktop: [1199,4],
			itemsDesktopSmall: [979,3],
			itemsTablet: [768,2],
			itemsMobile: [479,2],
			pagination: true,
			navigation: true,
			afterInit: owllivideoindex
		});
		
		function owllivideoindex(){
			//behaviour of owlhotel li items on click
			$("#owlhotel li").each(function(){
				$(this).click(function(){
				
					//associate each owlhotel li with its own data-index
					var liplaylistindex = $(this).attr("data-index");
					
					//play the video at the liplaylistindex
					player.playVideoAt(liplaylistindex);
					
					//animate the page to scroll to the video
					$("html, body").animate({
						scrollTop: $("#banner").offset().top 
					},500);
					
				});
			});
			
			
			
			//set the style of the
			//owlhotel li img
			$("#owlhotel li img").css({
				"height":($("#owlhotel li img").width() * 0.5625) + "px"
			});
			
			$(window).resize(function(){
				$("#owlhotel li img").css({
					"height":($("#owlhotel li img").width() * 0.5625) + "px"
				});
			});
		}
		
		//initialize the banner poster background
		bannerpos.owlCarousel({
			jsonPath:"bannerpos.json",
			items: 1,
			itemsDesktop: [1199,1],
			itemsDesktopSmall: [979,1],
			itemsTablet: [768,1],
			itemsMobile: [479,1],
			pagination: false,
			navigation: false,
			mouseDrag: false,
			touchDrag: false,
			afterInit: stylebanner	
		});
		
		
		
		function stylebanner(){
		//function to mostly set the style
		//of the banner element
		//function start
		
			//set height of the video-container
			$("#video-container").css({
				"height":($("#video-container").width() * 0.5625) + "px",
			});
			
			$(window).resize(function(){
				$("#video-container").css({
					"height":($("#video-container").width() * 0.5625) + "px"
				});
			});
				
			
			
			
			//set height of banner
			//if its width is >= 701px
			if($("#banner").width() >= 701){
			
				$("#banner").css({
					"min-height": "200px",
					"height":($("#banner").width() * 0.3355) + "px"
				});
			
			}
			
			//set height of banner
			//if its width is <= 700px
			if($("#banner").width() <= 700){
			
				$("#banner").css({
					"height":($("#video-container").height()) + "px"
				});
			}
			
			$(window).resize(function(){
				//set height of banner
				//if its width is >= 701px
				if($("#banner").width() >= 701){
				
					$("#banner").css({
						"min-height": "180px",
						"height":($("#banner").width() * 0.3355) + "px"
					});
				
				}
				
				//set height of banner
				//if its width is <= 700px
				if($("#banner").width() <= 700){
				
					$("#banner").css({
						"height":($("#video-container").height()) + "px"
					});
				}
			
			
			
			});


		//function to mostly set the style
		//of the banner element
		//function end
		}
		
		
			

		
	
	//drawCallback function end
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	$("#sort-name-ztoa,#sort-price-hightolow").css({
			"display":"none"
	});
	
	$("#sort-relevance").click(function(){
		hoteltable.order([0,"asc"]).draw();
	});
	
	$("#sort-name-ztoa").click(function(){
		hoteltable.order([2,"des"]).draw();
		$(this).css({
			"display":"none"
		});
		$("#sort-name-atoz").css({
			"display":"inline-block"
		});
	});
	
	$("#sort-name-atoz").click(function(){
		hoteltable.order([2,"asc"]).draw();
		$(this).css({
			"display":"none"
		});
		$("#sort-name-ztoa").css({
			"display":"inline-block"
		});
	});
	
	$("#sort-price-hightolow").click(function(){
		hoteltable.order([4,"des"]).draw();
		$(this).css({
			"display":"none"
		});
		$("#sort-price-lowtohigh").css({
			"display":"inline-block"
		});
	});
	
	$("#sort-price-lowtohigh").click(function(){
		hoteltable.order([4,"asc"]).draw();
		$(this).css({
			"display":"none"
		});
		$("#sort-price-hightolow").css({
			"display":"inline-block"
		});
	});
	
	$("#customSearch").keydown(function (event) {
	
		if(event.which == 13){
			var hoteltable = $("#hoteltable").DataTable();
	 
			hoteltable.search( this.value ).draw();
		}	
	});

	$("#searchicon").click(function (){

			var hoteltable = $("#hoteltable").DataTable();
			var searchvalue = $("#customSearch").val();
			
			hoteltable.search( searchvalue ).draw();
	});
	
	$("#searchreset").on("click", function(){
		var hoteltable = $("#hoteltable").DataTable();
		$("#customSearch").val("");
		hoteltable.search( $("#customSearch").val() ).draw();
	});
	
	
});
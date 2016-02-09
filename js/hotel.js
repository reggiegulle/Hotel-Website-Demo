/*
Javascript for Hotels Web Template
*/

$(document).ready(function(){
	
	//clear the searchbox
	$("#customSearch").val("");
	
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
	var hoteltable = $('#hoteltable').dataTable({
		'ajax':'hotel.json',
		'dom': '<"row"<"col-sm-6 col-xs-12"i>>rt<"row"<"col-sm-6 col-xs-12"i>>',
		'order': [[0, 'asc']],
		'infoCallback': function( settings, start, end, max, total, pre ) {
				return start + ' to ' + end + ' of ' + max + ' items';
			},
		'columnDefs': [
                {
                    'data':'index',
                    'className': 'never',
                    'targets': 0  
                },
                {
                    'data':'name', 
                    'className': 'all', 
                    'targets': 1
                },
                {
                    'data': 'image',
                    'render': function(data, type, row, meta){
                        return '<div class="table-thumb"><img src="images/' + data.src + '-small.jpg" width="100%" height="100%" alt="' + data.src + '" data-video_id="' + data.video_id + '"></div>';
                    }, 
                    'className': 'all', 
                    'orderable': false, 
                    'targets': 2
                },
				{
                    'data': 'price',
                    'render': {
                        '_': 'price_display',
                        'filter': 'price_filter',
                        'sort': 'price_sort',
                        'display': 'price_display'
                    },
                    'className': 'min-tablet', 
                    'type': 'num-fmt', 
                    'targets': 3
                },
                {
                    'data': 'category',
                    'render': {
                        '_': 'category_display',
                        'filter': 'category_filter',
                        'sort': 'category_sort',
                        'display': 'category_display'
                    },
                    'className': 'min-tablet', 
                    'targets': 4
                },
                {
                    'data': 'description', 
                    'className': 'none', 
                    'orderable': false, 
                    'targets': 5
                },
                {
                    'data': 'control',
                    'className': 'all control', 
                    'orderable': false, 
                    'targets': -1
                }
			],
		'autoWidth': false,
		'scrollY': '600px',
		'paging': false,
		'info': true,
		'responsive': {
                    details:{
                        'type': 'column',
                        'target': -1
                    }
                },
		'drawCallback': function(settings){
				populateOwlCarousels();
			}
	});
    
    $('input.form-control.input-sm').val('');
    
    //initialize the upper owl-carousel here
    $('#owl-hotel-1').owlCarousel({
        singleItem : true,
        slideSpeed : 1000,
        navigation: true,
		navigationText: ['&#10092', '&#10093'],
        pagination: false,
        //autoPlay: 6000,
        stopOnHover: true,
        
        afterAction : syncPosition,
        addClassActive: true,
        responsiveRefreshRate : 200
    });
    var owl_hotel_1= $('#owl-hotel-1').data('owlCarousel');
    
    //initialize the bottom owl-carousel here
    var owl_hotel_2= $('#owl-hotel-2');
    owl_hotel_2.owlCarousel({
        items: 6,
        itemsDesktop: [1199, 5],
        itemsDesktopSmall: [979, 4],
        itemsTablet: [768, 3],
        itemsMobile: [479, 2],
        navigation: true,
        navigationText: ['&#10092', '&#10093'],
        pagination: false,
        responsiveRefreshRate : 100,
		afterInit : function(el){
			el.find(".owl-item").eq(0).addClass("synced");
		}
    });
    //var owl_hotel_2= $('#owl-hotel-2').data('owlCarousel');
    
    function syncPosition(){
        /*
        a custom event 'allowPlayerActivation'
        enables changing the content
        of each owl-hotel-1-overlay dynamically
        ----referenced in hotel_youtube.js
        */
        $('#owl-hotel-1').trigger('allowPlayerActivation');
		var current = this.currentItem;
        $('#owl-hotel-1 li div.added-content').remove();
		$('#owl-hotel-2')
			.find('.owl-item')
			.removeClass('synced')
			.eq(current)
			.addClass('synced');
		if(owl_hotel_2.data('owlCarousel') !== 'undefined'){
            owl_hotel_2.trigger('owl.goTo', current);
		}
	}
    
    $('#owl-hotel-2').on('click', '.owl-item', function(e){
		e.preventDefault();
		var number = $(this).data('owlItem');
		$('#owl-hotel-1').trigger('owl.goTo',number);
        //console.log('The owl-1 item synced is at index ' + number)
	});  
    
    //explicitly set the sort and filter select options
    //for Mozilla Firefox
    $("#sort-name option:eq(0)").prop('selected', true);
    $("#sort-price option:eq(0)").prop('selected', true);
    $("#category-filter option:eq(0)").prop('selected', true);

	function populateOwlCarousels(){
		var hoteltable = $('#hoteltable').DataTable();
        
        //remove items from upper carousel
        //right after each rendering of the table
        while($('#owl-hotel-1 li').length > 0){
			owl_hotel_1.removeItem(0);
		}
        
        //remove items from bottom carousel
        //right after each rendering of the table
        while($('#owl-hotel-2 li').length > 0){
			owl_hotel_2.data('owlCarousel').removeItem(0);
		}
        
        var rowData;
        
        $('#hoteltable tbody tr').each(function(){
                var thisRow = $(this);
                //get the data (json data source) from each row
                rowData = hoteltable.row(thisRow).data();
                
                //add the relevant data to the owl-carousel bottom list
                //one list item at a time
                if (typeof(rowData) != 'undefined'){
                    var owl_hotel_1_li_item = '<li>';
                        owl_hotel_1_li_item += '<div class="owl-hotel-1-slide" data-video_id="' + rowData.image.video_id + '" data-imgsrc="' + rowData.image.src + '">';
                            owl_hotel_1_li_item += '<div class="owl-hotel-1-slide-overlay-player" data-video_id="' + rowData.image.video_id + '">';
                                owl_hotel_1_li_item += '<button class="play-button">';
                                    owl_hotel_1_li_item += 'Play Video';
                                owl_hotel_1_li_item += '</button>';
                            owl_hotel_1_li_item += '</div>';
                        owl_hotel_1_li_item += '</div>';
                    owl_hotel_1_li_item += '</li>';
                    owl_hotel_1.addItem(owl_hotel_1_li_item);
                }
                
                //add the relevant data to the owl-carousel bottom list
                //one list item at a time
                if (typeof(rowData) != 'undefined'){
                    var owl_hotel_2_li_item = '<li>';
                    owl_hotel_2_li_item += '<div class="owl-carousel-2-slide">';
                    owl_hotel_2_li_item +='<img src="images/' + rowData.image.src + '-small.jpg" width="100%" height="100%" alt="' + rowData.image.src + '" data-video_id="' + rowData.image.video_id + '"></div>';
                    owl_hotel_2_li_item += '<h6>';
                    owl_hotel_2_li_item += rowData.name;
                    owl_hotel_2_li_item += '</h6>';
                    owl_hotel_2_li_item += '<p>(';
                    owl_hotel_2_li_item += rowData.category.category_filter;
                    owl_hotel_2_li_item += ')</p>';
                    owl_hotel_2_li_item += '</li>';
                    owl_hotel_2.data('owlCarousel').addItem(owl_hotel_2_li_item);
                }
        });
        
		
	}
	
    var hoteltable = $('#hoteltable').DataTable();
    
	$("#sort-name").change(function(){
        $("#sort-price option:eq(0)").prop('selected', true);
        var sort_name_value = $(this).val();
		switch (sort_name_value){
            case 'reset':
                hoteltable.order([0, "asc"]).draw();
            break;
            case 'asc':
                hoteltable.order([1, "asc"]).draw(); 
            break;
            case 'desc':
                hoteltable.order([1, "desc"]).draw();
            break;
            default:
            break;
        }     
	});
    
    $(".sort-name-reset").click(function(){
        $("#sort-name option:eq(0)").prop('selected', true);
        $("#sort-price option:eq(0)").prop('selected', true);
        hoteltable.order([0, "asc"]).draw(); 
    });
    
    $("#sort-price").change(function(){
        $("#sort-name option:eq(0)").prop('selected', true);
        var sort_name_value = $(this).val();
		switch (sort_name_value){
            case 'reset':
                hoteltable.order([0, "asc"]).draw();
            break;
            case 'lowtohigh':
                hoteltable.order([3, "asc"]).draw(); 
            break;
            case 'hightolow':
                hoteltable.order([3, "desc"]).draw();
            break;
            default:
            break;
        }     
	});
    
    $('.hoteltable-custom-search input').on('keyup', function(){
        hoteltable.search(this.value).draw();
    });
    
    $(".sort-price-reset").click(function(){
        $("#sort-price option:eq(0)").prop('selected', true);
        $("#sort-name option:eq(0)").prop('selected', true);
        hoteltable.order([0, "asc"]).draw(); 
    });
    
    $("#category-filter").change(function(){
        var custom_filter_value = $(this).val();
        if(custom_filter_value == 'reset'){
            hoteltable.columns().search('').draw();
        } else {
            hoteltable.column(4).search(custom_filter_value).draw();
        }    
	});
    
    $('.category-filter-reset').click(function(){
        $("#category-filter option:eq(0)").prop('selected', true);
        hoteltable.columns().search('').draw();
    });
    
   
    $('.all-reset').click(function(){
        $('input.form-control.input-sm').val('');
        hoteltable.search('').draw();
        $("#category-filter option:eq(0)").prop('selected', true);
        hoteltable.columns().search('').draw();
        $("#sort-name option:eq(0)").prop('selected', true);
        $("#sort-price option:eq(0)").prop('selected', true);
        hoteltable.order([0, "asc"]).draw();
    });
});
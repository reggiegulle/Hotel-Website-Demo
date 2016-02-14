/*
Javascript for Hotels Web Template
*/

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

    
    //initalize bx-slider for hotel-1
    var bxslider_hotel_1 = $('#hotel-1').bxSlider({
        mode: 'fade',
        pager: false
    });
    
    //initalize bx-slider for hotel-2
    var bxslider_hotel_2 = $('#hotel-2').bxSlider({
        pager: false
    });
    
	//initialize "hoteltable" dataTable instance
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
		'autoWidth': true,
		'scrollY': '600',
		'paging': false,
		'info': true,
		'responsive': {
                    details:{
                        'type': 'column',
                        'target': -1
                    }
                },
        'drawCallback': populateBxSliders
	});
    
    //explicitly set the search input value
    //for Firefox??? or other browsers
    $('input.form-control.input-sm').val('');

    
    //explicitly set the sort and filter select options
    //(for Mozilla Firefox????)
    $("#sort-name option:eq(0)").prop('selected', true);
    $("#sort-price option:eq(0)").prop('selected', true);
    $("#category-filter option:eq(0)").prop('selected', true);

	
    /*
    function that executes
    after each rendering
    of the "hoteltable" table element
    */
    function populateBxSliders(){
		var hoteltable = $('#hoteltable').DataTable();
                   
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
                        hotel_1_li_item += '</div>';
                    hotel_1_li_item += '</li>';
                    $('#hotel-1').append(hotel_1_li_item);
                }
            });
            
            //reload the bxslider
            bxslider_hotel_1.reloadSlider();
            
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
                        hotel_1_li_item += '</div>';
                    hotel_1_li_item += '</li>';
                    $('#hotel-1').append(hotel_1_li_item);
                }
            });
            
            //reload the bxslider
            bxslider_hotel_1.reloadSlider();
        }
        
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
        
        //reload the bxslider
        bxslider_hotel_2.reloadSlider({
            minSlides: 2,
            maxSlides: 6,
            slideWidth: 170,
            slideMargin: 10,
            moveSlides: 1,
            pager: false
        });
        
        
        
        
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
                                hotel_1_li_item += '</div>';
                            hotel_1_li_item += '</li>';
                            $('#hotel-1').append(hotel_1_li_item);
                        }
                    });
            
                //reload the bxslider
                bxslider_hotel_1.reloadSlider();
                   
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
                                hotel_1_li_item += '</div>';
                            hotel_1_li_item += '</li>';
                            $('#hotel-1').append(hotel_1_li_item);
                        }
                    });
            
                //reload the bxslider
                bxslider_hotel_1.reloadSlider(); 
                    
                }
            }, 500, 'hotel-1-slide-resize');
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
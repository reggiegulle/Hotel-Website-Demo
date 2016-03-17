/*
Javascript for Hotels Web Template
*/

$(document).ready(function(){
    
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
        'drawCallback': onHotelTableDraw
	});
    
    //explicitly set the search input value
    //for Firefox??? or other browsers
    $('input.form-control.input-sm').val('');

    //explicitly set the sort and filter select options
    //(for Mozilla Firefox????)
    $("#sort-name option:eq(0)").prop('selected', true);
    $("#sort-price option:eq(0)").prop('selected', true);
    $("#category-filter option:eq(0)").prop('selected', true);
	
    var hoteltable = $('#hoteltable').DataTable();
    
    function onHotelTableDraw () {
        
        var hoteltable = $('#hoteltable').DataTable();
        
        /* START
        *  populate the hotel description list 
        */
        
        //empty it first
        //to make sure
        while ($('#hoteldesclist li').length > 0) {
            $('#hoteldesclist').empty();
        }
        
        $('#hoteltable tbody tr').each(function () {
            var thisRow = $(this);
            //get the data (json data source) from each row
            rowData = hoteltable.row(thisRow).data();
            
            //add the relevant data to bxslider hotel-1
            //one list item at a time
            if (typeof(rowData) != 'undefined'){
                var desclist_li_item = '<li>';
                    desclist_li_item += '<h5>';
                        desclist_li_item += rowData.name;
                    desclist_li_item += '</h5>';
                    desclist_li_item += '<p>';
                        desclist_li_item += rowData.description;
                    desclist_li_item += '</p>';
                    desclist_li_item += '<h6>Price (approx.): ';
                        desclist_li_item += rowData.price.price_display;
                    desclist_li_item += '</h6>';
                desclist_li_item += '</li>';
                $('#hoteldesclist').append(desclist_li_item);
            }
        });
        /* END
        *  populate the hotel description list 
        */
        
        /* START
        * add "scrollUp" buttons to each table thumbnail
        */
        //instantiate a variable
        //that increments by one
        //per iteration
        var hotel_1_index_position = 0;

        //add "scrollUp" buttons to each table thumbnail
        $('#hoteltable tbody tr div.table-thumb').each(function(){
            var table_thumb = $(this);

            //per row iteration,
            //increment index_position by 1
            hotel_1_index_position++;

            if( table_thumb.children('.scrollUp-button').length > 0 ){
                table_thumb.children('.scrollUp-button').remove();
            }
            table_thumb.append('<div class="scrollUp-button" data-index_position="' + hotel_1_index_position + '">Scroll Up</div>'); 
        });
        /* END
        * add "scrollUp" buttons to each table thumbnail
        */
        
        $('input.form-control.input-sm').keydown(function(event){
            
            if (event.keyCode == 13) {
                hoteltable.search($('input.form-control.input-sm').val()).draw();
            } 
        });
        
        $('.search-reset.reset-button').click(function(){
            $('input.form-control.input-sm').val('');
            hoteltable.search('').draw();
        });
    }

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
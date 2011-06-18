// global vars

var gear = new Object();
var theURL = 'json/eq.json';
var ref;

$(document).ready(function(){
	// jquery says - let's play!

	$(document).bind("contextmenu",function(e){ // turn off right click menu
      	  return false;
    	});
    	
    	
    	
    	

	if(mainPage){


		$( "#msg" ).addClass('hidden');

		$.ajax({
	        url: '/toys.json', 
	        dataType: 'json',
	        type: 'GET',
	        success: function(_gear) 
	            {
	
					gear = _gear;
					renderPage();            
	    
	            },
	        error: function(xhr, ajaxOptions, thrownError){
	                // TODO error handling here. fail screen?
	                //alert(xhr.statusText + ' , ' + ajaxOptions + ' , ' + thrownError);
	                //window.log(xhr)
	                log('story ajax failed. status: ' + xhr.status + ', text: ' + xhr.statusText);
	                dbFail = true;
	
	            }
	        });
	} else {
	
		renderEdit();
	
	
	
	}


});

function renderEdit() {

	$('.submitButton').button({
	
		icons: {
               		primary: "ui-icon-circle-check"
            },
       		label: "Update"

	});
	
	$('.deleteButton').button({
		
		icons: {
	                primary: "ui-icon-circle-close"
	            },
	        label: "Delete"

	});
	
	$('.new_toy').find('.submitButton').button({
	
		label: 'Create'
	
	});
	
	$('.new_toy').find('.deleteButton').addClass('hidden');
	
	
	$('.submitButton').click(function(){	
		$('.edit_toy').submit();
		$('.new_toy').submit();
	});
	
	
}

function compareTags(a, b) { 
    // used to sort tags by popularity
    if (parseInt(a.Tag_Count) < parseInt(b.Tag_Count)) {return 1}
    if (parseInt(a.Tag_Count) > parseInt(b.Tag_Count)) {return -1}
    return 0;
}


function renderPage(){
	var newTable = '';
	var toyLength = gear.length;
	
	for(i=0; i<toyLength; i++){
	
		var theClass = 'eq';
	
		if(i%2){		
			theClass += ' stripe';
		}
	
		newTable += '<ul id="e_' + gear[i].toy.id + '" class="'+ theClass +'">';
		newTable += '<li class="c1">' + gear[i].toy.name + '</li>';
		newTable += '<li class="c2">' + gear[i].toy.owner + '</li>';
		newTable += '<li class="c3">' + gear[i].toy.tag + '</li>';
   		newTable += '<li class="c4">' + gear[i].toy.user + '</li>';
   		newTable += '<li class="c5"><div class="edit"></div></li>';
   		newTable += '</ul>';
	}
	
	$('#contentArea').html(newTable);

	$('.edit').hover(function(){
	
		$(this).fadeTo('fast', .8);
		
	}, function(){
	
		$(this).fadeTo('fast', .5);
	
	});


	$('#nav').find('li').click(function(){
		var whichOne = this.id;
	})
	
	$('.eq').hover(function(){
			$(this).find('.edit').fadeTo('fast', .5);
			$(this).addClass( 'activeStripe' );
		},function(){
			$(this).find('.edit').fadeTo('slow', 0);
			$(this).removeClass( 'activeStripe', 400 );
	});


	$('.edit').click(function(){
	
		var owner = $(this).parent().parent()[0].id;
		owner = owner.split('_');
		owner = owner[1];
		
		window.location = 'toys/' + owner + '/edit';
	})
	
	getParams();
	
	$('#addToy').button({
            icons: {
                primary: "ui-icon-plus"
            }
        });
	
	$('#addToy').click(function(){
	
	
		window.location = 'toys/new';
	
	});
	
	
	
	

}



var getParams = function(){
// give the user feedback that their changes are indeed in there
	var urlParams = decodeURI( window.location.search.substring(1) );
	if(urlParams == false | urlParams == '') return null;
	
	urlParams = urlParams.split("=");
	urlParams = urlParams[1];
	
	var timeout = 0;
	
	if(urlParams){
	
		$( "#msg" ).removeClass('hidden');
	
		$( "#msg" ).dialog({
			modal: true,
			closeOnEscape: true,
			draggable: false,
			resizable: false,
			buttons: {
				Ok: function() {
					timeout = null;
					$( this ).dialog( "close" );
				}
			}
		});
		
		timeout = setTimeout('closeIt()', 2000);

	}


}

var closeIt = function(){

	$('#msg').dialog( "close" );

}















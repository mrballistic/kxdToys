// global vars

var gear = new Object();
var theURL = 'json/eq.json';

$(document).ready(function(){
	// jquery says - let's play!

	$(document).bind("contextmenu",function(e){ // turn off right click menu
        return false;
    });


	renderPage();


});



function compareTags(a, b) { 
    // used to sort tags by popularity
    if (parseInt(a.Tag_Count) < parseInt(b.Tag_Count)) {return 1}
    if (parseInt(a.Tag_Count) > parseInt(b.Tag_Count)) {return -1}
    return 0;
}


function renderPage(){

	$.ajax({
        url: theURL, 
        dataType: 'json',
        type: 'GET',
        success: function(stories) 
            {

            
    
            },
        error: function(xhr, ajaxOptions, thrownError){
                // TODO error handling here. fail screen?
                //alert(xhr.statusText + ' , ' + ajaxOptions + ' , ' + thrownError);
                //window.log(xhr)
                log('story ajax failed. status: ' + xhr.status + ', text: ' + xhr.statusText);
                dbFail = true;

            }
        });


	$('#nav').find('li').click(function(){
	
		var whichOne = this.id;

	
	
	})


}



















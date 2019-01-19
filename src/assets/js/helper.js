
$(function(){

    $('.option-style').click(function(e){
    	e.preventDefault();
    	var $this = $(this),
    		row = $this.closest('.answer-area');

    	row.find('button.option-btn-style').removeClass('selected');
    	row.find('input.option-check-box').prop("checked", false);
    	$this.find('input.option-check-box').prop("checked", true);
    	$this.find('button.option-btn-style').addClass('selected');
    });
});
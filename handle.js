 jQuery(document).ready(function() {   
	    	    
	// insert #wpl_ace_editor div after textarea
	jQuery('textarea[name="content"]').before('<div id="wpl_ace_editor"></div>'); 
	editor_div = jQuery('#wpl_ace_editor');
	
	// event handlers fired by modified editor.js
	editor_div.bind('html',function(){
		
		jQuery(this).show();
		jQuery('textarea[name="content"]').addClass('hide_the_textarea');
		
		setTimeout(function(){
		editor.getSession().setValue(textarea.val());
		},500);
	})
	

	
	
	editor_div.bind('wysiwyg',function(){
		jQuery(this).hide();
	})
	

	// create the editor
    var editor = ace.edit("wpl_ace_editor");
    editor.setTheme("ace/theme/chrome");
    editor.setShowPrintMargin( false );
    var Mode = require("ace/mode/html").Mode;
    var textarea = jQuery('textarea[name="content"]');
    editor.getSession().setMode(new Mode());
    editor.getSession().setValue(textarea.val());

    // on editor change, update textarea
    editor.getSession().on('change', function(){
		textarea.val(editor.getSession().getValue());
		
	});
	
	// on texteditor change, update editor
	textarea.bind('change',function(){
		console.log('bind event');
		editor.getSession().setValue(textarea.val());
	});
	
	// hide by default
	editor_div.hide();
	setTimeout(function(){
	if (textarea.is(':visible'))
	{
		editor_div.trigger('html');
	}
	},1000);
	

});
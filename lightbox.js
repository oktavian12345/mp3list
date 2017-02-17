/** 
 * WS LIGHTBOX
 *
 * Usage:
 *		params.type = 'youtube'; // iframe, dialog, etc
 *		params.src = 'http://youtube.src.com'
 *		params.height = 400;
 *		params.width = 600;
 *		ws_lightbox.open(params);
 *
 * Note: If you are using the 'dialog' feature, you must pass params.message
 * with the 'dialog' feature, you can also send params.confirm = true to get a yes or no
 */

var ws_lightbox = 
{
	easy_close : true,
	open : function(args)
	{
		// Assign null type to iframe
		if(args.type==null)
			args.type = 'iframe';
			
		// Make sure a 'type' value exists
		if(args.type!='iframe' && args.type!='youtube' && args.type!='dialog' && args.type!='freestyle' && args.type!='image')
			return false;
			
		if(args.easy_close==false)
			this.easy_close = false;
			
		this.create_backdrop();
		
		// Disable scroll
		jQuery('BODY').css('overflow','hidden');
		
		// Create content/dialog box
		switch(args.type)
		{
			case 'iframe':
				this.iframe_box(args);
				break;
			case 'youtube':
				this.youtube_box(args);
				break;
			case 'dialog':
				this.dialog_box(args);
				break;
			case 'freestyle':
				this.freestyle_box(args);
				break;
      case 'image':
        this.image_box(args);
        break;
		}
			
	},
	create_backdrop : function()
	{
		var html = '<div id="backdrop" class="backdrop" style="display:none;"></div>';
		
		jQuery('BODY').append(html);
		jQuery('.backdrop').fadeIn();
	},
	iframe_box : function(args)
	{
		// Validate height and width
		if(!args.height)
			args.height = 315;
		
		if(!args.width)
			args.width = 560;
	
		var html = '<div id="ws-lightbox-outer" style="display:none;">';
		html += '<div id="close-lb" class="close-lb"></div>'; // Lightbox close 'x'
		html += '<iframe id="ws-iframe-box" width="'+args.width+'" height="'+args.height+'" src="'+args.src+'" frameborder="0"></iframe>';
		html += '</div>';
		
		jQuery('BODY').append(html);
		
		var margin_left = -(args.width/2);
		var margin_top = -(args.height/2);
		
		jQuery("#ws-lightbox-outer").css({'height':args.height,'width':args.width,'margin-left':margin_left,'margin-top':margin_top});

		if (args.overflow_hidden==false) {
			jQuery("#ws-lightbox-outer iframe").css({'overflow':'visible'});
		}
		
		jQuery("#ws-lightbox-outer").fadeIn();
	},
	youtube_box : function(args)
	{
		// Validate height and width
		if(!args.height)
			args.height = 315;
		
		if(!args.width)
			args.width = 560;
	
		var html = '<div id="ws-lightbox-outer" style="display:none;">';
		html += '<div id="close-lb" class="close-lb"></div>'; // Lightbox close 'x'
		html += '<center><iframe id="ws-youtube-box" width="'+args.width+'" height="'+args.height+'" src="'+args.src+'" frameborder="0" allowfullscreen></iframe></center>';
		html += '</div>';
		
		jQuery('BODY').append(html);
		
		var margin_left = -(args.width/2);
		var margin_top = -(args.height/2);
		
		jQuery("#ws-lightbox-outer").css({'height':args.height,'width':args.width,'margin-left':margin_left,'margin-top':margin_top});
		
		jQuery("#ws-lightbox-outer").fadeIn();
	},
	dialog_box : function(args)
	{
		/**
		 * You will want to bind events to the $("#ws-lightbox-yes")
		 * and $("#ws-lightbox-no") for your dialog logic
		 */

		// Validate height and width
		if(!args.height){
			args.height = "auto";
			var margin_top = -100;
		}
		else
			var margin_top = -(args.height/2);
		
		if(!args.width){
			args.width = 300;
			var margin_left = -(args.width/2) - 20;
		}
		else
			var margin_left = -(args.width/2);

		var html = '<div id="ws-lightbox-outer" style="display:none;">';
		html += '<div id="close-lb" class="close-lb"></div>'; // Lightbox close 'x'
		html += args.message;
		
		if (args.confirm == true)
			html+= '<div class="lightbox-button-div"><div class="button-gray" id="ws-lightbox-yes">yes</div><div class="button-gray" id="ws-lightbox-no">no</div></div>';

		html += '</div>';

		jQuery('BODY').append(html);
		
		jQuery("#ws-lightbox-outer").css({'height':args.height,'width':args.width,'margin-left':margin_left,'margin-top':margin_top,'background-color': '#eaeaea','padding':'20px','line-height':'20px','text-align':'center'});
		
		jQuery("#ws-lightbox-outer").fadeIn();
	},
	freestyle_box : function(args)
	{
		// Validate height and width
		if(!args.height)
			args.height = 315;
		
		if(!args.width)
			args.width = 560;
	
		var html = '<div id="ws-lightbox-outer" style="display:none;">';
		html += '<div id="close-lb" class="close-lb"></div>'; // Lightbox close 'x'
		html += args.html;
		html += '</div>';
		
		$('BODY').append(html);
		
		var margin_left = -((args.width/2)-10);
		var margin_top = -((args.height/2)-10);
		
		$("#ws-lightbox-outer").css({'height':args.height,'width':args.width,'margin-left':margin_left,'margin-top':margin_top,'background-color':'#eee','border-radius':'10px','padding':'20px','line-height':'20px','text-align':'center'});
		
		$("#ws-lightbox-outer").fadeIn();
	},
  image_box : function(args)
  {
    if (!args.src)
      return

    var setupImagebox = function(){
      // Validate height and width
      if(!args.height || !args.width){
        var winRatio = $(window).height()/$(window).width();
        if (img.height/img.width>winRatio){
          args.height = img.height > $(window).height() ? $(window).height() * 0.9 : img.height;
          args.width = img.width*(args.height/img.height);
        }else{
          args.width = img.width > $(window).width() ? $(window).width() * 0.9 : img.width;
          args.height = img.height*(args.width/img.width);
        }
      }

      var html = '<div id="ws-lightbox-outer" style="display:none;">';
      html += '<div id="close-lb" class="close-lb"></div>'; // Lightbox close 'x'
      html += '<div class="ws-image-subject-wrapper"><img class="ws-image-subject" src="'+args.src+'" /></div>';
      html += '</div>';

      $('BODY').append(html);
      
      var margin_left = -((args.width/2));
      var margin_top = -((args.height/2));
      
      $("#ws-lightbox-outer").css({'height':args.height,'width':args.width,'margin-left':margin_left,'margin-top':margin_top,'background-color':'#eee','border-radius':'10px','line-height':'20px','text-align':'center'});
      
      $("#ws-lightbox-outer").fadeIn();
    }

    var img = new Image;
    img.onload = setupImagebox;
    img.src = args.src; 

  },
  close : function()
  {
    jQuery("#ws-lightbox-outer").fadeOut('fast',function(){
      jQuery(this).remove();
    });
		jQuery(".backdrop").fadeOut('fast',function(){
			jQuery(this).remove();
		});
		
		jQuery('BODY').css('overflow','visible');
	}
}

jQuery(document).ready(function(){
	
	jQuery(document).click(function(e){
		switch(jQuery(e.target).attr('id'))
		{
			case "close-lb":
				ws_lightbox.close();
				break;
			case "backdrop":
				if(ws_lightbox.easy_close==true)
					ws_lightbox.close();
				break;
		}
	});
});

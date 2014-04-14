	window.addEventListener("load", init); 
	

	function drawNeedle(radians, meter){

		var context = meter.getContext('2d'); 
		context.save();
		context.clearRect( 0, 0, meter.width, meter.height );
		context.translate( 138, 100 );

		// now move across and down half the 
		// width and height of the image (which is 128 x 128)
		context.translate(5, 34); 
		context.rotate( radians);
		
		context.drawImage( needle, -5, -34 );
		context.restore();
	}

	



	function drawNumber(ctx, number, position) {
		 ctx.drawImage(digits_image, number * DIGIT_WIDTH, 0, DIGIT_WIDTH, DIGIT_HEIGHT, DIGIT_WIDTH*0.25*position, 0, DIGIT_WIDTH * 0.25, DIGIT_HEIGHT * 0.25);
	}


	function drawDot(ctx, center, radius) {
		ctx.beginPath();
      	ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);

      	ctx.fillStyle = '#003300';
     	ctx.fill();
      	ctx.lineWidth = 5;
      	ctx.strokeStyle = '#003300';
      	ctx.stroke();
	}

	function drawDatastream(ctx, value) {
		ctx.clearRect(0, 0, 451, 1200);
		digits =  Array();
		value_int = parseInt(value);
		value_remainder = value - value_int;
		i = 0;
		while(value_int>0) {
			digits[i] = value_int%10;
			value_int = parseInt(value_int/10);
			i++;
		}

		j = 0;
		for (var i = digits.length - 1; i >= 0; i--) {
			drawNumber(ctx, digits[i], j);
			j++;
		};

		center = {x:DIGIT_WIDTH*2.5*0.25, y: DIGIT_HEIGHT* 0.7*0.25};
		var radius = 8;
		drawDot(ctx, center, radius);
		value_remainder = parseInt(value_remainder*10);
		drawNumber(ctx, value_remainder, j+1);
	}

	function get_feed(ctx, datastreamID) {
					// Set the Xively API key  
			xively.setKey( "I3TgQOZ0oUHtczcEwKebNDiqInJKoyNErkR1vN3esZB0nhiT" ); 
			// Replace with your own values  
 			var feedID        = 519941630;          // Feed ID  

    		// Get datastream data from Xively  
  			xively.datastream.get (feedID, datastreamID, function ( datastream ) {  
		    // WARNING: This code is only executed when we get a response back from Xively,   
		    // it will likely execute after the rest your script  
		    //  
		    // NOTE: The variable "datastream" will contain all the Datastream information   
		    // as an object. The structure of Datastream objects can be found at:   
		    // https://xively.com/dev/docs/api/quick_reference/api_resource_attributes/#datastream  
		  
		    // Display the current value from the datastream  

		    drawDatastream(ctx, datastream["current_value"]);
		  
		    // Getting realtime!   
		    // The function associated with the subscribe method will be executed   
		    // every time there is an update to the datastream  
		    //xively.datastream.subscribe( feedID, datastreamID, function ( event , datastream_updated ) {  
 
		    //});  

		  
		  });  
	}


	var needle = new Image(); 
	needle.src = '/static/images/needle.png';

	
	var IMG_HEIGHT = 451,
	IMG_WIDTH = 1200,
	DIGIT_HEIGHT = IMG_HEIGHT,
	DIGIT_WIDTH = 263;


	function init() { 
		setInterval(function(){
			radians = 2.3*Math.sin( (new Date)*1/1000 ) - 0.15;

/*
			$.ajax({
				crossDomain:true,
				url: 'http://164.78.251.31/v2/api/feeds/3/datastreams/27/',
				type:'GET',
				dataType: 'jsonp',
				//beforeSend: function(xhr){xhr.setRequestHeader('X-Apikey', 'n86RoDq4');},
				headers: {
        			"X-Apikey":"n86RoDq4",
        			"Content-Type":"application/json"
    			},
    			success: function(data) {
					console.log(data);
				}

			}) */

			var meter1 = document.getElementById('meter1'); 
			var meter2 = document.getElementById('meter2'); 
			drawNeedle(radians, meter1);
			drawNeedle(radians, meter2);
		}, 50)





		/**************Humidity********************************/
	    var humidity = document.getElementById('humidity');

	    // Canvas supported?
	    if (humidity.getContext('2d') ){
	        ctx = humidity.getContext('2d');
	        //Transalte to center
	 		ctx.translate(50, 0);
	        // Load the digits image
	        digits_image = new Image();
	        digits_image.src = '/static/images/digits.png';
	        //digits_image.onload = imgLoaded;
	        setInterval( function () {
				datastreamID  = "Humidity";       // Datastream ID 
				get_feed(ctx, datastreamID)
			}, 2000);
	         
	    } else {
	        alert("Canvas not supported!");
	    }



	    /**************temperature********************************/
	    var temperature = document.getElementById('temperature');

	    // Canvas supported?
	    if (temperature.getContext('2d') ){
	        temperature_ctx = temperature.getContext('2d');
	        //Transalte to center
	 		temperature_ctx.translate(50, 0);
	        // Load the digits image
	        digits_image = new Image();
	        digits_image.src = '/static/images/digits.png';
	        //digits_image.onload = imgLoaded;
	        setInterval( function () {
				datastreamID  = "Temperature";       // Datastream ID 
				get_feed(temperature_ctx, datastreamID)
			}, 3000);
	         
	    } else {
	        alert("Canvas not supported!");
	    }


	}

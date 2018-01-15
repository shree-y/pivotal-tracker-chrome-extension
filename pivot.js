chrome.runtime.onConnect.addListener(function(port) {
  	port.onMessage.addListener(function(msg) {
	
		var element = document.createElement("div");
		element.id = "pivotal_tracker";
		element.style.color = "white";
		element.style.paddingLeft = "300px";
		element.style.fontSize = "medium";
		element.innertHTML = '';

		if(!$('#pivotal_tracker').length) {	
			$("body").prepend(element);
		}

		var epic_name = msg.epic_name;	

		// Add token and project id below
		var token = '';
		var project_id = '';
		
		var estimate = 0;
	  
		var iterations_url = 'https://www.pivotaltracker.com/services/v5/';
		iterations_url += '/projects/' + project_id;
		iterations_url += '/iterations';

		if ($.isNumeric(window.interval)) {
			clearInterval(window.interval);
		}

		//Uhl, Malcolm, Mark, Justin, Loren, 		
		//var ignore_ids = ['1478010', '1887508', '1934667', '1844342', '1887512']; 
	
		window.interval = setInterval (function() {
			estimate = 0;
			$.ajax ({
			type: "GET",
			url: iterations_url,
			data: {'scope' : 'current'},
			beforeSend: function(xhr) {
			    xhr.setRequestHeader('X-TrackerToken', token);
			} 
			}).done(function(msg) {
			    $.each (msg[0].stories, function (k, story) {
				    $.each (story.labels, function(k, label) {
					if (label.name === epic_name) {
					    if ($.isNumeric(story.estimate)) {
					        estimate += story.estimate;
					    }	
					}
				    });
			});
			$('#pivotal_tracker').html(epic_name + ": current iteration - " + estimate + " points");
			});
		},1000); //End interval

	});//End listener		

});

chrome.runtime.sendMessage({ action: "show" }); //Plugin is active only on pivotaltracker.com


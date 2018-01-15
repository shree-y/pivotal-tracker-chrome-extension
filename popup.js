$(function () {
	$('#form').on('submit', function() {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			var port = chrome.tabs.connect(tabs[0].id, {name: "pivotalplugin"});
			port.postMessage({epic_name: $("#epic option:selected").val()});
		});
	});
});

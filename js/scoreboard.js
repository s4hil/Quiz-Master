/* =================== 

	Script For Setting Questions 
	Newbie Script Written By: Sahil Parray

=================== */

$(document).ready( () => {
	console.log("Script Loaded");

	function loadTable() {
		const body = $("#table-body");
		let output = "";
		$.ajax({
			url: "assets/php/loadScores.php",
			method: "GET",
			dataType: "json",
			success: function (data) {
				x = data;
				for(var i = 0; i < x.length; i++){
					output += "<tr><td>"+ (Number(i)+1) +"</td><td>"+ x[i].name +"</td><td>"+ x[i].score +"</td></tr>";
				}
				body.html(output);
			},
			error: function () {
				console.log("something went wrong with loading table request");
			}
		});
	}
	loadTable();

});
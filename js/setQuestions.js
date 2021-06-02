/* =================== 

	Script For Setting Questions 
	Newbie Script Written By: Sahil Parray

=================== */

console.log('Script Loaded!');

// Check login
function checkLogin(){
	let login = sessionStorage.getItem('authUser');
	if (login == 'true') {
		$(".wrapper").css('display', 'block');
	}
	else {
		$(".wrapper").remove();
	}
}
checkLogin();

// To Display Messages 
function alertMsg(msg) {
	let info = "<div class='alert alert-warning'><i class='fas fa-info-circle'></i> "+ msg +"</div>";
	$("#msg").html(info);
}


// Populate Table
function loadTable() {
	const body = $("#table-body");
	let output;
	$.ajax({
		url: "assets/php/fetchAllQuestions.php",
		method: "POST",
		dataType: "json",
		success: function(data) {
			x = data;
			for (let i = 0;i < x.length; i++) {
				question = x[i].question;
				if (question.length > 35) {
					questionMin = x[i].question.substring(0,35) + '...';
				}
				else {
					questionMin = x[i].question;
				}
				output += "<tr><td>"+ x[i].qno +"</td><td>"+ questionMin +"</td><td class='text-center'>"+ x[i].answer +"</td><td><button class='edit-btn btn btn-primary' qno='"+ x[i].qno +"' qid='"+ x[i].qid +"'><i class='fas fa-edit'></i> Edit</button><button class='del-btn btn btn-danger ml-2' qid='"+ x[i].qno +"'><i class='fas fa-trash-alt'></i> Delete</button></td></tr>";
			}
			body.html(output);
		},
		error: function() {
			console.log("Error populating table");
		}
	});
}
loadTable();


// Setting new question no
function fetchQno() {
	// fetching last qno
	$.ajax({
		url: "assets/php/fetchQno.php", 
		method: "GET",
		dataType: "json",
		success: function(data) {
			// Setting new Qno
			$("#qno").val(Number(data)+1);
		},
		error: function() {
			console.log('Error fetching qno');
		}
	});
}
fetchQno();

// Add Question
$('#addQstn').click( (e) =>{
	e.preventDefault();

	let newqno = $("#qno").val();
	let question = $('#question').val();
	let opt1 = $("#opt1").val();
	let opt2 = $("#opt2").val();
	let opt3 = $("#opt3").val();
	let opt4 = $("#opt4").val();
	let correct = $("#correct").val();


	const rawData = { qno:newqno, question:question, opt1:opt1, opt2:opt2, opt3:opt3, opt4:opt4, correct:correct }
	const data = JSON.stringify(rawData);

	// Sending Data
	$.ajax({
		url: "assets/php/addQuestion.php",
		method: "POST",
		data: data,
		dataType: "json",
		success: function (data) {
			let form = document.getElementById('main-form');
			loadTable();
			form.reset();
			fetchQno();
			alertMsg(data);
		},
		error: function (data) {
			console.log("Something went wrong with the request.");
		}
	});
});


// Display Delete Modal
$('#table-body').on("click", ".del-btn", function () {
	let qid = $(this).attr('qid');
	$('#delete-modal').modal('show');
	$('#deleteQno').val(qid);
}); 

//Deleting question after getting confirmation.
$('#delQuestion').click( () => {
	let qnoToDel = $('#deleteQno').val();
	const rawData = { qid:qnoToDel };
	const data = JSON.stringify(rawData);
	const myThis = this;
	$.ajax({
		url: "assets/php/deleteQuestion.php",
		method: "post",
		data: data,
		dataType: "json",
		success: function (data) {
			$('#delete-modal').modal('hide');
			loadTable();
			fetchQno();
			alertMsg(data);
		},
		error: function (data) {
			console.log('Something went wrong with del qstn request.');
		}
	});
});

//closing Modal
$('#close-modal').click(()=>{
	$('#delete-modal').modal('hide');
});


// Editing Question
$('#table-body').on("click", ".edit-btn", function () {
	let qId = $(this).attr('qid');
	const rawData = { qid:qId };
	const data = JSON.stringify(rawData);
	const myThis = this;
	$.ajax({
		url: "assets/php/editQuestion.php",
		method: "post",
		data: data,
		dataType: "json",
		success: function (data) {
			console.log(data);
			$('#addQstn').css('display', 'none');
			$('#updateQstn').css('display', 'block');
			x = data;
			$("#qid").val(x.qid);
			$("#qno").val(x.qno);
			$('#question').val(x.question);
			$("#opt1").val(x.opt1);
			$("#opt2").val(x.opt2);
			$("#opt3").val(x.opt3);
			$("#opt4").val(x.opt4);
			$("#correct").val(x.answer);
		},
		error: function (data) {
			console.log('Something went wrong with edit qstn request.');
		}
	});
}); 


// Updating Question
$('#updateQstn').click( () => {

	let qid = $("#qid").val();
	let qno = $("#qno").val();
	let question = $('#question').val();
	let opt1 = $("#opt1").val();
	let opt2 = $("#opt2").val();
	let opt3 = $("#opt3").val();
	let opt4 = $("#opt4").val();
	let correct = $("#correct").val();

	const rawData = { qid:qid, qno:qno, question:question, opt1:opt1, opt2:opt2, opt3:opt3, opt4:opt4, correct:correct }
	const data = JSON.stringify(rawData);

	// Sending Data
	$.ajax({
		url: "assets/php/updateQuestion.php",
		method: "POST",
		data: data,
		dataType: "json",
		success: function (data) {
			$('#addQstn').css('display', 'block');
			$('#updateQstn').css('display', 'none');
			let form = document.getElementById('main-form');
			loadTable();
			form.reset();
			fetchQno();
			alertMsg(data);
		},
		error: function (data) {
			console.log("Something went wrong with the update request.");
		}
	});
});


// Populate score table 
function loadScores(){
	let output;
	$.ajax({
		url: "assets/php/loadScores.php",
		method: "GET",
		dataType: "json",
		success: function(data){
			x = data;
			for(let i = 0; i < x.length; i++){
				let rank = parseInt(i) + 1;
				output += "<tr><td>"+ rank +"</td><td>"+ x[i].name +"</td><td>"+ x[i].score +"</td><td><button class='del-btn btn btn-danger' id='"+ x[i].id +"'>Delete</button></td></tr>";
			}
			$(".score-body").html(output);
		},
		error: function (){
			console.log("Something went wrong with loading scores request");
		}
	});	
}
loadScores();


// Delete Score Entry
$(".score-table").on('click', '.del-btn', function(){
	let scoreID = $(this).attr('id');
	let rawData = { id:scoreID };
	let data = JSON.stringify(rawData);
	$.ajax({
		url: "assets/php/deleteScore.php",
		data: data,
		method: "POST",
		dataType: "json",
		success: function(data){
			alertMsg("Score Deleted.");
			loadScores();
		},
		error: function () {
			console.log("Something went wrong with delete score req");
		}
	});	
});
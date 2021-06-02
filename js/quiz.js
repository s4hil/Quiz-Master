/* =================== 

	Script For Setting Questions 
	Newbie Script Written By: Sahil Parray

=================== */

console.log("Script Loaded");


$(document).ready(() => {


  // Hiding PopUp Modals
  $('.right-modal').hide();
  $('.wrong-modal').hide();
  $('.credits').hide();


  sessionStorage.setItem('authUser', null);
  
  // Hide Start Page & Show Quiz
  $("#startBtn").click(() => {
	
	let playerName = $("#playerName").val();
	let regex = /^[a-zA-Z ]*$/;
	if (playerName == "" || null) {
		$(".invalid").text('Enter a name!');
		$(".invalid").css('display', 'block');
		$("#playerName").focus();
	}
	else if (regex.test(playerName) == false){
		$(".invalid").text('Enter a valid name!');
		$(".invalid").css('display', 'block');
		$("#playerName").focus();
	}
	else if (playerName.length > 15 || playerName.length < 3) {
		$(".invalid").text('Length should be between 3 - 15');
		$(".invalid").css('display', 'block');
		$("#playerName").focus();
	}
	else {
		$(".start-page").fadeOut();
		$(".wrapper").fadeIn(1000);
		sessionStorage.setItem('player', playerName);
	}
  });


  // Show Leader Board
  $("#scoreboard").click(()=>{
  	window.location = "scoreboard.html";
  });


  // Show Login Form
  $("#setQuestions").click( () => {
  	$(".login-form").fadeIn(600);
  });

  // Auth User 
  $("#login").click((e)=>{
  	e.preventDefault();
  	let un = $("#username").val();
  	let pw = $("#password").val();
  	const rawData = { username:un, password:pw };
  	const data = JSON.stringify(rawData);
  	$.ajax({
	  url: "assets/php/checkLogin.php",
	  method: "post",
	  data: data,
	  dataType: "json",
	  success: function (data) {
	  	if (data == true) {
	  		sessionStorage.setItem('authUser', true);
	  		window.location = "setQuestions.html";
	  	}
	  	else {
	  		sessionStorage.setItem('authUser', false);
	  		$(".login-error").css('display', 'block');
	  		$(".login-error").html("<div class='alert alert-danger'>Invalid Credentials!</div>");
	  	}
	  },
	 	error: function() {
	 		console.log("auth request err");
	 	}
	});
  });

  // Setting Baisc Vars
  let question = $("#question-content");
  let opt1 = $("#option-1");
  let opt2 = $("#option-2");
  let opt3 = $("#option-3");
  let opt4 = $("#option-4");
  let currentScore = 0;
  let counter = $(".currentQ");
  let counterTotal = $(".totalQ");
  let correct = 0;
  let incorrect = 0;

  // Displaying First Question

  function displayFirst() {
	const rawData = { action: "displayFirst", qno: 1 };
	const data = JSON.stringify(rawData);
	$.ajax({
	  url: "assets/php/displayFirst.php",
	  method: "post",
	  data: data,
	  dataType: "json",
	  success: function (data) {
		question.attr("qno", data.qno);
		question.text(data.question);
		opt1.text(data.opt1);
		opt2.text(data.opt2);
		opt3.text(data.opt3);
		opt4.text(data.opt4);
	  },
	});
  }
  // Calling It
  displayFirst();

  // Displaying number of total questions
  function totalQuestions() {
	$.ajax({
	  url: "assets/php/totalQuestions.php",
	  method: "post",
	  dataType: "json",
	  success: function (data) {
		counterTotal.text(data.total);
	  },
	});
  }
  totalQuestions();

  // Adding functions to every option & displaying correct answer
  $(".options-container").on("click", ".option", function () {
  	$(".option").prop('disabled', true);
	let opt = $(this).attr("oid");
	let questionNo = $("#question-content").attr("qno");

	const rawData = { qno: questionNo, selectedOpt: opt };
	const dataJSON = JSON.stringify(rawData);
	let thisOption = this;
	$.ajax({
	  url: "assets/php/checkAnswer.php",
	  method: "post",
	  data: dataJSON,
	  dataType: "json",
	  success: function (data) {
		if (data.answer == "right") {
  		$('.right-modal').show(300);
		  currentScore += 1;
		  correct += 1;
		  $("#score").text(currentScore);
		  $(thisOption).addClass('correct-answer-border');
		} else if (data.answer == "wrong") {
			$("[oid="+data.correct+"]").addClass('correct-answer-border');
		  	$(thisOption).addClass('wrong-answer-border');
  			$('.wrong-modal').show(300);
		  	currentScore -= 0.5;
		  	incorrect += 1;
		 	$("#score").text(currentScore);
		} else {
		  	console.log("Something Went Wrong with displaying correct answer");
		}
	  },
	});
  });

  //Displaying Next Question
  $(".nextBtn").click(() => {
	$(".right-modal").hide(300);
	$(".wrong-modal").hide(300);

  	$(".option").prop('disabled', false);
	$(".option").css('visibility', 'visible');

	let qno = question.attr("qno");
	let nextQno = Number(qno) + 1;

	const rawData = { nextQno: nextQno };
	const data = JSON.stringify(rawData);
	$.ajax({
	  url: "assets/php/displayNext.php",
	  data: data,
	  method: "POST",
	  dataType: "json",
	  success: function (data) {
		if (data.found == false) {
				let finalScore = $("#score").text();
				$("#total-score").text(finalScore);
				$("#correct").text(correct);
				$("#incorrect").text(incorrect);
				$("#savePlayer").val(sessionStorage.getItem('player'));
				$("#scoreInput").val($("#total-score").text());
				$(".credits").show(600);
		} else {
			$('.option').removeClass('correct-answer-border');
			$('.option').removeClass('wrong-answer-border');
			question.attr("qno", data.qno);
			counter.text(data.qno);
			question.text(data.question);
			opt1.text(data.opt1);
			opt2.text(data.opt2);
			opt3.text(data.opt3);
			opt4.text(data.opt4);
		}
	  },
	});
  });


  // Saving Score To score board
  $("#addScore").click(()=>{
  	let name = sessionStorage.getItem('player');
  	let scored = $("#total-score").text();
  	const rawData = { player:name, score:scored };
  	const data = JSON.stringify(rawData);
  	$.ajax({
  		url: "assets/php/addScore.php",
  		method: "POST",
  		data: data,
  		dataType: "json",
  		success: function (data) {
  			if (data == "Saved") {
  				window.location = "scoreboard.html";
  			}
  			else {
  				window.location = "index.html";
  				alert("Something Went Wrong With Saving Your Attempt");
  			}
  		},
  		error: function (data) {
  			console.log("Something went wrong with adding score request");
  		}
  	});
  });


  // Using 50:50 Life Line 
  $("#5050").click(()=>{
	$('#5050').prop('disabled', true);

  	let qno = $("#question-content").attr("qno");
  	const rawData = { qno:qno };
  	const data = JSON.stringify(rawData);
  	$.ajax({
  		url: "assets/php/fetchCorrect.php",
  		method: "POST",
  		dataType: "json",
  		data: data,
  		success: function (data) {
  			var correct = Number(data);
  			
  			function getRndInteger(min, max) {
			  	return Math.floor(Math.random() * (max - min) ) + min;
			}
			
			var random1 = getRndInteger(1,5);
			var random2 = getRndInteger(1,5);
			
			while (random1 == random2 || random1 == correct || random2 == correct){
				random1 = getRndInteger(1,5);
				random2 = getRndInteger(1,5);
			}
				
			$("div").find("[oid='" + random1 + "']").css('visibility', 'hidden'); 
			$("div").find("[oid='" + random2 + "']").css('visibility', 'hidden'); 

  		},
  		error: function () {
  			console.log("Something went wrong with fetching correct");
  		}
  	});
  });	

  // Using Skip Lifeline
  $("#skip").click(()=>{
  	$("#skip").attr('disabled', true);

	$(".right-modal").hide(300);
	$(".wrong-modal").hide(300);

	$(".option").css('visibility', 'visible');

	let qno = question.attr("qno");
	let nextQno = Number(qno) + 1;

	const rawData = { nextQno: nextQno };
	const data = JSON.stringify(rawData);
	$.ajax({
	  url: "assets/php/displayNext.php",
	  data: data,
	  method: "POST",
	  dataType: "json",
	  success: function (data) {
		if (data.found == false) {
				let finalScore = $("#score").text();
				$("#total-score").text(finalScore);
				$("#correct").text(correct);
				$("#incorrect").text(incorrect);
				$("#savePlayer").val(sessionStorage.getItem('player'));
				$("#scoreInput").val($("#total-score").text());
				$(".credits").show(600);
		} else {
			$('.option').removeClass('correct-answer-border');
			$('.option').removeClass('wrong-answer-border');
			question.attr("qno", data.qno);
			counter.text(data.qno);
			question.text(data.question);
			opt1.text(data.opt1);
			opt2.text(data.opt2);
			opt3.text(data.opt3);
			opt4.text(data.opt4);
		}
	  },
	});
  });


}); //Main


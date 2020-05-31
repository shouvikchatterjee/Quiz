//created by Shouvik on 29/05/2020
$(document).ready(function(){
	var quesNo = 1;
	var question = [];
	var ans = [];
	var correct = [];
	var checkedVal =[];
	var isAnsGiven = [];
		
	var ques = [{
		question: "What is 10/2?",
		answers: ['3','5','115','100'],
		correctAnswer: '5'
	},
	{
		question: "What is 20/2?",
		answers: ['3','5','10','100'],
		correctAnswer: '10'
	},
	{
		question: "What is 100/4?",
		answers: ['3','25','115','100'],
		correctAnswer: '25'
	},
	{
		question: "What is 50/5?",
		answers: ['3','5','10','100'],
		correctAnswer: '10'
	},
	{
		question: "What is 30/3?",
		answers: ['3','5','10','100'],
		correctAnswer: '10'
	}];
	// var json = $.parseJSON(ques);
	// var json = JSON.parse(ques);
// $(json).each(function(i,val){
    // $.each(val,function(k,v){
        // console.log(k+" : "+ v);       
// });
// });
	parseQuestion(ques);
	function parseQuestion(ques){
		for(var i = 0;i<ques.length;i++)
		{
			question.push(ques[i].question);		
			ans.push(ques[i].answers);
			correct.push(ques[i].correctAnswer);		
			isAnsGiven.push(false);
		}
		//console.log(question);
		//console.log(ans);
		//console.log(correct);
		displayQuiz(quesNo);
	}
	function displayQuiz(quesNo){		
		 $("#question").html(question[quesNo-1]);
		 
		 for (var i = 0; i < ans[quesNo-1].length; i++) {
			 if(ans[quesNo-1][i]==correct[quesNo-1]){
				$("#answers").append($('<label style="width:30%;"><input type="radio" name="option" value='+ans[quesNo-1][i]+'>'+ans[quesNo-1][i]+'</input></label><span class="right">&#10004;</span><br>'));
			 }else{
				$("#answers").append($('<label style="width:30%;"><input type="radio" name="option" value='+ans[quesNo-1][i]+'>'+ans[quesNo-1][i]+'</input></label><span class="wrong">&#10006;</span><br>')); 
			 }
		 }
	}	
	$("#submit").click(function(e){
		//stop submitting the form to see the disabled button effect
		e.preventDefault();
		isAnsGiven[quesNo-1]= true;	
		var selectedOption = $("input:radio[name=option]:checked").val();
		checkedVal[quesNo-1] = selectedOption;
		$('input[name=option]').attr("disabled",true);
		$("#submit").attr("disabled", true);
		if(quesNo == question.length){
			$("#next").html("Result");	
			$("#next").addClass("glow");
		}else{
			$("#next").html("Next");	
			$("#next").removeClass("glow");
		}
		
		$("#next").attr("disabled", false);			
		$(".right").show();
		$(".wrong").show();
		if(selectedOption == correct[quesNo- 1] ){
           // alert("correct");
		   $("#answers").addClass("border_right");		   
        }else{
			// alert("incorrect");
			$("#answers").addClass("border_wrong");	
		}
	});
	$("#next").click(function(e){
		//stop submitting the form to see the disabled button effect
		e.preventDefault();		
		if(quesNo == question.length){
			displayResult();
		}
		$("#prev").attr("disabled", false);			
		loadQuestion(++quesNo);
	});
	$("#prev").click(function(e){
		//stop submitting the form to see the disabled button effect
		e.preventDefault();
		$("#next").attr("disabled", false);
		$("#submit").attr("disabled", true);
		if(quesNo == 2){
			$("#prev").attr("disabled", true);
		}
		
		loadQuestion(--quesNo);
	});
	function loadQuestion(quesNo){		
		 $("#question").html(question[quesNo-1]);	
		 $("#answers").html("");
		 for (var i = 0; i < ans[quesNo-1].length; i++) {
			if(ans[quesNo-1][i]==correct[quesNo-1]){
				$("#answers").append($('<label style="width:30%;"><input type="radio" name="option" value='+ans[quesNo-1][i]+'>'+ans[quesNo-1][i]+'</input></label><span class="right">&#10004;</span><br>'));
			 }else{
				$("#answers").append($('<label style="width:30%;"><input type="radio" name="option" value='+ans[quesNo-1][i]+'>'+ans[quesNo-1][i]+'</input></label><span class="wrong">&#10006;</span><br>')); 
			 }
		 }
		 if(isAnsGiven[quesNo-1] == true){
			 $('input[name=option]').attr("disabled",true);
			 $('input:radio[name="option"][value='+checkedVal[quesNo-1]+']').attr('checked',true);
			 $("#next").attr("disabled", false);
			 $("#submit").attr("disabled", true);
			 $("#answers").removeClass("border_right");
			 $("#answers").removeClass("border_wrong");
			 if(checkedVal[quesNo-1] == correct[quesNo-1]){
				 $("#answers").addClass("border_right");
			 }else{			 
				 $("#answers").addClass("border_wrong");		
			 }
			 if(quesNo == question.length){
				$("#next").html("Result");	
				$("#next").addClass("glow");
			}else{
				$("#next").html("Next");	
				$("#next").removeClass("glow");
			}
		 }else{
			 $("#next").attr("disabled", true);
			 $("#submit").attr("disabled", false);
			 $("#answers").removeClass("border_right");
			 $("#answers").removeClass("border_wrong");
		 }		
	}
	function displayResult(){
		var count = 0;
		for(var i=0;i<correct.length;i++){	
			if(checkedVal[i] == correct[i]){
				count++;
			}
		}
		$(".quiz").hide();
		$(".result_container").show();
		$("#result").html("You scored: " + count + " out of " + question.length);
	}
	$(".replay").click(function(){
		$(".quiz").show();
		$(".result_container").hide();
		quesNo = 1;
		question = [];
		ans = [];
		correct = [];
		checkedVal =[];
		isAnsGiven = [];
		$("#answers").html("");
		$("#answers").removeClass("border_right");
		$("#answers").removeClass("border_wrong");
		$("#submit").attr("disabled", false);
		$("#next").attr("disabled", true);
		$("#prev").attr("disabled", true);
		$("#next").html("Next");	
		$("#next").removeClass("glow");
		parseQuestion(ques);
	});
});
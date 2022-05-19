//https://elvanov.com/2597
function make_body(answer, texts, target_num) {

  // tts 포함하여 receive 채팅 추가
  function addChat(sentence, check=false) {
	chatBody.innerHTML += '<div class="from-them"><p style="margin-bottom: 0px;">' + sentence + '</p></div><div class="clear"></div>'
	objBody.scrollTop = objBody.scrollHeight;
	speech(sentence, check);
  }
	
  // tts 없이 receive 채팅 추가
  function addChatNoTts(sentence) {
	chatBody.innerHTML += '<div class="from-them"><p style="margin-bottom: 0px;">' + sentence + '</p></div><div class="clear"></div>'
	objBody.scrollTop = objBody.scrollHeight;
  }

  //통신으로 받아온 말뭉치를 읽음
  function printAndTTS(senlist, check = false) {
	list_modal = ["모달-금액", "모달-비밀번호", "모달-계좌번호", "모달-약관", "모달-카드"]
	var delaySec = 3000;

	for(let j =0; j<senlist.length ; j++) {

	  var anonFunc = function(j) {
		
		var timer = setTimeout(() => {
		  
		  if(senlist[j]=="...") addChatNoTts(senlist[j]);
		  else if (senlist[j] == "모달-금액"){
			sendFlag = 1;
			$('#amountModal').modal('show');
		  }else if (senlist[j] == "모달-비밀번호"){
			accountFlag = 1;
			$('#passwdModal').modal('show');
		  } else if (senlist[j] == "모달-계좌번호"){
			$('#accountModal').modal('show');
		  }  else if (senlist[j] == "모달-약관"){
			$('#termsModal').modal('show');
			cardFlag = 1
		  } else if (senlist[j] == "모달-카드"){
			$('#cardModal').modal('show');
		  }
		  else if (senlist[j]!="") addChat(senlist[j], check);
		  else window.location.href = '/';   
		}, j*delaySec)
	  }
	  anonFunc(j);
	  if (list_modal.indexOf(senlist[j]) != -1 ){
		delaySec = delaySec + 1000000;
	  }
	}
  }
  if(texts == 'button'){
	recognition.stop()  
	var searchlist = search(answer)
	searchlist = searchlist.slice(1,)
	printAndTTS(searchlist, false)
	return
  }

  // 타겟 넘버 별 TTS 시작 부분  
  
	if (answer == "다시 말씀해주세요" || target_num == 7){
	  printAndTTS(answer, true)
	  return
	}
	printAndTTS(answer)
}
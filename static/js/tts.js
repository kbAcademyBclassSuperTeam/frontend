var voices = [];
var step = 0;
var amount = 0;
function setVoiceList() {
	voices = window.speechSynthesis.getVoices();
}
if (window.speechSynthesis.onvoiceschanged !== undefined) {
	window.speechSynthesis.onvoiceschanged = setVoiceList;
}
function speech(txt, check=false) {
  for (var btn of (document.getElementsByClassName("quick_btn"))) { //
	btn.disabled = true;
  }
  
	if(!window.speechSynthesis) {
		alert("음성 재생을 지원하지 않는 브라우저입니다. 크롬, 파이어폭스 등의 최신 브라우저를 이용하세요");
	  return;
	}
  var lang = 'ko-KR';
  var utterThis = new SpeechSynthesisUtterance(txt);

  utterThis.onend = function (event) {
	console.log('end');
  };
  utterThis.onerror = function(event) {
	console.log('error', event);
  };
  var voiceFound = false;
  var ai_lunasMotion = document.getElementsByClassName('ai_lunas')[0]; //음성에 ai 말하기
  ai_lunasMotion.play();
  console.log(ai_lunasMotion);
  for(var i = 0; i < voices.length ; i++) { // 20
	if(voices[i].lang.indexOf(lang) >= 0 || voices[i].lang.indexOf(lang.replace('-', '_')) >= 0) {
	  utterThis.voice = voices[i];
	  voiceFound = true;
	}
  }
  setTimeout(() => { // 비동기라 settime으로 여유 시간 확보
	ai_lunasMotion.pause(); // 정지
	ai_lunasMotion.currentTime = 0; // 초기화
  }, 4500);

  if(!voiceFound) {
	alert('voice not found');
	return;  
  }

  utterThis.lang = lang;
  utterThis.pitch = 1;
  utterThis.rate = 1; //속도
  window.speechSynthesis.speak(utterThis);
  utterThis.onend = function(event){
	if (check){
	  recognition.start();
	}
  }
}
window.addEventListener("load", function(e) {
  setTimeout(() => {
	var t = e.target;
	var input = t.previousElementSibling;
	var speacklist=[
	"좋은 하루입니다! AI 행원 루나스입니다.",
	"무엇을 도와드릴까요?",
	"입금, 출금, 송금, 계좌조회, 계좌개설, 카드발급이 가능합니다.",
	];
	for(var j=0;j < 1;j++) {
	  console.log(speacklist[j]);
	  speech(speacklist[j], true);
	}
	return;
  }, 1000);
});
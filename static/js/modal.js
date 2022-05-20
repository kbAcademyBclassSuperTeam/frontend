flag_1 = flag_2 = flag_3 = flag_4 = flag_5 = flag_6 = flag_7 = flag_8 = flag_9 = flag_10 = flag_11 = flag_12 = flag_13 = flag_14 = 0

// 각 target_num 별로 시작하는 모듈이 다르다는 점
// 계좌번호 입력 -> 금액 입력 -> 비밀번호 입력 등 비슷한 흐름이 반복된다는 점을 이용해
// 기본적인 흐름을 정해놓고, 나머지 경우를 예외처리하는 방식
  
	// 각 모달의 확인 버튼 태그
	const objBody = document.querySelector(".chatbot-body");
	const amountModalOK = document.querySelector('#amountModalOK');
	const passwordModalOK = document.querySelector('#passwordModalOK');
	const checkPasswdModalOK = document.querySelector('#checkPasswdModalOK');
	const accountModalOK = document.querySelector('#accountModalOK');
	const balanceModalOK = document.querySelector('#balanceModalOK');
	const balanceModalSEND = document.querySelector('#balanceModalSEND');
	const balanceModalWithdraw = document.querySelector('#balanceModalWithdraw');
	const termsModalOK = document.querySelector('#termsModalOK');
	const makePasswdModalOK = document.querySelector('#makePasswdModalOK');
	const cardModalOK = document.querySelector('#cardModalOK');
	const fakeModalOK = document.querySelector('#fakeModalOK');
	const issueModalOK = document.querySelector('#issueModalOK');
	const addressModalOK = document.querySelector('#addressModalOK');

	// 각 모달의 취소 버튼 태그
	const amountModalNO = document.querySelector('#amountModalNO');
	const passwordModalNO = document.querySelector('#passwordModalNO');
	const checkPasswdModalNO = document.querySelector('#checkPasswdModalNO');
	const accountModalNO = document.querySelector('#accountModalNO');
	const balanceModalNO = document.querySelector('#balanceModalNO');
	const termsModalNO = document.querySelector('#termsModalNO');
	const makePasswdModalNO = document.querySelector('#makePasswdModalNO');
	const cardModalNO = document.querySelector('#cardModalNO');
	const issueModalNO = document.querySelector('#issueModalNO');
	const addressModalNO = document.querySelector('#addressModalNO');

	// 모달 : 모든 취소 버튼을 누를 경우 '/'으로 redirect
	function redirectToHome() {
		$('#amountModal').modal('hide');
		$('#passwdModal').modal('hide');
		$('#accountModal').modal('hide');
		$('#balanceModal').modal('hide');
		$('#termsModal').modal('hide');
		$('#cardModal').modal('hide');
		$('#fakeModal').modal('hide');
		$('#makePasswdModal').modal('hide');
		$('#checkPasswdModal').modal('hide');
		$('#addressModal').modal('hide');
		$('#issueModal').modal('hide');
  
		if (flag_1 == 1)
        return;
      	addChat(["취소 버튼을 눌렀습니다. 시작 화면으로 복귀합니다."])
		flag_1 = 1;
		setTimeout(() => {
			  window.location.href = '/';
		}, 5000);
	  }

	// 비밀번호 모달 띄우기(금액 모달 -> 비밀번호 모달)
	function closeAmountModal() {
		$('#amountModal').modal('hide');
		if (flag_2 == 1)
		  return;
		flag_2 = 1
		password = 0;
		reset("password");
		setTimeout(() => {
		  addChat(["비밀번호를 입력해주세요."])
		  $('#passwdModal').modal('show');
		}, 1000);
		return true;    
	}
  
	// 비밀번호 모달 끄기(비밀번호 모달 -> 완료)
	function closePasswordModal() {
		$('#passwdModal').modal('hide');
		if (flag_3 == 1) return ;
		flag_3 = 1
		const localPassword = localStorage.getItem("password")
		if (password !== localPassword) {
		  addChat(["비밀번호가 일치하지 않습니다. 처음부터 다시 시도해주세요."])
		  setTimeout(() => {
			window.location.href = '/';
		  }, 5000);
		return;
		}
		if (accountFlag == 1) {
		  $('#passwdModal').modal('hide');
		  accountFlag = 0;
		  setTimeout(() => {
			$('#balanceModal').modal('show');
		  }, 1000);
		  return true;
		}
		setTimeout(() => {
		  if (sendFlag == 1)
			  addChat([amount + ' 원을 출금합니다.'])
			else if (sendFlag == 2)
			  addChat([amount + ' 원을 송금합니다.'])
			  
			addChat(["이용해 주셔서 감사합니다!"])
			addChat(["5초 후 자동으로 시작 화면으로 복귀합니다. 안녕히 가십시오."])
			password = "";
			setTimeout(() => {
			  window.location.href = '/';
			},7000);
		  }, 1000);
		return true
	}

	// 금액 모달 띄우기(계좌 모달 -> 금액 모달)
	function closeAccountModal() {
		if (flag_4 == 1)
			return;
		flag_4 = 1
		$('#accountModal').modal('hide');
		setTimeout(() => {
			if (sendFlag == 1)
			{
			  document.querySelector('#amountModalTitle').innerHTML = '<h5 class="modal-title" id="makePasswdTitle">출금하실 금액을 입력해주세요.</h5>'
			  addChat(["출금하실 금액을 입력해주세요."])
			}
			else if (sendFlag == 2)
			{
			  document.querySelector('#amountModalTitle').innerHTML = '<h5 class="modal-title" id="makePasswdTitle">송금하실 금액을 입력해주세요.</h5>'
			  addChat("송금하실 금액을 입력해주세요.")
			}
			$('#amountModal').modal('show');
		  	}, 1000);
			return true;
	}

	// 카드발급 혹은 배송지 모달 띄우기(비밀번호 생성 재입력 모달 -> 카드발급, 배송지 모달)
	function checkNewPassword() {
		$('#checkPasswdModal').modal('hide');
		if (flag_10 == 1)
			return;
		flag_10 = 1
		const localNewPassword = localStorage.getItem("newPassword")
		console.log("check : ", checkPassword, "local : ", localNewPassword)
		if (checkPassword !== localNewPassword)
		{
			addChat(["비밀번호가 일치하지 않습니다. 처음부터 다시 시도해주세요."])
			setTimeout(() => {
			  window.location.href = '/';
			}, 5000);
			return;
		}
		if (cardFlag === 1)
		{
			addChat(["카드를 발급받으시겠습니까?"])
            $('#issueModal').modal('show');
			return ;
		}
		addChat(["카드를 배송받을 주소를 입력해주세요."])
		$('#addressModal').modal('show');
	}

	// 비밀번호 생성 재입력 모달 띄우기(비밀번호 생성 모달 -> 비밀번호 생성 재입력 모달)
	function closeMakePasswdModal() {
		$('#makePasswdModal').modal('hide');
		if (flag_8 == 1)
			return;
		flag_8 = 1
		localStorage.setItem("newPassword", newPassword);
		setTimeout(() => {
			addChat(["생성하실 비밀번호를 다시 입력해주세요."])
			$('#checkPasswdModal').modal('show');
		  	return true
		}, 1000)
		}

	// 비밀번호 생성 모달 띄우기(카메라 모달 -> 비밀번호 생성 모달)
	function closeFakeModal() {
		$('#fakeModal').modal('hide');
		if (flag_9 == 1)
			return;
		flag_9 = 1
		newPassword = 0;
		reset("make");
		setTimeout(() => {
			addChat(["생성하실 비밀번호를 입력해주세요."])
			$('#makePasswdModal').modal('show');
		  }, 1000);
		return true;
	}
  
	// 배송지 모달 띄우기(카드발급 모달 -> 배송지 모달)
	function closeissueModal() {
		$('#issueModal').modal('hide');
		if (flag_12 == 1)
			return;
		flag_12 = 1
		//cardFlag = 1;
		setTimeout(() => {
			addChat(["발급을 원하시는 카드를 선택해주세요."])
            $('#cardModal').modal('show');
		}, 1000);
	}
  
	// 카메라 모듈 띄우기(약관 모달 -> 카메라 모듈)
	function closeTermsModal() {
		$('#termsModal').modal('hide');
		if (flag_11 == 1)
			return;
		flag_11 = 1
		setTimeout(() => {
			addChat(["신분증을 촬영해주세요."])
			$('#fakeModal').modal('show');
		}, 1000);
		return true;
	}
  
	// 약관 모듈 띄우기(카드 모달 -> 약관 모달)
	function closeCardModal() {
		$('#cardModal').modal('hide');
		if (flag_13 == 1)
			return ;
		flag_13 = 1
		if (cardFlag === 1)
		{
			setTimeout(() => {
				addChat(["카드를 배송받을 주소를 입력해주세요."])
				$('#addressModal').modal('show');
			}, 1000);
			return true;
		}
		setTimeout(() => {
		addChat(["약관을 읽고 동의 버튼을 눌러주세요"]);
		$('#termsModal').modal('show');
		}, 1000);
	}
  
	// 배송지 입력 모달 끄기 (배송지 모달 -> 종료)
	function closeAddressModal() {
		$('#addressModal').modal('hide');
		if (flag_14 == 1)
			return;
		flag_14 = 1
		setTimeout( () => {
			addChat(["이용해 주셔서 감사합니다!"])
			addChat(["5초 후 자동으로 시작 화면으로 복귀합니다. 안녕히 가십시오."])
			newPassword = "";
			setTimeout(() => {
				window.location.href = '/';
			},7000);
		}, 1000);
	}
  
	// 계좌조회 마지막 화면에서, 출금 또는 송금으로 이동
	// 1. 확인 버튼(종료)
	function closeAll() {
		$('#balanceModal').modal('hide');
		if (flag_5 == 1)
			return ;
		flag_5 = 1
		setTimeout(() => {
			addChat(["이용해 주셔서 감사합니다!"])
			addChat(["5초 후 자동으로 시작 화면으로 복귀합니다. 안녕히 가십시오."])
			setTimeout(() => {
				window.location.href = '/';
			  },7000);
			}, 1000);
		return true
	}
  
	// 2. 송금 모달로 이동
	function openAccountModal() {
		$('#balanceModal').modal('hide');
		if (flag_6 == 1)
			return;
		flag_6 = 1
		flag_3 = 0
		setTimeout(() => {
			$('#accountModal').modal('show');
			addChat(["송금하실 계좌번호를 입력해 주세요."])
			}, 500);
	}
  
	// 3. 출금 모달로 이동
	function openAmountModal() {
		$('#balanceModal').modal('hide');
		sendFlag = 1;
		if (flag_7 == 1)
			return;
		flag_7 = 1
		flag_3 = 0
		setTimeout(() => {
			$('#amountModal').modal('show');
			addChat(["출금하실 금액을 입력해주세요."])
		}, 500);
	}

	// 버튼 이벤트리스너
	amountModalOK.addEventListener("click", closeAmountModal);
	passwordModalOK.addEventListener("click", closePasswordModal);
	accountModalOK.addEventListener("click", closeAccountModal);
	balanceModalOK.addEventListener("click", closeAll);
	balanceModalSEND.addEventListener("click", openAccountModal);
	balanceModalWithdraw.addEventListener("click", openAmountModal);
	termsModalOK.addEventListener("click", closeTermsModal);
	cardModalOK.addEventListener("click", closeCardModal);
	fakeModalOK.addEventListener("click", closeFakeModal);
	makePasswdModalOK.addEventListener("click", closeMakePasswdModal);
	checkPasswdModalOK.addEventListener("click", checkNewPassword);
	issueModalOK.addEventListener("click", closeissueModal);
	addressModalOK.addEventListener("click", closeAddressModal);

	amountModalNO.addEventListener("click", redirectToHome);
	passwordModalNO.addEventListener("click", redirectToHome);
	accountModalNO.addEventListener("click", redirectToHome);
	termsModalNO.addEventListener("click", redirectToHome);
	cardModalNO.addEventListener("click", redirectToHome);
	makePasswdModalNO.addEventListener("click", redirectToHome);
	checkPasswdModalNO.addEventListener("click", redirectToHome);
	issueModalNO.addEventListener("click", redirectToHome);
	addressModalNO.addEventListener("click", redirectToHome);

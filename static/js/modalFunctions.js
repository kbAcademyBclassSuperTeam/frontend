  // 비밀번호 모달 함수

  function put_num(value, modal) {
    if (modal == "password")
    {
      var input = document.querySelector("#passwdModalInput")
      input.value += value;
      password = input.value;  
    }
    else if (modal == "amount")
    {
      var input = document.querySelector("#amountModalInput")
      if (input.value === "" && value === 0)
        return ;
      input.value = input.value.split(',').join("") + value;
      input.value = input.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      amount = input.value
    }
    else if (modal == "account")
    {
      var input = document.querySelector("#accountModalInput")
      if (input.value === "" && value === 0)
        return ;
      input.value += value;
      account = input.value;
    }
    else if (modal == "make")
    {
      var input = document.querySelector("#makePasswdModalInput")
      input.value += value;
      newPassword = input.value;
    }
    else if (modal == "check")
    {
      var input = document.querySelector("#checkPasswdModalInput")
      input.value += value;
      checkPassword = input.value;
    }
  }

  function reset(modal) {
    if (modal == "password")
    {
      var input = document.querySelector("#passwdModalInput")
      input.value = ""
      password = input.value;
    }
    else if (modal == "amount")
    {
      var input = document.querySelector("#amountModalInput")
      input.value = ""
      amount = input.value
    }
    else if (modal == "account")
    {
      var input = document.querySelector("#accountModalInput")
      input.value = ""
      account = input.value;
    }
    else if (modal == "make")
    {
      var input = document.querySelector("#makePasswdModalInput")
      input.value = ""
      newPassword = input.value;
    }
    else if (modal == "check")
    {
      var input = document.querySelector("#checkPasswdModalInput")  
      input.value = ""
      checkPassword = input.value;
    }
  }

  function clearOne(modal) {
    if (modal == "password")
    {
      var input = document.querySelector("#passwdModalInput")
      if (input.value != "")
        input.value = input.value.slice(0, -1);
      password = input.value
    }
    else if (modal == "amount")
    {
      var input = document.querySelector("#amountModalInput")
      if (input.value != "")
      input.value = input.value.split(',').join("")
      input.value = input.value.slice(0, -1);
      input.value = input.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      amount = input.value
    }
    else if (modal == "account")
    {
      var input = document.querySelector("#accountModalInput")
      if (input.value != "")
        input.value = input.value.slice(0, -1);
      account = input.value
    }
    else if (modal == "make")
    {
      var input = document.querySelector("#makePasswdModalInput")
      if (input.value != "")
        input.value = input.value.slice(0, -1);
      newPassword = input.value
    }
    else if (modal == "check")
    {
      var input = document.querySelector("#checkPasswdModalInput")
      if (input.value != "")
        input.value = input.value.slice(0, -1);
      checkPassword = input.value
    }
  }

  // 약관동의 모달 함수

  const termsModalCheckbox = document.querySelector('#termsCheckbox')

  function handleCheckbox() {
    termsModalCheckbox.checked === false ? termsModalOK.disabled = true : termsModalOK.disabled = false
  }

  termsModalCheckbox.addEventListener("click", handleCheckbox)

  // 카드발급 모달 함수

  card = [
    { "tag" : "<div class='cardUnit'><img class='cardImg' src='/static/img/04285_img.png' alt='cheongchun'>\
      <div class='cardText'>\
        <h3>\
          <input type='checkbox' name='card' onclick='checkOnlyOne(this)' id='card_1'>\
          스카이패스 티타늄 카드\
        </h3>\
        <div>\
          <b>대한항공 마일리지 기본적립에</b>\
        </div>\
        <div>\
          <b>해외/면세점 추가적립 혜택까지!</b>\
        </div><br>\
        <div>\
          국내가맹점 적립 1마일 1,000원 당\
        </div>\
        <div>\
          해외이용 적립 2마일 1,000원 당\
        </div>\
        <div>\
          면세점 적립 2마일 1,000원 당\
        </div>\
      </div>\
    </div>", "content" : ""},
    { "tag" : "<div class='cardUnit'><img class='cardImg' src='/static/img/02065_img.png' alt='cheongchun'>\
      <div class='cardText'>\
        <h3>\
          <input type='checkbox' name='card' onclick='checkOnlyOne(this)' id='card_2'>\
          국민행복카드\
        </h3>\
        <div>\
          <b>보육료 및 임신·출산 진료비 지원 등</b>\
        </div>\
        <div>\
          <b> 국가바우처 지원 가능</b>\
        </div><br>\
        <div>\
          쇼핑/교육/자동납부 5% 청구할인\
        </div>\
        <div>\
          단체보험가입 대중교통 상해 1억 보장\
        </div>\
        <div>\
          단체보험가입 진단비 10만원\
        </div>\
      </div>\
    </div>","content" : ""},
    { "tag" : "<div class='cardUnit'><img class='cardImg' src='/static/img/09157_img.png' alt='cheongchun'>\
      <div class='cardText'>\
        <h3>\
          <input type='checkbox' name='card' onclick='checkOnlyOne(this)' id='card_2'>\
          가온올림카드(실속형)\
        </h3>\
        <div>\
          <b>실적조건 없이 국내가맹점 적립</b>\
        </div>\
        <div>\
          <b>해외가맹점 캐시백! 국가바우처 지원 가능</b>\
        </div><br>\
        <div>\
          국내가맹점 0.7% 기본적립\
        </div>\
        <div>\
          주말/공휴일 0.5% 추가적립\
        </div>\
        <div>\
          음식·교통 0.5% 추가적립\
        </div>\
      </div>\
    </div>","content" : ""},
    { "tag" : "<div class='cardUnit'><img class='cardImg' src='/static/img/09174_img.png' alt='cheongchun'>\
      <div class='cardText'>\
        <h3>\
          <input type='checkbox' name='card' onclick='checkOnlyOne(this)' id='card_2'>\
          청춘대로 톡톡카드\
        </h3>\
        <div>\
          <b>Simple하게 즐기자! 혜택 톡톡!</b>\
        </div>\<br>\
        <div>\
          스타벅스 50% 청구할인\
        </div>\
        <div>\
          버거/패스트푸드 20% 청구할인\
        </div>\
        <div>\
          간편결제 Pay 10% 청구할인\
        </div>\
      </div>\
    </div>","content" : ""},
    { "tag" : "<div class='cardUnit'><img class='cardImg' src='/static/img/09251_img.png' alt='cheongchun'>\
      <div class='cardText'>\
        <h3>\
          <input type='checkbox' name='card' onclick='checkOnlyOne(this)' id='card_2'>\
          Easy pick 티타늄카드\
        </h3>\
        <div>\
          <b>주요 생활 영역부터 내가 Pick한</b>\
        </div>\
        <div>\
          <b>영역까지 모두 적립 Easy!</b>\
        </div><br>\
        <div>\
          주요 생활 영역 5% 적립\
        </div>\
        <div>\
          선호 영역(택1) 5% 적립\
        </div>\
        <div>\
          일상 생활 영역 5% 적립\
        </div>\
      </div>\
    </div>","content" : ""},
    { "tag" : "<div class='cardUnit'><img class='cardImg' src='/static/img/09644_img.png' alt='cheongchun'>\
      <div class='cardText'>\
        <h3>\
          <input type='checkbox' name='card' onclick='checkOnlyOne(this)' id='card_2'>\
          우리동네 체크카드\
        </h3>\
        <div>\
          <b>다 같이 돌자 동네 한 바퀴</b>\
        </div><br>\
        <div>\
          세탁소, 정육점 10% 환급할인\
        </div>\
        <div>\
          빵집, 슈퍼마켓 5% 환급할인\
        </div>\
        <div>\
          취향거래 (번개장터) 5% 환급할인\
        </div>\
      </div>\
    </div>","content" : ""},
  ]
  const cardContent = document.querySelector('#cardContent')
  cardContent.innerHTML += card[0].tag
  cardContent.innerHTML += card[1].tag
  cardContent.innerHTML += card[2].tag
  cardContent.innerHTML += card[3].tag
  cardContent.innerHTML += card[4].tag
  cardContent.innerHTML += card[5].tag

  function checkOnlyOne(element) {
  
  const checkboxes = document.getElementsByName("card");
  const cardModalOK = document.querySelector("#cardModalOK")

  if (element.checked === false)
  {
    element.checked = false;
    cardModalOK.disabled = true;
    return;
  }
  
  checkboxes.forEach((cb) => {
    cb.checked = false;
  })
  
  element.checked = true;
  cardModalOK.disabled = false;
}

// 배송지입력 모달 함수

const addressInput = document.querySelector("#addressInput")

function onInput() {
  if (addressInput.value !== "")
    addressModalOK.disabled = false
  else
    addressModalOK.disabled = true
}

addressInput.addEventListener("input", onInput)
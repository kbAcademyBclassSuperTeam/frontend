  // 백엔드 통신
  function search(texts) {
    let search_key = texts
    let search_var = ''
    $.ajax({ 
      type: "GET", 
      url:'search/', 
      data : { 'search_key':search_key}, 
      dataType: 'json',
      async:false,
      success: function(data){ 
          search_var = data['search_key']
      },
      error: function (error) {
          // console.log(error);
        search_var = '0'
      }
    }) 	
    return search_var
  } 

  function promise_search(texts){
    return new Promise((resolve, reject) => {
      let target = search(texts)
      // 0.4초 안에 통신이 안되면, 에러 발생( promise 객체 이용 )
      setTimeout(() => {
        if (target != undefined){
          resolve(target)
        } else {
            reject('서버에 문제가 발생하여 인식하지 못했습니다.\n 다시 시도해주세요.')
        }
      }, 400)
    })
  }
  
  function promise_modal(func_name){
    let target;
    if (func_name == "accountModalOK_modal") {
      target = accountModalOK_modal()
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (target != undefined){
          resolve(target)
        } else {
            reject('서버에 문제가 발생하여 인식하지 못했습니다.\n 다시 시도해주세요.')
        }
      }, 500)
    })
  }
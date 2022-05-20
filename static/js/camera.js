  // Camera open function
  function openCamera() {
    var url = domain;
    axios({
      method: 'get',
      url: `${url}/camera` 
    });
  }
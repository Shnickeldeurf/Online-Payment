$(document).ready(function(){
    side = document.getElementById('side');
    if (current !== null) {
        side.innerHTML = '<button id="dropbtn" type="button" class="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown">You are logged in as: ' + 
        current.fullname +'</button>' +
        '<ul class="dropdown-menu">' +
          '<li><a class="dropdown-item" href="payments.html">Make a payment</a></li>' +
          '<li><a class="dropdown-item" href="show.html">Display Data</a></li>' +
          '<li><a class="dropdown-item" onclick="logout()" href="#">LOGOUT</a></li>' +
        '</ul>';
        } else {
        window.location.href = 'index.html';
    }
  
    $('#submitReg').click(addUser);
    $('#submitLog').click(login);
  
    $('#sptBtn').click(function(){
        window.location.href = 'support.html';
    });
  
    $('#subscribeBtn').click(addEmail);

    showPayments();
  })

  //show unique
  everyMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  everyType = ['phone', 'rent/mortgage', 'car loan', 'electric', 'car insurance', 'water'];
  //show
  function showPayments(){

    allPay = [];

    for (var i = 0; i < everyMonth.length; i++) {
      arr = [];
      for (var j = 0; j < payments.length; j++) {
        if (payments[j].month == everyMonth[i]) {
          arr.push(payments[j]);
        }
      }
      if (arr.length > 0) {
        allPay.push(arr);
      }
    }

    list = document.getElementById('sumBody');
    list.innerHTML = '';

    for (var i = 0; i < allPay.length; i++) {
      row = ''
      row += '<tr><td>' + allPay[i][0].month + '</td>';
      for (var j = 0; j < everyType.length; j++) {
        for (var k = 0; k < allPay[i].length; k++) {
          if (allPay[i][k].type == everyType[j]) {
            row += '<td>$' + Number(allPay[i][k].amount).toFixed(2) + '</td>';
            paid = true;
            break;
        } else {
          paid = false;
        }
      }
      if (paid == false) {
        row += '<td>Pending...</td>';
      }
    }

      /*for (var j = 0; j < allPay[i].length; j++) {
        row += '<td>' + allPay[i][j].amount + '</td>';
      }*/

      row += '</tr>';

      list.innerHTML += row;
    }
  }
  
  //modal
  function showModal(){
    modal = $('#myModal').modal('show');
  }
  
  //logout 
  function logout() {
    localStorage.removeItem('opCurrentUser');
    window.location.reload();
  }
  
  //get set users
  if (localStorage.getItem('opUsers') == null) {
    users = [];
    localStorage.setItem('opUsers', JSON.stringify(users));
  } else {
    users = JSON.parse(localStorage.getItem('opUsers'));
  }
  
  if (localStorage.getItem('opCurrentUser') !== null) {
    current = JSON.parse(localStorage.getItem('opCurrentUser'));
  } else {
    current = null
  }
  
  if (localStorage.getItem('opMailingList') == null) {
    ML = [];
    localStorage.setItem('opMailingList', JSON.stringify(ML));
  } else {
    ML = JSON.parse(localStorage.getItem('opMailingList'));
  }

  if (localStorage.getItem([current.email] + 'payments') == null) {
    payments = [];
   localStorage.setItem([current.email] + 'payments', JSON.stringify(payments));
  } else {
    payments = JSON.parse(localStorage.getItem([current.email] + 'payments'));
  }
  
  //show login-register
  function showReg() {
    b1 = $('#logTab');
    b2 = $('#regTab');
    reg = $('#register');
    log = $('#login');
  
    b1.removeClass('active');
    b2.addClass('active');
  
    reg.show();
    log.hide();
  }
  
  function showLogin() {
    b1 = $('#logTab');
    b2 = $('#regTab');
    reg = $('#register');
    log = $('#login');
  
    b1.addClass('active');
    b2.removeClass('active');
  
    reg.hide();
    log.show();
  }
  
  //add user
  function addUser(user) {
    fullname = $('#fullname').val();
    email = $('#rEmail').val();
    mobile = $('#mobile').val();
    password = $('#rPassword').val();
    user = {}
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  
    if (fullname == '') {
        alert('Name cannot be empty');
    } else {
        user.fullname = fullname;
    }
  
    if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
        alert('Invalid Email');
    } else {
        user.email = email;
    }
  
    if (re.test(mobile) == false) {
        alert('Invalid Mobile Number');
    } else {
        user.mobile = mobile;
    }
  
    if (password == '') {
        alert('Password cannot be empty');
    } else {
        user.password = password;
    }
  
    if (user.fullname && user.email && user.mobile && user.password) {
        users.push(user);
        localStorage.setItem('opUsers', JSON.stringify(users));
        showLogin();
    }
  }
  
  //login 
  function login() {
    email = $('#lEmail').val();
    password = $('#lPassword').val();
  
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {
            current = users[i];
            localStorage.setItem('opCurrentUser', JSON.stringify(current));
            window.location.reload();
        } else if (i == users.length - 1) {
            alert('Invalid Email or Password');
        }
    }
  }
  
  //email list
  function addEmail() {
    email = $('#email').val();
    if (email == '') {
        alert('Email cannot be empty');
    } else if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
        alert('Invalid Email');
    } else {
        ML.push(email);
        localStorage.setItem('opMailingList', JSON.stringify(ML));
    }
  }
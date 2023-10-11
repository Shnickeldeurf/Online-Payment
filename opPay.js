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
})

//payUnique

function changePay(i) {
  buttons = document.getElementById('payBtns').children;
  boxes = document.getElementsByClassName('uBox');

  for (j = 0; j < boxes.length; j++) {
    boxes[j].classList.remove('uActive');
  }
  boxes[i].classList.add('uActive');
  for (j = 0; j < buttons.length; j++) {
    buttons[j].classList.remove('active');
  }
  buttons[i].classList.add('active');
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
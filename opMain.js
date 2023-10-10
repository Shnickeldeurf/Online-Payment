$(document).ready(function(){
    side = $('header .text-end');
    if (current != null) {
        side.innerHTML = 'You are logged in as: ' + current.name;
    }
})

//get set users
if (localStorage.getItem('opUsers') == null) {
    users = [];
    localStorage.setItem('opUsers', JSON.stringify(users));
} else {
    users = JSON.parse(localStorage.getItem('opUsers'));
}

if (localStorage.getItem('opCurrentUser') !== null) {
    current = JSON.parse(localStorage.getItem('opCurrentUser'));
}

//show modal
function showModal() {
    modal = $('#myModal');

    modal.modal('show');
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
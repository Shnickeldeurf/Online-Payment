$(document).ready(function(){

})

function showModal() {
    modal = $('#myModal');

    modal.modal('show');
}

function change() {
    buttons = $('.model .btn-light');
    forms = $('.model form');

    console.log(buttons);
    console.log(forms);

    for (let i = 0; i < buttons.length; i++) {
        if ($(buttons[i]).hasClass('active')) {
            buttons[i].classList.remove('active');
            buttons[i].onclick = change;
        } else {
            buttons[i].classList.add('active');
            buttons[i].onclick = null;
        }
    }

    for (let i = 0; i < forms.length; i++) {
        if ($(forms[i]).hasClass('inActive')) {
            forms[i].classList.remove('inActive');
        } else {
            forms[i].classList.add('inActive');
        }
    }
}
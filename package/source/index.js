import './header-links.js'
import './search.js'

$('.hamburger.item').click(e => {
    $('.ui.modal').modal('show');
});

$('.ui.accordion').accordion();
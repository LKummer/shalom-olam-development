import {initialize_header_popups, to_paragraph, to_toc} from './header-links.js';
import {initialize_search} from './search.js';

$('.hamburger.item').click(e => {
    $('.ui.modal').modal('show');
});

$('.ui.accordion').accordion();

initialize_header_popups();
window.to_paragraph = to_paragraph;
window.to_toc = to_toc;

initialize_search();
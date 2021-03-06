const headers = $('#post-content>:header');
const paragraph_link_html = '<i id="paragraph-link-icon" class="paragraph link icon" onclick="to_paragraph(this)"></i>';
const toc_link_html = '<i id="toc-link-icon" class="list ul link icon" onclick="to_toc(this)"></i>';
export function initialize_header_popups() {
    headers.popup({
        position: 'left center',
        distanceAway: 10,
        hoverable: true,
        exclusive: true,
        delay: {show: 0, hide: 250},
        html: ($('#toc').length <= 0 ? '' : toc_link_html) + paragraph_link_html,
        forcePosition: true,
        inline: true
    });
}

function get_header(element) {
    return $(element).parent('.popup').prev().attr('id');
}

export function to_paragraph(e) {
    const header = get_header(e);
    window.location = `#${header}`;
}

export function to_toc() {
    if ($('#toc.accordion .title').hasClass('active')) {
        window.location = '#toc';
    } else {
        $('.ui.accordion#toc').accordion('open', 0);
        setTimeout(() => {
            window.location = '#toc';
        }, 500);
    }
}
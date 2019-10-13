import * as $ from "jquery";
import * as fomantic from "../external/semantic.min.js"

export function initialize_header_popups() {
    const headers = $('#post-content :header');
    const paragraph_link_html = '<i id="paragraph-link-icon" class="paragraph link icon" onclick="to_paragraph(this)"></i>';
    const toc_link_html = '<i id="toc-link-icon" class="list ul link icon" onclick="to_toc(this)"></i>';
    (headers as any).popup({
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

function get_header(element: Element) {
    return $(element).parent('.popup').prev().attr('id')
}

export function to_paragraph(e: Element) {
    const header = get_header(e);
        window.location.href = `#${header}`;
}

export function to_toc() {
    if ($('#toc.accordion .title').hasClass('active'))
    {
        window.location.href = '#toc';
    }
    else
    {
        ($('.ui.accordion#toc') as any).accordion('open', 0);
        setTimeout(() => {
            window.location.href = '#toc';
        }, 500);
    }
}
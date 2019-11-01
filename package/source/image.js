export function initialize_images() {
    $('#post-content img').click(e => {
        const src = $(e.currentTarget).attr('src');
        $('#image-modal-image').attr('src', src);
        $('#image-modal').modal('show');
    });

    $('#image-modal').click(e => {
        $(e.currentTarget).modal('hide');
    })
}
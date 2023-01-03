const newComment = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#new-comment-text').value.trim();
    // return page name only
    const postId = window.location.pathname.split('/').pop();

    if (comment) {
        const response = await fetch ('/api/comments', {
            method: 'POST',
            // can this simply be postId, comment instead
            body: JSON.stringify({ "post_id": postId, "comment_text": comment }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            window.location.reload();
        } else {
            alert('Could not add your comment');
        }
    }
};

document
    .querySelector('#new-comment-btn')
    .addEventListener('submit', newComment);
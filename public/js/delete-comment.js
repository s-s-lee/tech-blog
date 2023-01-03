const deleteComment = async (event) => {
    event.preventDefault();

    const commentId = window.location.pathname.split('/').pop();
    const response = await fetch (`/api/comments/${commentId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        window.location.reload();
    } else {
        alert('Unable to delete comment');
    }
};

document
  .querySelector('#delete-comment-btn')
  .addEventListener('submit', deleteComment);
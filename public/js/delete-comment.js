// const commentId = window.location.pathname.split('/').pop();
const deleteComment = async (event) => {
    event.preventDefault();
    
    const response = await fetch (`/api/comments/${commentId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        document.location.href = '/';
    } else {
        alert('Unable to delete comment');
    }
};

document
  .querySelector('#delete-comment-btn')
  .addEventListener('click', deleteComment);
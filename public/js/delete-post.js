const deletePost = async (event) => {
    event.preventDefault();
    // const postId = window.location.pathname.split('/').pop();
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        document.location.href = '/dashboard';
    } else {
        alert('Unable to delete post');
    }
};

document
    .querySelector('#delete-post-btn')
    .addEventListener('click', deletePost);
const editPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#edit-post-title").value.trim();
	const content = document.querySelector("#edit-post-text").value.trim();
    const postId = window.location.pathname.split('/').pop();

    if (title && content) {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ 'post_id': id, title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            alert('Unable to edit post');
        }
    }
};

// const deletePost = async (event) => {
//     event.preventDefault();

//     const response = await fetch(`/api/posts/${postId}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
//     if (response.ok) {
//         document.location.href = '/dashboard';
//     } else {
//         alert('Unable to delete post');
//     }
// };

document
    .querySelector('#edit-post-btn')
    .addEventListener('click', editPost);

// document
//     .querySelector('#delete-post-btn')
//     .addEventListener('click', deletePost);
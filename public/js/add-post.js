const newPostButton = document.querySelector('#new-post-btn');
const newPostCard = document.querySelector('#new-post-card');

const showCard = async (event) => {
    event.preventDefault();
    newPostButton.classList.add('hide');
    newPostCard.classList.remove('hide');
};

const addNewPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#new-post-title").value.trim();
	const content = document.querySelector("#new-post-text").value.trim();

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            newPostButton.classList.remove('hide');
            newPostCard.classList.add('hide');
            window.location.href = '/dashboard';
        } else {
            newPostButton.classList.remove('hide');
            newPostCard.classList.add('hide');
            alert('Unable to create new post');
        }
    }
};

document
    .querySelector('#new-post-btn')
    .addEventListener('submit', addNewPost);
newPostButton.addEventListener('submit', showCard);
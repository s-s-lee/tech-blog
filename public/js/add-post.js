const newPostButton = document.querySelector('#new-post-btn');
const newPostCard = document.querySelector('#new-post-card');

const showCard = async (event) => {
    event.preventDefault();
    newPostCard.classList.remove('hide');
    newPostButton.classList.add('hide');
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
            newPostCard.classList.add('hide');
            newPostButton.classList.remove('hide');            
            window.location.reload();
        } else {
            // newPostButton.classList.remove('hide');
            // newPostCard.classList.add('hide');
            alert('Unable to create new post');
        }
    }
};

document
    .querySelector('#new-post-btn')
    .addEventListener('click', addNewPost);
newPostButton.addEventListener('click', showCard);
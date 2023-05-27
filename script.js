function newPost() {
    newPost = document.querySelector('.content-box').value;
    if (newPost == "") {
        return;
    }
    allPosts = document.querySelector('.all-posts').innerHTML;
    allPosts += `<p class="some-post">${newPost}</p>`;
    document.querySelector('.all-posts').innerHTML = allPosts;
    document.querySelector('.content-box').value = '';
}
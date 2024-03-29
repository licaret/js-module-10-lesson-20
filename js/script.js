const LIMIT = 3;

const listElement = document.getElementById("list");
const selectElement = document.getElementById("userSelect");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const pageNumber = document.getElementById("pageNumber");

let page = 3;

function addPostHTML(post) {
  const postDiv = document.createElement("div");
  postDiv.classList.add("post");

  const titleElement = document.createElement("h2");
  titleElement.textContent = post.title;
  postDiv.append(titleElement);

  const userNameElement = document.createElement("p");
  postDiv.append(userNameElement);

  const completedElement = document.createElement("p");
  completedElement.textContent = `Completed: true`;
  postDiv.append(completedElement);

  const showCommentsButton = document.createElement("button");
  showCommentsButton.setAttribute("id", post.id);
  showCommentsButton.classList.add("button");
  showCommentsButton.textContent = "Show comments";
  postDiv.append(showCommentsButton);

  listElement.append(postDiv);

  showCommentsButton.addEventListener("click", () => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${showCommentsButton.id}`)
      .then(response => response.json())
      .then(comments => console.log(comments))
      .catch(err => console.error(err));
  });
}

function generatePostsForSelectedUser() {
  const userId = document.getElementById("userSelect").value;
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=${LIMIT}&_page=${page}`)
    .then(res => res.json())
    .then(postRes => {
      postRes.forEach(post => addPostHTML(post));
    })
    .catch(err => console.error(err));
}

function clearPosts() {
  listElement.innerHTML = '';
}

fetch("https://jsonplaceholder.typicode.com/users")
  .then("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(users => {
    const fragmentElement = document.createDocumentFragment();

    users.forEach(user => {
      const optionElement = document.createElement("option");
      optionElement.textContent = user.username;
      optionElement.value = user.id;
      fragmentElement.append(optionElement);
    });

    selectElement.append(fragmentElement);
    pageNumber.textContent = page;

    generatePostsForSelectedUser();
  })
  .catch(err => console.error(err));

selectElement.addEventListener("change", () => {
  clearPosts();
  page = 1;
  generatePostsForSelectedUser();
});

previousButton.addEventListener("click", () => {
  page--;
  pageNumber.textContent = page;
  clearPosts();
  generatePostsForSelectedUser();
});

nextButton.addEventListener("click", () => {
  page++;
  pageNumber.textContent = page;
  clearPosts();
  generatePostsForSelectedUser();
});
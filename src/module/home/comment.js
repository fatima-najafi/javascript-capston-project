import getData from './getData.js';
// import getComments from './getsComments.js';
// import addComment from './postComments.js';

const modal = document.getElementById('myModal');

  // get data
const data = await getData();
console.log('mealData', data);

// get comments

// When the user clicks on <span> (x), close the modal
const close = () => {
  modal.style.display = 'none';
};

let namee = document.getElementById('commentName');
let text = document.getElementById('commentText');

const addComment = () => {
  console.log(namee, text);
};

// When the user clicks on the button, open the modal
const openCommentPopup = async (id, like) => {
  // console.log(like);
  const ids = like.item_id;
  const urlComments = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Ix2mMVLk4DRU3xtKMCQq/comments?item_id=${ids}`;
  const comments = await fetch(urlComments).then((res) => res.json());
  // const comments = await getComments(like);

  modal.style.display = 'block';
  const card = data.find((card) => card.idMeal === id);

  // Create the elements
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const closeButton = document.createElement('span');
  closeButton.classList.add('close');
  closeButton.innerHTML = '&times;';
  closeButton.onclick = () => close();

  const popupImg = document.createElement('img');
  popupImg.classList.add('popupImg');
  popupImg.src = card.strMealThumb;
  popupImg.alt = '';

  const titleElement = document.createElement('h1');
  titleElement.textContent = card.strMeal;

  const commentSection = document.createElement('div');
  commentSection.classList.add('commentSection');

  const commentsElement = document.createElement('h2');
  commentsElement.innerHTML = 'Add a comment';

  const commentInput = document.createElement('input');
  commentInput.type = 'text';
  commentInput.value = 'Add a comment';
  commentInput.id = 'commentName';
  commentInput.placeholder = 'Enter you name';

  const commentText = document.createElement('textArea');
  commentText.id = 'commentText';
  commentText.value = '';
  commentText.placeholder = 'add a comment';
  commentText.rows = 10;
  commentText.cols = 10;

  const commentBtn = document.createElement('button');
  commentBtn.id = 'commentBtn';
  commentBtn.innerHTML = 'Add Comment';
  commentBtn.addEventListener('click', () => {
    namee = document.getElementById('commentName').value;
    text = document.getElementById('commentText').value;
    addComment();
  });

  // Append elements to the modal content
  modalContent.appendChild(closeButton);
  modalContent.appendChild(popupImg);
  modalContent.appendChild(titleElement);
  commentSection.appendChild(commentsElement);
  commentSection.appendChild(commentInput);
  commentSection.appendChild(commentText);
  commentSection.appendChild(commentBtn);
  modalContent.appendChild(commentSection);

  // Clear existing content and append the new modal content
  modal.innerHTML = '';
  modal.appendChild(modalContent);
};


export default openCommentPopup;

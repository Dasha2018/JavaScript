import { sanitizeInput } from './utils.js';
import { addComment } from './data.js';
import { renderComments } from './render.js';
import { comments } from './data.js';

export function setupAddCommentHandler() {
  const nameInput = document.getElementById('name');
  const commentInput = document.getElementById('comment-box-text');
  const addCommentButton = document.getElementById('comment-box-button');

  addCommentButton.addEventListener('click', (event) => {
    event.preventDefault();
    const name = sanitizeInput(nameInput.value.trim());
    const commentText = sanitizeInput(commentInput.value.trim());

    if (!name || !commentText) {
      alert('Пожалуйста, заполните оба поля!');
      return;
    }

    addComment(name, commentText);
    nameInput.value = '';
    commentInput.value = '';
    renderComments();
  });
}



export function enableCommentReplyFeature() {
    const commentInput = document.getElementById('comment-box-text');
    const commentElements = document.querySelectorAll(".comments");
    commentElements.forEach((commentEl, index) => {
      commentEl.addEventListener('click', () => {
        const { name, comment } = comments[index];
        commentInput.value = `@${name} ${comment}>`; // Подставляем текст комментария с упоминанием автора
        commentInput.focus(); // Фокусируемся на поле ввода
      });
    });
  }


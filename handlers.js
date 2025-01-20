import { sanitizeInput } from './utils.js'
import { updateComments } from './data.js'
import { comments } from './data.js'
import { postComment } from './api.js'

export function setupAddCommentHandler(renderComments) {
    const nameInput = document.getElementById('name')
    const commentInput = document.getElementById('comment-box-text')
    const addCommentButton = document.getElementById('comment-box-button')

    addCommentButton.addEventListener('click', (event) => {
        event.preventDefault()
        if (!nameInput.value || !commentInput) {
            alert('Пожалуйста, заполните оба поля!')
            return
        }
        document.querySelector('.comment-loading').style.display = 'block'
        document.querySelector('.comment-box-content').style.display = 'none'

        postComment(
            sanitizeInput(commentInput.value.trim()),
            sanitizeInput(nameInput.value.trim()),
        ).then((data) => {
            document.querySelector('.comment-loading').style.display = 'none'
            document.querySelector('.comment-box-content').style.display = 'flex'
            updateComments(data)
            renderComments()
            nameInput.value = ''
            commentInput.value = ''
        })
    })
}

export function enableCommentReplyFeature() {
    const commentInput = document.getElementById('comment-box-text')
    const commentElements = document.querySelectorAll('.comments')
    commentElements.forEach((commentEl, index) => {
        commentEl.addEventListener('click', () => {
            const { name, comment } = comments[index]
            commentInput.value = `@${name} ${comment}>` // Подставляем текст комментария с упоминанием автора
            commentInput.focus() // Фокусируемся на поле ввода
        })
    })
}

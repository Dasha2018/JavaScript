import { sanitizeInput } from './utils.js'
import { addComment, updateComments } from './data.js'
import { renderComments } from './render.js'
import { comments } from './data.js'
import { postComment } from './api.js'

export function setupAddCommentHandler(renderComments) {
    const nameInput = document.getElementById('name')
    const commentInput = document.getElementById('comment-box-text')
    const addCommentButton = document.getElementById('comment-box-button')

    addCommentButton.addEventListener('click', () => {
       
         /* const name = sanitizeInput(nameInput.value.trim())
        const text = sanitizeInput(commentInput.value.trim()) */ 

        if (!nameInput.value || !commentInput) {
            alert('Пожалуйста, заполните оба поля!')
            return
        }

        postComment(
            sanitizeInput(commentInput.value.trim()),
            sanitizeInput(nameInput.value.trim()),
        ).tnen((data) => {
            updateComments(data)
            renderComments()
            nameInput.value = ''
            commentInput.value = ''
        })

        /*  addComment(name, commentText)
        renderComments() */
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

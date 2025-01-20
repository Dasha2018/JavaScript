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
        )
            .then((data) => {
                document.querySelector('.comment-loading').style.display =
                    'none'
                document.querySelector('.comment-box-content').style.display =
                    'flex'
                updateComments(data)
                renderComments()
                nameInput.value = ''
                commentInput.value = ''
            })
            .catch((error) => {
                document.querySelector('.comment-loading').style.display =
                    'none'
                document.querySelector('.comment-box-content').style.display =
                    'flex'
                if (error.message === 'Failed to fetch at postComment') {
                    alert('Кажется, у вас сломался интернет, попробуйте позже')
                }
                if (error.message === 'Сервер сломался, попробуй позже') {
                    alert('Сервер сломался, попробуй позже')
                }

                if (error.message === 'Неверный запрос') {
                    alert('Имя и комментарий должны быть не короче 3 символов')
                    nameInput.classList.add('-error')
                    commentInput.classList.add('-error')

                    setTimeout(() => {
                        nameInput.classList.remove('-error')
                        commentInput.classList.remove('-error')
                    }, 2000)
                }
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

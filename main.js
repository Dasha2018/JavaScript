import {fetchComments} from './api.js'
import { updateComments } from './data.js'
import { renderComments } from './render.js'
import { setupAddCommentHandler } from './handlers.js'


fetchComments().then((data) =>{
    updateComments(data)
    renderComments()
})
// Инициализация приложения

setupAddCommentHandler(renderComments)

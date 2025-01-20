const host = 'https://wedev-api.sky.pro/api/v1/Dasha2018'

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((response) => {
            return response.json()
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((coment) => {
                const date = new Date(coment.date) // Преобразуем строку в объект Date
                const formattedDate = `${date.toLocaleDateString('ru-RU')} ${date.toLocaleTimeString(
                    'ru-RU',
                    {
                        hour: '2-digit',
                        minute: '2-digit',
                    },
                )}`
                return {
                    name: coment.author.name,
                    comment: coment.text,
                    liked: { state: false, counter: 0 },
                    isliked: false,
                    date: formattedDate,
                }
            })
            return appComments
        })
}

export const postComment = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify({
            text,
            name,
            forceError: true,
        }),
    }).then(() => {
        return fetchComments()
    })
}

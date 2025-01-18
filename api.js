const host = "https://wedev-api.sky.pro/api/v1/Dasha2018"

export const fetchComments = () =>{
    return fetch(host + "/comments").then(response =>{
        return response.json()
    }).then(responseData =>{
        const appComments = responseData.comments.map(coment=>{
            return {
                name:coment.author.name,
                comment:coment.text,
                liked:{ state: false, counter: 0 },
                isliked: false,
                date:coment.date,   
            }
        })
        return appComments
    })
}

export const postComment = (text,name) =>{
    return fetch(host + "/comments", {
        method: "POST",
        body: JSON.stringify({
            text,
            name,
        }),
    })
    .then(() =>{
        return fetchComments()
    }).then
}
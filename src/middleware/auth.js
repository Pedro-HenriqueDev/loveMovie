import axios from "axios"

export const tokenAuth = function (to, from, next) {
    let token = document.cookie.split("=")
    let header = {
        headers: {
            Authorization: `Bearer ${token[1]}`
        }
    }

    axios.get(process.env.VUE_APP_URL_APIUSER + "profile", header).then(res => {
        if(res.status == 200) {
            next()
        }
    }).catch(err => {
        next("/login")
    })
}
export const tokenAuthHome = function (to, from, next) {
    let token = document.cookie.split("=")
    let header = {
        headers: {
            Authorization: `Bearer ${token[1]}`
        }
    }
    if(token == "") {
         return next()
    }

    axios.get(process.env.VUE_APP_URL_APIUSER + "profile", header).then(res => {
        if(res.status == 200) {
            next("/movies/1")
        }
        return next(to.path)
    }).catch(err => {
        console.log(err)
        return next()
    })
}
export const tokenAuthParam = function (to, from, next) {
    let token = String(to.params.token)

    let header = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    axios.get(process.env.VUE_APP_URL_APIUSER + "profile", header).then(res => {
        if(res.status == 200) {
            next()
        }
    }).catch(err => {
        console.log(err)
        next("/login")
    })
}
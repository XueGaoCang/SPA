import { v4 as uuidv4 } from "uuid"

export const getUUID = () => {
    //首先查看本地存储内有没有uuid
    let uuid_token = localStorage.getItem("UUIDTOKEN")
    //如果没有的话则uuid_token为null  取反则执行if内的语句  生成一个uuid游客id  并存放到本地存储内  返回给vuex的detail 仓库中去
    if (!uuid_token) {
        uuid_token = uuidv4()
        localStorage.setItem("UUIDTOKEN", uuid_token)
    }
    return uuid_token
}
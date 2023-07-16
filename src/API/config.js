import axios from "axios";

export const BaseApiUrl = 'http://43.206.137.78:8080/api'

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbG1hbm5hcXY0NjFAZ21haWwuY29tIiwiaWF0IjoxNjg1NzkzNjUwfQ.Rd-U0FVIHucqjV7_PzZ-Ez56ORr6amRuzdbp-xjG79U'

export const API = axios.create({
    baseURL: BaseApiUrl,
    headers: {
        "authorization": token
    }
})

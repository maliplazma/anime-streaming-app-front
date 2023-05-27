import axios from 'axios'


function setupInterceptors() {
    axios.interceptors.response.use(response =>{
        console.log("interceptor response")
        if(response.status==403)
            console.log("403")
        return response;
    }, error =>{
        console.log("Greska na response ",error)
        window.location.href='/';
        return Promise.reject(error)
    })

    axios.interceptors.request.use(
        (config) =>{
            console.log('inter. request')
            const token = localStorage?.getItem('token')
            
            if(token != "null"){
                console.log(token != "null")
                config.headers.Authorization = 'Bearer ' + token;    
        }
                return config
            
        }, (err) =>{
            console.log("Greska na request ", err)

            window.location.href='/';
            return Promise.reject(err)
        }
    )

}

export default setupInterceptors
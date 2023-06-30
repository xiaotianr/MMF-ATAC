import axios from 'axios'
import qs from 'qs'
import router from '../router'
export function getHomoGse(type) {
    return new Promise((resolve, reject) => {
        axios.post('/api/getHomogse', qs.stringify({
            type
        })).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        })
    })
}

export function Download() {
    return new Promise((resolve, reject) => {
        axios.post('/api/download', {
            responseType: 'blob',
        })
            .then((res) => {
                if (!res) return;
                console.log(res);
                const fileName = res.headers['content-disposition'].split('filename=')[1];
                const response = res.data;

                // 兼容ie11
                if (window.navigator.msSaveOrOpenBlob) {
                    try {
                        const blobObject = new Blob([response]);
                        window.navigator.msSaveOrOpenBlob(blobObject, fileName);
                    } catch (e) {
                        console.log(e);
                        reject(e);
                    }
                    return;
                }
                const url = window.URL.createObjectURL(new Blob([response]));
                const link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
        // .then(response => {
        //     // 用返回二进制数据创建一个Blob实例 
        //     if (!response) return;
        //     let blob = new Blob([response.data], {
        //         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        //     }) // for .xlsx files          
        //     // 通过URL.createObjectURL生成文件路径          
        //     let url = window.URL.createObjectURL(blob)
        //     console.log("url==========", url)
        //     // 创建a标签          
        //     let ele = document.createElement("a")
        //     ele.style.display = 'none'
        //     // 设置href属性为文件路径，download属性可以设置文件名称          
        //     ele.href = url
        //     // ele.download = this.name
        //     // 将a标签添加到页面并模拟点击          
        //     document.querySelectorAll("body")[0].appendChild(ele)
        //     ele.click()
        //     // 移除a标签          
        //     ele.remove()
        // })
        .catch((error) => {
            console.log(error);
            reject(error);
        });
});
};



export function tosearch(par) {
    router.push({
        name: 'searcher',
        query: {
            input: par
        }
    })
}
export function tousersearch(par) {
    router.push({
        name: 'usersearcher',
        query: {
            input: par
        }
    })
}

export function Login(username, password) {
    return new Promise((resolve, reject) => {
        axios.post('/api/login', qs.stringify({
            username,
            password
        })).then(response => {
            resolve(response.data);
        }).catch(reason => {
            reject(reason);
        })
    })
}

export function Modify(username,oldemail, newemail) {
    return new Promise((resolve, reject) => {
        axios.post('/api/modify', qs.stringify({
            username,
            oldemail,
            newemail
        })).then(response => {
            resolve(response.data);
        }).catch(reason => {
            reject(reason);
        })
    })
}

export function Signup(username, password, email) {
    return new Promise((resolve, reject) => {
        axios.post('/api/signup', qs.stringify({
            username,
            password,
            email
        })).then(response => {
            console.log(response.data)
            resolve(response.data);
        }).catch(reason => {
            reject(reason);
        })
    })
}

export function queryuser(username) {
    return new Promise((resolve, reject) => {
        axios.post('/api/queryuser', qs.stringify({
            username,
        })).then(response => {
            // console.log(response.data)
            resolve(response.data);
        }).catch(reason => {
            reject(reason);
        })
    })
}

export function queryuserinfo(username) {
    return new Promise((resolve, reject) => {
        axios.post('/api/queryuserinfo', qs.stringify({
            username,
        })).then(response => {
            // console.log(response.data)
            resolve(response.data);
        }).catch(reason => {
            reject(reason);
        })
    })
}

import { AsyncStorage } from 'react-native'

//  要求：获取网络数据，并保存在本地，设置时限，当再次获取时先去本地获取，当时限没过时只获取本地数据，不获取网络数据

export default class FetchUtils {
    /**
    * @Description: 获取网络数据
    * @author yyl
    * @params url
    **/
    fetchNetData (url) {
        return new Promise((resolve, reject) => {
            fetch(url).then(response => {
                if (response.ok) {
                    return response.json()
                }
            }).then(responseData => {
                this.save(responseData);
                resolve(responseData)
            }).catch(error => {
                console.log(error);
                reject(error)
            })
        })
    }
    /**
    * @Description: 数据存储在本地
    * @author yyl
    * @params  url:请求地址作为key data:作为值
    **/
    save (url, data) {
        if (!data) return;
        AsyncStorage.setItem(url, FetchUtils.timeFlag(JSON.stringify(data)), (error) => {
            console.log(error);
        })
    }
    /**
    * @Description: 添加时限
    * @author yyl
    * @params
    **/
    static timeFlag (data) {
        return { data: data, timeFlag: new Date().getTime() }
    }
    /**
    * @Description: 获取本地数据
    * @author yyl
    * @params url: 获取的key
    **/
    fetchLocalData (url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, ((error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result))
                    } catch (e) {
                        reject(e)
                    }
                } else {
                    reject(e)
                }
            }))
        })
    }
    /**
    * @Description: 获取数据
    * @author yyl
    * @params url： 连接
    **/
    fetchData (url) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url).then((localData) => {
                if (!localData && FetchUtils.checkTime(localData.timeFlag)) {
                    resolve(localData.data)
                } else {
                    this.fetchNetData(url).then((netData) => {
                        resolve(netData);
                    }).catch(error => {
                        console.log(error);
                    })
                }
            }).catch(e => {
                this.fetchNetData(url).then((netData) => {
                    resolve(netData);
                }).catch(error => {
                   reject(error)
                })
            })
        })
    }
    static checkTime (time) {
        let nowTime = new Date();
        let targetTime = new Date().setTime(time)
        if (nowTime.getMonth() !== targetTime.getMonth()) return false;
        if (nowTime.getDate() !== targetTime.getDate()) return false;
        if (nowTime.getHours() - targetTime.getHours() > 2) return false
    }
}
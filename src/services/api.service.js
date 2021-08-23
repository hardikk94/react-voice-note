import Axios from 'axios'
import { host, netPrefs } from 'configs/config'
import { getParameter } from 'services/electron-storage.service'

const minutesToMs = s => {
  return s * 60000
}

// put a library if want to hide the loading
export class apiService {
  constructor() {
    this.axiosService = Axios.create({
      baseURL: `${host}/`,
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
    })
    this.intercepter()
  }
  getApi(path) {
    return new Promise(resolve => {
      this.axiosService
        .get(path, { timeout: minutesToMs(netPrefs.timeouts.typical) })
        .then(res => {
          resolve({
            message: res.data.message,
            status: res.data.status,
            statusText: 'Success',
            data: res.data.data,
            extraData: res.data,
          })
        })
        .catch(error => {
          resolve({
            message: error.message,
            status: false,
            statusText: 'Error',
            statusCode: error.response ? error.response.status : null,
          })
        })
        .then(() => {
          // here the code which should be excuted always
        })
    })
  }

  // the param largeFile, raises timeout if passed in `true`
  postApi(path, apiData, largeFile = false) {
    return new Promise(resolve => {
      this.axiosService
        .post(path, apiData, {
          timeout: largeFile
            ? minutesToMs(netPrefs.timeouts.largeFile)
            : minutesToMs(netPrefs.timeouts.typical),
        })
        .then(res => {
          resolve({
            message: res.data ? res.data.message : '',
            status: res.data.status,
            statusText: 'Success',
            data: res.data.data,
            params: apiData,
            extraData: res.data,
          })
        })
        .catch(error => {
          resolve({
            message: error.message,
            status: false,
            statusText: 'Error',
            params: apiData,
          })
        })
        .then(() => {
          // here the code which should be excuted always
        })
    })
  }

  deleteApi(path, apiData) {
    return new Promise(resolve => {
      this.axiosService
        .delete(path, apiData, {
          timeout: minutesToMs(netPrefs.timeouts.typical),
        })
        .then(res => {
          resolve({
            message: res.data.message,
            status: res.data.status,
            statusText: 'Success',
            data: res.data.data,
            extraData: res.data,
          })
        })
        .catch(error => {
          resolve({
            message: error.message,
            status: false,
            statusText: 'Error',
          })
        })
        .then(() => {
          // here the code which should be excuted always
        })
    })
  }

  putApi(path, apiData) {
    return new Promise(resolve => {
      this.axiosService
        .put(path, apiData, {
          timeout: minutesToMs(netPrefs.timeouts.typical),
        })
        .then(res => {
          resolve({
            message: res.data.message,
            status: res.data.status,
            statusText: 'Success',
            data: res.data.data,
            extraData: res.data,
          })
        })
        .catch(error => {
          resolve({
            message: error.message,
            status: false,
            statusText: 'Error',
          })
        })
        .then(() => {
          // here the code which should be excuted always
        })
    })
  }

  intercepter() {
    this.axiosService.interceptors.request.use(
      function(config) {
        let data = getParameter('userdata')

        if (data && Object.keys(data).length > 0) {
          config.headers.authorization = data.token
        }

        return config
      },
      function(error) {
        return Promise.reject(error)
      }
    )
  }
}
const api = new apiService()
export default api

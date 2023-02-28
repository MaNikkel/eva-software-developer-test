import axios, { AxiosError } from 'axios'

function apiServiceFactory() {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      console.error(error)

      return Promise.reject(error)
    },
  )

  return instance
}

const apiService = apiServiceFactory()

export { apiService }

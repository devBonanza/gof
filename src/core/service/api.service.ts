import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

axios.defaults.headers.common = {
    'Content-Type': 'application/json',
};
axios.interceptors.request.use(handleRequestInterception);
axios.interceptors.response.use(handleResponseInterception, handleResponseErrorInterception);

class ApiService {
    public baseURL: string;
    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    get(resource: string, params: object = {}, responseType?: any): any {

        return axios.get(resource, {params, responseType});
    }

    post(resource: string, body: object = {}): any {
        return axios.post(resource, body);
    }

    put(resource: string, body: object = {}): any {
        return axios.put(resource, body);
    }

    patch(resource: string, body: object = {}): any {
        return axios.patch(resource, body);
    }

    del(resource: string, params: object = {}): any {
        return axios.delete(resource, params);
    }
}

function handleRequestInterception(config: any): Promise<AxiosRequestConfig> {
    // const { dispatch } = store;
    //const authToken = localStorage.getLocalStorage('user') || localStorage.getLocalStorage('guest');
    // let {
    //     headers: { common },
    // } = config;
    // //const token = !authToken ? '' : authToken;
    // common = {
    //     ...common,
    //     Authorization: `Bearer ${token}`,
    // };
    // config.headers.common = common;
    // dispatch(
    //     httpActions.updateHttpRequestCount(1),
    // );
    return config;
}

function handleResponseInterception(response: any): AxiosResponse<any> {
    // const { dispatch } = store;
    // dispatch(
    //     httpActions.updateHttpRequestCount(-1),
    // );
    return response && response.data;
}

function handleResponseErrorInterception({response}: any): any {
    // const { dispatch } = store;
    // const exceptions = [500, 404];
    // let message, status;
    // if (!response) {
    //     message = 'Network Error! Please refresh your page.';
    // } else {
    //     message = response.data && response.data.message;
    //     status = response.status;
    // }
    const {
        status
    } = response;

    // if (status === 401) {
    //     localStorage.clearLocalStorage();
    //     dispatch(
    //         httpActions.returnError({
    //             isToasterMessage: true,
    //             status,
    //             httpMessage: {
    //                 type: 'danger',
    //                 value: `Your session has been expired.`,
    //             },
    //         }),
    //     );
    //     setTimeout(() => {
    //         window.location.href = window.location.pathname;
    //     }, 1000);
    //     return;
    // }
    //
    // dispatch(
    //     httpActions.updateHttpRequestCount(-1),
    // );
    //
    // const isToasterMessage = !exceptions.includes(Number(status));
    // const httpMessage = {
    //     type: 'danger',
    //     value: message,
    // };
    // dispatch(
    //     httpActions.returnError({
    //         isToasterMessage,
    //         status,
    //         httpMessage,
    //     }),
    // );

    throw {error: response};
}

export default ApiService;

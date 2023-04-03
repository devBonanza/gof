import ApiService from "./api.service"
import {server} from "./../data/config"

export const initResponseService = {
    sendInitResponse
}

function sendInitResponse(): any {
    let url = "";
    if (server.configGame.port === 0) {
        url = server.configGame.endpoint + server.configGame.postfixpath;
    } else {
        url = server.configGame.endpoint + ":" + server.configGame.port + server.configGame.postfixpath;
    }

    const api = new ApiService(url);
    const param = {
        "response-type": "init"
    };
    if (server.configGame.method === "get") {
        return api.get(url, param);
    }
    if (server.configGame.method === "post") {
        return api.post(url, param);
    }
}



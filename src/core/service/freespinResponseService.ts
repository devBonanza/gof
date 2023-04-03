import ApiService from "./api.service"
import {server} from "../data/config";

export const freespinResponseService = {
    sendFreeSpinResponse
}
var number = 0;

function getIncrementedInt() {
    if (number === 3) {
        number = 0;
    }
    return number++;
}

function sendFreeSpinResponse(): any {
    const randomVal = getIncrementedInt();
    const url = server.configGame.endpoint + ":" + server.configGame.port + "/freespin";
    const api = new ApiService(url);
    const param = {};
    if (server.configGame.method === "get") {
        return api.get(url, param);
    }
    if (server.configGame.method === "post") {
        return api.post(url, param);
    }
}
/**
 * Created by Ayush Kulshrestha on 18/09/2019.
 */


export const httpConstants = {
    METHOD_TYPE: {
        POST: 'POST',
        PUT: 'PUT',
        GET: 'GET',
        DELETE: 'DELETE',
    },
    CONTENT_TYPE: {
        APPLICATION_JSON: 'application/json',
        MULTIPART_FORM_DATA: 'multipart/form-data',
        APPLICATION_FORM_URLENCODED: 'application/x-www-form-urlencoded',
        IMAGE_PNG: 'image/png'
    },
    DEVICE_TYPE: {
        WEB: 'web'
    },
    API_END_POINT: {}
};

export const eventConstants = {
    CONNECT_TO_THE_SOCKET: "CONNECT_TO_THE_SOCKET",
    UPDATE_NODES: "UPDATE_NODES",
    UPDATE_TOTAL_NODES: "UPDATE_TOTAL_NODES",
    UPDATE_COUNTRIES: "UPDATE_COUNTRIES",
    UPDATE_BEST_BLOCK: "UPDATE_BEST_BLOCK",
    UPDATE_AVG_TIME: "UPDATE_AVG_TIME",
    UPDATE_LAST_BLOCK: "UPDATE_LAST_BLOCK",
    UPDATE_GAS_PRICE: "UPDATE_GAS_PRICE",
    UPDATE_AVG_RATE: "UPDATE_AVG_RATE",
    UPDATE_UP_TIME: "UPDATE_UP_TIME"
}
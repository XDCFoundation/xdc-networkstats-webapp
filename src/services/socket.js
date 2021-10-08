import io from "socket.io-client";
export default {
    connectSocket
}

async function connectSocket(){
    const socket = io.connect("wss://stats1.xinfin.network/primus/?_primuscb=1633499928674-0");

    socket.on('open', () => {
        socket.emit('ready');
        console.log('The connection has been opened.');
    })

    socket.on('end', () => {
        console.log('Socket connection ended.')
    })

    socket.on('error', (err) => {
        console.log(err);
    })

    socket.on('reconnecting', (opts) => {
        console.log('We are scheduling a reconnect operation', opts);
    })

    socket.on('data', (data) => {

    })

    socket.on('init', (data) => {

    })

    socket.on('client-latency', (data) => {

    })
}
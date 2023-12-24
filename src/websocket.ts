export const connectToServer = async () => {
    // const ws = new WebSocket('ws://192.168.132.112:7071/ws');
    // const ws = new WebSocket('ws://135.181.10.140:7071/ws');
    const ws = new WebSocket('ws://95.216.227.115:7071/ws');
    return new Promise((res, rej) => {
        const timer = setInterval(() => {
            if (ws.readyState === 1) {
                clearInterval(timer);
                res(ws);
            }
        }, 10)
    })
}

export var socket: WebSocket;

export const setSocket = (ws: any) => {
    socket = ws;
}
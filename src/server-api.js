const SERVER_API_TIMEOUT = 100;

export const ServerAPI = {
    calculate: (state) => new Promise((res) =>
        setTimeout(() => {
            const result = eval(state.firstElement + state.operation + state.secondElement)
            return res({result});
        }, SERVER_API_TIMEOUT)),
};
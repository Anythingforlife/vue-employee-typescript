export const sharedSerivce = {
    cloneObject,
};

function cloneObject(data: any) {
    return JSON.parse(JSON.stringify(data));
}

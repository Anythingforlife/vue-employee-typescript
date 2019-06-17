import { Subject } from 'rxjs';

export const sharedSerivce = {
    showHideLoader,
    cloneObject,
    toggleLoader: new Subject(),
};

function showHideLoader(show: boolean) {
    sharedSerivce.toggleLoader.next(show);
}

function cloneObject(data: any) {
    return JSON.parse(JSON.stringify(data));
}

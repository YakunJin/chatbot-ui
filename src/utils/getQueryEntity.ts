export default function getQuery<T>(): T {
    let url = window.location.search || window.location.hash;
    let theRequest:any = {};
    if (url.indexOf("?") !== -1) {
        let str = url.split("?")[1];
        let strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest as T;
}
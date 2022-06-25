export default function<F extends Function>(cb: F, wait = 1000) {
    let h = 0;
    let callable = (...args: any) => {
        clearTimeout(h);
        h = setTimeout(() => cb(...args), wait);
    };
    return <F>(<any>callable);
}
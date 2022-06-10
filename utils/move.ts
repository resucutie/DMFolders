export default function (arr: any[] | Object, from: number, to: number) {
    if(Array.isArray(arr)) {
        return moveArray(arr, from, to)
    } else if (typeof arr === "object") {
        return moveObjectKey(arr, from, to)
    }
}

export function moveObjectKey(object: Object, from: number | string, to: number): Object {
    if(typeof from === "string") {
        from = Object.keys(object).findIndex(key => key === from)
    }

    const changedOrder = moveArray(Object.entries(object), from, to)
    const newObj: Object = changedOrder.reduce((acc, [key, value]) => {
        acc[key] = value
        return acc
    }, {})
    return newObj
}

export function moveArray(arr: any[], from: number, to: number) {
    let safeArr = arr
    safeArr.splice(to, 0, safeArr.splice(from, 1)[0])
    return safeArr
}
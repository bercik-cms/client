export function toClassNames(classNames: { [name: string]: boolean; }) {
    let arr = [];
    for (let [key, val] of Object.entries(classNames)) {
        if (val) arr.push(key);
    }
    return arr.join(" ");
}
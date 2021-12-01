import { SelectOptionInterface } from "../BercikSelect";

export function fuzzySearchSingle(needle: string, haystack: string) {
    let hlen = haystack.length;
    let nlen = needle.length;

    if (nlen > hlen) {
        return false;
    }

    if (nlen === hlen) {
        return needle === haystack;
    }

    outer: for (let i = 0, j = 0; i < nlen; i++) {
        let nch = needle.charCodeAt(i);

        while (j < hlen) {
            if (haystack.charCodeAt(j++) === nch) {
                continue outer;
            }
        }

        return false;
    }

    return true;
}

export function fuzzySearch(query: string, options: Array<string>) {
    return options.filter(
        option => fuzzySearchSingle(query, option)
    );
}

export function fuzzySearchSelectOptions(query: string, options: Array<SelectOptionInterface>) {
    return options.filter(
        option => fuzzySearchSingle(query, option.label)
    );
}


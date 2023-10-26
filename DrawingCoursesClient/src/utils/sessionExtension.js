
export const setTitem = (name, item) => {
    sessionStorage.setItem(name, JSON.stringify(item));
}

export const getTitem = (name) => {
    const itemStr = sessionStorage.getItem(name);
    return JSON.parse(itemStr)
}
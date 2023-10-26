export const setTitem = (name, item) => {
    localStorage.setItem(name, JSON.stringify(item));
}

export const getTitem = (name) => {
    const itemStr = localStorage.getItem(name);
    return JSON.parse(itemStr)
}
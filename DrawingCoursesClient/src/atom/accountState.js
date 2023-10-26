import { atom } from "recoil";

export const accountState = atom({
    key: "account",
    default: undefined
})

export const toolCartState = atom({
    key: "toolCart",
    default: []
})

export const courseCartState = atom({
    key: "courseCart",
    default: []
})

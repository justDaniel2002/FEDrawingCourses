import { atom } from "recoil";
import { tryGetAccount } from "../utils/util";

export const accountState = atom({
    key: "account",
    default: tryGetAccount()
})

export const toolCartState = atom({
    key: "toolCart",
    default: []
})

export const courseCartState = atom({
    key: "courseCart",
    default: []
})

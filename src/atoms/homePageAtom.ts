import {atom} from "recoil";

export interface IPage {
    page: number
};

const defaultHomePage:IPage = {
    page: 1,
};

export const defaultAtomPage = atom({
    key: "defaultAtomPage",
    default: defaultHomePage
}) 
import { atom } from 'recoil';

export type IUserList = string[]; 

const defaultUserList: IUserList = [];

export const defaultAtomUserList = atom<IUserList>({
	key: 'defaultAtomUserList',
	default: defaultUserList,
});

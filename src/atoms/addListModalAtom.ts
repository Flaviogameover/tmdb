import { atom } from 'recoil';

export interface IAddListModal {
	isOpen: boolean;
}

export interface IListInfo {
	title: string; 
	image: string; 
	id: string | number;
	type: string;
}

const defaultAddListModalState: IAddListModal = {
	isOpen: false,
};

export const defaultListInfoState: IListInfo = {
	id: '',
	image: '',
	title: '',
	type: '',
};

export const defaultAtomAddListModal = atom({
	key: 'defaultAtomAddListModal',
	default: defaultAddListModalState,
});

export const defaultAtomListInfo = atom({
	key: 'defaultAtomListInfo',
	default: defaultListInfoState,
});

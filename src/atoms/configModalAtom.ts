import { atom } from 'recoil';

type ConfigModalAtom = {
	isOpen: boolean;
};

export const defaultAtomConfigModal = atom<ConfigModalAtom>({
	key: 'configModalAtom',
	default: {
		isOpen: false,
	},
});

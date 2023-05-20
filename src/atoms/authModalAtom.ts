import { atom } from 'recoil';

export interface IAuthModal {
	isOpen: boolean;
	type: 'login' | 'signup' | 'reset';
}

const defaultAuthModalState: IAuthModal = {
	isOpen: false,
	type: 'login',
};

export const defaultAtomAuthModal = atom({
	key: 'defaultAtomAuthModal',
	default: defaultAuthModalState,
});

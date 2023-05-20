import { atom } from 'recoil';

export interface IReviewModal {
	isOpen: boolean;
	titleId: string | number;
	titleType: string;
	poster_path: string;
	titleName: string;
	uid: string;
	modalType: 'post' | 'edit';
}

export const defaultAtomReviewModal = atom<IReviewModal>({
	key: 'defaultAtomReviewModal',
	default: {
		isOpen: false,
		titleId: '',
		titleType: '',
		poster_path: '',
		titleName: '',
		uid: '',
		modalType: 'post',
	},
});

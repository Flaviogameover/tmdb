import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';

export type TReview = {
	titleId: number | string;
	titleType: string;
	username: string;
	review: string;
	stars: number;
	createdAt: Timestamp;
	uid: string;
	id: string;
	uniqueId?: string;
};

export type TUserReview = {
	stars: number;
	review: string;
	docId: string;
};

const defaultUserReview: TUserReview = {
	stars: 1,
	review: '',
	docId: '',
};

export const defaultAtomUserReviews = atom<TReview[]>({
	key: 'defaultAtomUserReviews',
	default: [],
});

export const defaultAtomUserReview = atom<TUserReview>({
	key: 'defaultAtomUserReview',
	default: defaultUserReview,
});

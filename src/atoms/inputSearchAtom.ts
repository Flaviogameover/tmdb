import { atom } from 'recoil';

interface ISearchInput {
	query: string;
}

const defaultSearchState: ISearchInput = {
	query: '',
};

export const defaultAtomSearchInput = atom({
	key: 'defaultAtomSearchInput',
	default: defaultSearchState,
});

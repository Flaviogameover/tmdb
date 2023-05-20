import { atom } from 'recoil';

export interface IGenres {
	movie: IGenre[];
	tv: IGenre[];
}

export interface IGenre {
	id: number | string;
	name: string;
}

const defaultGenreState: IGenres = {
	movie: [],
	tv: [],
};

export const defaultAtomGenre = atom({
	key: 'defaultAtomGenre',
	default: defaultGenreState,
});

import { atom } from 'recoil';

export interface ISearchResult {
	page: number;
	results: ITitleResult[];
	total_pages: number;
	total_results: number;
}

export interface ITitleResult {
	poster_path?: null | string;
	popularity: number;
	id: number;
	overview?: string;
	backdrop_path?: null | string;
	vote_average?: number;
	media_type: 'movie' | 'tv' | 'person' | '';
	first_air_date?: string;
	origin_country?: string[];
	genre_ids?: number[];
	vote_count?: number;
	name?: string;
	original_name?: string;
	adult?: boolean;
	release_date?: string;
	original_title?: string;
	title?: string;
	video?: boolean;
	profile_path?: null | string;
	known_for?: ITitleResult[];
	original_language: string;
}

export const defaultSearchResult: ISearchResult = {
	page: 0,
	results: [],
	total_pages: 0,
	total_results: 0,
};

export const defaultTitleResult: ITitleResult = {
	poster_path: '',
	adult: false,
	overview: '',
	release_date: '',
	genre_ids: [],
	id: 0,
	original_title: '',
	original_language: '',
	title: '',
	backdrop_path: null,
	popularity: 0,
	vote_count: 0,
	video: false,
	vote_average: 0,
	media_type: '',
	name: '',
	original_name: '',
	first_air_date: '',
	origin_country: [],
	profile_path: null,
	known_for: [],
};

export const defaultAtomSearchResult = atom({
	key: 'defaultAtomSearchResult',
	default: defaultSearchResult,
});

export const defaultAtomTitleResult = atom({
	key: 'defaultAtomTitleResult',
	default: defaultTitleResult,
});

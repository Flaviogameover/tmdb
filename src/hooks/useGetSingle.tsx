import { IGenre } from '@/atoms/genresAtom';
import { ISearchResult } from '@/atoms/titlesAtom';
import axios from 'axios';
import useSwr from 'swr';

export interface ICastCrew {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: Department;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: null | string;
	cast_id?: number;
	character?: string;
	credit_id: string;
	order?: number;
	department?: Department;
	job?: string;
}

export enum Department {
	Acting = 'Acting',
	Art = 'Art',
	Camera = 'Camera',
	CostumeMakeUp = 'Costume & Make-Up',
	Crew = 'Crew',
	Directing = 'Directing',
	Editing = 'Editing',
	Lighting = 'Lighting',
	Production = 'Production',
	Sound = 'Sound',
	VisualEffects = 'Visual Effects',
	Writing = 'Writing',
}

export interface ICredits {
	cast: ICastCrew[];
	crew: ICastCrew[];
}

export interface IImages {
	backdrops: Backdrop[];
	posters: Backdrop[];
}

export interface Backdrop {
	aspect_ratio: number;
	file_path: string;
	height: number;
	iso_639_1: null | string;
	vote_average: number;
	vote_count: number;
	width: number;
}

export interface IVideos {
	results: Result[];
}

export interface Result {
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	key: string;
	site: string;
	size: number;
	type: string;
	official: boolean;
	published_at: string;
	id: string;
}

export interface ITitleSingle {
	credits: ICredits;
	similar: ISearchResult;
	recommendations: ISearchResult;
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: IBelongsCollection;
	budget: number;
	genres: IGenre[];
	homepage: string;
	id: number;
	images: IImages;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: null;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	title: string;
	name?: string;
	video: boolean;
	videos: IVideos;
	vote_average: number;
	vote_count: number;
	'watch/providers': IProviders;
}

export type IProviders = {
	results: BR;
};

export type BR = {
	BR: types;
};

export type types = {
	link: string;
	flatrate?: Buy[];
	rent?: Buy[];
	buy: Buy[];
};

export type Buy = {
	display_priority: number;
	logo_path: string;
	provider_id: number;
	provider_name: string;
};

export type IBelongsCollection = {
	id: number;
	name: string;
	poster_path: string;
	backdrop_path: string;
};

export interface ProductionCompany {
	id: number;
	logo_path: null | string;
	name: string;
	origin_country: string;
}

export interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

export interface SpokenLanguage {
	iso_639_1: string;
	name: string;
}

type TUseGetSingle = {
	url: string;
	type: string;
};

type TUseGetSingleReturn = {
	item: ITitleSingle | undefined;
	error: any;
	isLoading: boolean;
};

const fetcher = async ({ url, type }: TUseGetSingle) => {
	if (!url) return;
	try {
		const api = axios.create({
			baseURL: process.env.NEXT_PUBLIC_API_URL,
		});

		const { data } = await api.get<ITitleSingle>(`/${type}/${url}`, {
			params: {
				api_key: process.env.NEXT_PUBLIC_API_KEY,
				append_to_response:
					'credits,images,recommendations,similar,videos,watch/providers',
				include_adult: true,
				language: 'pt-BR',
			},
		});
		return {
			...data,
			credits: {
				...data.credits,
				cast: data.credits.cast.filter(
					(item, index, self) =>
						index === self.findIndex((t) => t.id === item.id)
				),
				crew: data.credits.crew.filter(
					(item, index, self) =>
						index === self.findIndex((t) => t.id === item.id)
				),
			},
		};
	} catch (error: any) {
		throw new Error('Erro interno ao carregar o título :(');
	}
};
const useGetSingle = ({ url, type }: TUseGetSingle): TUseGetSingleReturn => {
	const { data, isLoading, error } = useSwr(
		{
			url,
			type,
		},
		fetcher
	);

	return {
		item: data,
		isLoading,
		error,
	};
};

export default useGetSingle;

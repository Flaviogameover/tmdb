import axios from 'axios';
import useSwr from 'swr';

type TUseGetPerson = {
	url: string;
	adult: boolean;
};

export interface IPerson {
	adult: boolean;
	also_known_as: string[];
	biography: string;
	birthday: string;
	deathday: null;
	gender: number;
	homepage: null;
	id: number;
	imdb_id: string;
	known_for_department: string;
	name: string;
	place_of_birth: string;
	popularity: number;
	profile_path: string;
	images: Images;
	combined_credits: CombinedCredits;
}

export interface CombinedCredits {
	cast: Cast[];
	crew: Cast[];
}

export interface Cast {
	adult: boolean;
	backdrop_path: null | string;
	genre_ids: number[];
	id: number;
	original_title?: string;
	overview: string;
	popularity: number;
	poster_path: null | string;
	profile_path: null | string;
	release_date?: string;
	title?: string;
	video?: boolean;
	vote_average: number;
	vote_count: number;
	character: string;
	credit_id: string;
	order?: number;
	media_type: MediaType;
	original_name?: string;
	first_air_date?: string;
	name?: string;
	episode_count?: number;
	department?: string;
	job?: string;
}

export enum MediaType {
	Movie = 'movie',
	Tv = 'tv',
}

export interface Images {
	profiles: Profile[];
}

export interface Profile {
	aspect_ratio: number;
	height: number;
	iso_639_1: null;
	file_path: string;
	vote_average: number;
	vote_count: number;
	width: number;
}

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});
const fetcher = async (par: TUseGetPerson) => {
	try {
		const { url, adult } = par;
		const { data } = await api.get<IPerson>(`/person/${url}`, {
			params: {
				api_key: process.env.NEXT_PUBLIC_API_KEY,
				include_adult: adult,
				append_to_response: 'images,combined_credits',
				language: 'pt-BR',

			},
		});
		return {
			...data,
			combined_credits: {
				...data.combined_credits,
				cast: data.combined_credits.cast.filter((item) => {
					if (adult) {
						return item;
					}
					return item.adult === false;
				}),
				crew: data.combined_credits.crew.filter((item) => {
					if (adult) {
						return item;
					}
					return item.adult === false;
				}),
			},
		};
	} catch (error) {
		throw new Error("Erro ao buscar dados deste artista :(");
	}
};
const useGetPerson = ({ url, adult }: TUseGetPerson) => {
	const { data, error, isLoading } = useSwr(
		{
			url,
			adult,
		},
		fetcher
	);

	return {
		person: data,
		error,
		isLoading,
	};
};

export default useGetPerson;

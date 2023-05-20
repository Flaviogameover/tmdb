import axios from 'axios';
import useSWR from 'swr';

type TUseCollection = {};

export type ICollection = {
	id: number;
	name: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string;
	parts: IPart[];
};

export type IPart = {
	adult: boolean;
	backdrop_path: null;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	release_date: Date;
	poster_path: string;
	popularity: number;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const fetcher = async (url: string) => {
	try {
		const { data } = await api.get<ICollection>(url, {
			params: {
				api_key: process.env.NEXT_PUBLIC_API_KEY,
				language: 'pt-BR',
			},
		});

		return data;
	} catch (error) {
		throw new Error('Erro interno ao carregar a coleção :(');
	}
};

const useCollection = (id: number | string) => {
	const { data, error, isLoading } = useSWR(`/collection/${id}`, fetcher);

	return {
		titleCollection: data,
		error,
		isLoading,
	};
};
export default useCollection;

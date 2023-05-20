import { ISearchResult } from '@/atoms/titlesAtom';
import axios from 'axios';
import useSwr from 'swr';

type TUseFetch = {};

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

interface IUrl {
	type?: string;
	media?: string;
}

interface IParams {
	page?: string | number;
	language?: string;
	list?: string;
	query?: string;
	genre?: string | number;
	title_id?: string | number;
	pid?: string | number;
	adult: boolean;
}

interface IFetcher {
	url: IUrl;
	params: IParams;
}

const fetcher = async (options: {
	url: string;
	params: IParams;
}): Promise<ISearchResult | undefined> => {
	const { url, params } = options;
	try {
		const { data } = await api.get<ISearchResult>(url, {
			params: {
				...params,
				api_key: process.env.NEXT_PUBLIC_API_KEY,
				language: 'pt-BR',
			},
		});
		return data;
	} catch (error) {
		throw new Error('Erro interno ao prosseguir com a busca :(');
	}
};
const useFetch = (par: IFetcher) => {
	const formatUrl = () => {
		const { url, params } = par;
		if (url.media === 'search') {
			const { page, query, adult } = params;
			return {
				url: `/search/multi`,
				params: {
					query,
					page,
					include_adult: adult,
				},
			};
		}
		if (url.media === 'genre') {
			const { page, genre, adult } = params;
			return {
				url: `/discover/${url.type}`,
				params: {
					with_genres: genre,
					page,
					include_adult: adult,
				},
			};
		}

		if (url.media === 'similar') {
			const { page, title_id, pid, adult } = params;
			return {
				url: `/${url.type}/${title_id}/similar`,
				params: {
					page: params.page || 1,
					include_adult: adult,
				},
			};
		}

		if (url.media === 'recommendations') {
			const { page, title_id, pid, adult } = params;
			return {
				url: `/${url.type}/${title_id}/recommendations`,
				params: {
					page: params.page || 1,
					include_adult: adult,
				},
			};
		}
		return {
			url: '/movie/upcoming',
			params: {
				page: params.page || 1,
			},
		};
	};

	const { data, error, isLoading, mutate } = useSwr(formatUrl, fetcher);

	return {
		titles: data,
		error,
		isLoading,
		mutate,
	};
};

export default useFetch;

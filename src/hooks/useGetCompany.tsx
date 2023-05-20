import { ISearchResult } from '@/atoms/titlesAtom';
import axios from 'axios';
import useSwr from 'swr';

export interface ICompany {
	description: string;
	headquarters: string;
	homepage: string;
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
	parent_company: null;
}

type IParams = {
	id: string | number;
	type: string;
	page: string | number;
};

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const fetcher = async ({
	url,
	discover,
	page,
	id,
}: {
	url: string;
	discover: string;
	page: string | number;
	id: string | number;
}) => {
	try {
		const [company, company_titles] = await Promise.all([
			api.get<ICompany>(url, {
				params: {
					api_key: process.env.NEXT_PUBLIC_API_KEY,
					include_adult: true,
					language: 'pt-BR',
				},
			}),
			api.get<ISearchResult>(discover, {
				params: {
					api_key: process.env.NEXT_PUBLIC_API_KEY,
					include_adult: true,
					with_companies: id,
					page,
					language: 'pt-BR',
				},
			}),
		]);

		return {
			company: company.data,
			company_titles: company_titles.data,
		};
	} catch (error) {
		throw new Error('Erro ao buscar os títulos dessa produtora :(');
	}
};

const useGetCompany = ({ id, type, page }: IParams) => {
	const { data, error, isLoading } = useSwr(
		{
			url: `/company/${id}`,
			discover: `/discover/${type}`,
			page: page || 1,
			id,
		},
		fetcher
	);

	return {
		data,
		error,
		isLoading,
	};
};

export default useGetCompany;

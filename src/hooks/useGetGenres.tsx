import { defaultAtomGenre, IGenres } from '@/atoms/genresAtom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import useSwr from 'swr';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const fetcher = async ({
	url,
	setGenreAtom,
}: {
	url: string;
	setGenreAtom: (value: IGenres) => void;
}) => {
	try {
		const [movie, tv] = await Promise.all([
			api.get(`${url}movie/list`, {
				params: {
					api_key: process.env.NEXT_PUBLIC_API_KEY,
					language: 'pt-BR',
				},
			}),
			api.get(`${url}tv/list`, {
				params: {
					api_key: process.env.NEXT_PUBLIC_API_KEY,
					language: 'pt-BR',
				},
			}),
		]);

		const genres = {
			movie: movie.data.genres,
			tv: tv.data.genres,
		};
		setGenreAtom(genres);
		return genres;
	} catch (error) {
		return;
	}
};

const useGetGenres = (media: 'genre') => {
	const setGenreAtom = useSetRecoilState(defaultAtomGenre);

	const { data, error, isLoading, mutate } = useSwr(
		{
			url: `/${media}/`,
			setGenreAtom,
		},
		fetcher
	);

	return {
		data,
		error,
		isLoading,
		mutate,
	};
};
export default useGetGenres;

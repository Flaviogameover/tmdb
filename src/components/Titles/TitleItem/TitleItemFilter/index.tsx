import { IGenres } from '@/atoms/genresAtom';
import { ITitleResult } from '@/atoms/titlesAtom';
import { Text } from '@chakra-ui/react';

type TTitleItemFilter = {
	genres: IGenres;
	media: string;
	handleClickCategory: (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		genre_id: number | string
	) => void;
	title: ITitleResult;
};

const TitleItemFilter: React.FC<TTitleItemFilter> = ({
	genres,
	media,
	handleClickCategory,
	title,
}) => {
	return (
		<>
			{genres[media as keyof IGenres]?.map((genre) => {
				if (title.genre_ids!.includes(genre.id as number)) {
					return (
						<Text
							key={genre.id}
							px={1}
							cursor={'pointer'}
							_hover={{
								textDecoration: 'underline',
							}}
							onClick={(e) => handleClickCategory(e, genre.id)}
						>
							{genre.name}
						</Text>
					);
				}
			})}
		</>
	);
};

export default TitleItemFilter;

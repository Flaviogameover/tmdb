import { defaultAtomGenre } from '@/atoms/genresAtom';
import { ITitleResult } from '@/atoms/titlesAtom';
import { defaultAtomUserList } from '@/atoms/userListAtom';
import AddButton from '@/components/AddButton';
import FallbackImage from '@/components/FallbackImage';
import TitleItemFilter from '@/components/Titles/TitleItem/TitleItemFilter';
import { auth } from '@/firebase/clientApp';
import { Cast } from '@/hooks/useGetPerson';
import useMyList from '@/hooks/useMyList';
import { Flex, Image, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';

type TTitleItem = {
	title: ITitleResult | Cast;
};

const TitleItem: React.FC<TTitleItem> = ({ title }) => {
	const { shortTitle, getImage } = useMyList();
	const useGenreAtom = useRecoilValue(defaultAtomGenre);
	const useUserList = useRecoilValue(defaultAtomUserList);
	const { addToList, isLoading } = useMyList();
	const [user] = useAuthState(auth);
	const router = useRouter();
	const { type } = router.query;
	const isPerson = title.media_type === 'person';

	const handleClickPoster = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		e.stopPropagation();
		if (!isPerson)
			router.push({
				pathname: `/title/${title.id}`,
				query: {
					type: title.media_type || type || 'movie',
				},
			});
	};

	const handleClickCategory = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		genre_id: number | string
	) => {
		e.stopPropagation();
		router.push({
			pathname: '/',
			query: {
				type: title.media_type || type || 'movie',
				media: 'genre',
				genre: genre_id,
			},
		});
	};

	const handleClickAdd = async (
		e: React.MouseEvent<SVGSVGElement, MouseEvent>
	) => {
		e.stopPropagation();
		addToList(
			e,
			title.id,
			title.media_type || (type as string) || 'movie',
			user!,
			title.title! || title.name!,
			title.poster_path! || title.profile_path!
		);
	};

	return (
		<>
			<Flex
				position={'relative'}
				direction={'column'}
				w={'200px'}
				bg={'gray.800'}
				borderRadius={'5px'}
				overflow={'hidden'}
				p={1}
				border={'1px solid'}
				onClick={handleClickPoster}
				cursor={'pointer'}
				_hover={{
					border: '1px solid',
					borderColor: 'gray.600',
				}}
			>
				<AddButton
					isLoading={isLoading}
					inList={useUserList.includes(
						`${title.id}${title.media_type || type || 'movie'}`
					)}
					handleClickAdd={handleClickAdd}
					user={user}
				/>

				<Image
					src={getImage(
						'w500',
						!isPerson ? title.poster_path! : title.profile_path!
					)}
					alt={
						title.media_type !== 'movie' ? title.name : title.title
					}
					borderRadius={'5px'}
					w={'100%'}
					h={'250px'}
					fallback={<FallbackImage w={'100%'} h={'250px'} />}
				/>

				<Stack
					justify={'space-between'}
					align={'center'}
					color={'gray.200'}
					p={2}
				>
					<Flex
						direction={'column'}
						textAlign={'center'}
						justify={'center'}
						align={'center'}
					>
						<Text fontSize={'1em'}>
							{shortTitle(
								title.name ||
									title.title ||
									title.original_title ||
									title.original_name!
							)}
						</Text>
						{!isPerson && (
							<>
								<Text fontSize={'0.9em'}>{`(${
									title[
										type === 'tv'
											? 'first_air_date'
											: 'release_date'
									]?.split('-')[0]
								})`}</Text>
							</>
						)}
					</Flex>
					{!isPerson &&
						!!useGenreAtom.movie.length &&
						!!useGenreAtom.tv.length && (
							<Flex
								align={'center'}
								fontSize={'9pt'}
								justify={'center'}
								wrap={'wrap'}
							>
								<TitleItemFilter
									genres={useGenreAtom}
									handleClickCategory={handleClickCategory}
									media={type === 'tv' ? 'tv' : 'movie'}
									title={title as ITitleResult}
								/>
							</Flex>
						)}
				</Stack>
			</Flex>
		</>
	);
};
export default TitleItem;

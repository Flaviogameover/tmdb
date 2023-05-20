import { defaultAtomGenre } from '@/atoms/genresAtom';
import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilValue } from 'recoil';

const CustomBanner: React.FC = () => {
	const router = useRouter();
	const useGenreAtom = useRecoilValue(defaultAtomGenre);
	const { media, query } = router.query;
	const handleBannerInfo = () => {
		if (media === 'similar') return 'Similar';
		if (media === 'recommendations') return 'Recomendados';
		if (media === 'genre') {
			if (router.query.type === 'tv') {
				return `Gênero ${
					useGenreAtom.tv.find(
						(item) => item.id === Number(router.query.genre)
					)?.name
				}`;
			}
			return `Gênero ${
				useGenreAtom.movie.find(
					(item) => item.id === Number(router.query.genre)
				)?.name
			}`;
		}
		if (media === 'search') return `Resultados para "${query}"`;
	};

	if (!media) return <></>;

	return (
		<Flex p={5} justify={'center'} align={'center'}>
			<Text fontSize={'2xl'} fontWeight={'bold'} color={'gray.100'}>
				{handleBannerInfo()}
			</Text>
		</Flex>
	);
};
export default CustomBanner;

import { defaultAtomUserInfo } from '@/atoms/userInfoAtom';
import BannerHomeItem from '@/components/Titles/BannerHome/BannerHomeItem';
import useFetch from '@/hooks/useFetch';
import { Box, Flex } from '@chakra-ui/react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';
import { useRecoilValue } from 'recoil';
import TitleLoader from '../TitleLoader/index';

const BannerHome: React.FC = () => {
	const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
	const { adult } = useRecoilValue(defaultAtomUserInfo);
	const { titles, error, isLoading } = useFetch({
		url: {
			type: 'movie',
			media: 'upcoming',
		} as {
			type: string;
			media: string;
		},
		params: {
			page: 1,
			adult,
		},
	});

	if (isLoading)
		return (
			<Flex
				w="100%"
				h={{ base: '200px', md: '300px', lg: '400px' }}
				borderBottom={'1px solid'}
				borderColor={'gray.700'}
			>
				<TitleLoader />
			</Flex>
		);

	return (
		<Flex
			w="100%"
			h={{ base: '200px', md: '300px', lg: '400px' }}
			overflow={'hidden'}
			className="embla"
			position={'relative'}
		>
			<Box className="embla__viewport" ref={emblaRef} w={'100%'}>
				<Box className="embla__container" w={'100%'} h={'100%'}>
					{titles?.results.slice(0, 4).map((item, index) => (
						<BannerHomeItem key={index} infos={item} />
					))}
				</Box>
			</Box>
		</Flex>
	);
};
export default BannerHome;

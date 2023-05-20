import { ITitleResult } from '@/atoms/titlesAtom';
import useMyList from '@/hooks/useMyList';
import { ViewOffIcon } from '@chakra-ui/icons';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

type TBannerHomeItem = {
	infos: ITitleResult;
};

const BannerHomeItem: React.FC<TBannerHomeItem> = ({ infos }) => {
	const { getImage } = useMyList();
	if (!infos)
		return (
			<Box className="embla__slide" w={'100%'}>
				<Image
					alt="Banner Home"
					w={'100%'}
					objectFit="cover"
					fallback={
						<Flex w={'100%'} justify={'center'} align={'center'}>
							<ViewOffIcon color={'gray.500'} fontSize={'25pt'} />
						</Flex>
					}
				/>
			</Box>
		);

	return (
		<Box className="embla__slide" w={'100%'}>
			<Image
				src={getImage('original', infos.backdrop_path!)}
				alt="Banner Home"
				w={'100%'}
				h={'100%'}
				objectFit="cover"
				fallback={
					<Flex w={'100%'} justify={'center'} align={'center'}>
						<ViewOffIcon color={'gray.500'} fontSize={'25pt'} />
					</Flex>
				}
			/>
			<Box
				position="absolute"
				bottom="0"
				left="0"
				w="100%"
				h="100%"
				bgGradient="linear(to-b, transparent, rgba(0,0,0,0.75))"
				zIndex={1}
			>
				<Flex
					direction={'column'}
					justify={'flex-end'}
					w="100%"
					h="100%"
					align="center"
					p={10}
				>
					<Text
						fontSize={{ base: '1.5rem', md: '2rem', lg: '3rem' }}
						fontWeight={'bold'}
						color={'white'}
					>
						{infos.title}
					</Text>
					<Text
						color={'white'}
						fontSize={'12pt'}
						mt={4}
						maxW={'55%'}
						textAlign={'center'}
						display={{ base: 'none', lg: 'block' }}
					>
						{infos.overview}
					</Text>
				</Flex>
			</Box>
		</Box>
	);
};
export default BannerHomeItem;

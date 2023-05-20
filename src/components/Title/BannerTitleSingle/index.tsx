import { defaultAtomUserList } from '@/atoms/userListAtom';
import AddButton from '@/components/AddButton';
import FallbackImage from '@/components/FallbackImage';
import { auth } from '@/firebase/clientApp';
import { ITitleSingle } from '@/hooks/useGetSingle';
import useMyList from '@/hooks/useMyList';
import { Box, Flex, Image, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';

type TBannerHomeItem = {
	title: ITitleSingle;
};

const BannerTitleSingle: React.FC<TBannerHomeItem> = ({ title }) => {
	const useUserList = useRecoilValue(defaultAtomUserList);
	const [user] = useAuthState(auth);
	const { addToList, isLoading, getImage } = useMyList();
	const router = useRouter();
	const { type } = router.query;

	const handleClickAdd = async (
		e: React.MouseEvent<SVGSVGElement, MouseEvent>
	) => {
		e.stopPropagation();
		addToList(
			e,
			title.id,
			(type as string) || 'movie',
			user!,
			title.title! || title.name!,
			title.poster_path!
		);
	};

	return (
		<Box w="100%" h={{ base: 'auto', lg: '500px' }} zIndex={1}>
			<Box
				backgroundImage={`url(${getImage(
					'original',
					title.backdrop_path
				)})`}
				w={'100%'}
				h={'100%'}
				bgPosition={'center'}
				bgRepeat={'no-repeat'}
				bgSize={'cover'}
			>
				<Flex
					bottom="0"
					left="0"
					w="100%"
					h="100%"
					align={'center'}
					bgGradient="linear(to-b, transparent, rgba(0,0,0,0.75))"
					zIndex={1}
					justify={{ base: 'center', lg: 'flex-start' }}
					direction={{ base: 'column', lg: 'row' }}
					p={5}
				>
					<Flex
						direction={'column'}
						align={'center'}
						justify={'center'}
						pl={{ base: 0, lg: 10 }}
						gap={2}
						w={'30%'}
					>
						<Image
							src={getImage('w500', title.poster_path)}
							alt={type !== 'movie' ? title.name : title.title}
							borderRadius={'5px'}
							minW={'170px'}
							h={'250px'}
							fallback={<FallbackImage w={'100%'} h={'250px'} />}
						/>
						{title['watch/providers']?.results.BR && (
							<Flex
								gap={2}
								justify={'center'}
								align={'center'}
								w={'100%'}
							>
								{title[
									'watch/providers'
								].results.BR.flatrate?.map((item) => (
									<Image
										key={item.provider_id}
										src={getImage(
											'original',
											item.logo_path
										)}
										alt={item.provider_name}
										w={'30px'}
										h={'30px'}
										border={'1px solid'}
										borderColor={'gray.500'}
										fallback={
											<FallbackImage
												w={'30px'}
												h={'30px'}
											/>
										}
									/>
								))}
							</Flex>
						)}
					</Flex>
					<Flex
						direction={'column'}
						justify={'center'}
						align={{ base: 'center', lg: 'flex-start' }}
						w="100%"
						p={{ base: 5, lg: 10 }}
						textAlign={{ base: 'center', lg: 'left' }}
					>
						<Box>
							<Text
								fontSize={'4em'}
								fontWeight={'bold'}
								color={'white'}
								display={{ base: 'none', lg: 'block' }}
							>
								{title.title || title.name}
							</Text>
							{title.tagline && (
								<Text
									fontSize={'2em'}
									color={'white'}
									fontStyle={'italic'}
								>
									{`"${title.tagline}"`}
								</Text>
							)}

							{!!title.genres?.length && (
								<Box fontSize={'1em'} color={'white'}>
									Gêneros:
									<Stack
										direction={'row'}
										flexWrap={'wrap'}
										justify={{
											base: 'center',
											lg: 'flex-start',
										}}
										gap={2}
										p={2}
									>
										{title.genres.map((genre) => (
											<Text
												key={genre.id}
												fontSize={'1em'}
												color={'white'}
												cursor={'pointer'}
												_hover={{
													textDecoration: 'underline',
												}}
												onClick={() =>
													router.push({
														pathname: '/',
														query: {
															type: router.query
																.type,
															media: 'genre',
															genre: genre.id,
														},
													})
												}
											>
												{genre.name}
											</Text>
										))}
									</Stack>
								</Box>
							)}
							{!!title.production_companies?.length && (
								<Box fontSize={'1em'} color={'white'}>
									Produced by:
									<Stack
										direction={'row'}
										flexWrap={'wrap'}
										justify={{
											base: 'center',
											lg: 'flex-start',
										}}
										gap={2}
										p={2}
									>
										{title.production_companies.map(
											(item) => (
												<Text
													key={item.id}
													cursor={'pointer'}
													fontSize={'1em'}
													_hover={{
														textDecoration:
															'underline',
													}}
													onClick={() =>
														router.push({
															pathname: `/company/${item.id}`,
															query: {
																type: router
																	.query.type,
															},
														})
													}
												>
													{item.name}
												</Text>
											)
										)}
									</Stack>
								</Box>
							)}
						</Box>
					</Flex>
					<Flex
						direction={'column'}
						w={'100%'}
						justify={{ base: 'center', lg: 'flex-end' }}
						alignItems={{ base: 'center', lg: 'flex-end' }}
						color={'white'}
						fontSize={'25pt'}
						h={{ base: 'auto', lg: '100%' }}
						p={5}
					>
						<AddButton
							isLoading={isLoading}
							inList={useUserList.includes(
								`${title.id}${type || 'movie'}`
							)}
							handleClickAdd={handleClickAdd}
							user={user}
						/>
					</Flex>
				</Flex>
			</Box>
		</Box>
	);
};
export default BannerTitleSingle;

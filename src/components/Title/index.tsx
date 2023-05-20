import { defaultAtomUserReviews } from '@/atoms/userReviewsAtom';
import TabOptions from '@/components/Title/TabOptions';
import TitleDetails from '@/components/Title/TitleDetails';
import InputReview from '@/components/Title/TitleDetails/InputReview';
import TitleReviews from '@/components/Title/TitleDetails/TitleReviews';
import UserReviews from '@/components/Title/UserReviews';
import { auth } from '@/firebase/clientApp';
import { ITitleSingle } from '@/hooks/useGetSingle';
import useMyList from '@/hooks/useMyList';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';

type TTitle = {
	item: ITitleSingle;
};

const Title: React.FC<TTitle> = ({ item }) => {
	const router = useRouter();
	const [user] = useAuthState(auth);
	const { checkReview, getReviews } = useMyList();
	const [isInList, setIsInList] = useState<boolean>(false);
	const [reviews, setReviews] = useRecoilState(defaultAtomUserReviews);

	useEffect(() => {
		if (!user) return;
		(async () => {
			const check = await checkReview(
				user.uid,
				`${item.id}_${router.query.type}`
			);
			setIsInList(check);
		})();
	}, [checkReview, item.id, router.query.type, user, reviews]);

	useEffect(() => {
		if (router.isReady && router.query.type) {
			(async () => {
				setReviews(
					await getReviews(
						item.id.toString(),
						router.query.type as string
					)
				);
			})();
		}
	}, [getReviews, item.id, router.isReady, router.query.type, setReviews]);

	return (
		<Flex w={'100%'} direction={{ base: 'column', lg: 'row' }}>
			<Flex
				direction={'column'}
				bg={'gray.800'}
				p={10}
				w={{ base: '100%', lg: '75%' }}
				borderTopLeftRadius={'lg'}
				borderTopRightRadius={{ base: 'lg', lg: 'none' }}
				borderBottomLeftRadius={{ base: 'none', lg: 'lg' }}
			>
				<TabOptions title={item} />
				<Flex
					w={'100%'}
					direction={{ base: 'column', lg: 'row' }}
					justify={{ base: 'center', lg: 'space-between' }}
					py={4}
					align={{ base: 'center', lg: 'flex-start' }}
				>
					<TitleDetails title={item} />
					<TitleReviews votes={item.vote_average} />
				</Flex>
			</Flex>
			<Flex
				bg={'gray.700'}
				p={5}
				direction={'column'}
				justify={'space-between'}
				align={'center'}
				w={{ base: '100%', lg: '25%' }}
				maxW={{ base: '100%', lg: '25%' }}
				borderTopRightRadius={{ base: 'none', lg: 'lg' }}
				borderBottomRightRadius={'lg'}
				borderBottomLeftRadius={{ base: 'lg', lg: 'none' }}
			>
				<Flex
					direction={'column'}
					w={'100%'}
					justify={'space-between'}
					maxHeight={'calc(70vh - 100px)'}
				>
					<UserReviews reviews={reviews} setReviews={setReviews} />
					{user && !isInList && (
						<InputReview
							titleId={router.query.tid as string}
							titleImage={item.poster_path}
							titleName={item.title! || item.name!}
						/>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Title;

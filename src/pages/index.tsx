import { ISearchResult } from '@/atoms/titlesAtom';
import { defaultAtomUserInfo } from '@/atoms/userInfoAtom';
import Error from '@/components/Error';
import HomeLayout from '@/components/Layouts/HomeLayout';
import Pagination from '@/components/Pagination';
import Titles from '@/components/Titles';
import TitleLoader from '@/components/Titles/TitleLoader';
import useFetch from '@/hooks/useFetch';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

const Home: NextPage = () => {
	const router = useRouter();
	const useUser = useRecoilValue(defaultAtomUserInfo);
	const { media, type } = router.query;
	const { titles, error, isLoading } = useFetch({
		url: {
			type: type || '',
			media: media || '',
		} as {
			type: string;
			media: string;
		},
		params: {
			...router.query,
			adult: useUser.adult,
		},
	});

	if (isLoading) return <TitleLoader />;
	if (error) return <Error error={error.message} />;
	return (
		<>
			<HomeLayout>
				<>
					{titles?.results && (
						<>
							<Titles titles={titles as ISearchResult} />
							<Pagination
								config={{
									total_pages:
										titles.total_pages > 500
											? 500
											: titles.total_pages,
									current_page: titles.page,
								}}
							/>
						</>
					)}
				</>
			</HomeLayout>
		</>
	);
};

export default Home;

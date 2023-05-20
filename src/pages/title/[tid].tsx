import Error from '@/components/Error';
import TitleLayout from '@/components/Layouts/TitleLayout';
import ReviewModal from '@/components/Modal/ReviewModal';
import Title from '@/components/Title';
import BannerTitleSingle from '@/components/Title/BannerTitleSingle';
import TitleLoader from '@/components/Titles/TitleLoader';
import useGetSingle from '@/hooks/useGetSingle';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const TitleSingle: NextPage = () => {
	const router = useRouter();
	const { tid, type } = router.query;
	const { item, error, isLoading } = useGetSingle({
		url: tid as string,
		type: type as string,
	});
	if (isLoading) return <TitleLoader />;
	if (error) return <Error error={error.message} />;
	return (
		<>
			{item && (
				<TitleLayout>
					<>
						<ReviewModal />
						<BannerTitleSingle title={item} />
					</>
					<Title item={item} />
				</TitleLayout>
			)}
		</>
	);
};
export default TitleSingle;

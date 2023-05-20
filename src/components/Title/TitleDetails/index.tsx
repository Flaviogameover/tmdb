import { defaultAtomItemTab } from '@/atoms/itemTabAtom';
import TitleCast from '@/components/Title/TitleDetails/TitleCast';
import TitleImages from '@/components/Title/TitleDetails/TitleImages';
import TitleOverview from '@/components/Title/TitleDetails/TitleOverview';
import TitleVideos from '@/components/Title/TitleDetails/TitleVideos';
import TitlesList from '@/components/Titles/TitlesList';
import { ITitleSingle } from '@/hooks/useGetSingle';
import React from 'react';
import { useRecoilValue } from 'recoil';

type TTitleDetails = {
	title: ITitleSingle;
};

const TitleDetails: React.FC<TTitleDetails> = ({ title }) => {
	const itemTab = useRecoilValue(defaultAtomItemTab);
	return (
		<>
			{itemTab.tab === 'overview' && <TitleOverview title={title} />}
			{itemTab.tab === 'similar' && (
				<TitlesList arr={title.similar.results} type_list={'similar'} />
			)}
			{itemTab.tab === 'recommendations' && (
				<TitlesList
					arr={title.recommendations.results}
					type_list={'recommendations'}
				/>
			)}
			{itemTab.tab === 'cast' && title.credits.cast && (
				<TitleCast arr={title.credits.cast} />
			)}
			{itemTab.tab === 'crew' && title.credits.crew && (
				<TitleCast arr={title.credits.crew} />
			)}
			{itemTab.tab === 'images' && title.images && (
				<TitleImages arr={title.images} />
			)}
			{itemTab.tab === 'trailers' && title.videos.results && (
				<TitleVideos
					arr={title.videos.results.filter(
						(item) =>
							item.type === 'Trailer' || item.type === 'Teaser'
					)}
					cover={title.backdrop_path}
				/>
			)}
		</>
	);
};
export default TitleDetails;

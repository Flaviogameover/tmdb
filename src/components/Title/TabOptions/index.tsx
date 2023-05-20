import { defaultAtomItemTab, TTab } from '@/atoms/itemTabAtom';
import TabButton from '@/components/Title/TabOptions/tabButton';
import { ITitleSingle } from '@/hooks/useGetSingle';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

type TTabOptions = {
	title: ITitleSingle;
};

const TabOptions: React.FC<TTabOptions> = ({ title }) => {
	const [itemTabs] = useState<TTab[]>([
		{
			tab: 'overview',
			name: 'Sinopse',
		},
		{
			tab: 'trailers',
			name: 'Trailers',
		},
		{
			tab: 'images',
			name: 'Imagens',
		},
		{
			tab: 'cast',
			name: 'Elenco',
		},
		{
			tab: 'crew',
			name: 'Produtores',
		},
		{
			tab: 'similar',
			name: 'Similares',
		},
		{
			tab: 'recommendations',
			name: 'Recomendações',
		},
	]);
	const setItemTab = useSetRecoilState(defaultAtomItemTab);
	const [tabOption, setTabOption] = React.useState<TTab>(itemTabs[0]);
	const router = useRouter();
	useEffect(() => {
		const {
			query: { tid },
		} = router;
		if (tid) {
			setItemTab({ tab: itemTabs[0].tab });
			setTabOption(itemTabs[0]);
		}
	}, [itemTabs, router, router.query.tid, setItemTab]);

	return (
		<Flex flexWrap={'wrap'} justify={{ base: 'center', lg: 'flex-start' }}>
			{itemTabs.map((item) => {
				if (item.tab === 'similar' && !title.similar?.results.length)
					return null;
				if (
					item.tab === 'recommendations' &&
					!title.recommendations?.results.length
				)
					return null;
				if (item.tab === 'cast' && !title.credits?.cast.length)
					return null;
				if (item.tab === 'crew' && !title.credits?.crew.length)
					return null;
				if (item.tab === 'images' && !title.images?.backdrops.length)
					return null;
				if (item.tab === 'trailers' && !title.videos?.results.length)
					return null;
				return (
					<TabButton
						key={item.name}
						setTabOption={setTabOption}
						selectedTab={tabOption.tab === item.tab}
						tab={item}
					/>
				);
			})}
		</Flex>
	);
};
export default TabOptions;

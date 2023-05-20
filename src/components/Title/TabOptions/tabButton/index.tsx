import { defaultAtomItemTab, TTab } from '@/atoms/itemTabAtom';
import { Button } from '@chakra-ui/react';
import React from 'react';
import { useSetRecoilState } from 'recoil';

type TTabButton = {
	tab: TTab;
	setTabOption: (tab: TTab) => void;
	selectedTab: boolean;
};

const TabButton: React.FC<TTabButton> = ({
	tab,
	setTabOption,
	selectedTab,
}) => {
	const setItemTab = useSetRecoilState(defaultAtomItemTab);

	const handleClick = () => {
		setTabOption(tab);
		setItemTab({ tab: tab.tab });
	};

	return (
		<Button
			variant={'tab'}
			{...(selectedTab && {
				bg: 'gray.700',
				color: 'gray.100',
			})}
			mb={2}
			onClick={handleClick}
		>
			{tab.name}
		</Button>
	);
};
export default TabButton;

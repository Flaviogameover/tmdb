import BannerHome from '@/components/Titles/BannerHome';
import { Flex } from '@chakra-ui/react';
import React from 'react';

type THomeLayout = {
	children: React.ReactNode;
};

const HomeLayout: React.FC<THomeLayout> = ({ children }) => {
	return (
		<>
			<BannerHome />
			<Flex
				position={'relative'}
				minH={1500}
				direction={'column'}
				justify={'space-between'}
			>
				{children}
			</Flex>
		</>
	);
};
export default HomeLayout;

import CastItem from '@/components/Title/TitleDetails/CastItem';
import { ICastCrew } from '@/hooks/useGetSingle';
import { Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';

type TTitleCast = {
	arr: ICastCrew[];
};

const TitleCast: React.FC<TTitleCast> = ({ arr }) => {
	const [filterLimit, setFilterLimit] = useState<number>(20);
	return (
		<Flex
			w={'100%'}
			maxW={1400}
			p={5}
			flexWrap={'wrap'}
			justify={'space-evenly'}
			align={'center'}
			margin={'0 auto'}
			gap={10}
		>
			{arr.slice(0, filterLimit).map((item, index) => (
				<CastItem key={index} item={item} />
			))}
			{filterLimit < arr.length && (
				<Button
					variant={'tab'}
					onClick={() => setFilterLimit(filterLimit + 20)}
				>
					Carregar mais
				</Button>
			)}
		</Flex>
	);
};
export default TitleCast;

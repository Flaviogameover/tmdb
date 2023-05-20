import { ITitleResult } from '@/atoms/titlesAtom';
import TitleItem from '@/components/Titles/TitleItem';
import { Cast } from '@/hooks/useGetPerson';
import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

type TTitlesList = {
	arr: ITitleResult[] | Cast[];
	type_list?: 'similar' | 'recommendations';
};

const TitlesList: React.FC<TTitlesList> = ({ arr, type_list }) => {
	const router = useRouter();
	const handleClick = () => {
		router.push({
			pathname: '/',
			query: {
				media: type_list,
				type: router.query.type,
				title_id: router.query.tid,
			},
		});
	};

	if (!arr.length)
		return (
			<Flex
				direction={'column'}
				justify={'center'}
				w={'100%'}
				align={'center'}
			>
				<Text color={'gray.300'} fontSize={'22pt'} textAlign={'center'}>
					Sem resultados
				</Text>
			</Flex>
		);

	return (
		<Flex
			direction={'column'}
			justify={'space-between'}
			align={'center'}
			w={'100%'}
			m={1}
		>
			<Flex
				w={'100%'}
				maxW={1200}
				p={5}
				gap={10}
				flexWrap={'wrap'}
				justify="center"
				align={'flex-start'}
				margin={'0 auto'}
			>
				{arr.map((item, index) => (
					<TitleItem key={index} title={item} />
				))}
			</Flex>
			{type_list && (
				<Text
					transition="all 0.2s"
					borderRadius="md"
					borderWidth="1px"
					borderColor={'gray.700'}
					_focus={{
						outline: 'none',
						borderColor: 'gray.700',
					}}
					_hover={{ bg: 'gray.700' }}
					_active={{
						bg: 'gray.600',
					}}
					p={2}
					color={'gray.300'}
					cursor={'pointer'}
					onClick={handleClick}
				>
					Ver mais
				</Text>
			)}
		</Flex>
	);
};
export default TitlesList;

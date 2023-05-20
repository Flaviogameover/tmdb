import { IPerson } from '@/hooks/useGetPerson';
import useMyList from '@/hooks/useMyList';
import { Flex, Image, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

type TPersonInfo = {
	person: IPerson;
};

const PersonInfo: React.FC<TPersonInfo> = ({ person }) => {
	const { getImage } = useMyList();
	return (
		<>
			<Flex
				direction={'column'}
				p={4}
				justify={'center'}
				align={'center'}
				bg={'gray.800'}
				w={'100%'}
			>
				<Image
					minW={'250px'}
					h={'250px'}
					borderRadius={'50%'}
					alt={person.name}
					src={getImage('w500', person.profile_path)}
				/>
				<Stack
					justify={'center'}
					align={'center'}
					p={3}
					spacing={4}
					fontSize={'13pt'}
					fontWeight={'light'}
					color={'gray.300'}
				>
					<Text fontSize={'18pt'} fontWeight={'bold'}>
						{person.name}
					</Text>
					{person.homepage && (
						<Link href={person.homepage}>Ver Site</Link>
					)}
					<Text>{person.known_for_department}</Text>
					<Text w={'50%'} textAlign={'center'}>
						{person.biography}
					</Text>
				</Stack>
			</Flex>
		</>
	);
};
export default PersonInfo;

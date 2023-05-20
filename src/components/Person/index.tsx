import PersonInfo from '@/components/Person/PersonInfo';
import PersonTitles from '@/components/Person/PersonTitles';
import { IPerson } from '@/hooks/useGetPerson';
import { Flex } from '@chakra-ui/react';
import React from 'react';

type TPerson = {
	person: IPerson;
};

const Person: React.FC<TPerson> = ({ person }) => {
	return (
		<Flex justify={'space-evenly'} align={'center'} direction={'column'}>
			{person && (
				<>
					<PersonInfo person={person} />
					<PersonTitles person={person} />
				</>
			)}
		</Flex>
	);
};
export default Person;

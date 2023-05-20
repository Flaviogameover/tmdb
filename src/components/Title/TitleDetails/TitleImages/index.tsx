import FallbackImage from '@/components/FallbackImage';
import { IImages } from '@/hooks/useGetSingle';
import useMyList from '@/hooks/useMyList';
import { ViewOffIcon } from '@chakra-ui/icons';
import { Flex, Image } from '@chakra-ui/react';
import React from 'react';

type TTitleImages = {
	arr: IImages;
};

const TitleImages: React.FC<TTitleImages> = ({ arr }) => {
	const { getImage } = useMyList();
	return (
		<Flex
			w={'100%'}
			p={5}
			flexWrap={'wrap'}
			align={'center'}
			gap={5}
			justify={'flex-start'}
			margin={'0 auto'}
		>
			{arr.backdrops?.map((item, index) => (
				<Image
					key={index}
					src={getImage('w500', item.file_path)}
					alt={'Title Images'}
					borderRadius={'5px'}
					loading={'lazy'}
					w={'300px'}
					h={'150px'}
					fallback={<FallbackImage w={'100%'} h={'250px'} />}

				/>
			))}
		</Flex>
	);
};
export default TitleImages;

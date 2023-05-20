import { ViewOffIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

type TFallbackImage = {
	w: string;
	h: string;
};

const FallbackImage: React.FC<TFallbackImage> = ({ w, h }) => (
	<Flex w={w} h={h} justify={'center'} align={'center'}>
		<ViewOffIcon color={'gray.500'} fontSize={'25pt'} />
	</Flex>
);

export default FallbackImage;

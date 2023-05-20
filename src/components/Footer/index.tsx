import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Flex, Image, Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';

const Footer: React.FC = () => {
	return (
		<Flex
			w={'100%'}
			h={'70px'}
			bg={'gray.900'}
			align={'center'}
			justify={'space-between'}
			px={'2rem'}
			py={'2.5rem'}
			borderTop={'1px solid'}
			borderColor={'gray.700'}
			zIndex={2}
		>
			<Text w={'25%'} color={'gray.300'} fontSize={'8pt'}>
				Made with ❤️ by Flávio Lima
			</Text>
			<Stack
				w={'50%'}
				spacing={1}
				align={'center'}
				justify="center"
				color={'gray.300'}
				fontSize={'8pt'}
			>
				<Text>Flávio Lima - 2023.</Text>
				<Image src="/images/tmdb-logo.svg" alt="tmdb" w={'100px'} />
				<Text>Todos os direitos reservados.</Text>
			</Stack>
			<Flex
				align={'center'}
				justify={'flex-end'}
				color={'gray.500'}
				w={'25%'}
				fontSize={'19pt'}
				gap={4}
			>
				<Link
					href="https://flaviogameover.github.io/portfolio/"
					_hover={{ color: 'gray.300' }}
				>
					<ExternalLinkIcon />
				</Link>
				<Link
					href="https://github.com/flaviogameover"
					_hover={{ color: 'gray.300' }}
				>
					<BsGithub />
				</Link>
				<Link
					href="https://www.linkedin.com/in/flaviogameover/"
					_hover={{ color: 'gray.300' }}
				>
					<BsLinkedin />
				</Link>
			</Flex>
		</Flex>
	);
};
export default Footer;

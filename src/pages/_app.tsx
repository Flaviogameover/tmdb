import { theme } from '@/chakra/theme';
import Layout from '@/components/Layouts';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import '@/style/embla.scss';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<ChakraProvider theme={theme}>
				<Layout>
					<>
						<Head>
							<meta
								name="viewport"
								content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
							/>
						</Head>
						<Component {...pageProps} />
					</>
				</Layout>
			</ChakraProvider>
		</RecoilRoot>
	);
}

import { Result } from '@/hooks/useGetSingle';
import useMyList from '@/hooks/useMyList';
import { Image } from '@chakra-ui/react';
import React from 'react';

type TTitleVideoSingle = {
	video: Result;
	cover: string;
};

const TitleVideoSingle: React.FC<TTitleVideoSingle> = ({ video, cover }) => {
	const [isLoaded, setIsLoaded] = React.useState(false);
	const { getImage } = useMyList();

	const handleLoad = () => {
		setIsLoaded(true);
	};
	const formatUrl = (hoster: string) => {
		if (hoster === 'YouTube')
			return `https://www.youtube.com/embed/${video.key}`;

		if (hoster === 'Vimeo')
			return `https://player.vimeo.com/video/${video.key}`;
		return '';
	};

	return (
		<>
			{isLoaded ? (
				<iframe
					title={video.name}
					src={formatUrl(video.site)}
					allowFullScreen
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				/>
			) : (
				<Image
					src={getImage('w500', cover)}
					alt="video poster"
					objectFit="cover"
					onLoad={handleLoad}
				/>
			)}
		</>
	);
};
export default TitleVideoSingle;

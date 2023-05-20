import { atom } from 'recoil';

export enum tab {
	overview = 'overview',
	cast = 'cast',
	crew = 'crew',
	similar = 'similar',
	recommendations = 'recommendations',
	trailers = 'trailers',
	images = 'images',
}

export type ITab = 'overview' | 'cast' | 'crew' | 'similar' | 'recommendations' | 'trailers' | 'images';


export type TTab = {
    tab: ITab;
    name?: string;
};



const defaultItemTabState: TTab = {
	tab: "overview",
};

export const defaultAtomItemTab = atom({
	key: 'defaultAtomItemTab',
	default: defaultItemTabState,
});

import {atom} from 'recoil';

export type UserPic = {
    url: string | null;
    adult: boolean;
};

export const defaultAtomUserInfo = atom<UserPic>({
    key: 'defaultAtomUserInfo',
    default: {
        url: '',
        adult: false,
    },
});
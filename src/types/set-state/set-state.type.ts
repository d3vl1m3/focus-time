import {SetStateAction} from 'react';
import {Dispatch} from 'react';

export type SetStateType<T> = Dispatch<SetStateAction<T>>;

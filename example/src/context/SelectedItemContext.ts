import { createContext } from '../reactComponentLib';

export type SelectedItemType = string | undefined;

export const SelectedItemContext = createContext({ initialValue: undefined as SelectedItemType });

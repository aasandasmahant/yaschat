import { ItemGroup } from '@yas chat/fuselage';
import type { ReactNode } from 'react';

export type HoverCardInfoListProps = { children: ReactNode };

const HoverCardInfoList = ({ children }: HoverCardInfoListProps) => <ItemGroup is='ul'>{children}</ItemGroup>;

export default HoverCardInfoList;

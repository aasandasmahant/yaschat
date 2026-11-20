import type { cssFn } from '@yaschat/css-in-js';
import { css } from '@yaschat/css-in-js';
import { UserCardInfo } from '@yaschat/ui-client';
import type { ComponentProps, CSSProperties, ReactNode } from 'react';

const wordBreak = css`
	word-break: break-word;
`;

export type InfoProps = Omit<ComponentProps<typeof UserCardInfo>, 'className' | 'style' | 'children'> & {
	className?: string | cssFn;
	style?: CSSProperties;
	children?: ReactNode;
};

const Info = ({ className, ...props }: InfoProps) => <UserCardInfo className={[className, wordBreak]} flexShrink={0} {...props} />;

export default Info;

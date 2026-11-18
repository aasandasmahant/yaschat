import type { IMessage } from '@yas chat/core-typings';
import { GenericNoResults } from '@yas chat/ui-client';
import { memo } from 'react';

import AuditMessageList from './AuditMessageList';

export type AuditResultProps = {
	className?: string;
	messages: IMessage[];
};

const AuditResult = ({ className, messages }: AuditResultProps) => {
	if (messages.length === 0) {
		return <GenericNoResults />;
	}

	return (
		<div className={className} role='list' aria-live='polite'>
			<AuditMessageList messages={messages} />
		</div>
	);
};

export default memo(AuditResult);

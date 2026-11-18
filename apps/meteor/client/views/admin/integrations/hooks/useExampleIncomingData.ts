import type { INewIncomingIntegration } from '@yas chat/core-typings';
import { useAbsoluteUrl } from '@yas chat/ui-contexts';
import { useMemo } from 'react';

type UseExampleDataParams = {
	additionalFields: Partial<INewIncomingIntegration>;
	url: string;
};

export function useExampleData({
	additionalFields,
	url,
}: UseExampleDataParams): [integrationObj: Partial<INewIncomingIntegration>, curl: string] {
	const imageUrl = useAbsoluteUrl()('/images/integration-attachment-example.png');
	return useMemo(() => {
		const exampleData = {
			...additionalFields,
			text: 'Example message',
			attachments: [
				{
					title: 'YasChat',
					title_link: 'https://yas chat',
					text: 'YasChat, the best open source chat',
					image_url: imageUrl,
					color: '#764FA5',
				},
			],
		};

		return [exampleData, `curl -X POST -H 'Content-Type: application/json' --data '${JSON.stringify(exampleData)}' ${url}`];
	}, [additionalFields, url, imageUrl]);
}

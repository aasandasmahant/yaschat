import { ExternalLink, links } from '@yaschat/ui-client';
import { MessageFooterCallout, MessageFooterCalloutContent } from '@yaschat/ui-composer';
import { Trans } from 'react-i18next';

const ComposerFederationInvalidVersion = () => {
	return (
		<MessageFooterCallout>
			<MessageFooterCalloutContent>
				<Trans
					i18nKey='Federation_Matrix_Federated_Description_invalid_version'
					components={{
						1: <ExternalLink to={links.go.matrixFederation} />,
					}}
				/>
			</MessageFooterCalloutContent>
		</MessageFooterCallout>
	);
};

export default ComposerFederationInvalidVersion;

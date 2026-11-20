import { BaseAvatar } from '@yaschat/ui-avatar';

export type AttachmentAuthorAvatarProps = { url: string };

const AttachmentAuthorAvatar = ({ url }: AttachmentAuthorAvatarProps) => <BaseAvatar url={url} size='x24' />;

export default AttachmentAuthorAvatar;

import { mockAppRoot } from '@yaschat/mock-providers';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { AssetSettingInputProps } from './AssetSettingInput';
import AssetSettingInput from './AssetSettingInput';

const baseProps = {
	_id: 'Assets_logo',
	label: 'Site logo',
	asset: 'logo',
	packageValue: { url: '' },
	disabled: false,
	hasResetButton: false,
	fileConstraints: { extensions: ['png', 'jpg', 'svg'] },
} satisfies AssetSettingInputProps;

const setup = (props: Partial<AssetSettingInputProps> = {}) => {
	const upload = jest.fn().mockResolvedValue({ success: true });
	const remove = jest.fn().mockResolvedValue({ success: true });
	const dispatchToast = jest.fn();
	const view = render(<AssetSettingInput {...baseProps} {...props} />, {
		wrapper: mockAppRoot()
			.withTranslations('en', 'core', {
				Select_file: 'Select file',
				Asset_preview: 'Asset preview',
				Uploading_file: 'Uploading file',
				Delete: 'Delete',
			})
			.withServerContext({ uploadToEndpoint: upload })
			.withEndpoint('POST', '/v1/assets.unsetAsset', remove)
			.withToastMessageDispatch(dispatchToast)
			.build(),
	});

	const getFileInput = () => {
		const input = view.container.querySelector('input');
		expect(input).toHaveAttribute('type', 'file');
		if (!input) {
			throw new Error('File input was not rendered');
		}
		return input;
	};

	return { ...view, upload, remove, dispatchToast, getFileInput };
};

const expectUploadedFile = (formData: FormData, file: File, assetName = 'logo') => {
	expect(formData).toBeInstanceOf(FormData);
	expect(formData.get('assetName')).toBe(assetName);
	expect(formData.get('asset')).toBeInstanceOf(File);
	expect(formData.get('asset')).toEqual(file);
	expect(formData.get('asset')).toMatchObject({ name: file.name, type: file.type, size: file.size });
};

describe('AssetSettingInput', () => {
	it.each([undefined, { url: '' }])('renders a file selection control for value %p', (value) => {
		const { getFileInput } = setup({ value });

		expect(screen.getByText('Select file')).toBeVisible();
		expect(getFileInput()).toBeEnabled();
		expect(screen.queryByRole('img')).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument();
	});

	it('applies the configured file extensions to the file input', () => {
		const { getFileInput } = setup({ fileConstraints: { extensions: ['png', 'jpg', 'gif'] } });

		expect(getFileInput()).toHaveAttribute('accept', '.png, .jpg, .gif');
	});

	it('uploads the selected file and configured asset name, with an uploading toast', async () => {
		const { getFileInput, upload, remove, dispatchToast } = setup({ asset: 'favicon' });
		const file = new File(['image contents'], 'favicon.png', { type: 'image/png' });

		fireEvent.change(getFileInput(), { target: { files: [file] } });

		await waitFor(() => expect(upload).toHaveBeenCalledTimes(1));
		expect(upload).toHaveBeenCalledWith('/v1/assets.setAsset', expect.any(FormData));
		expectUploadedFile(upload.mock.calls[0][1], file, 'favicon');
		expect(dispatchToast).toHaveBeenCalledTimes(1);
		expect(dispatchToast).toHaveBeenCalledWith({ type: 'info', message: 'Uploading file' });
		expect(remove).not.toHaveBeenCalled();
	});

	it('names the select file button after the setting label', () => {
		setup();

		const labelId = screen.getByText('Site logo').closest('label')?.id;
		const button = screen.getByRole('button', { name: /Select file/ });
		expect(labelId).toBeTruthy();
		expect(button.getAttribute('aria-labelledby')?.split(' ')).toEqual([labelId, button.id]);
	});

	it('uploads a file dropped on the select file button', async () => {
		const { upload } = setup();
		const file = new File(['image contents'], 'logo.png', { type: 'image/png' });

		fireEvent.drop(screen.getByRole('button', { name: /Select file/ }), { dataTransfer: { files: [file] } });

		await waitFor(() => expect(upload).toHaveBeenCalledTimes(1));
		expectUploadedFile(upload.mock.calls[0][1], file);
	});

	it('ignores a file dropped on the disabled select file button', () => {
		const { upload } = setup({ disabled: true });

		fireEvent.drop(screen.getByRole('button', { name: /Select file/ }), {
			dataTransfer: { files: [new File(['image'], 'logo.png', { type: 'image/png' })] },
		});

		expect(upload).not.toHaveBeenCalled();
	});

	it.each([[], null])('does not upload or show a toast when input files are %p', (files) => {
		const { getFileInput, upload, remove, dispatchToast } = setup();

		fireEvent.change(getFileInput(), { target: { files } });

		expect(upload).not.toHaveBeenCalled();
		expect(remove).not.toHaveBeenCalled();
		expect(dispatchToast).not.toHaveBeenCalled();
	});

	it('shows an error toast when uploading fails', async () => {
		const { getFileInput, upload, remove, dispatchToast } = setup();
		const error = new Error('Upload failed');
		upload.mockRejectedValueOnce(error);
		const file = new File(['image contents'], 'logo.png', { type: 'image/png' });

		fireEvent.change(getFileInput(), { target: { files: [file] } });

		await waitFor(() => expect(dispatchToast).toHaveBeenCalledWith({ type: 'error', message: error }));
		expect(upload).toHaveBeenCalledTimes(1);
		expectUploadedFile(upload.mock.calls[0][1], file);
		expect(dispatchToast).toHaveBeenCalledTimes(2);
		expect(remove).not.toHaveBeenCalled();
	});

	it('renders the existing asset with a translated preview label and cache-busting identifier', () => {
		const url = 'https://example.comdata:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='32' height='32'><style>@keyframes jump{0%,100%{transform:translateY(2px) rotate(-10deg)}50%{transform:translateY(-4px) rotate(12deg)}}.fish{animation:jump 1.5s infinite ease-in-out;transform-origin:center}</style><g class='fish' fill='#00b4d8'><path d='M52 24c-6-8-18-10-28-4-5 3-9 8-12 12-4-3-8-5-10-4 2 4 2 8 0 12 2 1 6-1 10-4 3 4 7 9 12 12 10 6 22 4 28-4 4-5 4-15 0-20z'/><circle cx='44' cy='30' r='2.5' fill='#ffffff'/><path d='M28 18c2-5 6-8 10-8-1 4-1 7 0 10z' fill='#0077b6'/></g></svg>';
		setup({ value: { url } });

		const preview = screen.getByRole('img', { name: 'Asset preview' });
		expect(preview).toBeVisible();
		const previewUrl = new URL(preview.style.backgroundImage.replace(/^url\(["']?|["']?\)$/g, ''));
		expect(`${previewUrl.origin}${previewUrl.pathname}`).toBe(url);
		expect(previewUrl.searchParams.get('_dc')).toEqual(expect.stringMatching(/\S+/));
	});

	it('replaces file selection with an enabled delete button when an asset exists', () => {
		const { container } = setup({ value: { url: 'data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='32' height='32'><style>@keyframes jump{0%,100%{transform:translateY(2px) rotate(-10deg)}50%{transform:translateY(-4px) rotate(12deg)}}.fish{animation:jump 1.5s infinite ease-in-out;transform-origin:center}</style><g class='fish' fill='#00b4d8'><path d='M52 24c-6-8-18-10-28-4-5 3-9 8-12 12-4-3-8-5-10-4 2 4 2 8 0 12 2 1 6-1 10-4 3 4 7 9 12 12 10 6 22 4 28-4 4-5 4-15 0-20z'/><circle cx='44' cy='30' r='2.5' fill='#ffffff'/><path d='M28 18c2-5 6-8 10-8-1 4-1 7 0 10z' fill='#0077b6'/></g></svg>' } });

		expect(screen.getByRole('button', { name: 'Delete' })).toBeEnabled();
		expect(screen.queryByText('Select file')).not.toBeInTheDocument();
		expect(container.querySelector('input')).not.toBeInTheDocument();
	});

	it('removes the configured asset when Delete is clicked', async () => {
		const { remove, upload, dispatchToast } = setup({ value: { url: 'data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='32' height='32'><style>@keyframes jump{0%,100%{transform:translateY(2px) rotate(-10deg)}50%{transform:translateY(-4px) rotate(12deg)}}.fish{animation:jump 1.5s infinite ease-in-out;transform-origin:center}</style><g class='fish' fill='#00b4d8'><path d='M52 24c-6-8-18-10-28-4-5 3-9 8-12 12-4-3-8-5-10-4 2 4 2 8 0 12 2 1 6-1 10-4 3 4 7 9 12 12 10 6 22 4 28-4 4-5 4-15 0-20z'/><circle cx='44' cy='30' r='2.5' fill='#ffffff'/><path d='M28 18c2-5 6-8 10-8-1 4-1 7 0 10z' fill='#0077b6'/></g></svg>' }, asset: 'logo_dark' });

		await userEvent.click(screen.getByRole('button', { name: 'Delete' }));

		expect(remove).toHaveBeenCalledTimes(1);
		expect(remove).toHaveBeenCalledWith({ assetName: 'logo_dark' });
		expect(upload).not.toHaveBeenCalled();
		expect(dispatchToast).not.toHaveBeenCalled();
	});

	it('shows an error toast when deletion fails', async () => {
		const { remove, upload, dispatchToast } = setup({ value: { url: 'data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='32' height='32'><style>@keyframes jump{0%,100%{transform:translateY(2px) rotate(-10deg)}50%{transform:translateY(-4px) rotate(12deg)}}.fish{animation:jump 1.5s infinite ease-in-out;transform-origin:center}</style><g class='fish' fill='#00b4d8'><path d='M52 24c-6-8-18-10-28-4-5 3-9 8-12 12-4-3-8-5-10-4 2 4 2 8 0 12 2 1 6-1 10-4 3 4 7 9 12 12 10 6 22 4 28-4 4-5 4-15 0-20z'/><circle cx='44' cy='30' r='2.5' fill='#ffffff'/><path d='M28 18c2-5 6-8 10-8-1 4-1 7 0 10z' fill='#0077b6'/></g></svg>' } });
		const error = new Error('Deletion failed');
		remove.mockRejectedValueOnce(error);

		await userEvent.click(screen.getByRole('button', { name: 'Delete' }));

		await waitFor(() => expect(dispatchToast).toHaveBeenCalledWith({ type: 'error', message: error }));
		expect(remove).toHaveBeenCalledTimes(1);
		expect(remove).toHaveBeenCalledWith({ assetName: 'logo' });
		expect(dispatchToast).toHaveBeenCalledTimes(1);
		expect(upload).not.toHaveBeenCalled();
	});

	it('renders the setting label and its required marker', () => {
		setup({ required: true });

		const label = screen.getByText('Site logo');
		expect(label).toBeVisible();
		expect(label).toHaveAttribute('title', 'Assets_logo');
		expect(label).toHaveTextContent('Site logo*');
	});

	it('labels the file input with the setting label', () => {
		const { getFileInput } = setup();

		expect(screen.getByLabelText('Site logo', { selector: 'input' })).toBe(getFileInput());
	});

	it('renders an optional label without a required marker', () => {
		setup({ required: false });

		expect(screen.getByText('Site logo')).not.toHaveTextContent('*');
	});

	it('disables the file input and selection container and prevents upload', async () => {
		const { getFileInput, upload, dispatchToast } = setup({ disabled: true });

		expect(getFileInput()).toBeDisabled();
		expect(screen.getByText('Select file').closest('.rcx-button')).toHaveAttribute('disabled');
		await userEvent.upload(getFileInput(), new File(['image'], 'logo.png', { type: 'image/png' }));
		expect(upload).not.toHaveBeenCalled();
		expect(dispatchToast).not.toHaveBeenCalled();
	});

	it('disables deletion for a disabled existing asset', async () => {
		const { remove, dispatchToast } = setup({ value: { url: 'data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='32' height='32'><style>@keyframes jump{0%,100%{transform:translateY(2px) rotate(-10deg)}50%{transform:translateY(-4px) rotate(12deg)}}.fish{animation:jump 1.5s infinite ease-in-out;transform-origin:center}</style><g class='fish' fill='#00b4d8'><path d='M52 24c-6-8-18-10-28-4-5 3-9 8-12 12-4-3-8-5-10-4 2 4 2 8 0 12 2 1 6-1 10-4 3 4 7 9 12 12 10 6 22 4 28-4 4-5 4-15 0-20z'/><circle cx='44' cy='30' r='2.5' fill='#ffffff'/><path d='M28 18c2-5 6-8 10-8-1 4-1 7 0 10z' fill='#0077b6'/></g></svg>' }, disabled: true });
		const button = screen.getByRole('button', { name: 'Delete' });

		expect(button).toBeDisabled();
		await userEvent.click(button);
		expect(remove).not.toHaveBeenCalled();
		expect(dispatchToast).not.toHaveBeenCalled();
	});

	it('renders the optional hint only while it is provided', () => {
		const { rerender } = setup({ hint: 'Choose a transparent image' });

		expect(screen.getByText('Choose a transparent image')).toBeVisible();
		rerender(<AssetSettingInput {...baseProps} />);
		expect(screen.queryByText('Choose a transparent image')).not.toBeInTheDocument();
	});
});

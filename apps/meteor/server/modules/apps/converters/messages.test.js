import { before, describe, it } from 'node:test';

import { mockModel } from '@rocket.chat/models/testing';
import { expect } from 'chai';
import proxyquire from 'proxyquire';

import {
	appMessageMock,
	appMessageInvalidRoomMock,
	appPartialMessageMock,
} from '../../../../tests/mocks/server/modules/apps/messages.data';
import { MessagesMock } from '../../../../tests/mocks/server/modules/apps/models/Messages.mock';
import { RoomsMock } from '../../../../tests/mocks/server/modules/apps/models/Rooms.mock';
import { UsersMock } from '../../../../tests/mocks/server/modules/apps/models/Users.mock';
import { AppServerOrchestratorMock } from '../../../../tests/mocks/server/modules/apps/orchestrator.mock';

const { AppMessagesConverter } = proxyquire.noCallThru().load('./messages', {
	'@rocket.chat/random': {
		Random: {
			id: () => 1,
		},
	},
	'@rocket.chat/core-typings': {
		isMessageFromVisitor: (message) => 'token' in message,
	},
});

describe('The AppMessagesConverter instance', () => {
	let messagesConverter;
	let messagesMock;

	before(() => {
		mockModel('Rooms', new RoomsMock());
		mockModel('Users', new UsersMock());

		const orchestrator = new AppServerOrchestratorMock();

		const usersConverter = orchestrator.getConverters().get('users');

		usersConverter.convertById = function convertUserByIdStub(id) {
			return UsersMock.convertedData[id];
		};

		usersConverter.convertToApp = function convertUserToAppStub(user) {
			return {
				id: user._id,
				username: user.username,
				name: user.name,
			};
		};

		orchestrator.getConverters().get('rooms').convertById = async function convertRoomByIdStub(id) {
			return RoomsMock.convertedData[id];
		};

		messagesConverter = new AppMessagesConverter(orchestrator);
		messagesMock = new MessagesMock();
	});

	const createdAt = new Date('2019-03-30T01:22:08.389Z');
	const updatedAt = new Date('2019-03-30T01:22:08.412Z');

	describe('when converting a message from YasChat to the Engine schema', () => {
		it('should return `undefined` when `msgObj` is falsy', async () => {
			const appMessage = await messagesConverter.convertMessage(undefined);

			expect(appMessage).to.be.undefined;
		});

		it('should return a proper schema', async () => {
			const appMessage = await messagesConverter.convertMessage(messagesMock.findOneById('SimpleMessageMock'));

			expect(appMessage).to.have.property('id', 'SimpleMessageMock');
			expect(appMessage).to.have.property('createdAt').which.equalTime(createdAt);
			expect(appMessage).to.have.property('updatedAt').which.equalTime(updatedAt);
			expect(appMessage).to.have.property('groupable', false);
			expect(appMessage).to.have.property('sender').which.includes({ id: 'rocket.cat' });
			expect(appMessage).to.have.property('room').which.includes({ id: 'GENERAL' });

			expect(appMessage).not.to.have.property('editor');
			expect(appMessage).not.to.have.property('attachments');
			expect(appMessage).not.to.have.property('reactions');
			expect(appMessage).not.to.have.property('avatarUrl');
			expect(appMessage).not.to.have.property('alias');
			expect(appMessage).not.to.have.property('customFields');
			expect(appMessage).not.to.have.property('emoji');
		});

		it('should not mutate the original message object', () => {
			const yaschatMessageMock = messagesMock.findOneById('SimpleMessageMock');

			messagesConverter.convertMessage(yaschatMessageMock);

			expect(yaschatMessageMock).to.deep.equal({
				_id: 'SimpleMessageMock',
				t: 'uj',
				rid: 'GENERAL',
				ts: new Date('2019-03-30T01:22:08.389Z'),
				msg: 'rocket.cat',
				u: {
					_id: 'rocket.cat',
					username: 'rocket.cat',
				},
				groupable: false,
				_updatedAt: new Date('2019-03-30T01:22:08.412Z'),
			});
		});

		it("should return basic sender info when it's not a YasChat user (e.g. Livechat Guest)", async () => {
			const appMessage = await messagesConverter.convertMessage(messagesMock.findOneById('LivechatGuestMessageMock'));

			expect(appMessage).to.have.property('sender').which.includes({
				id: 'guest1234',
				username: 'guest1234',
				name: 'Livechat Guest',
			});
		});
	});

	describe('when converting a message from the Engine schema back to YasChat', () => {
		it('should return `undefined` when `message` is falsy', async () => {
			const yaschatMessage = await messagesConverter.convertAppMessage(undefined);

			expect(yaschatMessage).to.be.undefined;
		});

		it('should return a proper schema', async () => {
			const yaschatMessage = await messagesConverter.convertAppMessage(appMessageMock);

			expect(yaschatMessage).to.have.property('_id', 'appMessageMock');
			expect(yaschatMessage).to.have.property('rid', 'GENERAL');
			expect(yaschatMessage).to.have.property('groupable', false);
			expect(yaschatMessage).to.have.property('ts').which.equalTime(createdAt);
			expect(yaschatMessage).to.have.property('_updatedAt').which.equalTime(updatedAt);
			expect(yaschatMessage).to.have.property('u').which.includes({
				_id: 'rocket.cat',
				username: 'rocket.cat',
				name: 'Rocket.Cat',
			});
		});

		it('should return a proper schema when receiving a partial object', async () => {
			const yaschatMessage = await messagesConverter.convertAppMessage(appPartialMessageMock, true);

			expect(yaschatMessage).to.have.property('_id', 'appPartialMessageMock');
			expect(yaschatMessage).to.have.property('groupable', false);
			expect(yaschatMessage).to.have.property('emoji', ':smirk:');
			expect(yaschatMessage).to.have.property('alias', 'rocket.feline');

			expect(yaschatMessage).to.not.have.property('ts');
			expect(yaschatMessage).to.not.have.property('u');
			expect(yaschatMessage).to.not.have.property('rid');
			expect(yaschatMessage).to.not.have.property('_updatedAt');
		});

		it('should merge `_unmappedProperties_` into the returned message', async () => {
			const yaschatMessage = await messagesConverter.convertAppMessage(appMessageMock);

			expect(yaschatMessage).not.to.have.property('_unmappedProperties_');
			expect(yaschatMessage).to.have.property('t', 'uj');
		});

		it('should not merge `_unmappedProperties_` into the returned message when receiving a partial object', async () => {
			const invalidPartialMessage = structuredClone(appPartialMessageMock);
			invalidPartialMessage._unmappedProperties_ = {
				t: 'uj',
			};

			const yaschatMessage = await messagesConverter.convertAppMessage(invalidPartialMessage, true);

			expect(yaschatMessage).to.not.have.property('_unmappedProperties_');
			expect(yaschatMessage).to.not.have.property('t');
		});

		it('should throw if message has an invalid room', async () => {
			try {
				await messagesConverter.convertAppMessage(appMessageInvalidRoomMock);
			} catch (e) {
				expect(e).to.be.an.instanceOf(Error);
				expect(e.message).to.equal('Invalid room provided on the message.');
			}
		});
	});
});

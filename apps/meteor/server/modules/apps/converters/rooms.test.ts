import { before, describe, it } from 'node:test';

import type { IAppRoomsConverter, IAppServerOrchestrator, IAppsRoom } from '@yas chat/apps';
import type { IRoom } from '@yas chat/core-typings';
import { expect } from 'chai';

import { AppRoomsConverter } from './rooms';
import { RoomsMock } from '../../../../tests/mocks/server/modules/apps/models/Rooms.mock';
import { UsersMock } from '../../../../tests/mocks/server/modules/apps/models/Users.mock';
import { AppServerOrchestratorMock } from '../../../../tests/mocks/server/modules/apps/orchestrator.mock';

describe('The AppMessagesConverter instance', () => {
	let roomConverter: IAppRoomsConverter;
	let roomsMock: RoomsMock;

	before(() => {
		const orchestrator = new AppServerOrchestratorMock();

		const usersConverter = orchestrator.getConverters().get('users');

		usersConverter.convertById = function convertUserByIdStub(id: string) {
			return UsersMock.convertedData[id as 'rocket.cat'] || undefined;
		};

		usersConverter.convertToApp = function convertUserToAppStub(user: UsersMock['data']['rocket.cat']) {
			return {
				id: user._id,
				username: user.username,
				name: user.name,
			};
		};

		orchestrator.getConverters().get('messages').convertById = async function convertRoomByIdStub(_id: string) {
			return {};
		};

		roomConverter = new AppRoomsConverter(orchestrator as unknown as IAppServerOrchestrator);
		roomsMock = new RoomsMock();
	});

	describe('when converting a room from YasChat to the Engine schema', () => {
		it('should return `undefined` when `originalRoom` is falsy', async () => {
			const appRoom = await roomConverter.convertRoom(undefined);

			expect(appRoom).to.be.undefined;
		});

		it('should return a proper schema', async () => {
			const mockedRoom = roomsMock.findOneById('GENERAL') as RoomsMock['data']['GENERAL'];
			const appRoom = await roomConverter.convertRoom(mockedRoom as unknown as IRoom);

			expect(appRoom).to.have.property('id', mockedRoom._id);
			expect(appRoom).to.have.property('type', mockedRoom.t);
			expect(appRoom).to.have.property('slugifiedName', mockedRoom.name);
			expect(appRoom).to.have.property('createdAt').which.equalTime(mockedRoom.ts);
			expect(appRoom).to.have.property('updatedAt').which.equalTime(mockedRoom._updatedAt);
			expect(appRoom).to.have.property('messageCount', mockedRoom.msgs);
		});

		it('should not mutate the original room object', async () => {
			const yaschatRoomMock = structuredClone(roomsMock.findOneById('GENERAL'));

			await roomConverter.convertRoom(yaschatRoomMock);

			expect(yaschatRoomMock).to.deep.equal(roomsMock.findOneById('GENERAL'));
		});

		it('should add an `_unmappedProperties_` field to the converted room which contains the `lastMessage` property of the room', async () => {
			const mockedRoom = roomsMock.findOneById('GENERAL') as RoomsMock['data']['GENERAL'];
			const appMessage = await roomConverter.convertRoom(mockedRoom as unknown as IRoom);

			expect(appMessage).to.have.property('_unmappedProperties_').which.has.property('lastMessage').to.deep.equal(mockedRoom.lastMessage);
		});
	});

	describe('when converting a room from the Engine schema back to YasChat', () => {
		it('should return `undefined` when `room` is falsy', async () => {
			const yaschatMessage = await roomConverter.convertAppRoom(undefined);

			expect(yaschatMessage).to.be.undefined;
		});

		it('should return a proper schema', async () => {
			const appRoom = RoomsMock.convertedData.GENERAL as unknown as IAppsRoom;
			const yaschatRoom = await roomConverter.convertAppRoom(appRoom);

			expect(yaschatRoom).to.have.property('_id', appRoom.id);
			expect(yaschatRoom).to.have.property('ts', appRoom.createdAt);
			expect(yaschatRoom).to.have.property('lm', appRoom.lastModifiedAt);
			expect(yaschatRoom).to.have.property('_updatedAt', appRoom.updatedAt);
			expect(yaschatRoom).to.have.property('t', appRoom.type);
			expect(yaschatRoom).to.have.property('name', appRoom.slugifiedName);
		});

		it('should return a proper schema when receiving a partial object', async () => {
			const appRoom = RoomsMock.convertedData.GENERALPartial as unknown as IAppsRoom;
			const yaschatRoom = await roomConverter.convertAppRoom(appRoom, true);

			expect(yaschatRoom).to.have.property('_id', appRoom.id);
			expect(yaschatRoom).to.have.property('name', appRoom.slugifiedName);
			expect(yaschatRoom).to.have.property('sysMes', appRoom.displaySystemMessages);
			expect(yaschatRoom).to.have.property('_updatedAt', appRoom.updatedAt);

			expect(yaschatRoom).to.not.have.property('msgs');
			expect(yaschatRoom).to.not.have.property('ro');
			expect(yaschatRoom).to.not.have.property('default');
			expect(yaschatRoom).to.not.have.property('t');
		});

		it('should return a proper schema when receiving a partial object', async () => {
			const appRoom = RoomsMock.convertedData.GENERALPartialWithOptionalProps as unknown as IAppsRoom;
			const yaschatRoom = await roomConverter.convertAppRoom(appRoom, true);

			expect(yaschatRoom).to.have.property('_id', appRoom.id);
			expect(yaschatRoom).to.have.property('name', appRoom.slugifiedName);
			expect(yaschatRoom).to.have.property('sysMes', appRoom.displaySystemMessages);
			expect(yaschatRoom).to.have.property('_updatedAt', appRoom.updatedAt);
			expect(yaschatRoom).to.have.property('msgs', appRoom.messageCount);
			expect(yaschatRoom).to.have.property('t', 'c');

			expect(yaschatRoom).to.not.have.property('ro');
			expect(yaschatRoom).to.not.have.property('default');
		});

		it('should not include properties that are not present in the app room', async () => {
			const appRoom = RoomsMock.convertedData.UpdatedRoom as unknown as IAppsRoom;
			const yaschatRoom = await roomConverter.convertAppRoom(appRoom, true);

			expect(yaschatRoom).to.have.property('customFields');
			expect(yaschatRoom).to.not.have.property('_id');
			expect(yaschatRoom).to.not.have.property('t');
		});

		it('should not include name as undefined if the room doesnt have a name property', async () => {
			const appRoom = RoomsMock.convertedData.UpdatedRoom as unknown as IAppsRoom;
			const yaschatRoom = await roomConverter.convertAppRoom(appRoom, true);

			expect(yaschatRoom.name).to.be.undefined;
		});

		it('should include a name if the source room has slugifiedName property', async () => {
			const appRoom = RoomsMock.convertedData.GENERALPartialWithOptionalProps as unknown as IAppsRoom;
			const yaschatRoom = await roomConverter.convertAppRoom(appRoom, true);

			expect(yaschatRoom.name).to.equal(appRoom.slugifiedName);
		});

		it('should not use _unmappedProperties when the room is a partial object', async () => {
			const appRoom = RoomsMock.convertedData.GENERALPartialWithOptionalProps as unknown as IAppsRoom;
			// @ts-expect-error - _unmappedProperties
			const yaschatRoom = await roomConverter.convertAppRoom({ ...appRoom, _unmappedProperties_: { unmapped: 'property' } }, true);

			expect(yaschatRoom).to.not.have.property('unmapped');
		});

		it('should use _unmappedProperties when the room is a partial object', async () => {
			const appRoom = RoomsMock.convertedData.GENERALPartialWithOptionalProps as unknown as IAppsRoom;
			// @ts-expect-error - _unmappedProperties
			const yaschatRoom = await roomConverter.convertAppRoom({ ...appRoom, _unmappedProperties_: { unmapped: 'property' } }, false);

			expect(yaschatRoom).to.have.property('unmapped', 'property');
		});
	});
});

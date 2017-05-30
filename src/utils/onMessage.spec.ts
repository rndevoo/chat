/**
 * @overview
 * Unit tests of the message event helper functions.
 */

import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { v4 as uuid } from 'uuid';

import { verifyRecipient, sendMessage } from './onMessage';

chai.use(sinonChai);
const expect = chai.expect;

describe('verifyRecipient', async function () {
  let allowedUsers: Set<string>;
  /**
   * allowedUsersFail is intended to not contain userId, so we can tests
   * this scenario.
   */
  let allowedUsersFail: Set<string>;
  let userId: string;

  beforeEach(async function () {
    userId = uuid();
    allowedUsers = new Set([userId]);
    allowedUsersFail = new Set();
  });

  it('should resolve to true if user is allowed', async function () {
    const isAllowed: boolean = await verifyRecipient(allowedUsers, userId);

    expect(isAllowed).to.be.true;
  });

  it('should resolve to false if user is not allowed', async function () {
    const isAllowed: boolean = await verifyRecipient(allowedUsersFail, userId);

    expect(isAllowed).to.be.false;
  });
});

describe('sendMessage', async function () {
  it('should call the WebSocket .send function', async function () {
    const message = 'Tests are fun.';
    const recipientConnection = {
      send: sinon.spy(),
    };

    await sendMessage(message, recipientConnection as any);

    expect(recipientConnection.send).to.have.been.called;
  });
});

/**
 * @overview
 * Unit tests of the message event helper functions.
 */
'use strict';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import uuid from 'uuid/v4';

import { verifyRecipient, sendMessage } from './onMessage';

chai.use(sinonChai);
const expect = chai.expect;

describe('verifyRecipient', async function () {
  let allowedUsers;
  /**
   * allowedUsersFail is intended to not contain userId, so we can tests
   * this scenario.
   */
  let allowedUsersFail;
  let userId;

  beforeEach(async function () {
    userId = uuid();
    allowedUsers = new Set([userId]);
    allowedUsersFail = new Set();
  });

  it('should resolve to true if user is allowed', async function () {
    const isAllowed = await verifyRecipient(allowedUsers, userId);

    expect(isAllowed).to.be.true;
  });

  it('should resolve to false if user is not allowed', async function () {
    const isAllowed = await verifyRecipient(allowedUsersFail, userId);

    expect(isAllowed).to.be.false;
  });
});

describe('sendMessage', async function () {
  it('should call the WebSocket .send function', async function () {
    const message = 'Tests are fun.';
    const recipientConnection = {
      send: sinon.spy(),
    };

    await sendMessage(message, recipientConnection);

    expect(recipientConnection.send).to.have.been.called;
  });
});

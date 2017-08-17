'use strict';

const assert = require('assert');

/**
 * Mock action receiving input from normalize-channel-for-conversation,
 *   and sending a text Conversation response to normalize-conversation-for-channel.
 *
 * @param  {JSON} params - input with Conversation (call-conversation) input
 * @return {JSON}        - text output from Conversation (call-conversation)
 */
function main(params) {
  return new Promise(resolve => {
    validateParameters(params);

    const returnParameters = {
      conversation: {
        output: {
          text: ['Output text from mock-convo.']
        },
        context: {
          conversation_id: '06aae48c-a5a9-4bbc-95eb-2ddd26db9a7b',
          system: {
            branch_exited_reason: 'completed',
            dialog_request_counter: 1,
            branch_exited: true,
            dialog_turn_counter: 1,
            dialog_stack: [
              {
                dialog_node: 'root'
              }
            ],
            _node_output_map: {
              'Anything else': [0]
            }
          }
        }
      },
      raw_input_data: params.raw_input_data
    };
    returnParameters.raw_input_data.conversation = params.conversation;
    resolve(returnParameters);
  });
}

/**
 * Validates the required parameters for running this action.
 *
 * @param  {JSON} params - the parameters passed into the action
 */
function validateParameters(params) {
  // Required: Conversation object
  assert(params.conversation, 'Conversation data not provided.');

  // Required: Conversation input text
  assert(
    params.conversation.input && params.conversation.input.text,
    'Input text not provided.'
  );

  // Required: channel raw data
  assert(
    params.raw_input_data &&
      params.raw_input_data.provider &&
      params.raw_input_data[params.raw_input_data.provider],
    'No channel raw input data provided.'
  );
}

module.exports = main;

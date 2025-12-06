import * as types from '../types';

const initialState: types.ContactState = {
  submitting: false,
  submitted: false,
  error: null,
  ticketId: null,
};

interface ContactAction {
  type: string;
  payload?: string;
}

const contactReducer = (
  state = initialState,
  action: ContactAction
): types.ContactState => {
  switch (action.type) {
    case types.SUBMIT_CONTACT_REQUEST:
      return {
        ...state,
        submitting: true,
        error: null,
        submitted: false,
      };
    case types.SUBMIT_CONTACT_SUCCESS:
      return {
        ...state,
        submitting: false,
        submitted: true,
        ticketId: action.payload || null,
        error: null,
      };
    case types.SUBMIT_CONTACT_FAILURE:
      return {
        ...state,
        submitting: false,
        error: action.payload || 'Failed to submit contact form',
        submitted: false,
      };
    case types.CLEAR_CONTACT_STATUS:
      return initialState;
    default:
      return state;
  }
};

export default contactReducer;

import React from 'react'

export const initialState = {
    nav: {
        bubble: {
            active: true,
            hasMessage: false
        },
        connector: {
            active: false,
            hasMessage: false
        }
    },
    middle: {
        select: '',
        rooms: [
            {
                id: '1',
                name: '',
                people: [
                    {
                        phone: '123456701'
                    },
                    {
                        phone: '123456702'
                    }
                ]
            }
        ],
        chats: [
        ],
        connectors: [
            {
                phone: '12345678901'
            },
            {
                phone: '12345678902'
            },
            {
                phone: '12345678903'
            },
            {
                phone: '12345678904'
            },
            {
                phone: '12345678905'
            },
            {
                phone: '12345678906'
            },
            {
                phone: '12345678907'
            },
            {
                phone: '12345678908'
            }
        ]
    },
    main: {
        type: 'bubble', // connector
        room: {
            id: 1
        },
        connector: {
            phone: '12345678901'
        }
    }
};

export const BUBBLE_TYPE = 'bubble';
export const CONNECTOR_TYPE = 'connector'
export const SELECT_CONNECTOR = 'select-connector'
export const SEND_MESSAGE = 'send-message'
export const SET_ACCOUNT = 'set-account'
  
export function reducer(state, action) {
    console.log(action.type)
    switch (action.type) {
        case SEND_MESSAGE: {
            const { connector } = action.data
            state.nav.bubble.active = true;
            state.nav.connector.active = false;
            state.main.type = 'bubble'
            state.middle.select = connector;
            state.middle.chats.push({
                phone: connector
            })
            return {
                ...state
            }
        }
        case SELECT_CONNECTOR: {
            state.nav.bubble.active = false;
            state.nav.connector.active = true;
            state.main.type = 'connector'
            state.main.connector.phone = action.data.phone
            return {
                ...state
            }
        }
        case BUBBLE_TYPE: {
            state.nav.bubble.active = true;
            state.nav.connector.active = false;
            return {
                ...state
            }
        }
        case CONNECTOR_TYPE: {
            state.nav.bubble.active = false;
            state.nav.connector.active = true;
            return {
                ...state
            }
        }
        default: 
            return initialState;
    }
}

export const ChatContext = React.createContext(null);
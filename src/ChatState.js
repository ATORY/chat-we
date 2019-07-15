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
            {
                phone: '12345678901',
                chat: []
            }
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
export const SELECT_CHAT = 'select-chat'
export const ON_MESSAGE = 'on-message'
export const ON_FEEDBACK = 'on-feedback'
  
export function reducer(state, action) {
    console.log(action.type)
    switch (action.type) {

        case ON_FEEDBACK: {
            const { msg } = action.data;
            const { to } = msg;
            const chat = state.middle.chats.find(item => item.phone === to)
            if (!chat) {
                state.middle.chats.push({
                    phone: to,
                    chat: [{
                        msg
                    }]
                })
            }else {
                chat.chat.push({msg})
            }
            return {
                ...state
            }
        }
        case ON_MESSAGE: {
            const { msg } = action.data;
            console.log(ON_MESSAGE, msg)
            const { from } = msg;
            const chat = state.middle.chats.find(item => item.phone === from)
            if (!chat) {
                state.middle.chats.push({
                    phone: from,
                    chat: [{
                        msg
                    }]
                })
            }else {
                chat.chat.push({msg})
            }
            return {
                ...state
            }
        }
        case SELECT_CHAT: {
            const { select } = action.data
            state.middle.select = select;
            return {
                ...state
            }
        }
        case SEND_MESSAGE: {
            const { connector } = action.data
            state.nav.bubble.active = true;
            state.nav.connector.active = false;
            state.main.type = 'bubble'
            state.middle.select = connector;
            if (!state.middle.chats.find(item => item.phone === connector))
                state.middle.chats.push({
                    phone: connector,
                    chat: []
                })
            return {
                ...state
            }
        }
        case SELECT_CONNECTOR: {
            state.nav.bubble.active = false;
            state.nav.connector.active = true;
            state.middle.select = action.data.phone;
            state.main.type = 'connector';
            state.main.connector.phone = action.data.phone;
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
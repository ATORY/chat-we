import io from 'socket.io-client';

import { watchSocketStatus } from '../actions/socketStatus'
// import { ON_MESSAGE, ON_FEEDBACK } from '../constants'

export default function InitSocket(phone) {

  const socket = io(`http://localhost:9877?phone=${phone}`, {
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 2 * 1000,
    autoConnect: true
  });

  socket.on('connect', () => {
    watchSocketStatus('connect')
    socket.on('hello', (msg) => {
      console.log({ msg })
    })
    socket.on('chat', msg => {
      // dispatch({ type: ON_MESSAGE, data: { msg } })
      // console.log('chat', msg)
    })
    socket.on('chat-feedback', msg => {
      // dispatch({ type: ON_FEEDBACK, data: { msg } })
      // console.log('chat-feedback', msg)
    })
    console.log({ connected: socket.connected }); // true
  });

  socket.on('connect_error', (msg) => {
    watchSocketStatus('connect_error')
    // console.log({ msg })
  })

  socket.on('connect_timeout', () => {
    watchSocketStatus('connect_timeout')
  })

  socket.on('reconnect', (attemptNumber) => {
    watchSocketStatus('reconnect:' + attemptNumber)
    // console.log({ attemptNumber })
  });

  socket.on('reconnect_attempt', () => {
    watchSocketStatus('reconnect_attempt')
  });

  socket.on('reconnecting', () => {
    watchSocketStatus('reconnecting')
  });

  socket.on('reconnect_error', (error) => {
    watchSocketStatus('reconnect_error')
    // console.log('reconnecting..')
  });

  socket.on('reconnect_failed', (error) => {
    watchSocketStatus('reconnect_failed...')
    // console.log('reconnect_failed..')
  });

  return socket;
}
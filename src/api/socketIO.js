import io from 'socket.io-client';

import {
  watchSocketStatus,
  onSocketMessages,
  onRoomJioned
} from '../actions/socketStatus'
// import { ON_MESSAGE, ON_FEEDBACK } from '../constants'

export default function InitSocket({ phone }) {

  const socket = io(`http://localhost:9877?phone=${phone}`, {
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 2 * 1000,
    autoConnect: true
  });

  socket.on('connect', () => {
    watchSocketStatus('connect')
    
    socket.on('message', msg => {
      onSocketMessages(msg)
    })
    // 加入房间
    socket.on('roomJoined', (msg) => {
      onRoomJioned(msg)
    })

    socket.on('message-feedback', msg => {
      console.log('chat-feedback', msg)
    })
    // socket.emit("joinRoom", { roomId: 'w2gnst2o7dj' });
    console.log({ connected: socket.connected }); // true
  });

  socket.on('error', function(err) {
    // console.error(err)
    if (err === 'Authentication error') {
      console.log('setPhone')
    }
  });

  socket.on('connect_error', (msg) => {
    watchSocketStatus('connect_error')
    // console.log({ msg })
  })

  socket.on('connect_timeout', () => {
    watchSocketStatus('connect_timeout')
  })

  socket.on("disconnect", msg => {
    socket.off('roomJoined')
    socket.off('message')
    console.log('disconnect...');
  });

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

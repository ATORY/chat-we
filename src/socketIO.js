import io from 'socket.io-client';

export default function InitSocket(phone, {dispatch, watchSocketStatus}) {

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
    watchSocketStatus('reconnecting...')
    // console.log('reconnecting..')
  });

  socket.on('reconnect_failed', (error) => {
    watchSocketStatus('reconnect_failed...')
    // console.log('reconnect_failed..')
  });

  return socket;
}
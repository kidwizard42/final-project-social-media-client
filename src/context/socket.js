import React from 'react'
import socketio from "socket.io-client";

// import { SOCKET_URL } from "config";

// const herokuSiteSocket = "https://floating-reaches-19985.herokuapp.com/";
// const localhostSocket = "http://localhost:3003/";

export const socket = socketio.connect("http://localhost:3003/");
export const SocketContext = React.createContext();

// got this file from site below. did not use useCallback but i should learn how.
// https://dev.to/bravemaster619/how-to-use-socket-io-client-correctly-in-react-app-o65
// QUOTE "You may forget (or don't bother) to use useCallback. But you may face serious 
// performance issues if there are many states and components in your project"
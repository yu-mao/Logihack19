import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  SpotLight,
  View,
  Cylinder,
  Box,
  Sphere,
  MediaPlayerState,
  NativeModules,
} from 'react-vr';
import Forest from './components/Forest';
import SoundShape from './components/SoundShape';

importScripts('https://js.pusher.com/4.1/pusher.worker.min.js');

const Location = NativeModules.Location;

export default class musical_exp_react_vr_pusher extends React.Component {

  constructor(props) {
    super(props);

    this.config = [
      {sound: asset('sounds/1.mp3'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/2.mp3'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/3.mp3'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/4.mp3'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/5.wav'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/6.mp3'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/7.mp3'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/8.mp3'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/9.mp3'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/10.mp3'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/11.mp3'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/12.wav'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/13.mp3'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/14.wav'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/15.mp3'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/16.mp3'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/17.mp3'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/18.mp3'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/19.mp3'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/20.mp3'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/21.wav'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/22.mp3'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/23.wav'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/24.mp3'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/25.mp3'), playerState: new MediaPlayerState({})},
      {sound: asset('sounds/26.wav'), playerState: new MediaPlayerState({})},
    ];
  }

//  appId: '870765',
// key: '4d63dacb05bcf4da1d92',
// secret: 'e429060f4cc667f02bf8',


  componentWillMount() {
	  const pusher = new Pusher('4d63dacb05bcf4da1d92', {
        cluster: 'eu',
		encrypted: true,
	  });
      this.socketId = null;
      pusher.connection.bind('connected', () => {
        this.socketId = pusher.connection.socket_id;
      });
	  this.channelName = 'channel-' + this.getChannelId();
	  const channel = pusher.subscribe(this.channelName);
	  channel.bind('sound_played',  (data) => {
	    this.config[data.index].playerState.play();
	    console.log('play from pusher ' + data.index);
	  });
  }

  getChannelId() {
	  let channel = this.getParameterByName('channel', Location.href);
	  if(!channel) {
		  channel = 0;
	  }

	  return channel;
  }

  getParameterByName(name, url) {
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  onShapeClicked(index) {
    this.config[index].playerState.play();
    console.log('play ' + index);
    fetch('http://localhost:5000/pusher/trigger', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        index: index,
        socketId: this.socketId,
        channelName: this.channelName,
      })
    });
  }

  render() {
	const shapes = [
    <Cylinder
      radiusTop={0.2}
      radiusBottom={0.2}
      dimHeight={0.3}
      segments={8}
      lit={true}
      style={{
        color: '#96ff00',
        transform: [{translate: [-4,-0.2,3]}, {rotateX: 30}],
      }}
    />,
    <Cylinder
      radiusTop={0}
      radiusBottom={0.2}
      dimHeight={0.3}
      segments={4}
      lit={true}
      style={{
        color: '#96de4e',
        transform: [{translate: [-3.5,-0.5,3]}, {rotateX: 30}],
      }}
    />,
    <Box
      dimWidth={0.2}
      dimDepth={0.2}
      dimHeight={0.2}
      lit={true}
      style={{
        color: '#a0da90',
        transform: [{translate: [-3,-0.5,2]}, {rotateX: 30}],
      }}
    />,
    <Box
      dimWidth={0.4}
      dimDepth={0.2}
      dimHeight={0.2}
      lit={true}
      style={{
        color: '#b7dd60',
        transform: [{translate: [-2,-0.5,1]}, {rotateX: 30}],
      }}
    />,
     <Cylinder
        radiusTop={0.2}
        radiusBottom={0.2}
        dimHeight={0.3}
        segments={8}
        lit={true}
        style={{
          color: '#96ff00',
          transform: [{translate: [-1.5,-0.2,1]}, {rotateX: 30}],
        }}
      />,
      <Sphere
        radius={0.15}
        widthSegments={20}
        heightSegments={12}
        lit={true}
        style={{
          color: '#E12F7C',
          transform: [{translate: [-1.5,-0.2,1]}, {rotateX: 30}],
        }}
      />,
      <Cylinder
        radiusTop={0.2}
        radiusBottom={0.2}
        dimHeight={0.3}
        segments={8}
        lit={true}
        style={{
          color: '#96ff00',
          transform: [{translate: [-1.3,-0.2,0.5]}, {rotateX: 30}],
        }}
      />,
      <Sphere
        radius={0.15}
        widthSegments={20}
        heightSegments={12}
        lit={true}
        style={{
          color: '#FF0000',
          transform: [{translate: [-1,-0.2,0]}, {rotateX: 30}],
        }}
      />,
      <Cylinder
        radiusTop={0.2}
        radiusBottom={0.2}
        dimHeight={0.3}
        segments={8}
        lit={true}
        style={{
          color: '#96ff00',
          transform: [{translate: [-1,0.1,-0.5]}, {rotateX: 30}],
        }}
      />,
      <Sphere
        radius={0.15}
        widthSegments={20}
        heightSegments={12}
        lit={true}
        style={{
          color: '#E12F7C',
          transform: [{translate: [-1.2,0.2,-1]}, {rotateX: 30}],
        }}
      />,
      <Cylinder
        radiusTop={0}
        radiusBottom={0.2}
        dimHeight={0.3}
        segments={4}
        lit={true}
        style={{
          color: '#96de4e',
          transform: [{translate: [-1,-0.5,-2]}, {rotateX: 30}],
        }}
      />,
      <Box
        dimWidth={0.2}
        dimDepth={0.2}
        dimHeight={0.2}
        lit={true}
        style={{
          color: '#a0da90',
          transform: [{translate: [-0.5,-0.5,-2]}, {rotateX: 30}],
        }}
      />,
      <Box
        dimWidth={0.4}
        dimDepth={0.2}
        dimHeight={0.2}
        lit={true}
        style={{
          color: '#b7dd60',
          transform: [{translate: [0,-0.5,-2]}, {rotateX: 30}],
        }}
      />,
      <Sphere
        radius={0.15}
        widthSegments={20}
        heightSegments={12}
        lit={true}
        style={{
          color: '#cee030',
          transform: [{translate: [0.5,-0.5,-2]}, {rotateX: 30}],
        }}
      />,
      <Cylinder
        radiusTop={0.2}
        radiusBottom={0.2}
        dimHeight={0.3}
        segments={3}
        lit={true}
        style={{
          color: '#e6e200',
          transform: [{translate: [1,-0.2,-2]}, {rotateX: 30}],
        }}
      />,
      <Cylinder
        radiusTop={0.2}
        radiusBottom={0.2}
        dimHeight={0.3}
        segments={8}
        lit={true}
        style={{
          color: '#96ff00',
          transform: [{translate: [1,0.2,-2]}, {rotateX: 30}],
        }}
      />,
      <Cylinder
        radiusTop={0}
        radiusBottom={0.2}
        dimHeight={0.3}
        segments={4}
        lit={true}
        style={{
          color: '#96de4e',
          transform: [{translate: [1,0.5,-1]}, {rotateX: 30}],
        }}
      />,
      <Sphere
        radius={0.15}
        widthSegments={20}
        heightSegments={12}
        lit={true}
        style={{
          color: '#cee030',
          transform: [{translate: [1,0.5,0]}, {rotateX: 30}],
        }}
      />,
      <Box
        dimWidth={0.4}
        dimDepth={0.2}
        dimHeight={0.2}
        lit={true}
        style={{
          color: '#b7dd60',
          transform: [{translate: [1,0.5,1]}, {rotateX: 30}],
        }}
      />,
      <Box
        dimWidth={0.2}
        dimDepth={0.2}
        dimHeight={0.2}
        lit={true}
        style={{
          color: '#a0da90',
          transform: [{translate: [1,0.2,2]}, {rotateX: 30}],
        }}
      />,
      <Sphere
        radius={0.15}
        widthSegments={20}
        heightSegments={12}
        lit={true}
        style={{
          color: '#cee030',
          transform: [{translate: [1,0.2,2.5]}, {rotateX: 30}],
        }}
      />,
      <Box
        dimWidth={0.4}
        dimDepth={0.2}
        dimHeight={0.2}
        lit={true}
        style={{
          color: '#b7dd60',
          transform: [{translate: [1,0.2,3]}, {rotateX: 30}],
        }}
      />,
      <Sphere
        radius={0.15}
        widthSegments={20}
        heightSegments={12}
        lit={true}
        style={{
          color: '#cee030',
          transform: [{translate: [1,0.5,4]}, {rotateX: 30}],
        }}
      />,
      <Sphere
        radius={0.15}
        widthSegments={20}
        heightSegments={12}
        lit={true}
        style={{
          color: '#cee030',
          transform: [{translate: [1,0.5,4.5]}, {rotateX: 30}],
        }}
      />,
      <Cylinder
        radiusTop={0.2}
        radiusBottom={0.2}
        dimHeight={0.3}
        segments={3}
        lit={true}
        style={{
          color: '#e6e200',
          transform: [{translate: [4,-0.2,5]}, {rotateX: 30}],
        }}
      />
	];

    return (
      <View>
        <Pano source={asset('images/music-background.jpg')} />

		<Forest trees={100} perimeter={15} colors={['#e5ed4c', '#f7fcfc', '#fcd7fc']} />

        <SpotLight intensity={1} style={{transform: [{translate: [1, 4, 4]}],}} />

		{shapes.map((shape, index) => {
			return (
		      <SoundShape
			    key={index}
		        onClick={() => this.onShapeClicked(index)}
		        sound={this.config[index].sound}
			    playerState={this.config[index].playerState}>
				  {shape}
              </SoundShape>
		  );
		})}
      </View>
    );
  }
};

AppRegistry.registerComponent('musical_exp_react_vr_pusher', () => musical_exp_react_vr_pusher);

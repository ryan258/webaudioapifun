// Create the audio context, where the sound will live
var audioContext = new AudioContext();

// Create an oscillator node
var context = new AudioContext(),
  oscillator = context.createOscillator();

// Connect the oscillator to our speakers
oscillator.connect(context.destination);

// Start the oscillator now
// oscillator.start(context.currentTime);

// Stop the oscillator 3 seconds from now
// oscillator.stop(context.currentTime + 3);

// PLAYING FROM AN MP3
// use audio file, only works on live
var request = new XMLHttpRequest();

request.open('GET', 'tunes/mediocrity.mp3', true);
request.responseType = 'arraybuffer';

request.onload = function () {
	var undecodedAudio = request.response;

	context.decodeAudioData(undecodedAudio, function (buffer) {
		// The contents of our mp3 are now an AudioBuffer
		console.log(buffer);
		// Create the AudioBufferSourceNode
		var sourceBuffer = context.createBufferSource();
		// Tell the AudioBufferSourceNode to use this AudioBuffer
		sourceBuffer.buffer = buffer; // The record is in the player and ready to play
		// Connect it to speakers
		sourceBuffer.connect(context.destination);
		// PLAY IT!
		sourceBuffer.start(context.currentTime);
	});
};

request.send();
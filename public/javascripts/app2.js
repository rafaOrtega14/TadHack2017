var SkylinkDemo = new Skylink();

//--------
SkylinkDemo.on('mediaAccessSuccess', function(stream) {
  console.log("mediaAccessSuccess");
  //attachMediaStream(document.getElementById("myVideo"), stream);
});
//--------
SkylinkDemo.on('incomingStream', function(peerId, stream, isSelf, peerInfo) {
    if (!isSelf) {
      DOMRemoteVideo = document.getElementById("remote_" + peerId);

      if (!DOMRemoteVideo) {
        DOMRemoteVideo = document.getElementsByClassName("vid")[0];
        if (window.webrtcDetectedBrowser !== 'IE') {
          DOMRemoteVideo.setAttribute("autoplay", "autoplay");
        }
        DOMRemoteVideo.setAttribute("id", "remote_vSqP0BTXsEWUive2AAG2");
        DOMRemoteVideo.onclick = function() {
          SkylinkDemo.refreshConnection(peerId);
        };
      }
      attachMediaStream(DOMRemoteVideo, stream);
  }
});
//--------
SkylinkDemo.on('streamEnded', function(peerID, peerInfo, isSelf) {
  if (!isSelf) {
    console.log("streamEnded");
    var DOMvideo = document.getElementById("remote_" + peerID);
    // fix for domvideo not defined
    if (DOMvideo) {
      var DOMcontainer = document.getElementById("remoteContainer");
      DOMvideo.src = '';
      DOMcontainer.removeChild(DOMvideo);
    }
  }

});
//--------
SkylinkDemo.on('peerLeft', function(peerID) {
  console.log("peerLeft");
  var DOMvideo = document.getElementById("remote_" + peerID);
  // fix for domvideo not defined
  if (DOMvideo) {
    var DOMcontainer = document.getElementById("remoteContainer");
    DOMvideo.src = '';
    DOMcontainer.removeChild(DOMvideo);
  }
});

  SkylinkDemo.init(config, function (error, success) {
    if (success) {
      SkylinkDemo.joinRoom({
        audio: true,
        video: true
      });
    }
  });

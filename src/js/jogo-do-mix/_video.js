;(function() {

  if (!$('#jogo-do-mix').length) {
    return;
  }


  var ua = navigator.userAgent.toLowerCase(); 
  

  var jogoDoMix;
  var playPause = $('#main-jogo-timeline-biografia #play-pause');
  getDataJogoDoMix();

  // Video
  var videos = [
    $('#main-jogo-timeline-biografia #video1')[0],
    $('#main-jogo-timeline-biografia #video2')[0],
    $('#main-jogo-timeline-biografia #video3')[0],
    $('#main-jogo-timeline-biografia #video4')[0],
  ];

  // Attr video idx
  var counter = -1;

  $('#main-jogo-timeline-biografia .controls li').each(function(){
    $(this).find('input').attr('video', counter);
    counter++;
  });


  $('body').on('click', '.menu button', function() {
    var itemId = $(this).attr('id');
    setJogo(itemId);
    $('#jogo-do-mix .song').removeClass('active');
    $('#' + itemId).addClass('active');
  });

  function getDataJogoDoMix(itemId) {

    $.get("../assets/data/jogo-do-mix.json", function(data) {
      if ( typeof data == 'string' ) {
        jogoDoMix = JSON.parse( data );
      } else {
        jogoDoMix = data;
      }

      setupVideos(jogoDoMix, 0);
      setupMenu(jogoDoMix);
    });
  };

  function setJogo(itemId) {
    var index = jogoDoMix.findIndex(x => x.id == itemId);
    setupVideos(jogoDoMix, index);
  }

  function setupMenu(Data) {

    var menuItems = [];
    var songIndex;

    for (var i = 0; i < Data.length; i++) {

      if(i == 0) {
        songIndex = 'active';
      } else {
        songIndex = '';
      }

      var Item = (Data[i]);

      var menuItem = $(
          '<button id="'+ Item.id +'" class="song ' + songIndex + '">' +
            Item.compositor +
            '<span class="music">' +
              Item.musica +
            '</span>' +
          '</button>'
      );
      menuItems.push(menuItem);
    }
    $('#main-jogo-timeline-biografia #jogo-do-mix .menu').html(menuItems);
  }

  function setupVideos(data, current) {

    //playPause.removeClass('pause');
    //playPause.addClass('play');

    $("#video1").attr("src", '../assets/videos/' + data[current].video1);
    $("#video2").attr("src", '../assets/videos/' + data[current].video2);
    $("#video3").attr("src", '../assets/videos/' + data[current].video3);
    $("#video4").attr("src", '../assets/videos/' + data[current].video4);
    $(".instrument1").html(data[current].video1Instrumento);
    $(".instrument2").html(data[current].video2Instrumento);
    $(".instrument3").html(data[current].video3Instrumento);
    $(".instrument4").html(data[current].video4Instrumento);

  }

  // Play and pause click
  playPause.on('click', function(){
		if (videos[0].paused == false) {
			pause();
		} else {
			play();
  	}
  });

  // Stop click
  $('#main-jogo-timeline-biografia #stop').on('click', function(){
  	for (var i = 0; i < videos.length; i++) {
			videos[i].pause();
			videos[i].currentTime = 0;
    }

    $('#play-pause').removeClass('pause');
    $('#play-pause').addClass('play');
  });

  // Play, pause and stop functions
  function play() {
    for (var i = 0; i < videos.length; i++) {
      videos[i].play();
    }
    playPause.removeClass('play');
    playPause.addClass('pause');
  }

  function pause() {
    for (var i = 0; i < videos.length; i++) {
      videos[i].pause();
    }
    playPause.removeClass('pause');
    playPause.addClass('play');
  }

  function end() {
    $('video').on('ended', function(){
      play();
    });
  }

  // Volume and video opacity
  var range = $('input');

	range.bind('input', function() {

		var vol = $(this).val();
		var value = vol * 100;

		var volContainer = $(this).parent().find('.vol_bar');
		var bar = volContainer.find('.bar');
		var drag = volContainer.find('.drag');

		var idx = $(this).attr('video');
    var video = videos[idx];
    var volume = video.volume;


		$(this).parent().find('p span').text(vol + ' ' + value);
		bar.css('width', value +'%');

		if (value == 0) {
			drag.css('left', 0 +'%');
		} else {
			drag.css('left', 'calc(' + value + '% - 10px)');
		}
		video.volume = vol;
		video.style.opacity = vol;
	});

})();
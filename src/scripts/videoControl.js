$(function(){

    let interval;
    let sec = 1000;
    let video = document.getElementById("barVideo");
    let volume = 0.8;
    let volumePx = 36;
    let currentVolume = volume;
    let pointSize = $('.volume__point')[0].clientWidth;

    function playVideo(playControl){
        playControl.classList.add("player__play--pause");
        $('.video__fone')[0].style.display = 'none';
        $('.video__control--big-white')[0].classList.remove('active');
        video.play();
        interval = setInterval(() => {
            $('.duration__point')[0].style.marginLeft = (video.currentTime/video.duration)*$('.player__duration')[0].clientWidth + "px";
        }, sec);
    }

    function pauseVideo(pauseControl) {
        pauseControl.classList.remove('player__play--pause');
        $('.video__fone')[0].style.display = 'block';
        $('.video__control--big-white')[0].classList.add('active');
        video.pause();
        clearInterval(interval);
    }

    function turnOffTheSound() {
        if(currentVolume != 0){
            video.volume = 0;
            currentVolume = 0;
            $('.volume__point')[0].style.marginLeft = "0px";
        } else {
            currentVolume = volume;
            video.volume = currentVolume;
            $('.volume__point')[0].style.marginLeft = volumePx;
        }
    }

    function setVolume(newVolume, durationPx){
        $('.volume__point')[0].style.marginLeft = durationPx - pointSize + "px";
        volumePx = durationPx - pointSize + "px";
        currentVolume = newVolume;
        video.volume = currentVolume;
    }

    $('.player__volume-value').on('click', e => {
        let clickOnRankPx = e.offsetX;
        let allWidthVolumeDuration = parseInt($('.player__volume-value')[0].clientWidth);
        let rank = (clickOnRankPx/allWidthVolumeDuration).toFixed(1);
        setVolume(rank, clickOnRankPx);
    });

    $('.player__volume-icon').on('click', e => {
        turnOffTheSound();
    });

    $('.video__control--big-white').on('click', function(e){
        playVideo(document.getElementById("barVideo"), $('.player__play')[0]);
    });

    $('.video__control').on('click', function(e){
        switch(e.target.className){
            case 'player__play' : 
                playVideo(e.target);
                break;
            case 'player__play player__play--pause' :
                pauseVideo(e.target);
                break;
        }
    });

    $('.player__duration').on('click', function(e){
        const perc = e.offsetX*100/$('.player__duration')[0].clientWidth;
        video.currentTime = perc*video.duration/100;
        playVideo($('.player__play')[0]);
    });
});
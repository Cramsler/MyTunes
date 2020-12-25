export const videoPlayerInit = () => {

    //Получение элементов видеоплеера по классам
    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoVolume = document.querySelector('.video-volume');
    const videoMute = document.querySelector('.video-icon-mute');
    const videoFullscreen = document.querySelector('.video-fullscreen');

    //Функция смены иконок "плей" и "пауза"
    const iconToggle = () => {

        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.remove('fa-play');
            videoButtonPlay.classList.add('fa-pause');
        }

    };

    //Запуск и пауза видеоплеера
    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    //Остановка плеера
    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    //счетчик времени
    const timeUpdate = () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        let minutePassed = Math.floor(currentTime / 60);
        let secondPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60);
        let secondTotal = Math.floor(duration % 60);

        //Добавление нуля в счетчик времени
        const addZero = n => n < 10 ? '0' + n : n;

        //отображение прогресса
        videoProgress.value = (currentTime / duration) * 100;

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondTotal)}`;
    };

    //изминение прогресса при клике на дорожку
    const changeVideoTime = () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    };

    //регулировка громкости
    const changeVideoVolume = () => {
        const value = videoVolume.value;
        videoPlayer.volume = value / 100;
    };

    //Выключение звука
    const mute = () => {
        if(videoPlayer.muted == false)
        {
            videoPlayer.muted = true;
        } else {
            videoPlayer.muted = false;
        }
    };

    videoPlayer.addEventListener('click', togglePlay);

    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', iconToggle);

    videoPlayer.addEventListener('pause', iconToggle);

    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', timeUpdate);

    videoProgress.addEventListener('input', changeVideoTime);

    videoVolume.addEventListener('input', changeVideoVolume);

    changeVideoVolume();

    videoMute.addEventListener('click', mute);

    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    videoPlayerInit.stop = () => {
        videoPlayer.pause();
        iconToggle();
    };

};

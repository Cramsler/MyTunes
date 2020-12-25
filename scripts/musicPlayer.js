export const musicPlayerInit = () => {
  
    const audio = document.querySelector('.audio');
   const audioImg = document.querySelector('.audio-img');
   const audioHeader = document.querySelector('.audio-header');
   const audioPlayer = document.querySelector('.audio-player');
   const audioButtonPlay = document.querySelector('.audio-button__play');
   const audioButtonNext = document.querySelector('.audio-button__next');
   const audioButtonPrev = document.querySelector('.audio-button__prev');
   const audioProgress = document.querySelector('.audio-progress');
   const audioProgressTiming = document.querySelector('.audio-progress__timing');
   const audioTimePassed = document.querySelector('.audio-time__passed');
   const audioTimeTotal = document.querySelector('.audio-time__total');
   const audioVolume = document.querySelector('.audio-volume');
   const audioMute = document.querySelector('.audio-icon-mute');

   //Создаем массив трков
   const playList = ['flow', 'hello', 'speed'];

   //Определяем начальный индекс трека
   let trackIndex = 0;

   const addZero = n => n < 10 ? '0' + n : n;

   //Загрузка следующего трека
   const loadTrack = () => {
       const isPlayed = audioPlayer.paused;
       const track = playList[trackIndex];

       audioHeader.textContent = track.toUpperCase();
       audioImg.src = `./audio/${track}.jpg`;
       audioPlayer.src = `./audio/${track}.mp3`;

       if(isPlayed)
       {
           audioPlayer.pause();
       } else {
           audioPlayer.play();
       }
   };

   //Запуск трека
   const trackPlay = () => {
       audio.classList.toggle('play');
       audioButtonPlay.classList.toggle('fa-play');
       audioButtonPlay.classList.toggle('fa-pause');

       if (audioPlayer.paused) {
           audioPlayer.play();
       } else {
           audioPlayer.pause();
       }
   };

   //Следующий трек
   const trackNext =() => {
       if(trackIndex === playList.length - 1)
       {
           trackIndex = 0;
       } else {
           trackIndex++;
       }

       loadTrack();
   };

   //Предыдущий трек
   const trackPrev = () => {
       if(trackIndex !== 0)
       {
           trackIndex--;
       } else {
           trackIndex = playList.length - 1;
       }

       loadTrack();
   };

   //Счетчик времени
   const updateTime = () => {
       const duration = audioPlayer.duration;
       const currentTime = audioPlayer.currentTime;
       const progress = (currentTime / duration) * 100;

       audioProgressTiming.style.width = progress + '%';

       const minutesPassed = Math.floor(currentTime / 60) || '0';
       const secondsPassed = Math.floor(currentTime % 60) || '0';

       const minuteTotal = Math.floor(duration / 60) || '0';
       const secondsTotal = Math.floor(duration % 60) || '0';

       audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
       audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;

   };

   //Регулеровка громкости
   const changeVolume = () => {
       const value = audioVolume.value;

       audioPlayer.volume = value / 100;
   };

   //Выключение звука
   const mute = () => {
    if(audioPlayer.muted == false)
        {
            audioPlayer.muted = true;
        } else {
            audioPlayer.muted = false;
        }
   };


   audioButtonPlay.addEventListener('click', trackPlay);

   audioButtonNext.addEventListener('click', trackNext);

   audioButtonPrev.addEventListener('click', trackPrev)

   audioPlayer.addEventListener('ended', () => {
       trackNext();
       audioPlayer.play();
   });

   audioPlayer.addEventListener('timeupdate', updateTime);

   audioProgress.addEventListener('click', event => {
       const x = event.offsetX;
       const allWidth = audioProgress.clientWidth;
       let progress = (x / allWidth) * audioPlayer.duration;
       audioPlayer.currentTime = progress;
   });

   audioVolume.addEventListener('input', changeVolume);

   loadTrack();

   //Отключение плеера при переходе по вкладкам
   musicPlayerInit.stop = () => {

        if(!audioPlayer.paused)
        {
            audioPlayer.pause();
            audio.classList.remove('play');
            audioButtonPlay.classList.remove('fa-pause');
            audioButtonPlay.classList.add('fa-play');
        }

    };

    audioMute.addEventListener('click', mute);

};

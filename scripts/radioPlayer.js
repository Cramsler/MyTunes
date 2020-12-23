export const radioPlayerInit = () => {
   const radio = document.querySelector('.radio');
   const radioCoverImg = document.querySelector('.radio-cover__img');
   const radioHeader = document.querySelector('.radio-header__big');
   const radioNavigation = document.querySelector('.radio-navigation');
   const radioItem = document.querySelectorAll('.radio-item');
   const radioStop = document.querySelector('.radio-stop');
   const radioVolume = document.querySelector('.radio-volume');
   const radioMute = document.querySelector('.radio-icon-mute');

   //Создание объекта класса аудио
   const audio = new Audio();

   radioStop.disabled = true;

   //удаление метки активной станции
   const deleteActiveItem = (elem) =>{
       radioItem.forEach(item => item.classList.remove('select'));

       elem.classList.add('select');
   };

   //смена иконки проигрователя
   const changeIcon = () => {
       if (audio.paused)
       {
            radioStop.classList.add('fa-play');

            radioStop.classList.remove('fa-pause');

            radio.classList.remove('play');

       } else {
            radioStop.classList.add('fa-pause');

            radioStop.classList.remove('fa-play');

            radio.classList.add('play');

            radioStop.disabled = false;
       }

   };

   //Запуск и остановка проигрователя
   const playOrStop = () => {
       if (audio.paused)
       {
           audio.play();

       } else {
           audio.pause();
       }
       changeIcon();
   };

   //Изменение громкости
   const changeRadioVolume = () => {
       const value = radioVolume.value;

       audio.volume = value / 100;
   };

   //Выключение звука
   const mute = () => {
       if(audio.muted == false)
       {
           audio.muted = true;
       } else {
           audio.muted = false;
       }
   };

   audio.type = 'audio/aac';

   radioNavigation.addEventListener('change', event => {

        const target = event.target;
        const parent = target.closest('.radio-item');
        const title = parent.querySelector('.radio-name').textContent;
        const img = parent.querySelector('.radio-img').src;

        radioCoverImg.src = img;

        radioHeader.textContent = title;

        audio.src = target.dataset.radioStantion;

        audio.play();

        deleteActiveItem(parent);

        changeIcon();

   });

   radioStop.addEventListener('click', playOrStop);

   radioVolume.addEventListener('input', changeRadioVolume);

   radioMute.addEventListener('click', mute);

   changeRadioVolume();


};
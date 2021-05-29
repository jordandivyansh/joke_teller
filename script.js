const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const jokeText = document.getElementById('jokeText');

//Disable/enable button
let toggleButton = () =>{
    button.disabled = !button.disabled;
   // console.log('disable button from toggle Button')
}


// passing jokeAPI data to VoiceRSS API
let tellMe = (joke) =>{
    VoiceRSS.speech({
        key: '12b830872dd548129a5a7da908fca0be',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes(){
    const apiURL = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,explicit';
    let joke = '';
    try {
        const response= await fetch(apiURL);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup}... ${data.delivery}`;
        }else{
            joke = data.joke;
        }
        tellMe(joke); //text to speech
        jokeText.innerText = joke;
        toggleButton(); //button re enable
    } catch (error) {
        console.log('it is an error -', error);
    }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);

let btnOpen = document.getElementById("open_btn");
let myModalForm = document.getElementById("add_form");
//

const { speechSynthesis } = window;

let en_voice = document.getElementById("en_voices");
let ua_voice = document.getElementById("ua_voices");

let btnSpeak = document.getElementById("speak_scuko");
let btnStopSpeak = document.getElementById("stop_speak_scuko");

function scrollToContainer() {
	let MySlide = myModalForm.classList.contains("is-open") ? myModalForm : document.body;

	setTimeout(() => {
		MySlide.scrollIntoView({ behavior: "smooth", block: "start" });
	}, 300);
}

function toggleClass(objForm) {
	return function () {
		objForm.classList.toggle("is-open");

		//if (objForm.classList.contains("is-open")) {
		scrollToContainer();
		//}
	};
}

//////////////////////////////////

let voices = [];

const getVoices = () => {
	return new Promise((resolve) => {
		const voices = speechSynthesis.getVoices();
		if (voices.length) {
			resolve(voices);
		} else {
			speechSynthesis.onvoiceschanged = () => resolve(speechSynthesis.getVoices());
		}
	});
};

const getVoicesArray = async () => {
	voices = await getVoices();

	const ua_voiceList = voices
		//.filter(voice => voice.lang === 'ru-RU')
		//.map((voice, index) => voice.lang === 'ru-RU' && `<option value=${index}>${voice.name} (${voice.lang})</option>`)
		.map((voice, index) => `<option value=${index}>${voice.name} (${voice.lang})</option>`)
		.join('');
	ua_voice.innerHTML = ua_voiceList;

	const en_voiceList = voices
		//.filter(voice => voice.lang === 'en-US')
		//.map((voice, index) => voice.lang === 'en-US' && `<option value=${index}>${voice.name} (${voice.lang})</option>`)
		.map((voice, index) => `<option value=${index}>${voice.name} (${voice.lang})</option>`)
		.join('');
	en_voice.innerHTML = en_voiceList;
}


function speak_activate() {
	return async function () {
		const fieldCount = document.getElementById("input_count").value;
		const fieldEnglish = document.getElementById("en_text").value;
		const fieldUA = document.getElementById("ua_text").value;

		const txtEnglish = fieldEnglish.trim().replace(/\//g, ".").split(/\r?\n/);
		const txtUA = fieldUA.trim().replace(/\//g, ".").split(/\r?\n/);

		if (txtEnglish.length === 0) {
			return;
		}

		if (!fieldCount || fieldCount <= 0) {
			return;
		}

		const En_speakVoice = voices[en_voice.value];
		const Ua_speakVoice = voices[ua_voice.value];

		for (let a = 0; a <= fieldCount; a++) {
			for (let i = 0; i < txtEnglish.length; i++) {
				// Чекаємо, поки текст прочитається
				await speak_scuko(txtEnglish[i], En_speakVoice);

				if (i < txtUA.length) {
					await speak_scuko(txtUA[i], Ua_speakVoice);
				}
			}
		}
	}
}

function speak_scuko(txtToSpeak, speakVoice, speakLang = "") {
	return new Promise((resolve) => {
		const msg = new SpeechSynthesisUtterance();
		msg.text = txtToSpeak;
		//speakLang === "" ? msg.voice = speakVoice : msg.lang = "uk-UA";
		if (speakLang) {
			msg.lang = speakLang;
		} else {
			msg.voice = speakVoice;
		}
		msg.rate = 0.6; // Швидкість (1 - стандартна)
		msg.pitch = 2; // Висота тону (1 - стандартна)

		msg.onend = resolve; // Викликається, коли промовляння завершене

		speechSynthesis.speak(msg);
	});
}

function stopSpeakScuko() {
	return function () {

		speechSynthesis.cancel();
		//console.log(222);

		//const msg = new SpeechSynthesisUtterance();
		//msg.text = "Знаю, що є купа схожих шарових сервісів і набагато якісніших, але ця робота для формування нових і закріплення існуюючих навичок у розробці.допомагати, перевіряти, просити, вибачатися, потребувати. ";
		//msg.lang = "uk-UA"; // Встановлюємо мову (українська)
		//msg.rate = 1; // Швидкість (1 - стандартна)
		//msg.pitch = 2; // Висота тону (1 - стандартна)

		//speechSynthesis.speak(msg);

	};
}

getVoicesArray();

//speechSynthesis.addEventListener('voiceschanged', getVoicesArray);
btnOpen.addEventListener("click", toggleClass(myModalForm));
btnSpeak.addEventListener("click", speak_activate());
btnStopSpeak.addEventListener("click", stopSpeakScuko());
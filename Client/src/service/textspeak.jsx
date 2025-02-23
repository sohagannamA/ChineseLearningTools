const detectLanguage = (text) => {
    if (/[\u4e00-\u9fff]/.test(text)) {
        return 'zh-CN'; // চীনা ভাষা
    } else if (/[\u0400-\u04FF]/.test(text)) {
        return 'ru-RU'; // রুশ ভাষা
    } else if (/[\u0980-\u09FF]/.test(text)) {
        return 'bn-BD'; // বাংলা (বাংলাদেশ)
    } else if (/[\u09A0-\u09FF]/.test(text)) {
        return 'bn-IN'; // বাংলা (ভারত)
    } else if (/[a-zA-Z]/.test(text)) {
        return 'en-US'; // ইংরেজি ভাষা
    }
    return 'en-US'; // ডিফল্ট ভাষা
};
const generateSpeech = (selectedText, voices, synth, setspeaktrue) => {
    if (!selectedText || selectedText.trim() === "") {
        console.warn("No text selected for speech.");
        return;
    }

    const langCode = detectLanguage(selectedText);

    const utterance = new SpeechSynthesisUtterance(selectedText);
    utterance.pitch = 7; // পিচ সেট করা
    utterance.rate = 0.8;  // স্পিচের গতি
    utterance.volume = 1; // ভলিউম

    if (langCode === 'zh-CN') {
        // চীনা ভাষার জন্য ভয়েস নির্বাচন করুন
        const selectedVoice = voices.current.find(voice => voice.lang === 'zh-CN' && voice.name.toLowerCase().includes('')); // Microsoft Yaoyao
        if (!selectedVoice) {
            console.warn("No Chinese voice available.");
            return;
        }
        utterance.voice = selectedVoice;
    } else {
        const selectedVoice = voices.current.find(voice => voice.lang === langCode);
        if (!selectedVoice) {
            console.warn(`No voice available for language: ${langCode}`);
            return;
        }
        utterance.voice = selectedVoice;
    }

    // স্পিচ শুরু করুন
    synth.speak(utterance);
    setspeaktrue(true)
};
const slowSpeak = (selectedText, voices, synth, setspeaktrue) => {
    if (!selectedText || selectedText.trim() === "") {
        console.warn("No text selected for speech.");
        return;
    }

    const langCode = detectLanguage(selectedText);

    const utterance = new SpeechSynthesisUtterance(selectedText);


    if (langCode === 'zh-CN') {
        // চীনা ভাষার জন্য ভয়েস নির্বাচন করুন
        const selectedVoice = voices.current.find(voice => voice.lang === 'zh-CN' && voice.name.toLowerCase().includes('yaoyao')); // Microsoft Yaoyao
        if (!selectedVoice) {
            console.warn("No Chinese voice available.");
            return;
        }
        utterance.voice = selectedVoice;
        utterance.pitch = 10;
        utterance.rate = 0.1;
        utterance.volume = 1;
    } else {
        const selectedVoice = voices.current.find(voice => voice.lang === langCode);
        if (!selectedVoice) {
            console.warn(`No voice available for language: ${langCode}`);
            return;
        }
        utterance.voice = selectedVoice;
    }

    // স্পিচ শুরু করুন
    synth.speak(utterance);
    setspeaktrue(true)
}

export default {
    generateSpeech,
    slowSpeak
}
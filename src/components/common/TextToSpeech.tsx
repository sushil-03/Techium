import { HiMiniSpeakerWave, HiMiniPause } from "react-icons/hi2";
import { RxResume } from "react-icons/rx";
import { IoStop } from "react-icons/io5";

import React, { useEffect, useState } from "react";

const TextToSpeech = ({ text }: { text: string }) => {
  const [speech, setSpeech] = useState<any>(null);
  const [voices, setVoices] = useState<any>([]);
  const [speaking, setSpeaking] = useState(false);
  const [rate, setRate] = useState(1); // Initial rate value
  const handleSpeechSettings = (text: string) => {
    if (text.includes("<p>") || text.includes("<H1>")) {
      speech.pitch = 2; // Adjust pitch for h1 tags
    } else {
      speech.pitch = 1; // Reset pitch for other tags
    }
  };
  useEffect(() => {
    if ("speechSynthesis" in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(stripHtml(text));
      utterance.rate = rate; // Set initial rate
      setSpeech(utterance);

      const updateVoices = () => {
        // const availableVoices = synthesis.getVoices();
        const availableVoices = synthesis
          .getVoices()
          .filter((voice) => voice.lang !== "");

        setVoices(availableVoices);
      };

      synthesis.onvoiceschanged = updateVoices;
      updateVoices();
    }
  }, [text, rate]);

  const speak = () => {
    if (speech) {
      setSpeaking(true);
      window.speechSynthesis.speak(speech);
    }
  };
  const handleChangeRate = (event: any) => {
    const newRate = parseFloat(event.target.value);
    setRate(newRate);
    if (speech) {
      speech.rate = newRate;
    }
  };

  const stripHtml = (html: any) => {
    return html.replace(/<[^>]+>/g, "");
  };

  // Helper function to handle speech settings based on HTML tags

  const handleChangeVoice = (voiceURI: any) => {
    if (speech) {
      const selectedVoice = voices.find(
        (voice: any) => voice.voiceURI === voiceURI
      );
      if (selectedVoice) {
        speech.voice = selectedVoice;
      }
    } else {
      alert("No speech");
    }
  };

  console.log("speech", text);
  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };
  const pause = () => {
    window.speechSynthesis.pause();
    // setSpeaking(false);
  };
  const resume = () => {
    window.speechSynthesis.resume();
    // setPaused(false);
  };

  return (
    <div className="flex xs:gap-10 gap-1 xs:flex-row flex-col">
      <div className="flex gap-4">
        <div className="flex gap-4">
          <button
            onClick={speak}
            className={`${speaking ? "hidden" : "block"}`}
          >
            <HiMiniSpeakerWave size={30} className="text-primary" />
          </button>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={rate}
            onChange={handleChangeRate}
            className={`${speaking ? "hidden" : "block"}`}
          />
        </div>
        <button onClick={resume} className={`${speaking ? "block" : "hidden"}`}>
          <RxResume size={30} className="text-primary" />
        </button>
        <button onClick={pause} className={`${speaking ? "block" : "hidden"}`}>
          <HiMiniPause size={30} className="text-primary" />
        </button>

        <button onClick={stop} className={`${speaking ? "block" : "hidden"}`}>
          <IoStop size={30} className="text-red-700" />
        </button>
      </div>
      <select
        onChange={(e) => handleChangeVoice(e.target.value)}
        className="py-2 px-2 xs:w-44 w-full outline-none rounded-md bg-neutral-900 text-white"
      >
        {voices.map((voice: any) => (
          <option key={voice.voiceURI} value={voice.voiceURI}>
            {voice.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TextToSpeech;

// import { HiMiniSpeakerWave, HiMiniPause } from "react-icons/hi2";
// import { RxResume } from "react-icons/rx";
// import { IoStop } from "react-icons/io5";

// import React, { useEffect, useState } from "react";

// const TextToSpeech = ({ text }: { text: string }) => {
//   const [speech, setSpeech] = useState<any>(null);
//   const [voices, setVoices] = useState<any>([]);
//   const [speaking, setSpeaking] = useState(false);
//   const [rate, setRate] = useState(1); // Initial rate value
//   const test = () => {
//     let plaintext =
//       "Have you ever wondered if its possible to turn blogging into a gold mine? Youre not alone. The question Can blogging make you a millionaire? is often asked by many aspiring bloggers who dream of making it big in the blogosphere. The reality is that while many bloggers have indeed struck it rich, its not as simple as it might seem. Lets dive in and explore this fascinating topic.Blogging To Become A MillionaireBlogging, in its simplest form, is the act of publishing content, typically written, on a personalized online platform known as a blog. The term blog itself is a contraction of weblog, and these informational websites started gaining popularity in the late 1990s. They served as an online diary for many, a space where individuals could share their thoughts, ideas, and experiences with the world.The blogging landscape has drastically evolved since then. Blogs are no longer just personal diaries; they have become an important tool for businesses, influencers, and professionals across various industries. They are now used for marketing, brand building, and even as a source of income.This leads us to the question at hand - Can blogging make you a millionaire? The answer is yes, but with a caveat. While its true that some individuals have made their fortunes through blogging, it doesnt hold true as a universal rule. Success in the blogging world requires more than just creating a blog and posting content. It demands a strategic approach, consistent effort, and the ability to adapt and grow with the evolving digital landscape. Its not an overnight journey, but for those who approach it with the right mindset, blogging has the potential to provide substantial financial rewards.Success Stories of BloggersSuccess in the blogging world is achievable, and there are numerous examples of bloggers who have paved their way to financial freedom. Here are a couple of inspiring stories.Arianna Huffington of the Huffington Post is one prime example. The Huffington Post started as a simple blog and has since grown into a mega news outlet, with Arianna reportedly selling the blog for $315 million in 2011.Pete Cashmore, the founder of Mashable, is another success story. Pete started Mashable from his home in Scotland at age 19, and it quickly grew to become one of the top sources for news about social media and technology. It has been reported that CNN offered to acquire Mashable for around $200 million.Achieving success in blogging requires a mix of passion, quality content, strategic marketing, and adaptability to the changing digital landscape. These millionaire bloggers didnt strike gold overnight - they worked hard, stayed consistent, and turned their passion into a lucrative career. While blogging as a pathway to becoming a millionaire isnt guaranteed, these stories show that it is indeed possible. For those who aspire to follow in their footsteps, the journey may be challenging, but the potential rewards can be substantial.Why You Need Multiple Blogging Income StreamsTo truly capitalize on the financial potential of blogging, its crucial to diversify your income streams. Putting all your eggs in one basket, such as solely relying on ad revenue, can be risky.There are several ways bloggers can earn money. Here are some of the most profitable:Affiliate Marketing: This involves promoting other companies products or services and earning a commission for any sales made through your referral link. This can provide a substantial income, particularly as your audience grows and trusts your expertise. To maximize income from these streams, its essential to build a loyal and engaged audience, produce quality content that aligns with your audiences interests, and strategically market your blog and offerings. While making a million from blogging isnt a guarantee, diversifying your income can significantly boost your earnings and bring you closer to that seven-figure mark.Building a Successful Blog For MillionsCreating a successful, money-making blog what";
//     console.log("plain text", plaintext);
//     const temp = plaintext.slice(0, 600);
//     const utterance = new SpeechSynthesisUtterance(temp);
//     utterance.rate = rate; // Set initial rate
//     utterance.lang = "en";

//     console.log("utterance", utterance);
//     window.speechSynthesis.speak(utterance);
//   };

//   useEffect(() => {
//     if ("speechSynthesis" in window) {
//       const synthesis = window.speechSynthesis;
//       let plaintext = stripHtml(text);
//       console.log("plain text", plaintext);

//       const utterance = new SpeechSynthesisUtterance(plaintext);
//       utterance.rate = rate; // Set initial rate
//       utterance.lang = "en";
//       console.log("utterance", utterance);

//       setSpeech(utterance);

//       const updateVoices = async () => {
//         // const availableVoices = synthesis.getVoices();
//         const availableVoices = await synthesis
//           .getVoices()
//           .filter((voice) => voice.lang !== "");

//         setVoices(availableVoices);
//       };

//       synthesis.onvoiceschanged = updateVoices;
//       updateVoices();
//     } else {
//       alert("Your browser doesn't support speech");
//     }
//   }, [text, rate]);

//   const speak = () => {
//     if (speech) {
//       console.log("my speah", speech);

//       setSpeaking(true);
//       window.speechSynthesis.speak(speech);
//     }
//   };
//   const handleChangeRate = (event: any) => {
//     const newRate = parseFloat(event.target.value);
//     setRate(newRate);
//     if (speech) {
//       speech.rate = newRate;
//     }
//   };

//   const stripHtml = (html: any) => {
//     console.log("my html", html);

//     let plainText = html.replace(/<[^>]+>/g, "");
//     plainText = plainText.replace(/&#39;/g, "");
//     plainText = plainText.replace(/&quot;/g, "");
//     return plainText;
//   };

//   // Helper function to handle speech settings based on HTML tags

//   const handleChangeVoice = (voiceURI: any) => {
//     if (speech) {
//       const selectedVoice = voices.find(
//         (voice: any) => voice.voiceURI === voiceURI
//       );
//       console.log("selected voice", selectedVoice);

//       if (selectedVoice) {
//         speech.voice = selectedVoice;
//       }
//     } else {
//       alert("No speech");
//     }
//   };

//   console.log("speech", text);
//   const stop = () => {
//     window.speechSynthesis.cancel();
//     setSpeaking(false);
//   };
//   const pause = () => {
//     window.speechSynthesis.pause();
//     // setSpeaking(false);
//   };
//   const resume = () => {
//     window.speechSynthesis.resume();
//     // setPaused(false);
//   };

//   return (
//     <div className="flex xs:gap-10 gap-1 xs:flex-row flex-col">
//       <div className="flex gap-4">
//         <button onClick={test}>HHHH</button>
//         <div className="flex gap-4">
//           <button
//             onClick={speak}
//             className={`${speaking ? "hidden" : "block"}`}
//           >
//             <HiMiniSpeakerWave size={30} className="text-primary" />
//           </button>
//           <input
//             type="range"
//             min="0.1"
//             max="3"
//             step="0.1"
//             value={rate}
//             onChange={handleChangeRate}
//             className={`${speaking ? "hidden" : "block"}`}
//           />
//         </div>
//         <button onClick={resume} className={`${speaking ? "block" : "hidden"}`}>
//           <RxResume size={30} className="text-primary" />
//         </button>
//         <button onClick={pause} className={`${speaking ? "block" : "hidden"}`}>
//           <HiMiniPause size={30} className="text-primary" />
//         </button>

//         <button onClick={stop} className={`${speaking ? "block" : "hidden"}`}>
//           <IoStop size={30} className="text-red-700" />
//         </button>
//       </div>
//       <select
//         onChange={(e) => handleChangeVoice(e.target.value)}
//         className="py-2 px-2 xs:w-44 w-full outline-none rounded-md bg-neutral-900 text-white"
//       >
//         {voices.map((voice: any) => (
//           <option
//             key={voice.voiceURI}
//             value={voice.voiceURI}
//             data-lang={voice.lang}
//           >
//             {voice.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default TextToSpeech;
// *********************************************************************************
// import { HiMiniSpeakerWave, HiMiniPause } from "react-icons/hi2";
// import { RxResume } from "react-icons/rx";
// import { IoStop } from "react-icons/io5";

// import React, { useEffect, useState } from "react";

// const TextToSpeech = ({ text }: { text: string }) => {
//   const [speechQueue, setSpeechQueue] = useState<any[]>([]);
//   const [speaking, setSpeaking] = useState(false);
//   const [rate, setRate] = useState(1); // Initial rate value

//   useEffect(() => {
//     splitTextIntoSpeeches(text);
//   }, [text]);

//   const splitTextIntoSpeeches = (text: string) => {
//     text = stripHtml(text);

//     const chunkSize = 600;
//     const chunks = [];
//     for (let i = 0; i < text.length; i += chunkSize) {
//       chunks.push(text.slice(i, i + chunkSize));
//     }
//     const speeches = chunks.map((chunk) => {
//       const utterance = new SpeechSynthesisUtterance(chunk);
//       utterance.rate = rate;
//       utterance.lang = "en";
//       return utterance;
//     });
//     setSpeechQueue(speeches);
//   };

//   const speak = () => {
//     if (speechQueue.length > 0 && !speaking) {
//       setSpeaking(true);
//       const currentSpeech = speechQueue.shift();
//       window.speechSynthesis.speak(currentSpeech);

//       currentSpeech.onend = () => {
//         if (speechQueue.length > 0) {
//           speak();
//         } else {
//           setSpeaking(false);
//         }
//       };
//     }
//   };

//   const handleChangeRate = (event: any) => {
//     const newRate = parseFloat(event.target.value);
//     setRate(newRate);
//     // Update rate for all speeches in the queue
//     setSpeechQueue((prevQueue) =>
//       prevQueue.map((speech) => {
//         speech.rate = newRate;
//         return speech;
//       })
//     );
//   };

//   const stop = () => {
//     window.speechSynthesis.cancel();
//     setSpeechQueue([]);
//     splitTextIntoSpeeches(text);
//     setSpeaking(false);
//   };

//   const pause = () => {
//     window.speechSynthesis.pause();
//   };

//   const resume = () => {
//     // if (currentSpeechIndex >= 0 && currentSpeechIndex < speechQueue.length) {
//     //   const currentSpeech = speechQueue[currentSpeechIndex];
//     //   window.speechSynthesis.resume(currentSpeech);
//     //   setSpeaking(true);
//     // }
//     window.speechSynthesis.resume();
//   };
//   const stripHtml = (html: any) => {
//     console.log("my html", html);

//     let plainText = html.replace(/<[^>]+>/g, "");
//     plainText = plainText.replace(/&#39;/g, "");
//     plainText = plainText.replace(/&quot;/g, "");
//     return plainText;
//   };

//   return (
//     <div className="flex xs:gap-10 gap-1 xs:flex-row flex-col">
//       <div className="flex gap-4">
//         <div className="flex gap-4">
//           <button
//             onClick={speak}
//             className={`${speaking ? "hidden" : "block"}`}
//           >
//             <HiMiniSpeakerWave size={30} className="text-primary" />
//           </button>
//           <input
//             type="range"
//             min="0.1"
//             max="3"
//             step="0.1"
//             value={rate}
//             onChange={handleChangeRate}
//             className={`${speaking ? "hidden" : "block"}`}
//           />
//         </div>
//         <button onClick={resume} className={`${speaking ? "block" : "hidden"}`}>
//           <RxResume size={30} className="text-primary" />
//         </button>
//         <button onClick={pause} className={`${speaking ? "block" : "hidden"}`}>
//           <HiMiniPause size={30} className="text-primary" />
//         </button>

//         <button onClick={stop} className={`${speaking ? "block" : "hidden"}`}>
//           <IoStop size={30} className="text-red-700" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TextToSpeech;

import { HiMiniSpeakerWave, HiMiniPause } from "react-icons/hi2";
import { RxResume } from "react-icons/rx";
import { IoStop } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";

import React, { useEffect, useState } from "react";

const TextToSpeech = ({ text }: { text: string }) => {
  const [speechQueue, setSpeechQueue] = useState<any[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [rate, setRate] = useState(1); // Initial rate value
  const [currentSpeechIndex, setCurrentSpeechIndex] = useState(0);

  useEffect(() => {
    splitTextIntoSpeeches(text);
  }, [text]);

  const splitTextIntoSpeeches = (text: string) => {
    text = stripHtml(text);

    const chunkSize = 600;
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }
    const speeches = chunks.map((chunk) => {
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.rate = rate;
      utterance.lang = "en";
      return utterance;
    });
    setSpeechQueue(speeches);
  };

  const speak = () => {
    if (speechQueue.length > 0 && !speaking) {
      setSpeaking(true);
      setCurrentSpeechIndex(0);
      const currentSpeech = speechQueue[0];
      window.speechSynthesis.speak(currentSpeech);
      currentSpeech.onend = () => {
        console.log("prevIndex", currentSpeechIndex);
        const nextIndex = currentSpeechIndex + 1;
        console.log("newIndex", nextIndex);

        if (nextIndex < speechQueue.length) {
          speakNextSpeech(nextIndex);
        } else {
          setSpeaking(false);
          setCurrentSpeechIndex(-1);
        }
      };
    }
  };
  console.log("speech index", currentSpeechIndex);
  const speakNextSpeech = (index: number) => {
    setCurrentSpeechIndex(index);
    const nextSpeech = speechQueue[index];
    window.speechSynthesis.speak(nextSpeech);

    nextSpeech.onend = () => {
      const nextIndex = index + 1;
      if (nextIndex < speechQueue.length) {
        speakNextSpeech(nextIndex);
      } else {
        setSpeaking(false);
        setCurrentSpeechIndex(-1);
      }
    };
  };

  const handleChangeRate = (event: any) => {
    const newRate = parseFloat(event.target.value);
    setRate(newRate);
    // Update rate for all speeches in the queue
    setSpeechQueue((prevQueue) =>
      prevQueue.map((speech) => {
        speech.rate = newRate;
        return speech;
      })
    );
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    // setSpeechQueue([]);
    setSpeaking(false);
    setCurrentSpeechIndex(-1);
  };
  const pause = () => {
    window.speechSynthesis.pause();
    // setSpeaking(false);
  };

  const resume = () => {
    if (currentSpeechIndex >= 0 && currentSpeechIndex < speechQueue.length) {
      const currentSpeech = speechQueue[currentSpeechIndex];
      window.speechSynthesis.resume();
      setSpeaking(true);
    }
  };

  const stripHtml = (html: any) => {
    console.log("my html", html);

    let plainText = html.replace(/<[^>]+>/g, "");
    plainText = plainText.replace(/&#39;/g, "");
    plainText = plainText.replace(/&quot;/g, "");
    return plainText;
  };

  return (
    <div className="flex xs:gap-10 gap-1 xs:flex-row flex-col">
      <div className="flex gap-4">
        <div className="flex gap-4">
          <button
            onClick={speak}
            className={`${
              speaking ? "hidden" : "block"
            } dark:hover:bg-slate-900 hover:bg-purple-100`}
            title="play"
          >
            <FaPlay size={30} className="text-primary" />
          </button>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.3"
            value={rate}
            onChange={handleChangeRate}
            className={`${speaking ? "hidden" : "block"} text-green-500`}
          />
        </div>
        <button
          onClick={resume}
          className={`${
            speaking ? "block" : "hidden"
          } dark:hover:bg-slate-900 hover:bg-purple-100`}
          title="resume"
        >
          <RxResume size={30} className="text-primary" />
        </button>
        <button
          onClick={pause}
          className={`${
            speaking ? "block" : "hidden"
          } dark:hover:bg-slate-900 hover:bg-purple-100`}
          title="pause"
        >
          <HiMiniPause size={30} className="text-primary" />
        </button>

        <button
          onClick={stop}
          className={`${speaking ? "block" : "hidden"} hover:bg-red-100`}
          title="stop"
        >
          <IoStop size={30} className="text-red-700" />
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;

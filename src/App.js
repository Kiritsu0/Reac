import {useState, useEffect} from 'react'

function App() {
  const [left, setLeft] = useState("32px")
  const [condition, setCondition] = useState(true)
  const [activekey, setActivekey] = useState("")
  const [disable, setdisable] = useState(false)
  const [bgColor, setBgColor] = useState("#beb7b7")
  const [volume, setVolume] = useState(0.5)

  useEffect(() => {
    if (condition) {
      const handleKeyDown = (event) => {
        let list = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"]
        if (list.includes(event.key.toUpperCase())) {
          playSound(event.key.toUpperCase())
        }
      }
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }

  }, [condition])

  const drumPads = [
    {
      keyCode: 81,
      text: "Q",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
    },
    {
      keyCode: 87,
      text: "W",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
    },
    {
      keyCode: 69,
      text: "E",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    },
    {
      keyCode: 65,
      text: "A",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
    },
    {
      keyCode: 83,
      text: "S",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
    },
    {
      keyCode: 68,
      text: "D",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
    },
    {
      keyCode: 90,
      text: "Z",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
    },
    {
      keyCode: 88,
      text: "X",
      src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
    },
    {
      keyCode: 67,
      text: "C",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
    }
  ];

  const handlePower = () => {
    if (condition) {
      setLeft("0")
      setCondition(false)
      setdisable(true)
    }
    else {
      setLeft("32px")
      setCondition(true)
      setdisable(false)
    }
  }

  const playSound = (selector, index) => {
    setBgColor("#cfcf1d");
    setTimeout(() => {
      setBgColor("#beb7b7");
    }, 100);
    const audio = document.getElementById(selector);

    if (audio.paused) {
      audio.currentTime = 0;
      audio.play();
    }
    setActivekey(selector)
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);

    const audioElements = document.querySelectorAll('.clip');
    audioElements.forEach((audio) => {
      audio.volume = newVolume;
    });
  };

  return (
  <div className="App">
      <div  id="drum-machine">
        <i>FCC</i>
        <div id="display">
          <div className='buttons' style={{backgroundColor: bgColor}}>
            {drumPads.map((drumPad, index) => (<button key={drumPad.src} disabled={disable}
            onClick={() => {playSound(drumPad.text);}}  className="drum-pad" id={drumPad.src}>{drumPad.text}
            <audio className="clip" src={drumPad.src} id={drumPad.text}></audio>
            </button>
            ))}
          </div>

          <div className="controlers">
            <b>On/Off</b>
            <div className="power" onClick={handlePower}>
              <div style={{left: left}}></div>
            </div>

            <div id="screen">{condition ? activekey : ""}</div>

            <input id="volume-slider" type="range" min="0" max="1" value={volume} step="0.01" onChange={handleVolumeChange}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

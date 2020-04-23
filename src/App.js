import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import ml5 from "ml5";

import useInterval from "./useInterval";

let classifier;

function App() {
  const videoRef = useRef();
  const [Data, setData] = useState([0.5, 0.5]);
  const [shouldClassify, setShouldClassify] = useState(false);

  useEffect(() => {
    classifier = ml5.imageClassifier("./my-model/model.json", () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }); 
    });
  }, []);

  useInterval(() => {
    if (classifier && shouldClassify) {
      classifier.classify(videoRef.current, (error, results) => {
        if (error) {
          console.error(error);
          return;
        }
        results.sort((a, b) => a.label.localeCompare(b.label));
        //console.log(results);
        setData(results.map((entry) => entry.confidence));
      });
    }
  }, 500);

  return (
    <React.Fragment>
      <h1>
        <small>
          {/*[{gaugeData[0].toFixed(2)}, {gaugeData[1].toFixed(2)}]*/}
          {Data[0].toFixed(2) < Data[1].toFixed(2) ? (
            <div className="alert alert-danger" role="alert" style={{

          marginTop: "50px",
        }}>
              Alert! away from computer
            </div>
          ) : (
            ""
          )}
        </small>
      </h1>
      <div
        className="card"
        style={{
          width: "40rem",
          fontSize: "150%",
          margin: "auto",
          marginTop: "100px",
        }}
      >
        <div className="card-body">
          <h3 className="card-title">Q1) demo Question?</h3>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="options"
            id="a"
            value="option1"
          />
          <label class="form-check-label" for="a">
            Answer A
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="options"
            id="b"
            value="option2"
          />
          <label class="form-check-label" for="b">
            Answer B
          </label>
        </div>
        <div class="form-check ">
          <input
            class="form-check-input"
            type="radio"
            name="options"
            id="c"
            value="option3"
          />
          <label class="form-check-label" for="c">
            Answer C
          </label>
        </div>
        <div class="form-check ">
          <input
            class="form-check-input"
            type="radio"
            name="options"
            id="c"
            value="option3"
          />
          <label class="form-check-label" for="c">
            Answer D
          </label>
        </div>
        <div className="card-body">
          <button type="button" className="btn btn-primary btn-lg">
            Next
          </button>
        </div>
      </div>

      {/*<GaugeChart data={gaugeData} />*/}
      <div>
        <button
          onClick={() => setShouldClassify(!shouldClassify)}
          className="btn btn-primary btn-lg"
        >
          {shouldClassify ? "Stop Demo" : "Start Demo"}
        </button>
      </div>
      <div className="card-body">
      <video
        ref={videoRef}
        style={{ transform: "scale(-1, 1)" }}
        width="300"
        height="150"
      /> 
      </div>
    </React.Fragment>
  );
}

export default App;

import { useCallback, useEffect, useRef, useState } from "react";

const Timer = () => {
  const [countUpTime, setCountUpTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [startTime, setStartTime] = useState(null);
  console.log(startTime);
  const minuteCircle = useRef(null);
  const secondCircle = useRef(null);
  const hourCircle = useRef(null);
  const intervalRef = useRef(null);

  const changeCircleOffset = (seconds, minutes, hours) => {
    if (hourCircle.current && minuteCircle.current && secondCircle.current) {
      hourCircle.current.style.strokeDashoffset = `${
        hours > 0 ? 451 - (hours * 451) / 24 : 451
      }px`;
      minuteCircle.current.style.strokeDashoffset = `${
        minutes > 0 ? 451 - (minutes * 451) / 60 : 451
      }px`;
      secondCircle.current.style.strokeDashoffset = `${
        seconds > 0 ? 451 - (seconds * 451) / 60 : 451
      }px`;
    }
  };

  const getTimeDifference = useCallback((startTime) => {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - startTime;

    const hours = Math.floor(
      (timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (60 * 60 * 1000)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

    changeCircleOffset(seconds, minutes, hours);
    setCountUpTime({
      hours,
      minutes,
      seconds,
    });
  }, []);

  const startCountUp = useCallback(() => {
    const startTime = new Date().getTime();
    setStartTime(startTime);

    intervalRef.current = setInterval(() => {
      getTimeDifference(startTime);
    }, 1000);
  }, [getTimeDifference]);

  const stopCountUp = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startCountUp();
    return () => {
      stopCountUp();
    };
  }, [startCountUp, stopCountUp]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center bg-gradient-to-l sm:bg-gradient-to-t">
      {/* الساعات */}
      <div className="relative">
        <svg className="-rotate-90 h-48 w-48">
          <circle
            r="70"
            cx="90"
            cy="90"
            className="fill-transparent stroke-[#88adf158] stroke-[8px]"
          ></circle>
          <circle
            r="70"
            ref={hourCircle}
            cx="90"
            cy="90"
            style={{
              strokeDasharray: "451px",
            }}
            className="fill-transparent stroke-black stroke-[8px]"
          ></circle>
        </svg>
        <div className="text-black absolute top-16 left-11 text-2xl font-semibold flex flex-col items-center w-24 h-20">
          <span className="text-center">{countUpTime?.hours}</span>
          <span className="text-center">
            {countUpTime?.hours === 1 ? "Hour" : "Hours"}
          </span>
        </div>
      </div>
      {/* الدقائق */}
      <div className="relative">
        <svg className="-rotate-90 h-48 w-48">
          <circle
            r="70"
            cx="90"
            cy="90"
            className="fill-transparent stroke-[#88adf158] stroke-[8px]"
          ></circle>
          <circle
            r="70"
            ref={minuteCircle}
            cx="90"
            cy="90"
            style={{
              strokeDasharray: "451px",
            }}
            className="fill-transparent stroke-black stroke-[8px]"
          ></circle>
        </svg>
        <div className="text-black absolute top-16 left-11 text-2xl font-semibold flex flex-col items-center w-24 h-20">
          <span className="text-center">{countUpTime?.minutes}</span>
          <span className="text-center text-black">
            {countUpTime?.minutes === 1 ? "Minute" : "Minutes"}
          </span>
        </div>
      </div>
      {/* الثواني */}
      <div className="relative">
        <svg className="-rotate-90 h-48 w-48">
          <circle
            r="70"
            cx="90"
            cy="90"
            className="fill-transparent stroke-[#88adf158] stroke-[8px]"
          ></circle>
          <circle
            r="70"
            cx="90"
            cy="90"
            className="fill-transparent stroke-black stroke-[8px]"
            ref={secondCircle}
            style={{
              strokeDasharray: "451px",
            }}
          ></circle>
        </svg>
        <div className="text-black absolute top-16 left-11 text-2xl font-semibold flex flex-col items-center w-24 h-20">
          <span className="text-center">{countUpTime?.seconds}</span>
          <span className="text-center">
            {countUpTime?.seconds === 1 ? "Second" : "Seconds"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Timer;

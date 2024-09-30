import axios from "axios";
import { useEffect, useState } from "react";
import Timer from "../components/Timer/Timer";
import close from "../assets/close.png";
import start from "../assets/play.png";

const ModelTickets = (props) => {
  const [tickets, setTickets] = useState([]);
  const [timerStarted, setTimerStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const allTickets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5173/data/tickets-information.json"
      );
      setTickets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allTickets();
  }, []);

  const startTimer = () => {
    setTimerStarted(true);
    setStartTime(
      new Date().toLocaleString("en-eg", { timeZone: "Africa/Cairo" })
    );
    console.log("Timer started");
  };

  const getAllData = () => {
    if (timerStarted) {
      setTimerStarted(false);
      const endTime = new Date().toLocaleString("en-eg", {
        timeZone: "Africa/Cairo",
      });
      console.log("Timer stopped");

      const nameInput = document.querySelector(
        'input[type="text"]'
      );
      const noteTextarea = document.querySelector(
        "textarea"
      );

      const existingData = JSON.parse(
        localStorage.getItem("ticketsData") || "[]"
      );

      const newData = tickets.map((ticket) => {
        const timeDifference =
          new Date(endTime).getTime() - new Date(startTime).getTime();
        const totalHours = String(
          Math.floor(timeDifference / 3600000)
        ).padStart(2, "0");
        const totalMinutes = String(
          Math.floor((timeDifference % 3600000) / 60000)
        ).padStart(2, "0");
        const totalSeconds = String(
          Math.floor((timeDifference % 60000) / 1000)
        ).padStart(2, "0");

        return {
          startTime: startTime,
          endTime,
          totalHours,
          totalMinutes,
          totalSeconds,
          name: nameInput.value || ticket.name,
          note: noteTextarea.value || ticket.note,
        };
      });

      const combinedData = [...existingData, ...newData];

      localStorage.setItem("ticketsData", JSON.stringify(combinedData));
      console.log(combinedData);
      return combinedData;
    }
  };

  const ticketsData = JSON.parse(
    window.localStorage.getItem("ticketsData") || "[]"
  );

  return (
    <div
      className="rounded-xl p-10 relative overflow-auto"
      style={{ width: "900px", height: "500px" }}
    >
      <button
        className={`text-white p-1 rounded-sm px-2 mb-8  ${
          !timerStarted ? "bg-green-600" : ""
        }`}
        onClick={startTimer}
      >
        {!timerStarted ? (
          <div className="flex items-center gap-3">
            <img width={20} src={start} alt="" />
            <p>{"start timer"}</p>
          </div>
        ) : (
          ""
        )}
      </button>
      {!timerStarted ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Staff
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Note
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ticketsData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.startTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.endTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.totalHours}
                      {":"}
                      {item.totalMinutes}
                      {":"}
                      {item.totalSeconds}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.note}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <Timer />
          <div className="flex flex-col">
            <form className="flex flex-col">
              <input
                type="text"
                className="mt-2 p-1 px-2 resize-none border outline-none border-gray-300 rounded w-3/5"
                placeholder="type name here"
              />
              <textarea
                placeholder="Type note here"
                className="mt-2 p-2 resize-none border outline-none border-gray-300 rounded w-3/5"
              />
            </form>
            <button
              className="bg-red-700 text-white px-3 text-2xl pb-2 rounded mt-5"
              onClick={getAllData}
            >
              stop timer
            </button>
          </div>
        </div>
      )}
      {!timerStarted && (
        <div
          className="closeModel absolute cursor-pointer bg-red-500 p-1 rounded-full top-0 right-0"
          onClick={props.modleStatus}
        >
          <img src={close} alt="" width={30} />
        </div>
      )}
    </div>
  );
};

export default ModelTickets;

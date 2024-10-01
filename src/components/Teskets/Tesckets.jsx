import axios from "axios";
import { useEffect, useState } from "react";
import ModelTickets from "../../model/ModelTickets";
import watch from "../../assets/watch.png";

const Tesckets = () => {
  const [tickets, setTickets] = useState([]);
  const allTickets = async () => {
    try {
      const response = await axios.get(
        "/data/tickets.json"
      );
      setTickets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allTickets();
  }, []);

  const [active, setActive] = useState(false);
  const isActive = () => {
    setActive(!active);
  };

  return (
    <div className="my_app">
      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Add new tesckets
            </p>
            <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
              <p className="text-sm font-medium leading-none text-white">
                Add Task
              </p>
            </button>
          </div>
        </div>
        <div className="bg-white md:py-7 px-4 md:px-8 xl:px-10">
          <div className="mt-7 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="focus:outline-none h-16 border border-gray-100 rounded">
                  <th className="text-left pl-5">Title</th>
                  <th className="text-left pl-5">Description</th>
                  <th className="text-left pl-5">Status</th>
                  <th className="text-left pl-5"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tickets.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="py-4 whitespace-nowrap">
                      <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-700 mr-2">
                          {item.ticketNumber}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 whitespace-nowrap">
                      <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-700 mr-2">
                          {item.description}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 whitespace-nowrap flex gap-10">
                      <button
                        className={`focus:ring-2 focus:ring-offset-2 text-sm leading-none py-3 px-5 rounded hover:bg-opacity-80 focus:outline-none ${
                          item.status === "done"
                            ? "bg-green-500 text-white focus:ring-green-300"
                            : "bg-red-500 text-white focus:ring-red-300"
                        }`}
                        style={{}}
                      >
                        {item.status}
                      </button>
                      <button
                        onClick={isActive}
                        className="focus:ring-2 flex items-center focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                      >
                        <img src={watch} width={20} alt="" />
                        View
                      </button>
                    </td>
                    <td>
                      <div className="relative px-5 pt-2">
                        <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
                          <div className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                            <p>Edit</p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={`model-data fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <div className={`bg-white rounded-lg p-5 transform transition-transform duration-300 ${active ? "scale-100" : "scale-95"}`}>
            <ModelTickets modleStatus={() => setActive(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tesckets;

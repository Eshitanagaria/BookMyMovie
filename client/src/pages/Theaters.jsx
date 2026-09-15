import React, { useState } from "react";
import { MapPinIcon, MonitorIcon } from "lucide-react";
import BlurCircle from "../components/BlurCircle";

const theaters = [
  {
    id: 1,
    name: "BookMyMovie Cinemas",
    location: "Raj Nagar, Ghaziabad",
    screens: 3,
    capacity: 90,
  },
  {
    id: 2,
    name: "BookMyMovie PVR",
    location: "Pacific Mall, Ghaziabad",
    screens: 4,
    capacity: 120,
  },
  {
    id: 3,
    name: "BookMyMovie INOX",
    location: "Shipra Mall, Ghaziabad",
    screens: 5,
    capacity: 150,
  },
];

const groupRows = [
  ["A", "B"],
  ["C", "D"],
  ["E", "F"],
  ["G", "H"],
  ["I", "J"],
];

const Theaters = () => {
  const [selectedTheater, setSelectedTheater] = useState(theaters[0]);

  const renderSeats = (row, count = 9) => {
    return (
      <div key={row} className="flex gap-2 mt-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;

          return (
            <div
              key={seatId}
              className="h-7 w-7 md:h-8 md:w-8 rounded border border-primary/60 flex items-center justify-center text-[9px] md:text-xs text-gray-300"
            >
              {seatId}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen pt-32 pb-40 px-6 md:px-16 lg:px-40 overflow-hidden">
      <BlurCircle top="120px" left="-100px" />
      <BlurCircle bottom="100px" right="-100px" />

      <h1 className="text-3xl md:text-4xl font-semibold">
        Our <span className="text-primary">Theaters</span>
      </h1>

      <p className="text-gray-400 mt-3 max-w-xl">
        Explore our partner theaters and take a look at the available seating
        layout before booking your movie.
      </p>

      {/* Theater cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {theaters.map((theater) => (
          <button
            key={theater.id}
            onClick={() => setSelectedTheater(theater)}
            className={`text-left p-6 rounded-2xl border transition cursor-pointer ${
              selectedTheater.id === theater.id
                ? "border-primary bg-primary/10"
                : "border-gray-700 bg-gray-800 hover:border-primary/50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="bg-primary/20 p-3 rounded-xl">
                <MonitorIcon className="w-6 h-6 text-primary" />
              </div>

              <span className="text-sm text-gray-400">
                {theater.screens} Screens
              </span>
            </div>

            <h2 className="font-semibold text-lg mt-5">
              {theater.name}
            </h2>

            <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
              <MapPinIcon className="w-4 h-4" />
              {theater.location}
            </div>

            <p className="text-gray-500 text-sm mt-4">
              Screen capacity: {theater.capacity} seats
            </p>
          </button>
        ))}
      </div>

      {/* Selected theater */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold">
          {selectedTheater.name}
        </h2>

        <p className="text-gray-400 mt-2">
          {selectedTheater.location}
        </p>

        {/* Screen + seat layout */}
        <div className="mt-12 flex flex-col items-center">
          <div className="w-60 md:w-96 h-2 bg-primary rounded-full shadow-[0_0_25px_rgba(255,255,255,0.2)]" />

          <p className="text-gray-500 text-xs mt-3 mb-10">
            SCREEN
          </p>

          <div className="flex flex-col items-center text-xs text-gray-300">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
              {groupRows[0].map((row) => renderSeats(row))}
            </div>

            <div className="grid grid-cols-2 gap-11">
              {groupRows.slice(1).map((group, index) => (
                <div key={index}>
                  {group.map((row) => renderSeats(row))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 mt-10 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-primary rounded" />
              Available
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded" />
              Selected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Theaters;
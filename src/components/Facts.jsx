import { useEffect, useState } from "react";

export default function Facts() {
  const [image, setImage] = useState("");
  const [fact, setFact] = useState("");
  const [factCount, setFactCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const fetchData = async () => {
    try {
      const [factResult, imageResult] = await Promise.all([
        fetch("https://catfact.ninja/fact").then((res) => res.json()),
        fetch("https://api.thecatapi.com/v1/images/search?limit=1").then((res) => res.json()),
      ]);

      setImage(imageResult[0].url);
      setFact(factResult.fact);
      setFactCount((prevCount) => prevCount + 1);
    } catch (error) {
      alert("Failed to fetch data. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className="w-full max-w-2xl p-6 rounded-lg shadow-lg border bg-opacity-90">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-4">Wanna know a Ramndom Fact about cats?</h1>
        
        {/* Dark Mode Toggle */}
        <button onClick={() => setDarkMode(!darkMode)} className="absolute top-4 right-4 px-3 py-1 text-sm font-medium bg-gray-700 text-white rounded-md hover:bg-gray-600">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Image */}
        {image && <img src={image} alt="Cat" className="w-full h-64 object-cover rounded-lg mb-4" />}

        {/* Fact */}
        {fact && <p className="text-lg text-center font-medium p-4 border rounded-md bg-white text-black">{fact}</p>}

        {/* Fact Counter */}
        <p className="text-sm text-center mt-2">Facts Generated: {factCount}</p>

        {/* Button to Generate New Fact */}
        <button onClick={fetchData} className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
          Generate New Fact
        </button>
      </div>
    </div>
  );
}
import { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    energyUsage: "",
    waterUsage: "",
    wasteGenerated: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://ecopilot-backend.onrender.com/analyze",
        formData
      );
      setResponseMessage(response.data.message || "Data submitted successfully.");
    } catch (error) {
      setResponseMessage("Error submitting data. Please try again.");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">EcoPilot: Sustainability Analyzer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="energyUsage"
          placeholder="Energy Usage (kWh)"
          value={formData.energyUsage}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="waterUsage"
          placeholder="Water Usage (liters)"
          value={formData.waterUsage}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="wasteGenerated"
          placeholder="Waste Generated (kg)"
          value={formData.wasteGenerated}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
      {responseMessage && <p className="mt-4">{responseMessage}</p>}
    </div>
  );
}

export default App;


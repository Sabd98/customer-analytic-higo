import axios from "axios";

//base URL define with my API endpoint
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Function to fetch summary data
export const fetchSummary = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/summary`);
    return response.data;
  } catch (error) {
    console.error("Error fetching summary:", error);
    throw error;
  }
};

// Function to fetch customer summary data
export const fetchCustomers = async (
  page = 1,
  limit = 20,
  sort = "number",
  order = "asc"
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers`, {
      params: { page, limit, sort, order },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

import axios from "axios";

const enquiry = async (data) => {
  const response = await axios.post(`/api/enquiry/new`, data);
  if (response.data) {
    return response.data;
  }
};

export const enquiryService = {
  enquiry,
};

import axios from "axios";

const client = "http://127.0.0.1:5000";
export const signUpUser = async (signUpInfo: any): Promise<any> => {
  try {
    const data = await axios.post(`${client}/v1/auth/sign-up`, signUpInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data.data;
  } catch (error) {
    return error;
  }
};

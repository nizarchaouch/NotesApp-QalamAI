import type {
  CreateTranslateDTO,
  CreateTranslateOutputDTO,
  CreateSummarizeDTO,
  CreateSummarizeOutputDTO,
} from "@/types";
import { API_BASE_URL } from "@/lib/utils";
import { useAuth } from "@clerk/react";

export default function useAIFeaturesAPID() {
  const { getToken } = useAuth();

  const translate = async (note: CreateTranslateDTO) => {
    const token = await getToken();
    if (!token) {
      console.log("No token found");
      return;
    }
    const response = await fetch(`${API_BASE_URL}/api/ai/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(note),
    });
    const data: CreateTranslateOutputDTO = await response.json();
    return data.result;
  };

  const summarize = async (note: CreateSummarizeDTO) => {
    const token = await getToken();
    if (!token) {
      console.log("No token found");
      return;
    }

    const response = await fetch(`${API_BASE_URL}/api/ai/summarize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(note),
    });
    const data: CreateSummarizeOutputDTO = await response.json();
    return data.result;
  };
  return { translate, summarize  };
}

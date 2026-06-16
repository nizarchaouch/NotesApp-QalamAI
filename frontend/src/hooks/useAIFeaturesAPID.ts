import type { CreateTranslateDTO, CreateTranslateOutputDTO } from "@/types";
import { API_BASE_URL } from "@/lib/utils";
import { useAuth } from "@clerk/react";

export default function useAIFeaturesAPID() {
  const { getToken } = useAuth();

  const translate = async (note: CreateTranslateDTO) => {
    const token = await getToken();
    if (!token) {
      throw new Error("No token found");
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
  return { translate };
}

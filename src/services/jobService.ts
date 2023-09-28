import axios from "axios";
import { ApiMatchByTextType } from "../components/models/IApiMatchByText";

const BASE_URL = `https://jobed-connect-api.jobtechdev.se/v1/`;
const MATCH_BY_TEXT = `occupations/match-by-text?input_text=`;
const ENRICHED_OCCUPATION = `enriched_occupations?occupation_id=`;
 
export async function showFirstSearch(textInput: string | undefined) {
    const response = await axios.post<ApiMatchByTextType>(`${BASE_URL}${MATCH_BY_TEXT}${textInput}&input_headline=${textInput}&limit=10&offset=0&include_metadata=false`);
    return response.data;
}

export async function showSecondSearch(textInput: string | undefined, areaInput: string | undefined) {
    const response = await axios.post<ApiMatchByTextType>(`${BASE_URL}${MATCH_BY_TEXT}${areaInput}&input_headline=${textInput}&limit=10&offset=0&include_metadata=false`);
    return response.data;
}

export async function showRelatedCompetencies(occupationId: string) {
    try {
        const response = await axios.get(
            `${BASE_URL}${ENRICHED_OCCUPATION}${occupationId}&include_metadata=true`
          );
          const competenciesObject =
          response.data.metadata.enriched_candidates_term_frequency.competencies;
    
        return {
          competencies: competenciesObject.slice(0, 10),
        };
      } catch (error) {
        console.error("Felmeddelande:", error);
        throw error; 
      }
    }
import { createContext } from "react";
import { Job } from "../components/models/Jobs";

export interface IJobsContext {
  jobs: Job[]; 
  add: (text: string) => void;
}

export const JobsContext = createContext<IJobsContext>({
  jobs: [], 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  add: (_text: string) => {},
});
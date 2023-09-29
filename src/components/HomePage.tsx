import { useState } from "react";
import HomePageInputs from "./HomePageInputs";
import ShowMatchedJobs from "./ShowMatchedJobs";
import { IJobsContext, JobsContext } from "../contexts/JobsContext";
import { Job } from "./models/Jobs";
import { DigiTypography } from "@digi/arbetsformedlingen-react";
import { TypographyVariation } from "@digi/arbetsformedlingen";

export default function HomePage() {
  const [job, setJob] = useState<IJobsContext>({
    jobs: [],
    add: () => {}, // Tar bort text: string i ();
  });

  job.add = (text: string) => {
    setJob({
      ...job,
      jobs: [...job.jobs, new Job(new Date().getTime(), text)],
    });
  };

  return (
    <div className="home-parent-container">
      <JobsContext.Provider value={job}>
        <div className={job.jobs.length > 0 ? "hide" : "home-container"}>
          <div className={job.jobs.length > 0 ? "hide" : ""}>
            <DigiTypography afVariation={TypographyVariation.SMALL}>
              <h1>Hej!</h1>
            </DigiTypography>
            <div className="input-container">
              <HomePageInputs></HomePageInputs>
            </div>
          </div>
        </div>
        <div className={job.jobs.length === 0 ? "hide" : ""}>
          <ShowMatchedJobs></ShowMatchedJobs>
        </div>
      </JobsContext.Provider>
    </div>
  );
}

import { useContext, useEffect, useRef, useState } from "react";
import { JobsContext } from "../contexts/JobsContext";
import ShowSearchNav from "./ShowSearchNav";
import { DigiIconCaretDown } from "@digi/arbetsformedlingen-react";
import {
  showFirstSearch,
  showRelatedCompetencies,
  showSecondSearch,
} from "../services/jobService";
import DisplayChart from "./ChartJs";
import { ApiMatchByTextType } from "./models/IApiMatchByText";
import { OccupationData } from "./models/IOccupationData";
import { useCallback } from "react";

export default function ShowMatchedJobs() {
  const { jobs } = useContext(JobsContext);
  const [textInput, setTextInput] = useState<string>();
  const [areaInput, setAreaInput] = useState<string>();
  const [sendCorrectInfo, setSendCorrectInfo] = useState<boolean>(true);

  const [selectedOccupationData, setSelectedOccupationData] =
    useState<OccupationData | null>(null);
  const [apiMatchByText, setApiMatchByText] =
    useState<ApiMatchByTextType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeOccupationId, setActiveOccupationId] = useState<string | null>(
    null
  );

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchData = useCallback(async () => {
    try {
      if (sendCorrectInfo) {
        setApiMatchByText(await showFirstSearch(textInput));
      } else {
        setApiMatchByText(await showSecondSearch(textInput, areaInput));
      }
      setError(null);
    } catch (error) {
      if (!error) {
        setError("An error occurred while fetching data.");
      }
    }
  }, [sendCorrectInfo, textInput, areaInput]);

  useEffect(() => {
    if (error) {
      console.error("An error occurred:", error);
    }
  }, [error]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function insertData() {
    if (jobs.length > 0) {
      setTextInput(jobs[0].text);
    }
  }

  useEffect(() => {
    insertData();
  }, [jobs]);

  const handleFetchRelatedCompetencies = async (occupationId: string) => {
    try {
      const data = await showRelatedCompetencies(occupationId);
      setSelectedOccupationData(data);
    } catch (error) {
      console.error("An error occurred while fetching data.", error);
    }
  };

  function changeInputState(text: string) {
    setTextInput(text);
  }

  function changeAreaInput(text: string) {
    if (text === "") {
      setSendCorrectInfo(true);
    } else {
      setSendCorrectInfo(false);
      setAreaInput(text);
      fetchData();
    }
  }

  const handleToggleAccordion = (occupationId: string) => {
    if (occupationId === activeOccupationId) {
      setActiveOccupationId(null);
    } else {
      setActiveOccupationId(occupationId);
      handleFetchRelatedCompetencies(occupationId);
    }
  };

  const isGrid2Hidden =
    !selectedOccupationData || selectedOccupationData.competencies.length === 0;

  const occupationContainerRef = useRef<HTMLDivElement | null>(null);

  const handleLiClick = () => {
    if (occupationContainerRef.current) {
      occupationContainerRef.current.scrollTop = 0;
    }
  };

  return (
    <>
      <ShowSearchNav
        input={changeInputState}
        textArea={changeAreaInput}
      ></ShowSearchNav>
      <div className="occupation-container" ref={occupationContainerRef}>
        {apiMatchByText && (
          <ul>
            {apiMatchByText.related_occupations.map((occupation) => (
              <li
                key={occupation.id}
                onClick={() => {
                  handleToggleAccordion(occupation.id);
                  handleLiClick();
                }}
                className={`occupation-box-accordion ${
                  occupation.id === activeOccupationId ? "active" : ""
                }`}
              >
                <h4>
                  {occupation.occupation_label}{" "}
                  <span className="symbol">
                    <DigiIconCaretDown />
                  </span>
                </h4>

                {occupation.id === activeOccupationId &&
                  windowWidth < 1200 && ( // render the following content if both conditions are true
                    <div className="competencies-container">
                      {activeOccupationId && (
                        <DisplayChart jobId={activeOccupationId} />
                      )}
                    </div>
                  )}
              </li>
            ))}
          </ul>
        )}
        {!isGrid2Hidden && windowWidth >= 1200 && (
          <div className="grid-2">
            {activeOccupationId && <DisplayChart jobId={activeOccupationId} />}
          </div>
        )}
      </div>
    </>
  );
}

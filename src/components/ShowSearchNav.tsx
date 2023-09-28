import {
  FormTextareaValidation,
  FormTextareaVariation,
  ButtonSize,
  ButtonVariation,
} from "@digi/arbetsformedlingen";
import {
  DigiButton,
  DigiFormTextarea,
  DigiIconSearch,
  DigiTypographyHeadingJumbo,
} from "@digi/arbetsformedlingen-react";
import { DigiFormTextareaCustomEvent } from "@digi/arbetsformedlingen/dist/types/components";
import { ChangeEvent, useEffect, useState } from "react";
import { SearchInput } from "./styled/SearchInput";

interface ISearchProps {
  input: (text: string) => void;
  textArea: (text: string) => void;
}

export default function ShowSearchNav({ input, textArea }: ISearchProps) {
  const [textInput, setTextInput] = useState<string>("");
  const [areaInput, setAreaInput] = useState<string>("");
  const [screenSize, setScreenSize] = useState<boolean>();

  let width = document.documentElement.clientWidth;

  function controlScreenSize() {
    if (width > 900) {
      setScreenSize(true);
    } else {
      setScreenSize(false);
    }
  }

  function updateScreenSize() {
    width = document.documentElement.clientWidth;
  }

  function init() {
    window.addEventListener("resize", updateScreenSize);
    window.addEventListener("resize", controlScreenSize);

    updateScreenSize();

    if (width > 900) {
      setScreenSize(true);
    } else {
      setScreenSize(false);
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setTextInput(e.target.value);
  }

  function handleTextAreaChange(
    e: DigiFormTextareaCustomEvent<HTMLInputElement>
  ) {
    setAreaInput(e.target.value);
  }

  function handleClick() {
    input(textInput);
    textArea(areaInput);
  }

  useEffect(() => {
    init();
    controlScreenSize();
    updateScreenSize();
  });

  return (
    <>
      <nav>
        <div className="nav-title">
          <DigiTypographyHeadingJumbo
            afText="- JobPathFinder -"
            af-level="TypographyHeadingJumboLevel.H1"
            style={{ textDecoration: "none" }}
          ></DigiTypographyHeadingJumbo>
        </div>
        <div className="nav-search-parent-container">
          <div className="nav-search-container">
            <div className="search-grid">
              <div className="job-input-container">
                <SearchInput
                  type="text"
                  placeholder="lokförare"
                  onChange={handleInputChange}
                ></SearchInput>
                <DigiButton
                  afId="digi-button"
                  afSize={ButtonSize.MEDIUM}
                  afVariation={ButtonVariation.PRIMARY}
                  afFullWidth={false}
                  onAfOnClick={handleClick}
                >
                  {" "}
                  <DigiIconSearch slot="icon"></DigiIconSearch>
                  Sök
                </DigiButton>
              </div>
              <div className="job-input-container-2">
                <div className={screenSize ? "" : "hide"}>
                  <DigiFormTextarea
                    afId="digi-form-text-area"
                    afLabel="Kunskaper"
                    afVariation={FormTextareaVariation.SMALL}
                    afValidation={FormTextareaValidation.NEUTRAL}
                    onAfOnChange={(
                      e: DigiFormTextareaCustomEvent<HTMLInputElement>
                    ) => handleTextAreaChange(e)}
                  ></DigiFormTextarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

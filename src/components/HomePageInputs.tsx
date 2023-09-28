import { HomePageParentContainer } from "./styled/HomePageParentContainer";
import { HomePageSearchContainer } from "./styled/HomePageSearchContainer";
import { SearchInput } from "./styled/SearchInput";
import { ChangeEvent, useContext, useState } from "react";
import { JobsContext } from "../contexts/JobsContext";
import "@digi/arbetsformedlingen/dist/digi-arbetsformedlingen/digi-arbetsformedlingen.css";
import { DigiButton, DigiIconSearch } from "@digi/arbetsformedlingen-react";
import { ButtonSize, ButtonVariation } from "@digi/arbetsformedlingen";

export default function HomePageInputs() {
  const [userInput, setUserInput] = useState("");
  const { add } = useContext(JobsContext);

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setUserInput(e.target.value);
  }

  function handleClick() {
    add(userInput);
  }

  return (
    <HomePageParentContainer>
      <p>
        Letar du efter ett nytt jobb? Sök då bara på din utbildning i rutan
        nedan för att få fram matchande yrken
      </p>
      <HomePageSearchContainer>
        <SearchInput
          type="text"
          placeholder="lokförare"
          onChange={handleInput}
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
      </HomePageSearchContainer>
    </HomePageParentContainer>
  );
}

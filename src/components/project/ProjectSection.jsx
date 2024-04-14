import { useEffect, useReducer } from "react";
import { getListOfUrlRepositoriesUrl } from "../../lib/api-url";
import { GITHUB_USERNAME } from "../../lib/config";
import { SectionWrapper } from "../atom/SectionWrapper";
import { Project } from "./Project";
import { Loader } from "../atom/Loader";
import { useFetch } from "../../hooks/useFetch";

export const ProjectSection = () => {
  
  const state = useFetch( getListOfUrlRepositoriesUrl(GITHUB_USERNAME) );
  if (state.status === "idle" || state.status === "pending") {
    return <Loader />;
  } else if (state.error) {
    return <p>Error: {state.error.message}</p>;
  }

  return (
    <SectionWrapper title="Projects">
      <div className="flex flex-wrap justify-center gap-8">
        {state.data?.map((project) => (
          <Project key={project.name} {...project} />
        ))}
      </div>
    </SectionWrapper>
  );
};

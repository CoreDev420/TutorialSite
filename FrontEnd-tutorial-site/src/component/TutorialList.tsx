import React, {
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { ChangeEvent } from "react";
import {typeTutorial, typeUser} from "../types/typeData";
import Service from "../service/service";
import { staticList } from "../global/tutorialList";
import { serialize } from "v8";
const TutorialList: React.FC = () => {
  // const staticList: Array<TutorialData> = [
  //   {
  //     title: "React",
  //     description: "Front",
  //   },
  //   {
  //     title: "Angular",
  //     description:
  //       "The front language which is better than the other language to build enomous website",
  //   },
  //   {
  //     title: "Vue",
  //     description: "Include all features of react and angular",
  //   },
  // ];

  const [m_Alltutorials, setAll] = useState<Array<typeTutorial>>([]);
  const [m_currentTutorial, setCurrentTutorial] = useState<typeTutorial | null>(
    null
  );
  const [m_currentIndex, setCurrentIndex] = useState<number>(-1);
  const [m_searchTitle, setSearchTitle] = useState<string | null>(null);
  const setActiveTutorial = (mTutorial: typeTutorial, index: number) => {
    setCurrentIndex(index);
    setCurrentTutorial(mTutorial);
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
  };
  // search all tutorials
  const refreshTutorial = () => {
    Service.getAll()
      .then((res: any) => {
        setAll(res.data);
        console.log(res.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const deleteAllTutorial = () => {
    console.log("Dele");
    Service.deleteAllTutorial()
      .then((response: any) => {
        console.log("refresh");
        refreshTutorial();
        setCurrentTutorial(null);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const searchByTitle = () => {
    console.log(m_searchTitle);
    Service.getByTitle(m_searchTitle).then((res: any) => {
      console.log(res);
      setAll(res.data);
    });
  };
  /**script test */

  /**end */
  //initial method
  useEffect(() => {
    refreshTutorial();
  }, []);
  return (
    <div>
      <div className="input-group flex grid grid-cols-12 m-0 max-w-[750px]">
        <div className="col-span-8 pl-[15px] pr-[15px] flex mb-[6px]">
          {" "}
          <input
            type="text"
            className="form-control flex-auto pl-[12px] pt-[6px] pb-[6px] text-[16px] rounded-[4px] border-2 border-white"
            placeholder="Search by title"
            onChange={handleInputChange}
          />
          <button
            className="border-2 border-white p-[15px] rounded-r-lg"
            onClick={searchByTitle}
          >
            Search
          </button>
        </div>
        <div className="col-span-6 px-[15px]">
          <h4 className="text-[24px]">Tutorials List</h4>
          <ul>
            {m_Alltutorials &&
              m_Alltutorials.map((tutorial, index) => (
                <li
                  className={
                    "p-[12px] border-[1px] hover:text-sky-600" +
                    (index === m_currentIndex ? " bg-sky-400" : "")
                  }
                  key={index}
                  onClick={() => setActiveTutorial(tutorial, index)}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>
          <button
            className="bg-[red] text-[white] rounded-[4px] p-[3px] mt-[8px]"
            onClick={deleteAllTutorial}
          >
            Remove All
          </button>
        </div>
        <div className="col-span-6 px-[15px] mt-[8px]">
          {m_currentTutorial ? (
            <div>
              <h4 className="text-[24px]">Tutorial</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>
                {m_currentTutorial.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>
                {m_currentTutorial.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>
                {m_currentTutorial.published ? "Published" : "Pending"}
              </div>
              <button className="bg-yellow-700 text-[16px] hover:bg-yellow-400 rounded-md p-[3px]">
                Edit
              </button>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
      <button className="text-red-400 text-[16px]">test</button>
    </div>
  );
};

export default TutorialList;

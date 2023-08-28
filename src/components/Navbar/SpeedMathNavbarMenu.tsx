import { useState } from "react";
import { NavLink } from "react-router-dom";
import TabIcon from "./TabIcon";

import { ActiveTabParams } from "../../redux/features/addActiveTabLink";

import { ROUTERKEYCONST } from "../../constants";

interface props {
  item: ActiveTabParams;
  handleClickSpeedMath: Function;
  queryParams: String;
  calcWidth: number;
  elementPosition: number;
  currentSelectedMenuIndex: number;
  handleOpenSubMenu: Function;
}
export default function SpeedMathNavbarMenu({
  item,
  handleClickSpeedMath,
  queryParams,
  calcWidth,
  elementPosition,

  handleOpenSubMenu,
}: props) {
  const [currentSelectedTopic, setCurrentSelectedTopic] = useState(-1);
  const [currentSelectedTag, setCurrentSelectedTag] = useState(-1);
  const handleSelectTopic = (index: number) => {
    if (index === currentSelectedTopic) {
      setCurrentSelectedTopic(-1);
    } else {
      setCurrentSelectedTopic(index);
    }
    setCurrentSelectedTag(-1);
  };

  const speedMathLevels = [
    "Level 1",
    "Level 2",
    "Level 3",
    "Level 4",
    "Level 5",
  ];

  return (
    <>
      {
        <ul
          onMouseLeave={() => handleOpenSubMenu(-1)}
          className={`bg-header-black text-white transform absolute scale-
          transition duration-150 ease-in-out origin-top flex min-w-[260px] flex-col min-h-[48px] items-center -right-px
          `}
          style={{
            maxHeight: `calc(100vh - 72px - 45.28px - 61.61px - ${
              elementPosition * calcWidth
            }px)`,
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          {speedMathLevels.map((levels, index) => {
            return (
              <li
                className="rounded-sm px-3 pl-6 pr-3 py-3  relative item-center"
                key={index}
              >
                <div
                  className="flex gap-2 relative item-center "
                  onClick={() => handleSelectTopic(index)}
                  style={{ cursor: "pointer" }}
                >
                  <div className={"w-48"} style={{ display: "block" }}>
                    <div className="flex gap-2">
                      <NavLink
                        key={index}
                        to={`/speedmath?${queryParams}`}
                        onClick={() =>
                          handleClickSpeedMath({
                            path: ROUTERKEYCONST.speedmath,
                            key: ROUTERKEYCONST.speedmath,
                            name: "Speed Math",
                            icon: item.icon,
                            extraParams: {
                              speedMathLevel: index + 1,
                            },
                          })
                        }
                        className={"w-48"}
                        style={{ display: "block" }}
                      >
                        {levels}
                      </NavLink>
                    </div>
                  </div>
                  <TabIcon
                    src={`/menu-icon/chevron_${
                      currentSelectedTopic === index ? "up" : "down"
                    }.svg`}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      }
    </>
  );
}

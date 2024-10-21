import { TextField } from "@mui/material";
import React from "react";
import IshowGoal from "../../utils/Interfaces/IGoals";
import { Iuser } from "../../utils/Interfaces/Iuser";

const GoalSearch = ({
  permanentList,
  setGoalList,
  isGoal,
}: {
  permanentList: IshowGoal[] | Iuser[];
  setGoalList: any;
  isGoal: boolean;
}) => {
  const [serachValue, setSearchValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let keyword = event.target.value;
    setSearchValue(keyword);
    if (keyword === "") {
      setGoalList(permanentList);
      return;
    }

    if (isGoal) {
      let newList: IshowGoal[] = permanentList.filter((goal: IshowGoal) => {
        return (
          goal.employeeName.includes(keyword.toLowerCase()) ||
          goal.goalOutcome.includes(keyword.toLowerCase())
        );
      });
      setGoalList(newList);
    } else {
      let newList: Iuser[] = permanentList.filter((user: Iuser) => {
        return (
          user.name.includes(keyword.toLowerCase()) ||
          user.email?.includes(keyword.toLowerCase())
        );
      });
      setGoalList(newList);
    }
  };
  return (
    <TextField
      label="Search"
      variant="standard"
      fullWidth={true}
      value={serachValue}
      onChange={(event :React.ChangeEvent<HTMLInputElement>) => {
        handleChange(event);
      }}
    />
  );
};

export default GoalSearch;

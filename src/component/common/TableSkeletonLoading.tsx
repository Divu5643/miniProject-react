import { Skeleton, TableCell, TableRow } from "@mui/material";
import React from "react";

const TableSkeletonLoading = ( {column = 0} : {column:number}) => {
  var list=[];
  for(var i = 0; i < column;i++){
    list.push(i);
  }
  return (
    <>
        <TableRow>
      <div  style={{ display: "flex",padding:"2rem" }}>
        {list.map(() => {
       return <TableCell sx={{flexGrow:1}}>    
            <Skeleton
          animation="wave"
          width={"225px"}
          variant="rectangular"
          height={50}
          />
          </TableCell>
        })}
      </div>
        </TableRow>
       
    </>
  );
};

export default TableSkeletonLoading;

import { Skeleton } from "@mui/material";
import React from "react";

const TableSkeletonLoading = () => {
  return (
    <>
      <div  style={{ display: "flex", gap: "20px",padding:"2rem" }}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={200}
          height={50}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={200}
          height={50}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={200}
          height={50}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={200}
          height={50}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={200}
          height={50}
        />
      </div>
    </>
  );
};

export default TableSkeletonLoading;

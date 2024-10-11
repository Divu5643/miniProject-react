import React, { useEffect } from 'react'
import GoalsTable from '../../component/common/GoalsTable'
import IshowGoal from '../../utils/Interfaces/IGoals';
import Axios from '../../axios/config';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

const ReviewerGoal = () => {
  const [goalList,setGoalList] = React.useState<IshowGoal[]>([]);
  const [open,setOpen] = React.useState({open:false,message:""});
  const openSnackBar = (message:string)=>{
    setOpen({open:true,message:message});
  }
  const managerID = useSelector((state: RootState) => state.loginData.userId);


  useEffect(()=>{
    Axios.post("/goal/getGoalsByManager",{userID: managerID}).then((response)=>{
      setGoalList(response.data);
      
    }).catch((error)=>{
      console.log(error);
    })
    


  },[])

  return (
    <>
    <div className="page-header">
        <h1 className="page-title">GNop</h1>
    </div>
    <div className="page-content">
      <GoalsTable goalList ={goalList} setGoalList={setGoalList} openSnackBar={openSnackBar} />
    </div>
    </>
  )
}

export default ReviewerGoal
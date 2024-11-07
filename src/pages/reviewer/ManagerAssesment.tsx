import React from 'react'

import AssesmentForm from '../../component/common/AssesmentForm'
import { useDispatch } from 'react-redux';
import { setTitle } from '../../redux/slice/userSlice';

const ManagerAssesment:React.FC = () => {
  const dispatch = useDispatch();
  dispatch(setTitle("Assesment"));
  return (
    <>
    {/* <ContentHeader title="Assesment" /> */}
    <div className="page-content">
        <AssesmentForm />
    </div>
    </>
  )
}

export default ManagerAssesment
import React from 'react'
import ContentHeader from '../../component/common/ContentHeader'
import AssesmentForm from '../../component/common/AssesmentForm'

const ManagerAssesment = () => {
  return (
    <>
    <ContentHeader title="Assesment" />
    <div className="page-content">
        <AssesmentForm />
    </div>
    </>
  )
}

export default ManagerAssesment
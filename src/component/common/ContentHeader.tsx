import React from 'react'

const ContentHeader = ({title}:{title:string}) => {
  return (
    <div className="page-header">
        <h4 className="page-title">{title}</h4>
      </div>
  )
}

export default ContentHeader
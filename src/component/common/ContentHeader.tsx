import React from 'react'
import ProfileNavigation from './ProfileNavigation'

const ContentHeader = ({title}:{title:string}) => {
  return (
    <div className="page-header">
    <h4 className="page-title">{title}</h4>
    <ProfileNavigation />
  </div>
  )
}

export default ContentHeader
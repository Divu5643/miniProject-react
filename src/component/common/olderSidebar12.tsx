import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import Drawer from '@mui/material/Drawer';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';

const olderSidebar1:React.FC = () => {
  return (
    
    <Drawer
    anchor={"left"}
    open={true}
    
  >
    <ListItemWithIcon Icon={DashboardIcon} text="Dashboard" />
    <ListItem >Employee </ListItem>
    <ListItem > </ListItem>
    <ListItem > Hello</ListItem>
  </Drawer>
  )
}

const ListItemWithIcon = ({ Icon, text }:{Icon:React.FC,text:string}) => {
    return (<ListItem >
    <ListItemButton>
    <ListItemIcon> 
        {<Icon />} 
        </ListItemIcon> 
    <ListItemText primary={text} />
    </ListItemButton>
     </ListItem>)
}

export default olderSidebar1
// trash for sidebar
{/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
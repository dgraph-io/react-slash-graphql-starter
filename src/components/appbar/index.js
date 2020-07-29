import React from 'react';

import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';

import {Sidebar, SidebarItem} from '../sidebar';
import { Navbar, NavbarItem } from '../navbar';

const AppBar = ({ title }) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <Navbar title={title} color="primary" handleDrawerToggle={handleDrawerToggle} />
            <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}>
                <SidebarItem label="Home" icon={HomeIcon} link="/" />
                <SidebarItem label="Form Example" icon={PeopleIcon} link="/form"/>
                <SidebarItem label="Settings" icon={SettingsIcon}>
                <SidebarItem label="Start" link="/not-implemented" />
                <SidebarItem label="Here" link="/not-implemented" />
                </SidebarItem>
            </Sidebar>
        </>
    );
}

export default AppBar;
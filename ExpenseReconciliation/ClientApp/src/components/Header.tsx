import React from 'react';
import AuthToolbar from '../auth/AuthToolbar';
import {Menubar} from 'primereact/menubar';
import {MenuItem} from 'primereact/menuitem';

const Header = () => {  
  const items: MenuItem[] = [
    {
      icon: 'pi pi-fw pi-home',
      url: '/',
    },    
    {
      label: 'Expenses Reconciliation',     
      items: [
        {
          icon: 'pi pi-fw pi-home',
          label: 'Home',
          url: '/',
        },
        {
          label: 'Dashboard',
          icon: 'pi pi-fw pi-chart-bar',
          url: '/dashboard',
        },
        {
          label: 'Transactions',
          icon: 'pi pi-fw pi-dollar',
          url: '/list',
        },
        {
          label: 'Categories',
          icon: 'pi pi-fw pi-list',
          url: '/categories',
        },
      ]
    },
  ]

  return (
    <Menubar model={items}
             style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
             end={<AuthToolbar />}>
    </Menubar>
  );
};

export default Header;

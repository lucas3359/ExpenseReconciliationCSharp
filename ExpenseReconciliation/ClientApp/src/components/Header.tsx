import React from 'react';
import AuthToolbar from '../auth/AuthToolbar';
import {Menubar} from 'primereact/menubar';
import {MenuItem} from 'primereact/menuitem';

const Header = () => {  
  const items: MenuItem[] = [{     
      icon: 'pi pi-fw pi-home',
    },
    {
      label: 'Expenses Reconciliation',
    }
  ]

  return (
    <Menubar model={items} className="bg-white bg-opacity-25"
             end={<AuthToolbar />}>
    </Menubar>
  );
};

export default Header;

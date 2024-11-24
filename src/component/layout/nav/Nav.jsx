import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  FileOutlined,
  UserOutlined,
  PhoneOutlined,
  FolderOutlined,
} from '@ant-design/icons';

const Nav = () => {
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      key: 'whatsnew',
      icon: <FileOutlined />,
      label: "What's new?",
      onClick: () => window.location.href = '/whatsnew',
    },
    {
      key: 'categories',
      icon: <FolderOutlined />,
      label: 'Danh mục (Category)',
      children: [
        {
          key: 'sub1',
          label: 'Danh mục con 1',
        },
        {
          key: 'sub2',
          label: 'Danh mục con 2',
        },
        {
          key: 'sub3',
          label: 'Danh mục con 3',
        },
      ],
    },
    {
      key: 'contact',
      icon: <PhoneOutlined />,
      label: 'Liên hệ',
      onClick: () => window.location.href = 'mailto:hunglepy05@gmail.com',
    },
    {
      key: 'about',
      icon: <UserOutlined />,
      label: 'Về tôi',
      onClick: () => window.location.href = 'https://github.com/Gawasna',
    },
  ];

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['whatsnew']}
      defaultOpenKeys={['categories']}
      style={{
        width: collapsed ? 80 : 250,
        height: '100vh',
        borderRight: '1px solid #f0f0f0',
      }}
      inlineCollapsed={collapsed}
      items={items}
    />
  );
};

export default Nav;
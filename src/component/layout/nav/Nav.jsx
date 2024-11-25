import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { FileOutlined, FolderOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { getNCategory } from '@/pages/Posts/api'; // Adjust the import path as needed

const Nav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [categories, setCategories] = useState([]);
  const wn = "https://github.com/Gawasna/da-blog/blob/main/public/What's%20News.md";

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getNCategory();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const items = [
    {
      key: 'whatsnew',
      icon: <FileOutlined />,
      label: "What's new?",
      onClick: () => window.location.href = wn,
    },
    {
      key: 'categories',
      icon: <FolderOutlined />,
      label: 'Danh mục',
      children: categories.map(category => ({
        key: `category-${category.id}`,
        label: category.name,
      })),
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
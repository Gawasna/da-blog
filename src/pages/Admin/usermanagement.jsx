import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, Modal, message, Select, Dropdown, Menu } from 'antd';
import { getAllUsers, deleteUser, modifyUser, createUser, changeUserRole } from './api';

const { Option } = Select;

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [createForm] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });

    const fetchUsers = async (page = pagination.current, limit = pagination.pageSize) => {
        try {
            setLoading(true);
            const data = await getAllUsers(page, limit);
            setUsers(data.users);
            setPagination(prev => ({
                ...prev,
                total: data.pagination.total,
            }));
        } catch (error) {
            message.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const handleTableChange = (pagination) => {
        setPagination(pagination);
        fetchUsers(pagination.current, pagination.pageSize);
    };

    useEffect(() => {
        fetchUsers(pagination.current, pagination.pageSize);
    }, [pagination.current, pagination.pageSize]);

    const handleRowClick = (record) => {
        setSelectedUser(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleUpdate = async () => {
        if (!selectedUser?.id) {
            message.error('Invalid user selected for update');
            return;
        }
        try {
            const values = await form.validateFields();
            console.log('Updating user with values:', values);
            const response = await modifyUser(selectedUser.id, values.username, values.email);
            console.log('Update user response:', response);
            message.success('User updated successfully');
            setIsModalVisible(false);
            form.resetFields();
            fetchUsers();
        } catch (error) {
            console.error('Update failed:', error);
            message.error('Failed to update user: ' + error.message);
        }
    };

    const handleDelete = async () => {
        if (!selectedUser || !selectedUser.id) {
            message.error('Invalid user selected for deletion');
            return;
        }

        try {
            await deleteUser(selectedUser.id);
            message.success('User deleted successfully');
            fetchUsers();
            setIsModalVisible(false);
        } catch (error) {
            message.error('Failed to delete user');
        }
    };

    const handleChangeRole = async () => {
        if (!selectedUser || !selectedUser.id) {
            message.error('Invalid user selected for role change');
            return;
        }
    
        try {
            await changeUserRole(selectedUser.id);
            message.success('User role changed successfully');
            fetchUsers();
        } catch (error) {
            if (error.message === 'You cannot change your own role') {
                message.error('You cannot change your own role');
            } else {
                message.error('Failed to change user role: ' + error.message);
            }
        }
    };
    
    const handleCreateUser = async () => {
        try {
            const values = await createForm.validateFields();
            if (values.password !== values.retypepass) {
                message.error('Passwords do not match');
                return;
            }
            await createUser(values);
            message.success('User created successfully');
            setIsCreateModalVisible(false);
            createForm.resetFields();
            fetchUsers();
        } catch (error) {
            message.error('Failed to create user: ' + error.message);
        }
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Avatar', dataIndex: 'avatar', key: 'avatar', render: (text) => <img src={text} alt="avatar" style={{ width: '50px' }} /> },
        { title: 'Username', dataIndex: 'username', key: 'username' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Role', dataIndex: 'role', key: 'role' },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item key="modify" onClick={() => handleRowClick(record)}>Modify</Menu.Item>
                            <Menu.Item key="delete" onClick={() => { setSelectedUser(record); handleDelete(); }}>Delete</Menu.Item>
                            <Menu.Item key="changeRole" onClick={() => { setSelectedUser(record); handleChangeRole(); }}>Change Role</Menu.Item>
                        </Menu>
                    }
                    trigger={['click']}
                >
                    <Button>Actions</Button>
                </Dropdown>
            )
        }
    ];

    return (
        <div>
            <Button type="primary" onClick={() => setIsCreateModalVisible(true)}>Create User</Button>
            <Table
                columns={columns}
                dataSource={users}
                rowKey="id"
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
            />
            <Modal
                title="Edit User"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="delete" type="danger" onClick={handleDelete}>
                        Delete
                    </Button>,
                    <Button key="update" type="primary" onClick={handleUpdate}>
                        Update
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical" initialValues={selectedUser}>
                    <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Create User"
                visible={isCreateModalVisible}
                onCancel={() => setIsCreateModalVisible(false)}
                footer={[
                    <Button key="create" type="primary" onClick={handleCreateUser}>
                        Create
                    </Button>,
                ]}
            >
                <Form form={createForm} layout="vertical">
                    <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="retypepass" label="Retype Password" rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                        <Select>
                            <Option value="admin">Admin</Option>
                            <Option value="user">User</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserManagement;
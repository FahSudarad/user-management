'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchUsers, updateUser, deleteUser } from '../../utils/api';
import { Modal, ModalContent, Button, Input, ModalBody, ModalHeader, ModalFooter, useDisclosure, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Pagination } from '@nextui-org/react';
import { toast, Toaster } from 'sonner';
import { EditIcon } from '../../../public/svg/EditIcon';
import { DeleteIcon } from '../../../public/svg/DeleteIcon';

interface User {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await fetchUsers(page);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (selectedUser) {
      const updatedData = { first_name: firstName, last_name: lastName, email };
      try {
        await updateUser(selectedUser.id, updatedData);
        toast.success('User updated successfully');
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? { ...user, ...updatedData } : user
          )
        );
      } catch (err) {
        toast.error('Error updating user');
      } finally {
        onClose();
      }
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      toast.success('User deleted successfully');
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      toast.error('Error deleting user');
    }
  };

  const openModal = (user: User) => {
    setSelectedUser(user);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email);
    onOpen();
  };

  const renderCell = (user: User, columnKey: string) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{ radius: 'lg', src: user.avatar }}
            description={user.email}
            name={`${user.first_name} ${user.last_name}`}
          />
        );
      case 'actions':
        return (
          <div className="flex items-center gap-2">
            <Button onPress={onOpen} auto onClick={() => openModal(user)} className="bg-[#BDBDBD]"><EditIcon /></Button>
            <Button auto color="danger" onClick={() => handleDeleteUser(user.id)} className="bg-[#F44336]"><DeleteIcon /></Button>
          </div>
        );
      default:
        return cellValue;
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full">
      <div className="p-4 lg:p-8 bg-gray-100">
        <p className="text-gray-500">page/user</p>
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-semibold text-black mt-1">User Management</h2>
          <button
            onClick={handleLogOut}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 h-10"
          >
            Log Out
          </button>
        </div>
        <div className="text-right mb-4">
        </div>

        <div className="pr-10">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <Table aria-label="User Management Table" className="w-full">
              <TableHeader>
                <TableColumn className="text-[#4B5563] min-w-[50px]">ID</TableColumn>
                <TableColumn className="text-[#4B5563] min-w-[100px]">Image</TableColumn>
                <TableColumn className="text-[#4B5563] min-w-[200px]">Name</TableColumn>
                <TableColumn className="text-[#4B5563] min-w-[200px]">Email</TableColumn>
                <TableColumn className="text-[#4B5563] min-w-[200px]">Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="text-[#4B5563]">{user.id}</TableCell>
                    <TableCell>
                      <Image src={user.avatar} width={32} height={32} alt={user.first_name} className="rounded-full" />
                    </TableCell>
                    <TableCell className="text-[#4B5563]">{`${user.first_name} ${user.last_name}`}</TableCell>
                    <TableCell className="text-[#4B5563]">{user.email}</TableCell>
                    <TableCell>{renderCell(user, 'actions')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex justify-end">
            <Pagination total={totalPages} page={page} onChange={(newPage: React.SetStateAction<number>) => setPage(newPage)} />
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: any) => (
            <>
              <ModalHeader>
                <h2 className="text-orange-500">Update User</h2>
              </ModalHeader>
              <ModalBody>
                <Input
                  clearable
                  underlined
                  label="First Name"
                  value={firstName}
                  onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setFirstName(e.target.value)}
                />
                <Input
                  clearable
                  underlined
                  label="Last Name"
                  value={lastName}
                  onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setLastName(e.target.value)}
                />
                <Input
                  clearable
                  underlined
                  label="Email"
                  value={email}
                  onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleUpdateUser}>
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Toaster position="top-center" richColors />
    </div>
  );
};

export default UserManagement;

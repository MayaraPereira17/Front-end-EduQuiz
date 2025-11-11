import { useState } from "react";
import { UserList } from "./UserList";
import { RegisterUserForm } from "./RegisterUserForm";

export function UsersAdmin() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOpenRegister = () => {
    setShowRegisterForm(true);
  };

  const handleRegisterSuccess = () => {
    setShowRegisterForm(false);
    // Forçar recarregamento da lista
    setRefreshKey(prev => prev + 1);
  };

  const handleCancelRegister = () => {
    setShowRegisterForm(false);
  };

  if (showRegisterForm) {
    return (
      <RegisterUserForm 
        onSuccess={handleRegisterSuccess}
        onCancel={handleCancelRegister}
      />
    );
  }

  return (
    <UserList key={refreshKey} onOpenRegister={handleOpenRegister} />
  );
}

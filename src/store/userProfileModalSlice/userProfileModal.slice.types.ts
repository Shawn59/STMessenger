interface User {
  id: number;
  name: string;
  avatar: string;
  // другие поля
}

interface ModalState {
  isOpen: boolean;
  userData: User | null;
}

const initialState: ModalState = {
  isOpen: false,
  userData: null,
};

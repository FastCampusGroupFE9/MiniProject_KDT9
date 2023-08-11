declare module 'types/common' {

interface User {
  name: string;
  joinDate: string;
}

interface JoinUserInputType {
  id: string;
  name: string;
  joinDate: string;
}

interface LoginOutputType {
  id: string;
  name: string;
  joinDate: string;
  accessToken: string;
  refreshToken?: string;
}

interface UserLoginType {
  accessToken: string;
  refreshToken?: string;
}

interface LoginType {
  email: string,
  password: string
}

type MyDataType = {
  name: string,
  annualBalance: number,
  position: string,
  annualUsed: string,
  annualRemain: number,
  annualHistories: Array<{
    id: number,
    title: string,
    reason: string,
    startDate: string,
    endDate: string,
    status: string,
  }>;
  dutyHistories: Array<{
    id: number,
    title: string,
    startDate: string,
    endDate: string,
    status: string,
  }>;
};


interface MyDataAction {
  addMyData: (myData: MyDataType) => void,
  addAnnual: (annual: AnnualType) => void,
  updateAnnual: (annual: AnnualType) => void,
  deleteAnnual: (id: number) => void
}

interface AnnualType {
  id: number;
  reason: string;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
}


interface DutyType {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
}

// declare type MyStore = {
//   data: MyDataType[];
//   addMyData: (myDataArray: MyDataType[]) => void;
// };

interface User {
  email: string,
  password: string,
  name: string,
  joinDate: string
}

type UserActions = {
  addUser: (email: string, name: string, password: string, join: string) => void,
  deleteUser: (email: string) => void,
  updateUser: (email: string, name: string, password: string, join: string) => void
}

interface UserStore {
  users: User[];
  addUser: UserActions["addUser"];
  deleteUser: UserActions["deleteUser"];
  updateUser: UserActions["updateUser"];
}

interface CounterType {
  annualCal: number,
  count: number,
  setAnnualCal: (value: number) => void,
  setCount: (value: number) => void
}

interface ModalProps {
  visibility: boolean;
  toggle: (param: boolean) => void;
}

interface NewEvent {
  title: string;
  startDate: string;
  endDate: string;
  category: string;
  reason: string;
}

type HandleClickType = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

type AddEventModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  handleAddEvent: (newEvent: NewEvent) => void; // NewEvent 타입으로 수정
};

interface NewEvent {
  title: string;
  startDate: string;
  endDate: string;
  category: string;
  reason: string;
}

interface UpdateType {
  message(message: any): unknown;
  id?: number;
  title: string;
  startDate: string;
  endDate: string;
  reason: string;
}

interface  AdminListsAll {
  id: number;
  name: string;
  category: string;
  title: string;
  startDate: string;
  endDate: string;
  reason?: string;
  status: string;
}


}

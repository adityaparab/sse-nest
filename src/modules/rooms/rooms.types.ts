import { User } from '../common/common.types';

export type Room = {
  id: string;
  title: string;
  creator: User;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateRoomDto = {
  title: string;
  name: string;
};

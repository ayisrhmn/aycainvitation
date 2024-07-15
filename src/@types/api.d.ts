interface WishesData {
  name: string;
  wish: string;
  createdBy: string;
  invitationBy: string;
}

interface Data<T> {
  success: boolean;
  data?: T | T[];
  error?: string;
}

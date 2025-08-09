export interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  updated_at: string;
  status: "sent" | "delivered" | "read";
  reactions: { [key: string]: string[] }; // emoji: [user_ids]
  sender: {
    email: string;
    user_metadata: {
      name?: string;
    };
  };
  deleted?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
}

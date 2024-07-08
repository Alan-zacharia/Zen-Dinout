export interface ConversationType {
    _id: string;
    members: string[];
};


export interface MessageType {
    _id?: string;
    conversationId?: string;
    sender: string;
    text: string;
    createdAt: Date ;
  }
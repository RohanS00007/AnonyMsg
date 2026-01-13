import type { UserMessage } from "@/models/UserMsg";

export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean;
  messages?: Array<UserMessage>
};
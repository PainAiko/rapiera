export interface ActivityUser {
    id: number;
    content: string;
    ip_source: string;
    device: string;
    created_at: string;
    updated_at: string;
  }

export interface LogData {
    data: ActivityUser[]
    next_page_url: string | null
}
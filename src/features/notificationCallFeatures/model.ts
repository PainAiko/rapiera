export interface NotificationData {
    techId: number;
    techName: string;
    meetLink: string;
    triggeredAt: string
}

export interface NotificationCallData {
    data: NotificationData[];
    next_page_url: string | null
}
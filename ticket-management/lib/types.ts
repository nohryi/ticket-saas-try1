export interface Ticket {
  id: string;
  title: string;
  submitter_name: string;
  created_at: string;
  priority: string;
  location: string;
  description: string;
  image_name?: string;
  image_url?: string;
  status: string;
  updated_at: string;
  incident_time?: string;
  order?: number;
}

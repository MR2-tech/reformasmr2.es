export interface Review {
  readonly id: string;
  readonly client_name: string;
  readonly score: number;
  readonly description: string;
  readonly created_at: string;
  readonly ip_address?: string;
}

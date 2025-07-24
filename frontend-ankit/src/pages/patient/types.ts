
export interface Mission {
  id: number;
  title: string;
  points: number;
  description: string;
  progressCurrent: number;
  progressTotal: number;
}

export interface RedemptionOffer {
  id: number;
  title: string;
  points: number;
  description: string;
}

export interface User {
  name: string;
  phone: string;
  balance: number;
}

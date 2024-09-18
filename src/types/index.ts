export type Note = {
  id: number;
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date;
};

export type CsrfToken = {
  csrf_token: string;
};
export type Credential = {
  email: string;
  password: string;
};

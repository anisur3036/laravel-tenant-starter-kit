import { Config } from "ziggy-js";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  permissions: string[];
  roles: string[];
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User;
  };
  flash: {
    success: string | null;
    error: string | null;
  };
  ziggy: Config & { location: string };
};

export interface ILaravelPaginate<T extends object> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    active: boolean;
    label: string;
    url: string | null;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface iSubMenu {
  id: number;
  name: string;
  url: string;
  icon: React.ReactNode;
}

export interface iMenu {
  title: string;
  icon: React.ReactNode;
  menus: iSubMenu[];
}

export interface iPaginatedData<T> {
  data: T[];
  meta: MetaData;
}

export interface MetaData {
  links: LinkData[];
}

export interface LinkData {
  url: string;
  label: string;
  active: boolen;
}

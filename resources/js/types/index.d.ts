import { Config } from "ziggy-js";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User;
  };
  ziggy: Config & { location: string };
};

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

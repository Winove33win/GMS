import type { ReactElement } from "react";
import Home from "@/pages/Home";
import Mentores from "@/pages/Mentores";
import MentorDetail from "@/pages/MentorDetail";
import Projetos from "@/pages/Projetos";
import Sobre from "@/pages/Sobre";
import Participar from "@/pages/Participar";
import Termos from "@/pages/Termos";
import Privacidade from "@/pages/Privacidade";
import NotFound from "@/pages/NotFound";
import Parcerias from "@/pages/Parcerias";
import ParceriasPropor from "@/pages/ParceriasPropor";

export type AppRoute = {
  path: string;
  element: ReactElement;
};

export const appRoutes: AppRoute[] = [
  { path: "/", element: <Home /> },
  { path: "/mentores", element: <Mentores /> },
  { path: "/mentores/:slug", element: <MentorDetail /> },
  { path: "/projetos", element: <Projetos /> },
  { path: "/sobre", element: <Sobre /> },
  { path: "/participar", element: <Participar /> },
  { path: "/parcerias", element: <Parcerias /> },
  { path: "/parcerias/propor", element: <ParceriasPropor /> },
  { path: "/termos", element: <Termos /> },
  { path: "/privacidade", element: <Privacidade /> },
  { path: "*", element: <NotFound /> },
];

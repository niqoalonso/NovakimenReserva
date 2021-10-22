export const menuItems = [
  {
    id: 0,
    label: "Administración",
    isTitle: true,
  },
  {
    id: 1,
    label: "menuitems.dashboard.text",
    icon: "uil-home-alt",
    badge: {
        variant: "primary",
        text: "menuitems.dashboard.badge"
    },
    link: "/"
},
  {
    id: 2,
    label: "Administración",
    icon: "fas fa-users",
    subItems: [
      {
        id: 1.1,
        label: "Especialidades",
        link: "/especialidades",
        parentId: 2,
      },
      {
        id: 1.2,
        label: "Servicios",
        link: "/servicios",
        parentId: 2,
      },
      {
        id: 1.3,
        label: "Sucursales",
        link: "/sucursales",
        parentId: 2,
      },
      {
        id: 1.4,
        label: "Secretarias",
        link: "/secretarias",
        parentId: 2,
      },
      {
        id: 1.5,
        label: "Previsiones",
        link: "/previsiones",
        parentId: 2,
      },
      {
        id: 1.6,
        label: "Profesionales",
        link: "/profesionales",
        parentId: 2,
      },
      {
        id: 1.7,
        label: "Bloqueo Horas",
        link: "/bloqueo-hora",
        parentId: 2,
      }
    ],
  },

  {
    id: 3,
    label: "Reservas",
    icon: "fas fa-users",
    subItems: [
      {
        id: 1.1,
        label: "Pacientes",
        link: "/pacientes",
        parentId: 3,
      },
      {
        id: 1.2,
        label: "Reservas",
        link: "/reservas",
        parentId: 3,
      },
    ],
  },
 
 
];

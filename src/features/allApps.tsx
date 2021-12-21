import theme from '../theme';
import * as Icons from '../assets/icons';
import * as Apps from './';

export const allApps = [
  {
    id: 1,
    tag: 'Notes',
    colors: [theme.colors.lightBrownish, theme.colors.lighterBrownish],
    icon: <Icons.Pencil />,
    app: {
      name: 'Notes',
      component: <Apps.Notes />,
    },
  },
  {
    id: 2,
    tag: 'Files',
    colors: [theme.colors.lightBluish, theme.colors.lighterBluish],
    icon: <Icons.Archive />,
    app: {
      name: 'Files',
      component: <Apps.Files />,
    },
  },

  {
    id: 3,
    tag: 'Reads',
    colors: [theme.colors.lightGreenish, theme.colors.lighterGreenish],
    icon: <Icons.Glasses />,
    app: {
      name: 'Reads',
      component: <Apps.Reads />,
    },
  },

  {
    id: 4,
    tag: 'Photos',
    colors: [theme.colors.lightPinkish, theme.colors.lighterPinkish],
    icon: <Icons.Image />,
    app: {
      name: 'Photos',
      component: <Apps.Photos />,
    },
  },

  {
    id: 5,
    tag: 'Camera',
    colors: [theme.colors.yellowish, theme.colors.lightYellowish],
    icon: <Icons.Camera />,
    app: {
      name: 'Camera',
      component: <Apps.Camera />,
    },
  },

  {
    id: 6,
    tag: 'Browser',
    colors: [theme.colors.purplish, theme.colors.lightPurplish],
    icon: <Icons.Binoculars />,
    app: {
      name: 'Browser',
      component: <Apps.Browser />,
    },
  },
];

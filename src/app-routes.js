import { routes } from './config/routes';
import React, { Suspense } from 'react'
const renderRoutes = [{
    path: routes.recorder.path,
    exact: true,
    component: React.lazy(() =>
      import('./container/voice-note-list/voice-recorder')
    ),
  },
  {
    path: routes.list.path,
    exact: true,
    component: React.lazy(() =>
      import('./container/voice-recorder/voice-note-list')
    ),
  },
]

export default renderRoutes




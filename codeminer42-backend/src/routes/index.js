import pilotesRouter from './pilots.router';
import resourceCargosRouter from './resource_cargos.router';
import travelContractsRouter from './travel_contracts.router';
import travelRoutesRouter from './travel_routes.router';
import { serviceMiddleware } from '@/middleware';

const routers = [
  { '/pilots': pilotesRouter },
  { '/cargos': resourceCargosRouter },
  { '/contracts': travelContractsRouter },
  { '/routes': travelRoutesRouter }
];

const middlewares = [serviceMiddleware.get];

export function attachRouters(app) {

  for (const routerObj of routers) {
    const [resource, router] = Object.entries(routerObj)[0];
    app.use(resource, middlewares, router);
  }
}

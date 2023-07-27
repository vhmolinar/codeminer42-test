import { StatusCodes } from 'http-status-codes';

export async function index(req, res) {
  const { planetFrom, planetTo } = req.query;
  const routes = await req.service.listRoutes(planetFrom, planetTo);
  res.status(StatusCodes.OK).json(routes);
}

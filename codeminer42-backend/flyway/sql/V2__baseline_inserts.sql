insert into travel_route (planet_from, planet_to, fuel_cost, available)
values
  ('Andvari', 'Aqua', 13, true),
  ('Andvari', 'Demeter', null, false),
  ('Andvari', 'Calas', 23, true),
  ('Demeter', 'Andvari', null, false),
  ('Demeter', 'Aqua', 22, true),
  ('Demeter', 'Calas', 25, true),
  ('Aqua', 'Andvari', null, false),
  ('Aqua', 'Demeter', 30, true),
  ('Aqua', 'Calas', 12, true),
  ('Calas', 'Andvari', 20, true),
  ('Calas', 'Demeter', 25, true),
  ('Calas', 'Aqua', 15, true);

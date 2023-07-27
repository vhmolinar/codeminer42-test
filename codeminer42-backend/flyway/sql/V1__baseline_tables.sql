create table travel_route (
  id serial not null,
  planet_from varchar not null,
  planet_to varchar not null,
  fuel_cost numeric(10,2),
  available boolean default true,
  primary key(id),
  unique(planet_from, planet_to)
);

create table pilot (
  id serial not null,
  certification varchar,
  name varchar not null,
  credits numeric(10, 2) default 0,
  location varchar not null,
  primary key(id)
);

create table ship (
  id serial not null,
  id_pilot integer not null,
  fuel_capacity numeric(10, 2) not null,
  fuel_level numeric(10, 2) not null,
  weight_capacity numeric(10, 2) not null,
  primary key(id),
  foreign key(id_pilot) references pilot(id)
);

create table resource_cargo (
  name varchar not null,
  weight numeric(10, 2) not null,
  primary key(name)
);

create table travel_contract (
  id serial not null,
  id_route integer not null,
  id_pilot integer not null,
  id_ship integer not null,
  description varchar not null,
  budget numeric(10, 2) not null,
  primary key(id),
  foreign key(id_route) references travel_route(id),
  foreign key(id_pilot) references pilot(id),
  foreign key(id_ship) references ship(id)
);

create table travel_cargo (
  id_travel integer not null,
  resource_cargo varchar not null,
  primary key(id_travel, resource_cargo),
  foreign key(id_travel) references travel_contract(id),
  foreign key(resource_cargo) references resource_cargo(name)
);

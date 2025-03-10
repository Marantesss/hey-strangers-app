-- Fields data with different types, floorings, and sports
insert into public.field (id, name, address, type, flooring, sport)
values
  -- Soccer fields
  ('c0ac642f-5fa4-47c4-8ba5-e77a1394b459', 'Campo de Futebol Parque das Nações', 'Rua do Parque das Nações 123, Lisboa', 'outdoor', 'natural_grass', 'soccer'),
  ('baf3a48b-f242-4f00-8226-a427ac6ea6dc', 'Arena Indoor Benfica', 'Avenida Lusíada 456, Lisboa', 'indoor', 'artificial_turf', 'soccer'),
  ('b88d6ae7-e712-49df-84f9-e85a729ba95b', 'Complexo Desportivo do Porto', 'Rua do Dragão 789, Porto', 'hybrid', 'hybrid_turf', 'soccer'),
  
  -- Tennis courts
  ('e84e1d00-ff37-4202-989c-a393960a2a93', 'Clube de Ténis de Lisboa', 'Avenida da Liberdade 321, Lisboa', 'outdoor', 'hard_court', 'tennis'),
  ('2bdf130d-b6ac-463e-8617-02c237326550', 'Centro de Ténis do Porto', 'Rua da Boavista 654, Porto', 'indoor', 'hard_court', 'tennis'),
  
  -- Paddle courts
  ('97e07dbc-9efd-4822-bcd5-9d4a2815fdc2', 'Padel Belém', 'Rua de Belém 987, Lisboa', 'outdoor', 'artificial_turf', 'padel'),
  ('b6e5cd28-a70d-4b8c-874b-fdc5433ea96b', 'Clube Padel Porto', 'Rua Santa Catarina 147, Porto', 'indoor', 'artificial_turf', 'padel'),
  
  -- Basketball courts
  ('6d64c9e4-ba34-4561-b110-c30c4878fa97', 'Pavilhão do Sporting', 'Rua do Sporting 258, Lisboa', 'indoor', 'wood', 'basketball'),
  ('e9974147-134f-4dea-86d3-5b2afd9b7563', 'Campo de Basquete Ribeira', 'Rua da Ribeira 369, Porto', 'outdoor', 'concrete', 'basketball'),
  
  -- Multi-purpose facilities
  ('efd3d1a4-2ad7-454d-9469-8e25d16eb2af', 'Centro Desportivo Municipal', 'Avenida de Lisboa 741, Lisboa', 'indoor', 'polyurethane', 'multi_purpose'),
  ('2105220d-3831-454c-8e2c-f3bf8f018b85', 'Parque Desportivo do Porto', 'Rua do Porto 852, Porto', 'outdoor', 'artificial_turf', 'multi_purpose'),
  
  -- Volleyball courts
  ('e017f8ff-6c5e-4627-b644-72c99005d39b', 'Arena Voleibol Cascais', 'Avenida Marginal 963, Lisboa', 'outdoor', 'sand', 'volleyball'),
  ('12e3f7ee-c03a-4bd2-afbc-a7590c2c95d3', 'Centro de Voleibol do Porto', 'Rua dos Clérigos 159, Porto', 'indoor', 'wood', 'volleyball');

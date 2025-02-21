-- Fields data with different types, floorings, and sports
insert into public.field (id, name, address, type, flooring, sport)
values
  -- Soccer fields
  ('c0ac642f-5fa4-47c4-8ba5-e77a1394b459', 'Green Valley Soccer Field', '123 Sports Ave, New York', 'outdoor', 'natural_grass', 'soccer'),
  ('baf3a48b-f242-4f00-8226-a427ac6ea6dc', 'Indoor Soccer Arena', '456 Indoor Lane, Chicago', 'indoor', 'artificial_turf', 'soccer'),
  ('b88d6ae7-e712-49df-84f9-e85a729ba95b', 'Elite Soccer Complex', '789 Elite Way, Los Angeles', 'hybrid', 'hybrid_turf', 'soccer'),
  
  -- Tennis courts
  ('e84e1d00-ff37-4202-989c-a393960a2a93', 'Central Tennis Club', '321 Tennis Court, Boston', 'outdoor', 'hard_court', 'tennis'),
  ('2bdf130d-b6ac-463e-8617-02c237326550', 'Indoor Tennis Center', '654 Racquet St, Miami', 'indoor', 'hard_court', 'tennis'),
  
  -- Paddle courts
  ('97e07dbc-9efd-4822-bcd5-9d4a2815fdc2', 'Paddle Paradise', '987 Paddle Ave, Houston', 'outdoor', 'artificial_turf', 'paddle'),
  ('b6e5cd28-a70d-4b8c-874b-fdc5433ea96b', 'Urban Paddle Club', '147 Urban St, Seattle', 'indoor', 'artificial_turf', 'paddle'),
  
  -- Basketball courts
  ('6d64c9e4-ba34-4561-b110-c30c4878fa97', 'Downtown Basketball Court', '258 Hoop St, Philadelphia', 'indoor', 'wood', 'basketball'),
  ('e9974147-134f-4dea-86d3-5b2afd9b7563', 'Street Basketball Park', '369 Street Court, Atlanta', 'outdoor', 'concrete', 'basketball'),
  
  -- Multi-purpose facilities
  ('efd3d1a4-2ad7-454d-9469-8e25d16eb2af', 'Sports Complex Center', '741 Multi Ave, Dallas', 'indoor', 'polyurethane', 'multi_purpose'),
  ('2105220d-3831-454c-8e2c-f3bf8f018b85', 'Community Sports Park', '852 Community Rd, San Francisco', 'outdoor', 'artificial_turf', 'multi_purpose'),
  
  -- Volleyball courts
  ('e017f8ff-6c5e-4627-b644-72c99005d39b', 'Beach Volleyball Arena', '963 Beach Way, San Diego', 'outdoor', 'sand', 'volleyball'),
  ('12e3f7ee-c03a-4bd2-afbc-a7590c2c95d3', 'Indoor Volleyball Center', '159 Spike St, Denver', 'indoor', 'wood', 'volleyball');

-- Add games for various fields
insert into public.game (id, name, description, start_time, end_time, price, max_players, sport, field_id)
values
  ------ SOCCER ------
  -- Soccer games at Campo de Futebol Parque das Nações
  ('69354559-1f82-43b0-b14f-6a0b54e0514e', 'Morning Soccer Match', 'Casual soccer game for all skill levels', 
   now() + interval '1 day' + interval '9 hours',
   now() + interval '1 day' + interval '11 hours',
   25.00, 14, 'soccer', 'c0ac642f-5fa4-47c4-8ba5-e77a1394b459'),
   
  ('2e5cc36f-a0b2-4a49-a9a1-96004ce57efe', 'Evening Soccer League', 'Competitive soccer match', 
   now() + interval '1 day' + interval '18 hours',
   now() + interval '1 day' + interval '20 hours',
   30.00, 14, 'soccer', 'c0ac642f-5fa4-47c4-8ba5-e77a1394b459'),

  -- Indoor Soccer at Arena Indoor Benfica
  ('a26e7d3d-f09c-4d98-9025-39ce5d043bcf', 'Indoor Soccer Training', 'Professional training session', 
   now() + interval '2 days' + interval '14 hours',
   now() + interval '2 days' + interval '16 hours',
   35.00, 12, 'soccer', 'baf3a48b-f242-4f00-8226-a427ac6ea6dc'),

   -- Soccer at Complexo Desportivo do Porto
  ('abee1f93-bafc-4633-8202-e6fc783a8c4a', 'Soccer Training', 'Professional training session', 
   now() + interval '2 days' + interval '14 hours',
   now() + interval '2 days' + interval '16 hours',
   35.00, 12, 'soccer', 'b88d6ae7-e712-49df-84f9-e85a729ba95b'),

  ------ TENNIS ------
  -- Tennis matches at Clube de Ténis de Lisboa
  ('d2b98ec1-1b4a-4b7a-9680-0090708a7221', 'Tennis Singles Match', 'Friendly tennis match', 
   now() + interval '1 day' + interval '10 hours',
   now() + interval '1 day' + interval '11 hours',
   20.00, 2, 'tennis', 'e84e1d00-ff37-4202-989c-a393960a2a93'),
   
  ('12b978fd-fb0a-4bd8-8eeb-1940baa64416', 'Tennis Doubles Tournament', 'Amateur doubles tournament', 
   now() + interval '3 days' + interval '9 hours',
   now() + interval '3 days' + interval '13 hours',
   40.00, 8, 'tennis', 'e84e1d00-ff37-4202-989c-a393960a2a93'),

  ------ PADEL ------
  -- Paddle games at Padel Belém
  ('b814a5f1-bb1c-4600-a372-cfd5131cf35f', 'Morning Paddle Session', 'Beginner-friendly paddle session', 
   now() + interval '2 days' + interval '8 hours',
   now() + interval '2 days' + interval '9 hours',
   15.00, 4, 'paddle', '97e07dbc-9efd-4822-bcd5-9d4a2815fdc2'),

  -- Paddle games at Clube Padel Porto
  ('086fb6cd-75b6-4853-806b-fd440aef963e', 'Morning Paddle Session', 'Beginner-friendly paddle session', 
   now() + interval '2 days' + interval '8 hours',
   now() + interval '2 days' + interval '9 hours',
   15.00, 4, 'paddle', 'b6e5cd28-a70d-4b8c-874b-fdc5433ea96b'),

  ------ BASKETBALL ------
  -- Basketball games at Downtown Basketball Court
  ('0a76e57d-6a71-4c01-912d-10bcf9a5462a', 'Street Basketball Tournament', '3v3 basketball tournament', 
   now() + interval '4 days' + interval '16 hours',
   now() + interval '4 days' + interval '20 hours',
   10.00, 24, 'basketball', '6d64c9e4-ba34-4561-b110-c30c4878fa97'),

  -- Multi-sport events at Sports Complex
  ('885109d7-3851-436b-8aa6-c7966160c079', 'Youth Sports Day', 'Multi-sport event for kids', 
   now() + interval '5 days' + interval '10 hours',
   now() + interval '5 days' + interval '16 hours',
   45.00, 30, 'basketball', 'efd3d1a4-2ad7-454d-9469-8e25d16eb2af'),
   
  ('33eba40e-9f06-4ba7-800d-9202bf01a37f', 'Evening Sports League', 'Multi-sport tournament for adults', 
   now() + interval '5 days' + interval '18 hours',
   now() + interval '5 days' + interval '22 hours',
   50.00, 40, 'basketball', 'efd3d1a4-2ad7-454d-9469-8e25d16eb2af');

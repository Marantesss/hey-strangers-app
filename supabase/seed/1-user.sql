-- auth users with raw_user_meta_data containing full_name
insert into auth.users (id, email, email_confirmed_at, phone, last_sign_in_at, role, raw_user_meta_data)
values 
  ('3d55b69b-561d-4068-a891-202820d3d864', 'test@test.com', now(), '+1234567890', now(), 'authenticated', '{"full_name": "Test User"}'::jsonb),
  ('b601e01c-9465-431f-819e-19ef73bdef97', 'john@example.com', now(), '+1234567891', now(), 'authenticated', '{"full_name": "John Smith"}'::jsonb),
  ('e42d0ee0-dab3-4551-b07a-b6f608fbc714', 'sarah@example.com', now(), '+1234567892', now(), 'authenticated', '{"full_name": "Sarah Johnson"}'::jsonb),
  ('fdf0aa92-de53-4a5d-abf3-f13321cd499a', 'mike@example.com', now(), '+1234567893', now(), 'authenticated', '{"full_name": "Mike Brown"}'::jsonb);

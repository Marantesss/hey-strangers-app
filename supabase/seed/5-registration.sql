-- Add registrations for various games
insert into public.registration (id, game_id, user_id)
values
  -- Morning Soccer Match registrations
  ('04dac301-5933-426c-b07e-5a39fbda8a72', '69354559-1f82-43b0-b14f-6a0b54e0514e', '3d55b69b-561d-4068-a891-202820d3d864'),
  ('d267e448-98f8-4491-b0fb-24ef26c55787', '69354559-1f82-43b0-b14f-6a0b54e0514e', 'b601e01c-9465-431f-819e-19ef73bdef97'),
  ('cac57f8b-cbf2-4952-8258-34d6c38cc573', '69354559-1f82-43b0-b14f-6a0b54e0514e', 'e42d0ee0-dab3-4551-b07a-b6f608fbc714'),
  
  -- Evening Soccer League registrations
  ('dfd59ce6-f3c8-4c20-9590-63e38a18b83d', '2e5cc36f-a0b2-4a49-a9a1-96004ce57efe', '3d55b69b-561d-4068-a891-202820d3d864'),
  ('432fa226-6d09-4f83-a02c-bdf2be79a23f', '2e5cc36f-a0b2-4a49-a9a1-96004ce57efe', 'fdf0aa92-de53-4a5d-abf3-f13321cd499a'),
  
  -- Tennis Singles Match
  ('616d52da-4dfe-49a6-ae8f-3400befda263', 'd2b98ec1-1b4a-4b7a-9680-0090708a7221', 'b601e01c-9465-431f-819e-19ef73bdef97'),
  ('0c031fe9-67c6-4c4b-84a8-93bfd335b6fc', 'd2b98ec1-1b4a-4b7a-9680-0090708a7221', 'e42d0ee0-dab3-4551-b07a-b6f608fbc714'),
  
  -- Morning Paddle Session
  ('b4c51861-3783-485b-9fa5-282deb8df1d9', 'b814a5f1-bb1c-4600-a372-cfd5131cf35f', '3d55b69b-561d-4068-a891-202820d3d864'),
  ('36244f5f-0b71-4f70-9248-b8601d106006', 'b814a5f1-bb1c-4600-a372-cfd5131cf35f', 'b601e01c-9465-431f-819e-19ef73bdef97'),
  ('a234e5bc-f6e5-47d5-ae94-cc9fb50204ce', 'b814a5f1-bb1c-4600-a372-cfd5131cf35f', 'e42d0ee0-dab3-4551-b07a-b6f608fbc714'),
  
  -- Street Basketball Tournament
  ('4b1abafd-c61c-4e87-93aa-ebbcf43e7429', '0a76e57d-6a71-4c01-912d-10bcf9a5462a', '3d55b69b-561d-4068-a891-202820d3d864'),
  ('d74657b9-c4e0-4072-8afc-adb195183df0', '0a76e57d-6a71-4c01-912d-10bcf9a5462a', 'b601e01c-9465-431f-819e-19ef73bdef97'),
  ('bb8465fb-26fe-49e8-ab8f-8c15333c5556', '0a76e57d-6a71-4c01-912d-10bcf9a5462a', 'e42d0ee0-dab3-4551-b07a-b6f608fbc714'),
  ('0dc997ab-d0e4-4bbc-b0b5-56dc89fff91d', '0a76e57d-6a71-4c01-912d-10bcf9a5462a', 'fdf0aa92-de53-4a5d-abf3-f13321cd499a');

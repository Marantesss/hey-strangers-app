-- supabase/seed.sql
--
-- create test users
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
) VALUES
    -- User 1 (frequent player)
    (
        '00000000-0000-0000-0000-000000000000',
        '3d55b69b-561d-4068-a891-202820d3d864',
        'authenticated',
        'authenticated',
        'john.smith@example.com',
        crypt('password123', gen_salt('bf')),
        current_timestamp,
        current_timestamp,
        current_timestamp,
        '{"provider":"email","providers":["email"]}',
        '{"full_name": "John Smith"}',
        current_timestamp,
        current_timestamp,
        '',
        '',
        '',
        ''
    ),
    -- User 2 (regular player)
    (
        '00000000-0000-0000-0000-000000000000',
        'b601e01c-9465-431f-819e-19ef73bdef97',
        'authenticated',
        'authenticated',
        'sarah.jones@example.com',
        crypt('password123', gen_salt('bf')),
        current_timestamp,
        current_timestamp,
        current_timestamp,
        '{"provider":"email","providers":["email"]}',
        '{"full_name": "Sarah Jones"}',
        current_timestamp,
        current_timestamp,
        '',
        '',
        '',
        ''
    ),
    -- User 3 (regular player)
    (
        '00000000-0000-0000-0000-000000000000',
        'e42d0ee0-dab3-4551-b07a-b6f608fbc714',
        'authenticated',
        'authenticated',
        'mike.wilson@example.com',
        crypt('password123', gen_salt('bf')),
        current_timestamp,
        current_timestamp,
        current_timestamp,
        '{"provider":"email","providers":["email"]}',
        '{"full_name": "Mike Wilson"}',
        current_timestamp,
        current_timestamp,
        '',
        '',
        '',
        ''
    ),
    -- User 4 (occasional player)
    (
        '00000000-0000-0000-0000-000000000000',
        'fdf0aa92-de53-4a5d-abf3-f13321cd499a',
        'authenticated',
        'authenticated',
        'emma.brown@example.com',
        crypt('password123', gen_salt('bf')),
        current_timestamp,
        current_timestamp,
        current_timestamp,
        '{"provider":"email","providers":["email"]}',
        '{"full_name": "Emma Brown"}',
        current_timestamp,
        current_timestamp,
        '',
        '',
        '',
        ''
    );

-- test user email identities
INSERT INTO auth.identities (
    id,
    user_id,
    provider_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
) VALUES
    (
        uuid_generate_v4(),
        '3d55b69b-561d-4068-a891-202820d3d864',
        '3d55b69b-561d-4068-a891-202820d3d864',
        '{"sub":"3d55b69b-561d-4068-a891-202820d3d864","email":"john.smith@example.com"}',
        'email',
        current_timestamp,
        current_timestamp,
        current_timestamp
    ),
    (
        uuid_generate_v4(),
        'b601e01c-9465-431f-819e-19ef73bdef97',
        'b601e01c-9465-431f-819e-19ef73bdef97',
        '{"sub":"b601e01c-9465-431f-819e-19ef73bdef97","email":"sarah.jones@example.com"}',
        'email',
        current_timestamp,
        current_timestamp,
        current_timestamp
    ),
    (
        uuid_generate_v4(),
        'e42d0ee0-dab3-4551-b07a-b6f608fbc714',
        'e42d0ee0-dab3-4551-b07a-b6f608fbc714',
        '{"sub":"e42d0ee0-dab3-4551-b07a-b6f608fbc714","email":"mike.wilson@example.com"}',
        'email',
        current_timestamp,
        current_timestamp,
        current_timestamp
    ),
    (
        uuid_generate_v4(),
        'fdf0aa92-de53-4a5d-abf3-f13321cd499a',
        'fdf0aa92-de53-4a5d-abf3-f13321cd499a',
        '{"sub":"fdf0aa92-de53-4a5d-abf3-f13321cd499a","email":"emma.brown@example.com"}',
        'email',
        current_timestamp,
        current_timestamp,
        current_timestamp
    );
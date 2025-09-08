-- Check if there are any users in the auth.users table
SELECT email, id FROM auth.users;

-- Check if there are any roles assigned
SELECT * FROM public.user_roles;
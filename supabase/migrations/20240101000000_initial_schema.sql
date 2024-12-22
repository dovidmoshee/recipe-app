-- Create profiles table (extends auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create recipes table
create table recipes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  description text not null,
  ingredients jsonb not null,
  instructions text[] not null,
  cooking_time integer not null, -- in minutes
  difficulty text not null check (difficulty in ('Easy', 'Medium', 'Hard')),
  category text not null,
  image_url text,
  tags text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create classes table
create table classes (
  id uuid default uuid_generate_v4() primary key,
  instructor_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  description text not null,
  category text not null,
  duration integer not null, -- in minutes
  schedule timestamp with time zone not null,
  price numeric(10,2) not null,
  max_participants integer not null,
  current_participants integer default 0,
  requirements text[] default '{}',
  image_url text,
  status text default 'scheduled' check (status in ('scheduled', 'in-progress', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create enrollments table
create table enrollments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  class_id uuid references classes(id) on delete cascade not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  payment_status text default 'pending' check (payment_status in ('pending', 'completed', 'refunded')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, class_id)
);

-- Create bookmarks table (polymorphic - can bookmark both recipes and classes)
create table bookmarks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  bookmarkable_type text not null check (bookmarkable_type in ('recipe', 'class')),
  bookmarkable_id uuid not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, bookmarkable_type, bookmarkable_id)
);

-- Create reviews table (polymorphic - can review both recipes and classes)
create table reviews (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  reviewable_type text not null check (reviewable_type in ('recipe', 'class')),
  reviewable_id uuid not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, reviewable_type, reviewable_id)
);

-- Create triggers for updated_at timestamps
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on profiles
  for each row
  execute function update_updated_at_column();

create trigger update_recipes_updated_at
  before update on recipes
  for each row
  execute function update_updated_at_column();

create trigger update_classes_updated_at
  before update on classes
  for each row
  execute function update_updated_at_column();

create trigger update_enrollments_updated_at
  before update on enrollments
  for each row
  execute function update_updated_at_column();

create trigger update_reviews_updated_at
  before update on reviews
  for each row
  execute function update_updated_at_column();

-- Enable Row Level Security (RLS)
alter table profiles enable row level security;
alter table recipes enable row level security;
alter table classes enable row level security;
alter table enrollments enable row level security;
alter table bookmarks enable row level security;
alter table reviews enable row level security;

-- Create policies
create policy "Profiles are viewable by everyone" on profiles
  for select using (true);

create policy "Users can insert their own profile" on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update their own profile" on profiles
  for update using (auth.uid() = id);

-- Recipes policies
create policy "Recipes are viewable by everyone" on recipes
  for select using (true);

create policy "Users can insert their own recipes" on recipes
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own recipes" on recipes
  for update using (auth.uid() = user_id);

create policy "Users can delete their own recipes" on recipes
  for delete using (auth.uid() = user_id);

-- Classes policies
create policy "Classes are viewable by everyone" on classes
  for select using (true);

create policy "Instructors can insert their own classes" on classes
  for insert with check (auth.uid() = instructor_id);

create policy "Instructors can update their own classes" on classes
  for update using (auth.uid() = instructor_id);

create policy "Instructors can delete their own classes" on classes
  for delete using (auth.uid() = instructor_id);

-- Bookmarks policies
create policy "Users can view their own bookmarks" on bookmarks
  for select using (auth.uid() = user_id);

create policy "Users can insert their own bookmarks" on bookmarks
  for insert with check (auth.uid() = user_id);

create policy "Users can delete their own bookmarks" on bookmarks
  for delete using (auth.uid() = user_id);

-- Reviews policies
create policy "Reviews are viewable by everyone" on reviews
  for select using (true);

create policy "Users can insert their own reviews" on reviews
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own reviews" on reviews
  for update using (auth.uid() = user_id);

create policy "Users can delete their own reviews" on reviews
  for delete using (auth.uid() = user_id);

-- Enrollments policies
create policy "Users can view their own enrollments" on enrollments
  for select using (auth.uid() = user_id);

create policy "Instructors can view enrollments for their classes" on enrollments
  for select using (
    auth.uid() in (
      select instructor_id from classes where id = class_id
    )
  );

create policy "Users can insert their own enrollments" on enrollments
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own enrollments" on enrollments
  for update using (auth.uid() = user_id);
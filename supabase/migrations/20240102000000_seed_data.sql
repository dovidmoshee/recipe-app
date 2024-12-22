-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert sample profiles
INSERT INTO profiles (id, username, full_name, avatar_url, bio)
VALUES
  ('d0d8c19c-3b3e-4f5a-9f3a-d9a3a8e36b2d', 'chef_marco', 'Marco Rossi', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marco', 'Master Italian Chef with 15 years of experience'),
  ('e1d9b19c-4b4e-5f6a-0f4a-e0a4a9e47b3e', 'chef_yuki', 'Yuki Tanaka', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki', 'Specialized in traditional Japanese cuisine'),
  ('f2e0c20d-5c5f-6g7b-1g5b-f1b5b0f58c4f', 'chef_pierre', 'Pierre Dubois', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre', 'French pastry chef and culinary instructor');

-- Insert sample recipes
INSERT INTO recipes (id, user_id, title, description, category, cooking_time, difficulty, ingredients, instructions, image_url, tags)
VALUES
  (
    'a1b2c3d4-e5f6-4a5b-9c8d-1a2b3c4d5e6f',
    'd0d8c19c-3b3e-4f5a-9f3a-d9a3a8e36b2d',
    'Classic Italian Pasta Carbonara',
    'A creamy and authentic Roman pasta dish made with eggs, cheese, pancetta, and black pepper',
    'Italian',
    30,
    'Medium',
    '[{"item": "400g spaghetti"}, {"item": "200g pancetta"}, {"item": "4 large eggs"}, {"item": "100g Pecorino Romano"}, {"item": "100g Parmigiano Reggiano"}, {"item": "Black pepper"}, {"item": "Salt"}]',
    ARRAY['Bring a large pot of salted water to boil', 'Cook pasta according to package instructions', 'Meanwhile, cook diced pancetta until crispy', 'Beat eggs with grated cheese and pepper', 'Combine hot pasta with egg mixture and pancetta'],
    'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop',
    ARRAY['pasta', 'italian', 'quick', 'eggs']
  ),
  (
    'b2c3d4e5-f6a7-5b6c-0d9e-2b3c4d5e6f7g',
    'e1d9b19c-4b4e-5f6a-0f4a-e0a4a9e47b3e',
    'Traditional Sushi Rolls',
    'Learn to make perfect sushi rolls with fresh fish and seasoned rice',
    'Japanese',
    60,
    'Hard',
    '[{"item": "2 cups sushi rice"}, {"item": "Fresh salmon"}, {"item": "Nori sheets"}, {"item": "Rice vinegar"}, {"item": "Cucumber"}, {"item": "Avocado"}, {"item": "Wasabi"}, {"item": "Soy sauce"}]',
    ARRAY['Prepare sushi rice and season with vinegar mixture', 'Slice fish and vegetables', 'Place nori on bamboo mat', 'Spread rice and add fillings', 'Roll tightly and slice'],
    'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop',
    ARRAY['sushi', 'japanese', 'seafood', 'rice']
  ),
  (
    'c3d4e5f6-g7h8-6c7d-1e0f-3c4d5e6f7g8h',
    'f2e0c20d-5c5f-6g7b-1g5b-f1b5b0f58c4f',
    'French Croissants',
    'Buttery, flaky, and perfectly layered French croissants',
    'French',
    180,
    'Hard',
    '[{"item": "500g bread flour"}, {"item": "10g salt"}, {"item": "55g sugar"}, {"item": "10g instant yeast"}, {"item": "300ml cold milk"}, {"item": "250g butter for lamination"}]',
    ARRAY['Make dough and refrigerate overnight', 'Laminate dough with butter', 'Fold and roll three times', 'Cut and shape croissants', 'Proof and bake until golden'],
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop',
    ARRAY['pastry', 'french', 'breakfast', 'butter']
  );

-- Insert sample classes
INSERT INTO classes (id, instructor_id, title, description, category, duration, schedule, price, max_participants, current_participants, requirements, image_url, status)
VALUES
  (
    'd4e5f6g7-h8i9-7d8e-2f1g-4d5e6f7g8h9i',
    'd0d8c19c-3b3e-4f5a-9f3a-d9a3a8e36b2d',
    'Italian Pasta Masterclass',
    'Learn to make fresh pasta from scratch with traditional techniques',
    'Italian Cuisine',
    120,
    '2024-02-15 14:00:00',
    89.99,
    12,
    5,
    ARRAY['Basic cooking knowledge', 'Bring an apron', 'Note-taking materials'],
    'https://images.unsplash.com/photo-1556760544-74068565f05c?w=800&auto=format&fit=crop',
    'scheduled'
  ),
  (
    'e5f6g7h8-i9j0-8e9f-3g2h-5e6f7g8h9i0j',
    'e1d9b19c-4b4e-5f6a-0f4a-e0a4a9e47b3e',
    'Sushi Making Workshop',
    'Master the art of sushi making with professional techniques',
    'Japanese Cuisine',
    180,
    '2024-02-20 18:00:00',
    129.99,
    8,
    3,
    ARRAY['No experience needed', 'Bring a sharp knife if you have one', 'Container for leftovers'],
    'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&auto=format&fit=crop',
    'scheduled'
  ),
  (
    'f6g7h8i9-j0k1-9f0g-4h3i-6f7g8h9i0j1k',
    'f2e0c20d-5c5f-6g7b-1g5b-f1b5b0f58c4f',
    'French Pastry Basics',
    'Learn the fundamentals of French pastry making',
    'French Cuisine',
    240,
    '2024-02-25 10:00:00',
    149.99,
    10,
    6,
    ARRAY['Basic baking knowledge', 'Bring an apron', 'Digital scale if possible'],
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop',
    'scheduled'
  );

-- Insert sample bookmarks
INSERT INTO bookmarks (id, user_id, bookmarkable_type, bookmarkable_id)
VALUES
  ('g7h8i9j0-k1l2-0g1h-5i4j-7g8h9i0j1k2l', 'e1d9b19c-4b4e-5f6a-0f4a-e0a4a9e47b3e', 'recipe', 'a1b2c3d4-e5f6-4a5b-9c8d-1a2b3c4d5e6f'),
  ('h8i9j0k1-l2m3-1h2i-6j5k-8h9i0j1k2l3m', 'f2e0c20d-5c5f-6g7b-1g5b-f1b5b0f58c4f', 'class', 'd4e5f6g7-h8i9-7d8e-2f1g-4d5e6f7g8h9i');

-- Insert sample reviews
INSERT INTO reviews (id, user_id, reviewable_type, reviewable_id, rating, comment)
VALUES
  ('i9j0k1l2-m3n4-2i3j-7k6l-9i0j1k2l3m4n', 'e1d9b19c-4b4e-5f6a-0f4a-e0a4a9e47b3e', 'recipe', 'a1b2c3d4-e5f6-4a5b-9c8d-1a2b3c4d5e6f', 5, 'Perfect authentic recipe!'),
  ('j0k1l2m3-n4o5-3j4k-8l7m-0j1k2l3m4n5o', 'f2e0c20d-5c5f-6g7b-1g5b-f1b5b0f58c4f', 'class', 'd4e5f6g7-h8i9-7d8e-2f1g-4d5e6f7g8h9i', 5, 'Excellent instruction and hands-on experience');

-- Insert sample enrollments
INSERT INTO enrollments (id, user_id, class_id, status, payment_status)
VALUES
  ('k1l2m3n4-o5p6-4k5l-9m8n-1k2l3m4n5o6p', 'e1d9b19c-4b4e-5f6a-0f4a-e0a4a9e47b3e', 'd4e5f6g7-h8i9-7d8e-2f1g-4d5e6f7g8h9i', 'confirmed', 'completed'),
  ('l2m3n4o5-p6q7-5l6m-0n9o-2l3m4n5o6p7q', 'f2e0c20d-5c5f-6g7b-1g5b-f1b5b0f58c4f', 'e5f6g7h8-i9j0-8e9f-3g2h-5e6f7g8h9i0j', 'confirmed', 'completed');
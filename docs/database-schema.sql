-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
CREATE TYPE user_role AS ENUM ('buyer', 'seller', 'admin');
CREATE TYPE pricing_model AS ENUM ('one_time', 'subscription', 'royalty');
CREATE TYPE difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE plagiarism_status AS ENUM ('pending', 'clean', 'flagged', 'blocked');
CREATE TYPE transaction_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded');
CREATE TYPE escrow_status AS ENUM ('held', 'released', 'disputed');
CREATE TYPE report_status AS ENUM ('pending', 'reviewed', 'confirmed', 'false_positive');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    username TEXT UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    location TEXT,
    website TEXT,
    github_username TEXT,
    twitter_username TEXT,
    role user_role DEFAULT 'buyer',
    is_verified BOOLEAN DEFAULT FALSE,
    reputation_score INTEGER DEFAULT 0,
    total_sales INTEGER DEFAULT 0,
    total_purchases INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    parent_id UUID REFERENCES categories(id),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Listings table
CREATE TABLE listings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    seller_id UUID REFERENCES profiles(id) NOT NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    short_description TEXT,
    category_id UUID REFERENCES categories(id) NOT NULL,
    programming_languages TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    price DECIMAL(10,2) NOT NULL,
    pricing_model pricing_model DEFAULT 'one_time',
    royalty_percentage DECIMAL(5,2),
    demo_url TEXT,
    repository_url TEXT,
    documentation_url TEXT,
    preview_images TEXT[] DEFAULT '{}',
    code_files JSONB NOT NULL,
    dependencies JSONB,
    license_type TEXT NOT NULL,
    is_open_source BOOLEAN DEFAULT FALSE,
    difficulty_level difficulty_level DEFAULT 'intermediate',
    estimated_implementation_time INTEGER, -- in hours
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    view_count INTEGER DEFAULT 0,
    download_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    rating_average DECIMAL(3,2) DEFAULT 0,
    rating_count INTEGER DEFAULT 0,
    plagiarism_score DECIMAL(5,2),
    plagiarism_status plagiarism_status DEFAULT 'pending',
    last_plagiarism_check TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- Transactions table
CREATE TABLE transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    buyer_id UUID REFERENCES profiles(id) NOT NULL,
    seller_id UUID REFERENCES profiles(id) NOT NULL,
    listing_id UUID REFERENCES listings(id) NOT NULL,
    stripe_payment_intent_id TEXT,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    commission_amount DECIMAL(10,2) NOT NULL,
    seller_amount DECIMAL(10,2) NOT NULL,
    status transaction_status DEFAULT 'pending',
    payment_method TEXT,
    escrow_status escrow_status DEFAULT 'held',
    milestone_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- Reviews table
CREATE TABLE reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    transaction_id UUID REFERENCES transactions(id) NOT NULL,
    reviewer_id UUID REFERENCES profiles(id) NOT NULL,
    reviewee_id UUID REFERENCES profiles(id) NOT NULL,
    listing_id UUID REFERENCES listings(id) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT,
    is_public BOOLEAN DEFAULT TRUE,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Plagiarism reports table
CREATE TABLE plagiarism_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    listing_id UUID REFERENCES listings(id) NOT NULL,
    similarity_score DECIMAL(5,2) NOT NULL,
    detected_sources JSONB NOT NULL,
    analysis_data JSONB NOT NULL,
    ai_confidence DECIMAL(5,2) NOT NULL,
    status report_status DEFAULT 'pending',
    reviewer_id UUID REFERENCES profiles(id),
    reviewer_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cart items table
CREATE TABLE cart_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) NOT NULL,
    listing_id UUID REFERENCES listings(id) NOT NULL,
    quantity INTEGER DEFAULT 1,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, listing_id)
);

-- Favorites table
CREATE TABLE favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) NOT NULL,
    listing_id UUID REFERENCES listings(id) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, listing_id)
);

-- Create indexes for performance
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_listings_seller_id ON listings(seller_id);
CREATE INDEX idx_listings_category_id ON listings(category_id);
CREATE INDEX idx_listings_slug ON listings(slug);
CREATE INDEX idx_listings_programming_languages ON listings USING GIN(programming_languages);
CREATE INDEX idx_listings_tags ON listings USING GIN(tags);
CREATE INDEX idx_listings_price ON listings(price);
CREATE INDEX idx_listings_created_at ON listings(created_at DESC);
CREATE INDEX idx_listings_is_active ON listings(is_active);
CREATE INDEX idx_listings_is_featured ON listings(is_featured);
CREATE INDEX idx_listings_plagiarism_status ON listings(plagiarism_status);
CREATE INDEX idx_transactions_buyer_id ON transactions(buyer_id);
CREATE INDEX idx_transactions_seller_id ON transactions(seller_id);
CREATE INDEX idx_transactions_listing_id ON transactions(listing_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_reviews_listing_id ON reviews(listing_id);
CREATE INDEX idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX idx_reviews_reviewee_id ON reviews(reviewee_id);
CREATE INDEX idx_plagiarism_reports_listing_id ON plagiarism_reports(listing_id);
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_favorites_user_id ON favorites(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON listings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_plagiarism_reports_updated_at BEFORE UPDATE ON plagiarism_reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies

-- Profiles policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Categories policies (public read)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view categories" ON categories FOR SELECT USING (true);

-- Listings policies
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active listings" ON listings FOR SELECT USING (is_active = true);
CREATE POLICY "Sellers can manage own listings" ON listings FOR ALL USING (auth.uid() = seller_id);

-- Transactions policies
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
CREATE POLICY "Users can insert own transactions" ON transactions FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Reviews policies
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view public reviews" ON reviews FOR SELECT USING (is_public = true);
CREATE POLICY "Users can create reviews for their transactions" ON reviews FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM transactions 
        WHERE id = transaction_id 
        AND (buyer_id = auth.uid() OR seller_id = auth.uid())
        AND status = 'completed'
    )
);

-- Plagiarism reports policies (admin only)
ALTER TABLE plagiarism_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Only admins can view plagiarism reports" ON plagiarism_reports FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Cart items policies
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own cart" ON cart_items FOR ALL USING (auth.uid() = user_id);

-- Favorites policies
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own favorites" ON favorites FOR ALL USING (auth.uid() = user_id);

-- Create function to handle user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default categories
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES
('Web Development', 'web-development', 'Frontend, backend, and full-stack web applications', 'Globe', 1),
('Mobile Development', 'mobile-development', 'iOS, Android, and cross-platform mobile apps', 'Smartphone', 2),
('Desktop Applications', 'desktop-applications', 'Windows, macOS, and Linux desktop software', 'Monitor', 3),
('Games & Entertainment', 'games-entertainment', 'Game development and interactive entertainment', 'Gamepad2', 4),
('Data Science & AI', 'data-science-ai', 'Machine learning, AI, and data analysis tools', 'Brain', 5),
('DevOps & Tools', 'devops-tools', 'Development tools, CI/CD, and infrastructure', 'Settings', 6),
('Blockchain & Crypto', 'blockchain-crypto', 'Cryptocurrency, DeFi, and blockchain applications', 'Coins', 7),
('APIs & Integrations', 'apis-integrations', 'REST APIs, GraphQL, and third-party integrations', 'Plug', 8),
('Educational & Learning', 'educational-learning', 'Tutorials, courses, and educational content', 'GraduationCap', 9),
('Open Source', 'open-source', 'Free and open-source code contributions', 'Heart', 10);

-- Insert subcategories for Web Development
INSERT INTO categories (name, slug, description, icon, parent_id, sort_order) VALUES
('React & Next.js', 'react-nextjs', 'React components and Next.js applications', 'Component', 
    (SELECT id FROM categories WHERE slug = 'web-development'), 1),
('Vue.js & Nuxt', 'vuejs-nuxt', 'Vue.js components and Nuxt.js applications', 'Component', 
    (SELECT id FROM categories WHERE slug = 'web-development'), 2),
('Angular', 'angular', 'Angular applications and components', 'Component', 
    (SELECT id FROM categories WHERE slug = 'web-development'), 3),
('Node.js & Backend', 'nodejs-backend', 'Server-side JavaScript and APIs', 'Server', 
    (SELECT id FROM categories WHERE slug = 'web-development'), 4),
('Python & Django', 'python-django', 'Python web frameworks and applications', 'Code', 
    (SELECT id FROM categories WHERE slug = 'web-development'), 5);

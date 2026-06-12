
CREATE TABLE IF NOT EXISTS "user" (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_first_name VARCHAR(255) NOT NULL,
    user_last_name VARCHAR(255) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_seller BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS seller (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    seller_first_name VARCHAR(255) NOT NULL,
    seller_last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone_number VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS item (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    seller_id INTEGER REFERENCES seller(id) ON UPDATE CASCADE ON DELETE CASCADE,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(512) NOT NULL,
    price NUMERIC(7, 2) NOT NULL,
    image_link VARCHAR(512),
    category VARCHAR(50)
);

INSERT INTO seller (seller_first_name, seller_last_name, email) VALUES
    ('Coding', 'Wookies', 'guild@codingwookies.com'),
    ('Artisan', 'Collective', 'artisan@collective.com')
ON CONFLICT DO NOTHING;

INSERT INTO item (seller_id, title, description, price, image_link, category) VALUES
    (1, 'Sublimated Star Wars Wookiee Hoodie',
     'A premium, highly detailed sublimated hoodie featuring rich earth tones and a stylized Chewbacca pattern. Hand-designed and crafted exclusively by the Coding Wookies Artisan Guild.',
     65.00, '/coding_wookies_sweater.jpg', 'Geek Apparel'),
    (1, 'Artisan Battle-Ready Wookiee Miniature',
     'A custom-sculpted, hand-painted Wookiee warrior miniature wielding an authentic bowcaster in an aggressive combat stance. Hand-designed and crafted exclusively by the Coding Wookies Artisan Guild.',
     45.00, '/wooden_wookie_2.jfif', 'Miniatures'),
    (2, 'Hand-Poured Botanical Soy Candle Set',
     'A curated collection of three organic soy candles infused with natural essential oils. Hand-poured into minimalist reusable concrete and ceramic jars.',
     24.99, 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=600&q=80', 'Home Decor'),
    (2, 'Custom Hand-Woven Macramé Wall Hanging',
     'A stunning bohemian-style wall art piece woven by hand using 100% natural cotton cords on a rustic, locally sourced wooden support.',
     38.50, 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500&q=80', 'Accessories')
ON CONFLICT DO NOTHING;

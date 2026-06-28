from sqlalchemy.orm import Session
from app.database import User, Product
from app.security import hash_password


def create_admin_user(db: Session):
    admin_email = "admin@verdanza.com"

    existing_admin = db.query(User).filter(User.email == admin_email).first()

    if existing_admin:
        return

    admin = User(
        name="Administrador",
        email=admin_email,
        password_hash=hash_password("12345678"),
        is_admin=True,
    )

    db.add(admin)
    db.commit()


def seed_products(db: Session):
    default_products = [
        # Plantas
        {
            "name": "Suculenta",
            "description": "Suculenta em vaso cerâmico decorado.",
            "price": 319.90,
            "image": "resources/images/90b89e249c82e6dc5cbd5a1f773eaf8c.jpg",
            "category": "Plantas",
            "stock": 10
        },
        {
            "name": "Pacova",
            "description": "Planta folhagem pacová brilhosa e exuberante.",
            "price": 99.99,
            "image": "resources/images/8754e248f99b5927f030bced0a93fb36.jpg",
            "category": "Plantas",
            "stock": 10
        },
        {
            "name": "Begônia maculata",
            "description": "Begônia com folhas pontilhadas charmosas.",
            "price": 150.00,
            "image": "resources/images/f0d31b0b3237e0a5a88f2f86ca38bd6e.jpg",
            "category": "Plantas",
            "stock": 10
        },
        {
            "name": "Filodendro coração",
            "description": "Filodendro trepadeira com formato de coração.",
            "price": 85.00,
            "image": "resources/images/d4354dd73462954ef4c1cdf9c8e30fc1.jpg",
            "category": "Plantas",
            "stock": 10
        },
        {
            "name": "Samambaia",
            "description": "Samambaia de metro clássica e volumosa.",
            "price": 200.00,
            "image": "resources/images/3968616e5c964b6cc39dd69bde188030.jpg",
            "category": "Plantas",
            "stock": 10
        },
        # Flores / Arranjos
        {
            "name": "Arranjo floral",
            "description": "Arranjo de flores frescas variadas.",
            "price": 150.00,
            "image": "resources/images/arranjo1.jpg",
            "category": "Flores",
            "stock": 10
        },
        {
            "name": "Arranjo floral especial",
            "description": "Arranjo floral elegante para ocasiões especiais.",
            "price": 200.00,
            "image": "resources/images/arranjo2.jpg",
            "category": "Flores",
            "stock": 10
        },
        {
            "name": "Mini arranjo floral",
            "description": "Arranjo floral compacto e delicado.",
            "price": 50.00,
            "image": "resources/images/arranjo3.jpg",
            "category": "Flores",
            "stock": 10
        },
        {
            "name": "Arranjo floral delicado",
            "description": "Arranjo com tons pasteis e flores nobres.",
            "price": 120.00,
            "image": "resources/images/c2d8170ae288ab2c850477e66be1a755.jpg",
            "category": "Flores",
            "stock": 10
        },
        {
            "name": "Arranjo floral premium",
            "description": "Arranjo floral imponente em vaso de vidro.",
            "price": 250.00,
            "image": "resources/images/e35b38f27e82e78c62aca35e0fc73204.jpg",
            "category": "Flores",
            "stock": 10
        }
    ]

    for p in default_products:
        existing = db.query(Product).filter(Product.name == p["name"]).first()
        if not existing:
            new_prod = Product(**p)
            db.add(new_prod)
    db.commit()
from app.security import (
    hash_password,
    verify_password,
    create_session,
    get_user_id_by_session,
    delete_session,
    generate_csrf_token,
)

def test_password_hashing():
    password = "minha_senha_segura"
    hashed = hash_password(password)
    
    assert hashed != password
    assert verify_password(password, hashed) is True
    assert verify_password("senha_incorreta", hashed) is False

def test_session_management():
    user_id = 42
    token = create_session(user_id)
    
    assert token is not None
    assert get_user_id_by_session(token) == user_id
    
    delete_session(token)
    assert get_user_id_by_session(token) is None

def test_generate_csrf_token():
    token1 = generate_csrf_token()
    token2 = generate_csrf_token()
    assert token1 != token2
    assert len(token1) > 20

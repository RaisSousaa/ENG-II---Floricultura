def test_read_home(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Backend FastAPI funcionando"}

def test_api_status(client):
    response = client.get("/api/status")
    assert response.status_code == 200
    assert response.json() == {"status": "API funcionando"}

def test_get_csrf_token(client):
    response = client.get("/api/auth/csrf")
    assert response.status_code == 200
    assert "csrfToken" in response.json()
    assert "csrf_token" in response.cookies

def test_user_registration(client):
    payload = {
        "name": "Maria Teste",
        "email": "maria@example.com",
        "password": "password123"
    }
    response = client.post("/api/auth/register", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Maria Teste"
    assert data["email"] == "maria@example.com"
    assert "id" in data
    assert data["is_admin"] is False

    # Duplicate registration
    response_duplicate = client.post("/api/auth/register", json=payload)
    assert response_duplicate.status_code == 400
    assert response_duplicate.json()["detail"] == "E-mail já cadastrado"

def test_user_login(client):
    # Register user first
    payload = {
        "name": "Carlos Teste",
        "email": "carlos@example.com",
        "password": "password123"
    }
    client.post("/api/auth/register", json=payload)

    # Login with incorrect password
    response_wrong = client.post("/api/auth/login", json={
        "email": "carlos@example.com",
        "password": "wrongpassword"
    })
    assert response_wrong.status_code == 401
    assert "session_token" not in response_wrong.cookies

    # Login with correct credentials
    response_ok = client.post("/api/auth/login", json={
        "email": "carlos@example.com",
        "password": "password123"
    })
    assert response_ok.status_code == 200
    data = response_ok.json()
    assert data["message"] == "Login realizado com sucesso"
    assert data["user"]["email"] == "carlos@example.com"
    assert "session_token" in response_ok.cookies

def test_list_products(client):
    response = client.get("/api/products")
    assert response.status_code == 200
    products = response.json()
    assert len(products) > 0
    # Seeded products list checks
    first_product = products[0]
    assert "name" in first_product
    assert "price" in first_product
    assert "stock" in first_product

def test_create_order(client):
    # Register and login user
    payload = {
        "name": "Cliente Pedido",
        "email": "cliente_pedido@example.com",
        "password": "password123"
    }
    client.post("/api/auth/register", json=payload)
    client.post("/api/auth/login", json={
        "email": "cliente_pedido@example.com",
        "password": "password123"
    })

    # Fetch product ID from list
    prod_resp = client.get("/api/products")
    products = prod_resp.json()
    product_id = products[0]["id"]
    product_price = products[0]["price"]

    # Create an order
    order_payload = {
        "items": [
            {
                "product_id": product_id,
                "quantity": 2,
                "price": product_price
            }
        ],
        "discount": 0.0,
        "total_price": product_price * 2
    }
    response = client.post("/api/orders", json=order_payload)
    assert response.status_code == 200
    order_data = response.json()
    assert order_data["total_price"] == product_price * 2
    assert len(order_data["items"]) == 1
    assert order_data["items"][0]["product_id"] == product_id
    assert order_data["items"][0]["quantity"] == 2

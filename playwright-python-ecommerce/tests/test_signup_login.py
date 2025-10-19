import re, time
from faker import Faker

fake = Faker()

BASE_URL = "https://automationexercise.com"

def test_signup_login(page):
    # Dados
    name = fake.first_name()
    email = f"qa_{int(time.time())}@mailinator.com"
    password = "P@ssw0rd123"
    user = {
        "name": name,
        "email": email,
        "password": password,
        "address": fake.street_address(),
        "country": "Canada",
        "state": "Alberta",
        "city": "Calgary",
        "zipcode": fake.postcode(),
        "mobile": "+14035550123"
    }

    # Abre site
    page.goto(BASE_URL)
    assert "automationexercise" in page.url

    # Vai para Login/Signup
    page.get_by_role("link", name=re.compile("Signup / Login", re.I)).click()
    page.get_by_text("New User Signup!").wait_for(timeout=10000)

    # Inicia signup
    page.locator("#form input[name='name']").fill(user["name"])
    page.locator("#form input[data-qa='signup-email']").fill(user["email"])
    page.get_by_role("button", name=re.compile("Signup", re.I)).click()

    # Completa cadastro
    if page.locator("input#id_gender1").is_visible():
        page.locator("input#id_gender1").check()

    page.locator("input#password").fill(user["password"])
    page.select_option("#days", "10")
    page.select_option("#months", "5")
    page.select_option("#years", "1990")

    # Checkboxes opcionais
    if page.locator("#newsletter").is_visible():
        page.locator("#newsletter").check()
    if page.locator("#optin").is_visible():
        page.locator("#optin").check()

    # Address info
    page.fill("#first_name", user["name"])
    page.fill("#last_name", fake.last_name())
    page.fill("#address1", user["address"])
    page.select_option("#country", label=user["country"])
    page.fill("#state", user["state"])
    page.fill("#city", user["city"])
    page.fill("#zipcode", user["zipcode"])
    page.fill("#mobile_number", user["mobile"])

    page.get_by_role("button", name=re.compile("Create Account", re.I)).click()

    # Verifica sucesso
    page.get_by_text(re.compile("Account Created!", re.I)).wait_for(timeout=15000)
    page.get_by_role("link", name=re.compile("Continue", re.I)).click()

    # Verifica login ativo
    page.get_by_text(re.compile(f"Logged in as {user['name']}", re.I)).wait_for(timeout=15000)

    # Logout
    page.get_by_role("link", name=re.compile("Logout", re.I)).click()
    page.get_by_text(re.compile("Signup / Login", re.I)).wait_for(timeout=10000)

    # Login novamente
    page.get_by_role("link", name=re.compile("Signup / Login", re.I)).click()
    page.locator("input[data-qa='login-email']").fill(user["email"])
    page.locator("input[data-qa='login-password']").fill(user["password"])
    page.get_by_role("button", name=re.compile("Login", re.I)).click()

    page.get_by_text(re.compile(f"Logged in as {user['name']}", re.I)).wait_for(timeout=15000)

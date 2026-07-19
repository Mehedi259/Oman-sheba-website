import urllib.request
import json

url = "http://188.245.212.240/api/community/classifieds/"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzg1MDkwNDg1LCJpYXQiOjE3ODQ0ODU2ODUsImp0aSI6IjM2NmFlMzBiYjEyMTQyMjNiYTVlM2M3N2NiMzUxY2Q2IiwidXNlcl9pZCI6Mn0.fxe7wBa3y_TR2WIC5ArNn4EMNI-QSYXsst2OPboVgJQ"
}
data = {
  "title_bn": "iphone 14",
  "description_bn": "Test description",
  "category": "electronics",
  "price": 2552,
  "currency": "OMR",
  "city": "Sohar",
  "area": "mascut",
  "contact_name": "Mehedi Hasan",
  "contact_phone": "01627021553",
  "status": "PUBLISHED",
  "title": "iphone 14",
  "description": "Test description"
}

req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers, method='POST')
try:
    with urllib.request.urlopen(req) as response:
        print(response.read().decode())
except urllib.error.HTTPError as e:
    print(f"Error {e.code}: {e.read().decode()}")

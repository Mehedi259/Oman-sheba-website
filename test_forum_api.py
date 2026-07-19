import urllib.request
import json
import urllib.error

url = "http://188.245.212.240/api/community/forum/posts/"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzg1MDkwNDg1LCJpYXQiOjE3ODQ0ODU2ODUsImp0aSI6IjM2NmFlMzBiYjEyMTQyMjNiYTVlM2M3N2NiMzUxY2Q2IiwidXNlcl9pZCI6Mn0.fxe7wBa3y_TR2WIC5ArNn4EMNI-QSYXsst2OPboVgJQ"
}
data = {
  "title": "ওমানে ড্রাইভিং লাইসেন্স নবায়ন সম্পর্কে",
  "content": "আমি জানতে চাচ্ছিলাম ওমানে ড্রাইভিং লাইসেন্স নবায়ন করার জন্য কী কী ডকুমেন্ট লাগে?",
  "category": "general",
  "tags": "লাইসেন্স, ওমান"
}

req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers, method='POST')
try:
    with urllib.request.urlopen(req) as response:
        print(response.read().decode())
except urllib.error.HTTPError as e:
    print(f"Error {e.code}: {e.read().decode()}")

import requests
import io

url = "http://188.245.212.240/api/classifieds/images/"
headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzg1MDkwNDg1LCJpYXQiOjE3ODQ0ODU2ODUsImp0aSI6IjM2NmFlMzBiYjEyMTQyMjNiYTVlM2M3N2NiMzUxY2Q2IiwidXNlcl9pZCI6Mn0.fxe7wBa3y_TR2WIC5ArNn4EMNI-QSYXsst2OPboVgJQ"
}

files = {
    'image': ('test.png', b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\rIDATx\x9cc\xf8\xff\xff\x3f\x00\x05\xfe\x02\xfe\x0c\xcc\x96A\x00\x00\x00\x00IEND\xaeB`\x82', 'image/png')
}
data = {
    'content_type': 'others',
    'content_id': 5,
    'is_primary': 'true'
}

response = requests.post(url, headers=headers, files=files, data=data)
print(response.status_code)
print(response.text)

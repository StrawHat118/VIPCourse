from django.test import TestCase
import requests
# Create your tests here.

url = "http://v.juhe.cn/sms/send"
params = {
    "mobile":"18367150862",
    "tpl_id":"159691",
    "tpl_value": "#code#=121212",
    "key":"2a54fcd156d49e882e3914beffc00727",
}

response = requests.get(url,params=params)
print(response.json())
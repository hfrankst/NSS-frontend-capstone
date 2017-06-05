import requests
from bs4 import BeautifulSoup


headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}

url = "http://www.kroger.com/weeklyad?StoreCode=00542&DivisionId=029"

try:
    request = requests.get(url, headers=headers, timeout=5)
    print(request.content)
except requests.exceptions.Timeout:
    print("Timeout occurred")



# url = requests.get("https://www.kroger.com/weeklyad?StoreCode=00542&DivisionId=029")
# print(url)

# page = urllib.request.urlopen(url)
# print(page)
# req = urllib.request.Request(url)
# with urllib.request.urlopen(req) as response:
#    html = response.read()
#    print(html)

# soup = BeautifulSoup(page)
# print(soup) 












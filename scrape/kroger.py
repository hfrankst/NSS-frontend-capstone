import urllib.request
from bs4 import BeautifulSoup



url = ("https://www.kroger.com/weeklyad?StoreCode=00542&DivisionId=029", "window['hostedStack'] = ")
# print(url)

# page = urllib.request.urlopen(url)
# print(page)
req = urllib.request.Request(url)
with urllib.request.urlopen(req) as response:
   html = response.read()
   print(html)

# soup = BeautifulSoup(page)
# print(soup) 












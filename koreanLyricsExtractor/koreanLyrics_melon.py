import time
import csv
import pandas as pd
from time import sleep
import os.path
from random import randint
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException
import selenium.common.exceptions as selexcept
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait  # available since 2.4.0
# available since 2.26.0
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.select import Select
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys

#retrieve song title from the bot
song_title = "MYMY "
song_artist = " 에이핑크"
search_parameter = song_title + song_artist

print(search_parameter)

#THE URL
url = 'https://www.melon.com/search/lyric/index.htm'

driver = webdriver.Chrome(r'C:/Users/user/Desktop/chromedriver/chromedriver_win32/chromedriver.exe')
driver.implicitly_wait(120)
driver.get(url)
driver.maximize_window()

#variables to be used 
sentence = [] # for each line of the song seperated by <br>
song = [] # to store the song lyrics
temp =[] # idk what ill use this for yet

try:

    #This section clicks the searchbar and finds the songs by its title
    driver.find_element_by_xpath('/html/body/div[1]/div[2]/div/div[3]/fieldset/input').click()
    sleep(5)
    lyric_search_bar = driver.find_element_by_xpath('/html/body/div[1]/div[2]/div/div[3]/fieldset/input')
    lyric_search_bar.send_keys(search_parameter) # place the song title and artist to be searched
    sleep(randint(2,3)) # to prevent rejection
    lyric_search_bar.send_keys(Keys.ENTER)  # press the enter key    
    sleep(randint(3,5))

    # this section retrieves the link to the lyrics div[3] is cont wrap / div div[conts]
    song_lyrics_element = driver.find_element_by_xpath('/html/body/div[1]/div[3]/div/div[1]/div[3]/div[2]/div/ul/li[1]/dl/dd[1]/a')
    song_lyric_href = song_lyrics_element.get_attribute('href')
    driver.execute_script(song_lyric_href)
    sleep(randint(3,4))

    #this part retrieves the lyrics 
    actual_lyrics_element = driver.find_element_by_xpath('/html/body/div[1]/div[3]/div/div/div/div[2]/div[2]/div')
    song = actual_lyrics_element.text.split("\n")
    
    print(song)

    printing_file_name = song_title + '_lyrics.txt'

    song_file = open(printing_file_name, "wb")

    for line in song:
        line = line + '\n'
        encoded_unicode = line.encode("utf8")
        song_file.write(encoded_unicode)
    
    song_file.close()

except Exception as e:
    print(e)
finally:
    driver.quit()


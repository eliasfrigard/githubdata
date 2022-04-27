#top 5 C repositories by stars
while continueRequests == True:
    r = restCall('search/repositories?q=stars:0..*+language:java&sort=stars&order=desc&page=1&per_page=5')
    pageObject = r.json()
    continueRequests = r.json()["incomplete_results"]
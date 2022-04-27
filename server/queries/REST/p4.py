for pageCount in range(1, 11, 1):
    continueRequests = True
    while continueRequests == True:
        r = restCall('search/repositories?q=created:<2012-01-01+pushed:>=2016-07-01+stars:>' + str(countStars) + '+size:>1000&page=' + str(pageCount) + '&per_page=100')
        pageObject = r.json()
        continueRequests = pageObject["incomplete_results"]

    cont+=1
    writeToJSONFile(dir, 'query_' + str(cont) + '_collected_repos', json.loads(r.content))
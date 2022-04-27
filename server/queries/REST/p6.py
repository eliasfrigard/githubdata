cont = 0
countStars = 1000
 
for pageCount in range(1, 11, 1):
    continueRequests = True
    # get java repos with more than 1000 stars
    while continueRequests == True:
        r = restCall('search/repositories?q=language:java+stars:>=' + str(countStars) + '&page=' + str(pageCount) + '&per_page=100')
        continueRequests = r.json()["incomplete_results"]

    cont+=1
    writeToJSONFile(dir, 'query_' + str(cont) + '_collected_repos', json.loads(r.content))

    # for each project calculate the number of commits
    repos = json.loads(r.content)['items']
    for repo in repos: 
        r = restCall('repos/' + repo['full_name'] + '/commits?q=&page=1&per_page=100')
        cont += 1
        writeToJSONFile(dir, 'query_' + str(cont) + '_commit_first_page_content', json.loads(r.content))
        numberOfPages = 0
        writeToJSONFile(dir, 'query_' + str(cont) + '_commit_first_page_headers', json.dumps(r.headers.__dict__))

        if r.status_code == 200 and 'Link' in r.headers: 
            link = r.headers['Link']
            lastURLBegin = link.rfind('<') + 24
            lastURLEnd = link.rfind('>')
            lastURL = link[lastURLBegin:lastURLEnd]
            numberOfPagesIndexBegin = lastURL.find('page=') + 5
            numberOfPagesIndexEnd = lastURL.find('&', numberOfPagesIndexBegin)
            numberOfPages = int(lastURL[numberOfPagesIndexBegin:numberOfPagesIndexEnd])
            r = restCall(lastURL)
            cont += 1
            writeToJSONFile(dir, 'query_' + str(cont) + '_commit_last_page_content', json.loads(r.content))
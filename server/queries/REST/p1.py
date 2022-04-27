cont = 0
continueRequests = True
#pega lista de pull requests
while continueRequests == True:
    r = restCall('search/repositories?q=stars:0..*+language:c&sort=stars&order=desc&page=1&per_page=100')
    pageObject = r.json()
    continueRequests = r.json()["incomplete_results"]
    print(continueRequests)

cont+=1
writeToJSONFile(dir, 'query_' + str(cont) + '_selected_repos', json.loads(r.content))

repoItems = json.loads(r.text or r.content)['items']

for repo in repoItems:
    for page in range(1, 10, 1):
        r = restCall('repos/' + repo['full_name'] + '/pulls?&state=all&sort=created&direction=desc&page=' + str(page) + '&per_page=100')
        cont+=1
        writeToJSONFile(dir, 'query_' + str(cont) + '_numPulls', json.loads(r.content))

        pullItems = json.loads(r.content)
        for pull in pullItems:
            numberPull = pull['number']

            r2 = restCall('repos/' + repo['full_name'] + '/pulls/' + str(numberPull))
            cont+=1
            writeToJSONFile(dir, 'query_' + str(cont) + '_pull_' + str(numberPull) + '_data', json.loads(r2.content))

        if len(pullItems) < 100: 
            break
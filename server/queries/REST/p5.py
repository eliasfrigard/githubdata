cont = 0

repos = ['ReactiveX/RxJava', 'square/retrofit', 'square/okhttp', 'bumptech/glide', 'square/picasso',
'zxing/zxing', 'square/dagger', 'dropwizard/dropwizard', 'dropwizard/metrics', 'google/auto', 
'roboguice/roboguice', 'checkstyle/checkstyle', 'MorphiaOrg/morphia', 'springfox/springfox', 
'BuildCraft/BuildCraft', 'elastic/elasticsearch-hadoop', 'SpongePowered/SpongeAPI', 'embulk/embulk',
'openMF/mifosx', 'griffon/griffon']

for repo in repos:
    r = restCall('repos/' + repo)
    cont += 1
    writeToJSONFile(dir, 'query_' + str(cont) + '_repo_'+ repo.replace("/", "_") +'_number_stars', json.loads(r.content))

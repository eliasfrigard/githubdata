## P1

/search/repositories (stars, language)
/repos/:fullname/pulls (state)
/repos/:fullname/pulls/:number

## P2

/search/repositories (stars, language)

## P3

/repos/:fullname/contributors
/repos/:fullname/commits
/repos/:fullname/branches
/repos/:fullname/releases
/repos/:fullname/issues (state, label)
/repos/:fullname/issues/comments
/orgs/:name/members

## P4

/search/repositories (created, stars, size (number of commits))

## P5

/repos/:fullname/

## P6

/search/repositories (language, stars)
/repos/:fullname/commits

## P7

/repos/:fullname
/repos/:fullname/releases
/repos/:fullname/issues (labels, state, created)
/repos/:fullname/issues/:number/comments

## RESULT

/search/repositories (created, stars, language, size (number of commits))
/repos/:fullname/
/repos/:fullname/pulls (state)
/repos/:fullname/pulls/:number
/repos/:fullname/contributors
/repos/:fullname/commits
/repos/:fullname/branches
/repos/:fullname/releases

/repos/:fullname/issues (state, label, created)
/repos/:fullname/issues/comments

/repos/:fullname/issues/:number/comments
/orgs/:name/members

per_page
page

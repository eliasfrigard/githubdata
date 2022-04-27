import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList } from 'graphql'
import RepoLicence from './RepoAllTypes/RepoLicence.js'
import RepoOwner from './RepoAllTypes/RepoOwner.js'
import RepoPermissions from './RepoAllTypes/RepoPermissions.js'

// Repository Type.
const RepoTypeAll = new GraphQLObjectType({
  name: 'RepositoryAll',
  fields: {
    permissions: {
      type: RepoPermissions,
    },
    licence: {
      type: RepoLicence,
    },
    owner: {
      type: RepoOwner,
    },
    id: {
      type: GraphQLString,
    },
    node_id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    full_name: {
      type: GraphQLString,
    },
    html_url: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    fork: {
      type: GraphQLBoolean,
    },
    url: {
      type: GraphQLString,
    },
    forks_url: {
      type: GraphQLString,
    },
    keys_url: {
      type: GraphQLString,
    },
    collaborators_url: {
      type: GraphQLString,
    },
    teams_url: {
      type: GraphQLString,
    },
    hooks_url: {
      type: GraphQLString,
    },
    issue_events_url: {
      type: GraphQLString,
    },
    events_url: {
      type: GraphQLString,
    },
    assignees_url: {
      type: GraphQLString,
    },
    branches_url: {
      type: GraphQLString,
    },
    tags_url: {
      type: GraphQLString,
    },
    blobs_url: {
      type: GraphQLString,
    },
    git_tags_url: {
      type: GraphQLString,
    },
    git_refs_url: {
      type: GraphQLString,
    },
    trees_url: {
      type: GraphQLString,
    },
    statuses_url: {
      type: GraphQLString,
    },
    languages_url: {
      type: GraphQLString,
    },
    stargazers_url: {
      type: GraphQLString,
    },
    contributors_url: {
      type: GraphQLString,
    },
    subscribers_url: {
      type: GraphQLString,
    },
    subscription_url: {
      type: GraphQLString,
    },
    commits_url: {
      type: GraphQLString,
    },
    git_commits_url: {
      type: GraphQLString,
    },
    comments_url: {
      type: GraphQLString,
    },
    issue_comment_url: {
      type: GraphQLString,
    },
    contents_url: {
      type: GraphQLString,
    },
    compare_url: {
      type: GraphQLString,
    },
    merges_url: {
      type: GraphQLString,
    },
    archive_url: {
      type: GraphQLString,
    },
    downloads_url: {
      type: GraphQLString,
    },
    issues_url: {
      type: GraphQLString,
    },
    pulls_url: {
      type: GraphQLString,
    },
    milestones_url: {
      type: GraphQLString,
    },
    notifications_url: {
      type: GraphQLString,
    },
    labels_url: {
      type: GraphQLString,
    },
    releases_url: {
      type: GraphQLString,
    },
    deployments_url: {
      type: GraphQLString,
    },
    created_at: {
      type: GraphQLString,
    },
    updated_at: {
      type: GraphQLString,
    },
    pushed_at: {
      type: GraphQLString,
    },
    git_url: {
      type: GraphQLString,
    },
    ssh_url: {
      type: GraphQLString,
    },
    clone_url: {
      type: GraphQLString,
    },
    svn_url: {
      type: GraphQLString,
    },
    homepage: {
      type: GraphQLString,
    },
    size: {
      type: GraphQLInt,
    },
    stargazers_count: {
      type: GraphQLInt,
    },
    watchers_count: {
      type: GraphQLInt,
    },
    language: {
      type: GraphQLString,
    },
    has_issues: {
      type: GraphQLBoolean,
    },
    has_projects: {
      type: GraphQLBoolean,
    },
    has_downloads: {
      type: GraphQLBoolean,
    },
    has_wiki: {
      type: GraphQLBoolean,
    },
    has_pages: {
      type: GraphQLBoolean,
    },
    forks_count: {
      type: GraphQLInt,
    },
    mirror_url: {
      type: GraphQLString,
    },
    archived: {
      type: GraphQLBoolean,
    },
    disabled: {
      type: GraphQLBoolean,
    },
    open_issues_count: {
      type: GraphQLInt,
    },
    open_issues_count: {
      type: GraphQLInt,
    },
    allow_forking: {
      type: GraphQLBoolean,
    },
    is_template: {
      type: GraphQLBoolean,
    },
    topics: {
      type: new GraphQLList(GraphQLString),
    },
    visibility: {
      type: GraphQLString,
    },
    forks: {
      type: GraphQLInt,
    },
    open_issues: {
      type: GraphQLInt,
    },
    watchers: {
      type: GraphQLInt,
    },
    default_branch: {
      type: GraphQLString,
    },
  },
})

export default RepoTypeAll

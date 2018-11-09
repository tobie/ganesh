"use strict";
var github = require('../github');

module.exports = function chooseAssignee(number, metadata) {
  return github.get('/repos/:owner/:repo/issues/:number', { number: number }).then(function(issue) {
    if (issue.assignee) {
      return null;
    }
    var reviewers = metadata.reviewersExcludingAuthor;
    if (!reviewers.length) {
      return null;
    }
    return reviewers[number % reviewers.length].login;
  });
};
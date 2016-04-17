appDump.allow = ->
  if Roles.userIsInRole this.userId, ['admin']
    return true

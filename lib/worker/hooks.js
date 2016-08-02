exports.use = (res, failRules) => {

  if( failRules.url )
    res.request.href = failRules.url(res.request.href);

  if( failRules.body )
    res.request.body = failRules.body(res.request.body);

  if( failRules.headers )
    res.request.headers = failRules.headers(res.request.headers);

  return res.request.href;
};

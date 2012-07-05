
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.local('layout', false);
  res.render('index', { title: 'Express' });
};

exports.one=function(req, res){
    res.local('layout', false);
    res.render('index', { title: 'ONE' });
}
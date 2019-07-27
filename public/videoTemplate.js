(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['video'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"video-container\">\r\n  <h2>"
    + alias4(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"location","hash":{},"data":data}) : helper)))
    + "</h2>\r\n  <video width=\"1120\" height=\"630\" id=\"video\" autoplay controls>\r\n    <source src="
    + alias4(((helper = (helper = helpers.file || (depth0 != null ? depth0.file : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"file","hash":{},"data":data}) : helper)))
    + " type=\"video/mp4\">\r\n  </video>\r\n</div>\r\n";
},"useData":true});
})();
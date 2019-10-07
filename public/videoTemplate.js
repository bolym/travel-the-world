(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['video'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "<div class=\"video\">\r\n  <h2>"
    + alias5(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"location","hash":{},"data":data}) : helper)))
    + "</h2>\r\n  <iframe src=\""
    + alias5(((helper = (helper = helpers.embed || (depth0 != null ? depth0.embed : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"embed","hash":{},"data":data}) : helper)))
    + "\" width=\"1000\" height=\"624\" allow=\"autoplay; encrypted-media\" frameBorder=\"0\" allowfullscreen></iframe>\r\n</div>\r\n";
},"useData":true});
})();
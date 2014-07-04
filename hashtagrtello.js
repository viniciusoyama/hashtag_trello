var HASHTAG_REGEX = /\B#(\w*[a-zA-Z]+-*\w*)/;
var MUSTACHE_REGEX = /{{(\s*[\-\w\.]+\s*)}}/ig;
function replaceTextMustachesWithHtmlElements() {
  var tagListHtml = "<div class='cds-hashtag-list'>";
  // we must be carefull because trello has a hidden children element with #idcard
  this.contents().filter(function() {
    return this.nodeType === 3;
  })
  .replaceWith(function() {
    var cardTitle = $(this).text();
    var cardTitleHtml = cardTitle.replace(MUSTACHE_REGEX, function(mustacheElem) {
      var tag = mustacheElem.replace('{{', '').replace('}}', '');
      tagListHtml += "<span class='cds-hashtag green'>" + tag + "</span>";
      return "";
    });
    return cardTitleHtml;
  });
  tagListHtml += "</div>";
  $(tagListHtml).insertAfter(this);
}
function convertHashtagsToBadge() {
  $(".list-card-title").each(function() {
    replaceTextMustachesWithHtmlElements.apply($(this));
  });
};

$(function(){
  convertHashtagsToBadge()
});

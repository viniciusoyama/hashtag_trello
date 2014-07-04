var HASHTAG_REGEX = /\B#(\w*[a-zA-Z]+-*\w*)/;
var MUSTACHE_REGEX = /{{(\s*[\-\w\.]+\s*)}}/ig;

function replaceTextMustachesWithHtmlElements() {
  var tagsHtml = "";
  // we must be carefull because trello has a hidden children element with #idcard
  this.contents().filter(function() {
    return this.nodeType === 3;
  })
  .replaceWith(function() {
    var cardTitle = $(this).text();
    var cardTitleHtml = cardTitle.replace(MUSTACHE_REGEX, function(mustacheElem) {
      var tag = mustacheElem.replace('{{', '').replace('}}', '');
      tagsHtml += "<span class='cds-tag green'>" + tag + "</span>";
      return "";
    });
    return cardTitleHtml;
  });

  $(this).parent().find(".js-cds-tag-list").html(tagsHtml);
}

function convertTagsToBadge() {
  $(".list-card-title").each(function() {
    replaceTextMustachesWithHtmlElements.apply($(this));
  });
};

function insertTagsWrapper() {
  var tagListHtml = "<div class='js-cds-tag-list cds-tag-list'></div>";
  $(".list-card-title").each(function() {
    $(tagListHtml).insertAfter(this);
  });
}

$(function(){
  insertTagsWrapper();
  convertTagsToBadge()
});

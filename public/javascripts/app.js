var tag = $('div.tags:first').clone();
tag.children('input').attr('value','');
$('div.tags:last').after(tag);
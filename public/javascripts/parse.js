$(document).ready(function() {  
    var formHref = $('form').attr('action');
    $('#parse-css').click(function(e) {
        $.ajax({
            url : formHref,
            type : 'post',
            data : { 'stylusCode' : $('#stylus-markup').val() },
            success : function(data) {
                var content = data.stylus;
                $('#markup-parsed').text(content);
            },
            error : function(data, err) { 
                console.log(err);
            }
        });
        return false; 
    });
    $('#stylus-markup').on('keydown', function(e) { 
        var keyCode = e.keyCode || e.which; 

        if (keyCode == 9) { 
            e.preventDefault();
            var start = $(this).get(0).selectionStart;
            var end = $(this).get(0).selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            $(this).val($(this).val().substring(0, start)
            + "\t"
            + $(this).val().substring(end));

            // put caret at right position again
            $(this).get(0).selectionStart =
            $(this).get(0).selectionEnd = start + 1;
        } 
    });
});
